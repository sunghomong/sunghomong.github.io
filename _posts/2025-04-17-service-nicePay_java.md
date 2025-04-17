---
title: "[JAVA NICE PAY] 결제 조회 API 연동"
date: 2025-04-17 12:00:00 +0800
categories: [ Service,nicePay_java ]
tags: [ nicePay,java,service ]
image: /assets/img/logo_images/nicePayLogo.png
---

## 🧐 개발 배경

서비스 운영 중 일부 사용자로부터 결제 내역의 불일치에 대한 문의(CS)가 접수 되었다.
조사 결과, 간헐적으로 내부 시스템과 NICEPAY 간 결제 데이터의 싱크가 맞지 않는 사례가 확인되었다.

이러한 이슈를 빠르게 확인하고 대응하기 위해, 내부 관리자 페이지에서 실시간으로 결제 정보를 조회할 수 있는 기능이 필요하다는 요청이 들어왔다.

이에 따라, 다음과 같은 방식으로 기능을 구현하게 되었다.
- 관리자 페이지 내에 결제 내역 조회 페이지를 추가
- 각 결제 건별로 "NICEPAY 조회" 버튼을 제공
- 버튼 클릭 시, NICEPAY로부터 해당 거래 정보를 직접 조회해 내부 데이터와 비교 가능하도록 구성

## ⚙️ 연동 방식 & 흐름 설명

<img src="/assets/img/post_images/service/nicepay01.png" alt="/assets/img/post_images/service/nicepay01.png">

1. 관리자가 결제 내역 페이지에서 특정 결제를 선택
2. "NICEPAY 조회" 버튼 클릭 시, NICEPAY API를 통해 실시간으로 거래 정보 요청
3. 응답 받은 NICEPAY 측 결제 정보와 내부 DB에 저장된 데이터 비교
4. 차이가 있는 경우 관리자에게 표시되어 즉각적인 확인 및 조치 가능

## 💻 코드 예제

- 본 코드는 프로젝트 구조 상으로 작성한 코드입니다. 공식문서 토대로 작성했습니다. [Nicepay API 2.0](https://developers.nicepay.co.kr/manual-status.php)

### client request

```java
public void updateNicePayStatus() throws NicePayException {
  /* 내부 데이터 valid 체크 필요 */

  String plainText = "TID" + "MID" + "EdiDate" + "상점키"; // TID + MID + EdiDate + 상점키
  String hashingText = Hashing.encrypt(plainText.getBytes());

  TransactionStatusRequest request = new TransactionStatusRequest();
  request.setTid("TID");
  request.setMid("MID");
  request.setEdiDate("EdiDate");
  request.setSignData(hashingText);

  NicePayResponse<TransactionStatusResponse> response = sendRequest(
    "/nicePay/getNicePaySt",
    request,
    new ParameterizedTypeReference<>() {
    }
  );

  if (!response.getResultCode().equals(NicePayCode.OK.getCode())) {
    throw new NicePayException(response.getResultCode(), response.getResultMessage());
  }
}
```

### server

```java
public TransactionStatusResponse getNicePaySt(TransactionStatusRequest request) throws NicePayException {
    MultiValueMap<String, String> requestData = new LinkedMultiValueMap<>();

    /* 유효성 검사 (필수 값) */
    ValidCheck.validNullCheck(
            request.getTid(),
            request.getMid(),
            request.getEdiDate(),
            request.getSignData()
    );

    requestData.add("CharSet", request.getCharSet());
    requestData.add("EdiDate", request.getEdiDate());
    requestData.add("EdiType", request.getEdiType());
    requestData.add("MID", request.getMid());
    requestData.add("SignData", request.getSignData());
    requestData.add("TID", request.getTid());

    /* objectMapper 응답 데이터 파싱 Util */
    TransactionStatusResponse response = Connection.sendRequest(
            "https://webapi.nicepay.co.kr/webapi/inquery/trans_status.jsp",
            requestData,
            createFormHeaders(),
            TransactionStatusResponse.class
    );

    if (!response.getResultCode().equals("0000")){
        throw new NicePayException(NicePayCode.BAD_REQUEST);
    }

    return response;
}
```

### Utility

#### SHA-256 Hashing

```java
public String encrypt(byte[] password) throws NicePayException {
    try {
        MessageDigest md = MessageDigest.getInstance("SHA-256");    // SHA-256 해시함수를 사용
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
    headers.setContentType(new MediaType("application", "x-www-form-urlencoded",  Charset.forName("EUC-KR")));

    return headers;
}
```

### DTO

```java
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class TransactionStatusResponse {
    /** 결과 코드
     * 0000 : 성공 / 그외 실패 */
    @JsonProperty("ResultCode")
    private String resultCode;
    /** 결과 메시지 */
    @JsonProperty("ResultMsg")
    private String resultMsg;
    /** 결과 구분 transaction ID */
    @JsonProperty("TID")
    private String tid;
    /** 거래 상태
     * 0 : 승인상태, 1 : 취소상태, 9 : 승인거래 없음 */
    @JsonProperty("Status")
    private String status;
    /** 승인 번호 */
    @JsonProperty("AuthCode")
    private String authCode;
    /** 승인 날짜 */
    @JsonProperty("AuthDate")
    private String authDate;
}
```

## 📘 마무리 & 회고

이번 글에서는 자바 기반으로 나이스페이 조회 API를 사용하게 된 계기와 구현 과정을 정리해봤다.

개발하면서 느꼈던 점은, 외부 결제 시스템과 연동할 땐 예상치 못한 변수나 예외 상황이 많다는 것이었다.
그래서 처음부터 유연한 구조로 설계하고, 에러 처리는 최대한 꼼꼼히 넣어두는 게 중요하다는 걸 다시 한번 체감했다.

혹시 나이스페이 API를 연동하려는 분들께 이 글이 조금이라도 도움이 되었으면 좋겠고, 이후에도 또 다른 연동 경험이 생기면 기록해볼 생각이다.
