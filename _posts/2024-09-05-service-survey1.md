---
title: JAVA 설문평가 서비스 만들기 (1)
author: sunghomong
date: 2024-09-05 12:00:00 +0800
categories: [Service,Survey_java]
tags: [java,api,controller,service,survey]
toc: true
toc_sticky: true
toc_label: 목차
math: true
mermaid: true
---

## 개요

- 회사에서 설문평가 서비스를 a-z 까지 만들게 되었다.
- 나중에 유용하게 사용될 거 같아 코드를 정리해서 적어볼까 한다.
- 이 글을 읽는 분들에게도 도움이 조금이나마 되지 않을까 정리해보려고 한다.

## 소개

- 요즘 유행하는 mbti 나 설문평가를 만들어 통계 자료로 유용하게 사용되고 있다.
- 이 서비스는 그러한 설문평가를 어떻게 관리하느냐?에 핵심을 두었다.
- 이 서비스는 개인적으로 생각하고 a-z 까지 만든 서비스이기에 정답이 아니란 점을 참고하고 보길 바란다.
- 포스팅 하는데 긴 시간이 걸릴수도 있다. 하나씩 적어볼 생각이다.
- java 기반이고 사용한 스킬은 아래와 같다.
  - gradle
  - JQuery
  - AJAX
  - JS
  - JSTL
  - MySql
  - Mybatis
  - ...

## 순서

1. client (사용자) 설문평가 시작 버튼 클릭
2. 해당 url 이동 -> service 호출 -> api 호출 -> 질문 리스트 추출 (질문 리스트 4단계에 따라 카테고리별 묶음)
3. 모든 설문 평가 마친 후 전송 버튼 클릭 -> service 호출 -> api 호출 -> 결과 전송 -> DB 저장
4. 사용자 결과 완료 페이지 이동 -> 상태값 업데이트 -> 통계 확인 (관리자 모드)

### DB (설문평가)

- 이 DB 는 설문평가를 어떤 의도에 따라 사용하냐에 따라 다를 거 같다.
- 나는 설문평가 서비스를 만들어 사업장에 판매 후 그 사업장에서 사업장내 설문평가 대상자를 선정을 한다.
- 선정 후 기존 대상자 컬럼에서 코드 값 Y 가 추가 되며 그 대상자 페이지에 검사 버튼이 활성화 된다.
- 그 대상자가 검사 페이지에 접속 후 테스트를 완료하면 해당 대상자는 설문평가 대상자 데이터에 추가되면 상태 값이 업데이트 된다.
- 이러한 로직이기에 이렇게 DB를 짰다는 점을 참고하고 봐야한다.

<div style="margin-left: 40px;">
  <img src="https://i.ibb.co/jfZ06vG/survey-Table.png" alt="survey-Table">
</div>

- TEST_ANSWER -> 답변을 저장할 테이블
- TEST_CATEGORY -> 카테고리 분류
- TEST_CHECKUP -> 대상자 테이블
- TEST_QUESTION -> 질문 리스트
- TEST_RESPONSE -> 해당 질문 답변 리스트

테이블 관계도는 ERD cloud 로 보여드리고 싶지만 보안상으로 텍스트로 작성하려고 한다.

- TEST_QUESTION(TEST_RESPONSE_ID (FK)) - TEST_RESPONSE
- TEST_QUESTION(TEST_CATEGORY_ID (FK)) - TEST_CATEGORY
- TEST_CHECKUP(PK) - TEST_ANSWER(TEST_CHECKUP_ID (FK))

간략하게 이렇게 짠 의도를 설명하면 카테고리별로 질문을 묶고 질문에 해당하는 답변 리스트의 키값을 갖고 있는거다.

ex) <br>
카테고리 TEST_CATEGORY -> 알코올의존도 자기진단 검사 <br>
질문 TEST_QUESTION -> 1. 술을 끊어야겠다고 생각하신 적이 있습니까?  <br>
답변 리스트 TEST_RESPONSE -> 아니오|예

아래는 전송 후의 처리이다.

ex) <br>
HC_CHECKUP(INSERT) -> 대상자 <br>
HC_ANSWER(HC_CHECKUP_ID(FK)) 대상자 답변 리스트

이와 같이 순서가 정해진다. 이해가 어렵다면 댓글로 코멘트를 남겨주시면 더욱 더 이해가 쉽게 수정하겠다!!
<br>
이제 해당 소스를 써볼려구 한다!!

### jsp (페이지 이동 버튼)

해당 페이지 이동 버튼은 간단하게 a 태그로 만들었다.

```html
<a href="surveyMain">검사하기 (설문평가)</a>
```

### UrlController (페이지 이동 컨트롤러)

- url, 객체 명, 변수 명은 임시 명명이므로 참고하고 봐주길 바랍니다.

```java
    @GetMapping("/surveyMain")
    public String surveyMain(HttpSession session) {
        try {
            String returnUrl = "survey/surveyTest";
            
            /* 세션 값 세팅 */
            String userId = (String) session.getAttribute("userId");

            TestCheckUpRequest request = new TestCheckUpRequest();

            request.setUserId(userId);

            /* 대상자 조회 API 호출 */
            GetTestCheckUpResponse response = null;

            response = apiConnService.getTestCheckUp(request);

            /* API 호출 결과에 따른 페이징 처리 */
            /* EX)
             * if (response.getCheckUpNo == 0) -> 접수 대상자가 존재하지 않는지? -> errorPage or testPage;
             * if (response.getStatusCd == "00") -> 접수 상태인지? 상태값 판단 -> errorPage or testPage;
             * */
            
            return "redirect:/" + returnUrl;
        } catch (RuntimeException e) {
            log.error("[연계] API 호출 실패 : {}", e.getMessage());
            return "errorPageUrl";
        } catch (Exception e) {
            log.error("[시스템] 오류 발생: ", e);
            return "errorPageUrl";
        }
    }
```

- 위와 같이 해당 Controller 는 오로지 페이지 이동 url 이다.

### service (대상자 조회)

```java
public GetTestCheckUpResponse getTestCheckUp(TestCheckUpRequest request) throws RuntimeException {
    try {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String targetUrl = apiUrl.replaceAll("\"", "") + "/survey/getTestCheckUpRoster";

        HttpEntity<TestCheckUpRequest> req = new HttpEntity<>(request, headers);

        GetTestCheckUpResponse responseEntity = restTemplate.exchange(
            targetUrl,
            HttpMethod.POST,
            req,
            GetTestCheckUpResponse.class
        ).getBody();

        log.debug("response : {}", responseEntity);
        return responseEntity;
    } catch (Exception e) {
        log.error("[API 연계] 대상자 조회 실패: ", e);
        throw new RuntimeException("대상자 조회 API 호출 중 오류가 발생했습니다.");
    }
}
```

- 해당 서비스는 api 를 호출 하는 서비스이다. PC 와 모바일을 따로 관리하기에 API 쪽에 관리를 하기 쉬울 거 같아 API 호출로 통일 시켰다.
- 다이렉트로 service 에서 관리한다면 이는 생략해도 상관 없을 거 같다.

### API Controller (대상자 조회)

```java
@PostMapping("/getTestCheckUpRoster")
public @Nullable GetTestCheckUpResponse getTestCheckUpRoster(@RequestBody @NonNull TestCheckUpRequest request) throws CustomException {
    try {
        return service.getTestCheckUpRoster(request);
    } catch (CustomException e){
        throw e;
    } catch (Exception e) {
        log.error("대상자 조회 중 오류 발생 (service err) :", e);
        throw new CustomException("0001", "대상자 조회 중 오류 발생 (service err)");
    }
}
```

- 위는 PC,MOBILE 에서 API 호출하는 부분이다. 즉 다이렉트로 service 에서 해도 상관 없다면 이 또한 생략이다.

### API service (대상자 조회)

```java
    public GetTestCheckUpResponse getTestCheckUpRoster(TestCheckUpRequest request) throws CustomException {
        /* 변수 선언 */
        String customerId = "";
        String userId = "";
        int rosterNo = 0;
        int checkUpNo = 0;
        String statusCd = "";

        GetEmotionalTestCheckUpResponse response = new GetEmotionalTestCheckUpResponse();
        EmotionalTestCheckUpVo vo = null;

        customerId = request.getCustomerId();
        userId = request.getUserId();

        /* 사업장 대상자 정보 조회 */
        rosterNo = getRosterNo(customerId,userId);

        if (rosterNo != 0) { // 사업장에서 설문평가 대상자로 지정한 대상자인 경우
            response.setRosterNo(rosterNo);

            /* 해당 대상자가 이미 접수가 된 상태인지 접수 상태 코드 조회를 위한 서비스 */
            vo = testCheckRoster(rosterNo);

            if (vo != null) { // 설문평가 대상자이지만 접수처리가 안되어 있는 경우
                checkUpNo = vo.getTestCheckUpNo();
                statusCd = vo.getStatusCd();
            }
        }

        if (vo != null && statusCd != null && checkUpNo != 0) { // 이미 처리된 대상자 데이터가 있는 경우
            response.setCheckUpNo(checkUpNo);
            response.setReceptStatusCd(statusCd);
            response.setRosterNo(rosterNo);
        }

        return response;
    }
```

- 해당 서비스는 오로지 대상자 조회를 위한 서비스이다. url 이동할때 실행되는 서비스로 대상자에 따라 url 이동 경로를 위한 메서드이다.

### Mapper

쿼리 같은 경우에는 보안 상 텍스트로 작성하려고 한다.

- getRosterNo(customerId,userId) -> customerId 와 userId 파라미터를 갖고 해당 사업장의 대상자를 조회
- testCheckRoster(rosterNo) -> 가져온 대상자 번호를 통해 TEST_CHECKUP 테이블에 대상자 있는지 여부 조회

## 마무리

- 일단 오늘은 DB 구조의 설명과 페이지 이동 처리에 관해서 다뤄봤다. 다음 장 부터 설문평가에 대한 서비스를 본격적으로 설명할 예정이다!
- 일단 해당 코드에서 생략된 부분도 몇가지 있고 본인의 상황에 맞게 유용하게 사용하면 괜찮을 거 같다. 다음 페이지에서 뵈요~~~~
- 코멘트는 저에게 많은 도움이 됩니다! 사양말고 많이 써주세요 ㅎㅎ...

<br>

[sunghomong 의 깃 허브](https://github.com/sunghomong) <br>
[sunghomong 의 블로그](https://sunghomong.github.io/)
