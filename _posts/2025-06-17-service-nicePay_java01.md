---
title: "[결제 오류 대응] 나이스페이 망취소 API 도입기"
date: 2025-06-16 12:00:00 +0800
categories: [ Service,nicePay_java ]
tags: [ nicePay,java,service,netCancel ]
image: https://developers.nicepay.co.kr/images/api_call_flow.jpg
---

## 🧐 개발 배경

서비스 운영 중, 모바일 사용자 일부가 결제 완료 후 정상적인 프로세스가 완료되지 않았는데 환불이 되지 않는 사례에 대한 CS 문의가 반복적으로 발생했다.

원인을 조사한 결과, `모바일 환경에서는 세션 만료(Session Out) 현상`이 자주 발생하여, 결제 대행사(나이스페이) 화면으로 이동 후 결제는 정상적으로 이루어졌지만,
당사 서버로는 예약 번호 등의 핵심 데이터가 전달되지 않는 문제가 있었다.

예를 들어, 당사 시스템은 `결제 완료 후 예약 정보를 생성`하는 구조였으나,
세션이 만료된 상태에서는 결제는 성공했더라도 예약 생성 API가 호출되지 않거나, 누락된 상태로 남는 케이스들이 다수 존재했다.
이로 인해 결제와 예약이 서로 연동되지 않아 고객의 혼란과 CS 부담이 증가했다.

해결책으로, 결제 완료 후 예약 정보가 정상적으로 생성되지 않은 케이스에 대해 자동으로 `망취소(결제 취소)`를 처리하는 로직을 도입하기로 했다.
이를 위해 기존 결제 연동 로직을 점검하고, 나이스페이의 망취소 API 연동을 신규 개발하였다.

## ⚙️ 연동 방식 & 흐름 설명

<img src="https://developers.nicepay.co.kr/images/api_call_flow.jpg" alt="https://developers.nicepay.co.kr/images/api_call_flow.jpg">

출처 : [https://developers.nicepay.co.kr/images/api_call_flow.jpg](https://developers.nicepay.co.kr/images/api_call_flow.jpg)

1. 사용자 결제 요청
   - 클라이언트에서 나이스페이 결제 인증창 호출 (결제창 오픈)
   - 결제 인증창 호출 시 결과 데이터 return (망취소 url, 거래 ID)
2. 망취소 대상 판별 (Scheduler or batch)
   - 배치 또는 스케줄러가 주기적으로 결제 인증창 호출 후 일정 시간 내 예약이 생성되지 않은 데이터를 탐지
   - 탐지 기준은 거래 ID, 상태 값, 예약 PK 여부 등을 기반으로 설정
3. 망취소 API 호출
   - 탐지된 비정상 결제 건에 대해 나이스페이 망취소 API를 호출하여 자동 취소 처리
4. 결과 저장 및 로그 처리
   - 망취소 결과를 DB에 기록하고, 관련 로그 및 이력을 관리

## 💻 코드 예제

- 본 코드는 프로젝트 구조 상으로 작성한 코드입니다. 공식문서 토대로 작성했습니다. [Nicepay API 2.0](https://developers.nicepay.co.kr/manual-auth.php#flow-netcancel-detail)

### client request

```java
public NicePayResponse<Void> netCancel(String pk) throws NicePayException {
  NetCancelRequest request = new NetCancelRequest();

  request.setNetCancelPK(pk);

  NicePayResponse<Void> response = sendRequest(
    "/nicePay/netCancel",
    request,
    new ParameterizedTypeReference<>() {}
  );

  if (!response.getResultCode().equals(NicePayCode.OK.getCode())) {
    throw new NicePayException(response.getResultCode(), response.getResultMessage());
  }
}
```

### server (controller)

```java

@PostMapping("/netCancel")
public NicePayResponse<?> netCancel(@RequestBody NetCancelRequest request) {
  try {
    nicePayService.scheduleNetCancel(request);

    return new NicePayResponse<>(NicePayCode.OK, null);
  } catch (NicePayException ne) {
    return new NicePayResponse<>(NicePayCode.fromCode(ne.getCode()), null);
  } catch (Exception e) {
    log.error("[nice pay] 망 취소 중 내부 에러 발생 :", e);
    return new NicePayResponse<>(NicePayCode.SERVER_ERROR, null);
  }
}
```

### server (service)

```java
private static final long SCHEDULE_DELAY_15_MS = 15 * 60 * 1000;

public void scheduleNetCancel(NetCancelRequest request) throws NicePayException {
  ValidCheck.validNullCheck(
    request.getNetCancelPK()
  );

  scheduler.schedule(() -> {
    try {
      processNetCancel(request);
    } catch (Exception e) {
      /* log 저장 */
      log.error("[nice pay] net cancel fail cause : ", e);
    }
  }, new Date(System.currentTimeMillis() + SCHEDULE_DELAY_15_MS)); // 15분 (지정)
}

/**
 * 내부 DB 상태 조회 후 망 취소 요청하는 서비스 지정된 시간 후 동작
 * */
private void processNetCancel(NetCancelRequest request) throws HopsException {
  VO VOByPk = getDataByPK(request.getNetCancelPK());

  if (VOByPk != null &&
    "결제 실패 또는 특정 결제 상태값".equals(VOByPk.getPaySt()) &&
    StringUtills.isEmpty(VOByPk.get예약값())) {

    MultiValueMap<String, String> requestData = new LinkedMultiValueMap<>();

    ValidCheck.validNullCheck(
      VOByPk.getTid(),
      VOByPk.getAuthToken(),
      VOByPk.getAmt(),
      VOByPk.getEdiDate(),
      VOByPk.getNetCancelURL()
    );

    /* 망취소 hex(sha256(인증토큰+결제요청가맹점아이디+결제금액+결제일자+결제요청가맹점키)) */
    String plainText = VOByPk.getAuthToken() + "MID" + VOByPk.getAmt() + VOByPk.getEdiDate() + "상점키";
    String hashingText = Hashing.encrypt(plainText.getBytes());

    /* request 세팅 */
    requestData.add("TID", VOByPk.getTid());
    requestData.add("AuthToken", VOByPk.getAuthToken());
    requestData.add("MID", "상점아이디");
    requestData.add("Amt", VOByPk.getAmt());
    requestData.add("EdiDate", VOByPk.getEdiDate());
    requestData.add("SignData", hashingText);
    requestData.add("NetCancel", "1");
    requestData.add("CharSet", "기본값");
    requestData.add("EdiType", "기본값");
    requestData.add("MallReserved", VOByPk.getMailReserved());

    NetCancelResponse response = Connection.sendRequest(
      request.getNetCancelURL(),
      requestData,
      createFormHeaders(),
      NetCancelResponse.class
    );

    if (!"2001".equals(response.getResultCode())) {
      log.error("[nice pay] 망 취소 실패 error code : {}, error msg : {}", response.getErrorCd(), response.getErrorMsg());
    }

    /* 내부 데이터 망취소 성공 했다는 data 저장 */
    updateDB();

  } else {
    log.info("[nice pay] 망 취소 필요 없는 PK : {}", request.getNetCancelPK());
  }
}
```

### Utility

#### SHA-256 Hashing

```java
public String encrypt(byte[] password) throws NicePayException {
  try {
    MessageDigest md = MessageDigest.getInstance("SHA-256");
    md.update(password);
    password = md.digest();

    return byteToString(password);
  } catch (Exception e) {
    log.warn("해싱 에러", e);
    throw new NicePayException(NicePayCode.HASHING_ERROR);
  }
}
```

#### create header for nice pay REST API

```java
public HttpHeaders createFormHeaders() {
  org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
  headers.setContentType(new MediaType("application", "x-www-form-urlencoded", Charset.forName("EUC-KR")));

  return headers;
}
```

### DTO

```java

@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class CancelPayResponse {

  /** 결과 코드
   * 2001,2211 : 성공 / 그외 실패 */
  @JsonProperty("ResultCode")
  private String resultCode;
  /** 결과 메시지 */
  @JsonProperty("ResultMsg")
  private String resultMsg;
  /** 에러코드 */
  @JsonProperty("ErrorCD")
  private String errorCd;
  /** 에러메시지 */
  @JsonProperty("ErrorMsg")
  private String errorMsg;
  /** 금액 */
  @JsonProperty("CancelAmt")
  private String cancelAmt;
  /** 상점 ID */
  @JsonProperty("MID")
  private String mid;
  /** 주문번호 */
  @JsonProperty("Moid")
  private String moid;
  @JsonProperty(value = "Signature")
  private String signature;
  /** 결제수단 코드
   * CARD: 신용카드(SSG페이포함) / BANK: 계좌이체 / VBANK: 가상계좌 / CELLPHONE: 휴대폰결제 /
   * SSG_BANK: SSG 은행계좌 / GIFT_SSG: SSG머니 / GIFT_CULT: 컬쳐캐쉬(컬쳐랜드 문화상품권)
   * */
  @JsonProperty(value = "PayMethod")
  private String payMethod;
  /** 결과 구분 transaction ID */
  @JsonProperty("TID")
  private String tid;
  /** 휴대폰 부분취소/부분환불일 경우 응답됨.
   * 2회차 이상의 휴대폰 부분취소/부분환불 요청 시, 응답전문 내 OTID 로 취소요청 되어야 함. */
  @JsonProperty("OTID")
  private String otid;
  /** 취소일자, YYYYMMDD */
  @JsonProperty("CancelDate")
  private String cancelDate;
  /** 취소시간, HHmmss */
  @JsonProperty("CancelTime")
  private String cancelTime;
  /** 취소번호 */
  @JsonProperty("CancelNum")
  private String cancelNum;
  /** 취소 후 잔액 -> 000000001000 */
  @JsonProperty("RemainAmt")
  private String remainAmt;
  /** 상점 정보 전달용 예비필드 */
  @JsonProperty("MallReserved")
  private String mallReserved;

  /* ==================================================
   * 신용카드 건 추가 응답 파라미터 */

  /** 쿠폰금액 */
  @JsonProperty("CouponAmt")
  private String couponAmt;
  /** 간편결제 서비스명
   * 6: SKPAY / 8: SAMSUNGPAY (구버전 사용 시) / 15: PAYCO /
   * 16: KAKAOPAY / 20: NAVERPAY / 21: SAMSUNGPAY / 22: APPLEPAY
   * */
  @JsonProperty("ClickpayCl")
  private String clickpayCl;

  /* 페이코, 카카오 결제 시에만 응답 */
  /** 신용카드 금액 */
  @JsonProperty("MultiCardAcquAmt")
  private String multiCardAcquAmt;
  /** 포인트 금액 */
  @JsonProperty("MultiPointAmt")
  private String multiPointAmt;
  /** 쿠폰 금액 */
  @JsonProperty("MultiCouponAmt")
  private String multiCouponAmt;

  /* 페이코 결제 시에만 응답 */
  /** 현금영수증 발급 취소 대상 금액 (null able) */
  @JsonProperty("MultiRcptAmt")
  private String multiRcptAmt;

  /* ================================================= */
}
```

## ✅ 성과 (2025-01 ~ 2025-06)

- 망취소 자동화 시스템 구축 후, 총 150건의 비정상 결제 자동 취소 처리
  - 결제는 완료되었지만 예약이 누락된 케이스를 정기적으로 탐지하여 자동 환불
- 고객센터 '환불 문의' 관련 CS 70% 감소
  - 기존에는 수동 대응이 필요했던 문제를 시스템화하여 대응 시간 및 인력 리소스 절감
- 환불 처리 평균 소요 시간 1~3일 → 당일 자동 처리로 개선
- 망취소 API 연동 및 스케줄링 시스템을 도입하여 프로세스 안정성 및 신뢰성 강화

## 📘 마무리 & 회고

이번 글에서는 Java 기반으로 나이스페이 망취소 API를 도입하게 된 배경과 그 구현 과정을 정리해보았다.

> 💡 다만, 현재 방식처럼 개별 건마다 스케줄링하는 구조는 최적의 해결책은 아닐 수 있다. 동일한 문제를 보다 효율적으로 처리하려면 당일 일괄 배치(Batch) 프로그램을 돌리는 방식도 충분히 고려할 만하다.
{: .prompt-info }

개발 과정에서 느낀 점은, 결제와 같은 핵심 프로세스를 다룰 때는 작은 에러 하나도 치명적인 결과로 이어질 수 있기 때문에, 에러 캐치와 예외 처리에 더욱 민감하게 접근해야 한다는 것이다.
특히 REST API 응답 형태의 표준화와 그에 맞는 정확한 후처리 로직이 뒷받침되지 않으면 안정적인 시스템 운영은 어렵다고 느꼈다.

나이스페이 API 연동을 고민하는 분들께 이 글이 작은 도움이 되었으면 좋겠고, 이후에도 새로운 연동이나 개선 경험이 생긴다면 꾸준히 기록해볼 예정이다.
