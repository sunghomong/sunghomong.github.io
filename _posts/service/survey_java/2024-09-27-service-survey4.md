---
title: JAVA 설문평가 서비스 만들기(4) - 임시저장 기능
author: sunghomong
date: 2024-09-26 12:00:00 +0800
categories: [ Service,Survey_java ]
tags: [ frontend,service,survey,javascript,html ]
toc: true
toc_sticky: true
toc_label: 목차
math: true
mermaid: true
---

<style>
  .center-text{
  text-align: center;
  }
</style>

<p class="center-text">안녕하세요.</p> 
<br>
<p class="center-text">이번 글은 지난 <a href="https://sunghomong.github.io/posts/service-survey3/">JAVA 설문평가 서비스 만들기 (3)</a> 글에 이어서 4번째 글을 작성해보려고 합니다.</p>
<br>
<br>
<p class="center-text">지난 글에는 화면 구성, 보여지는 이벤트 함수들을 다뤄봤다면 이번에는 임시 저장 기능에 대해 다뤄볼 생각이다. 해당 글은 만약 자신의 서비스에 필요할 경우에만 참고하고 적용하면 될 거 같다. 임시 저장 기능이 필요 없다면 이 글은 넘어가도 괜찮다! </p>
<br>

## surveyTest.jsp

- 아래는 전 글에서 보여지는 화면 단에서 임시 저장 버튼이다.

```html

<div class="co-btn-field justify-cont-c">
  <div class="buttons">
    <button id="saveStorage" class="co-btn bg-navy-1" type="button"
            style="margin-right: 20px; width: 110px;"><span>임시저장</span></button>
  </div>
</div>
```

- 설문 평가에 있어서 임시 저장 기능은 필수 적인 요소는 아니지만 설문 평가의 질문 사항들이 많을 경우에 유용하게 사용될 수 있다.
- 또 중간에 다른 일을 봐야할 경우에 저장 해 놓고 시간이 날때마다 이어서 질문에 답할 수 있는 기능으로 편리하게 사용 될 수도 있다. 오늘은 이를 다뤄볼 생각이다.

## javascript

- 아래는 임시저장 버튼 클릭 시 호출되는 함수들과 페이지 로딩과 함께 저장되어 있는 데이터를 끌어오는 함수들이다.

### 버튼 클릭 시 (임시 저장) `POST 호출`

```javascript
$("#saveStorage").click(function () {
  if (confirm("임시 저장 하시겠습니까?")) {
    saveAnswerStorage();
    console.log('answerList : ', answerList);
    setTimeout(function () {
      $.ajax({
        url: "/survey/saveAnswerListStorage",
        type: "POST",
        data: JSON.stringify(answerList),
        dataType: 'text',
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
          // 요청 전에 로딩바를 보여줌
          $('.c-loading-wrapper').show();
        },
        success: function () {
          $(".c-loading-wrapper").hide();

          $("#chkModal").click();
          $("#pContent").html('임시 저장되었습니다.');
        },
        error: function (xhr) {
          console.log("Error response text: ", xhr.responseText);
          $(".c-loading-wrapper").hide();

          // 기본 에러 메시지 설정
          let errorMessage = "시스템 에러가 발생했습니다. 관리자에게 문의 부탁드립니다.";

          // 서버에서 전달된 에러 메시지 설정
          if (xhr.responseText) {
            errorMessage = xhr.responseText;
          }

          $("#chkModal").click();
          $("#pContent").html(errorMessage);
        }
      });
    }, 0);
  }
})
```

- 화면에서 임시 저장 버튼이 활성화 됐을 경우 클릭이 가능하다.
- 클릭 시 임시 저장 하겠냐는 alert 창과 함께 true 일 경우 답변을 적은 데이터를 `saveAnswerStorage() 함수를 호출하며 저장`과
  함께 `/survey/saveAnswerListStorage` 해당 url 에 request 를 보낸다.
- 응답 성공여부에 따라 각 메시지를 호출하고 메인 페이지로 이동한다.

### saveAnswerStorage() 데이터 저장 함수

```javascript
function saveAnswerStorage() {
  /* 답변 저장 */
  let notHiddenArticles = $('.exam-article:not(.hidden)');
  notHiddenArticles.each(function () { // 현재 보여지는 질문들

    let checkedRadios = $(this).find('input[type="radio"]:checked');

    checkedRadios.each(function () {
      let id = $(this).attr('id');
      let idParts = id.split('_');
      let categoryId = idParts[0];
      let questionId = idParts[1];
      let resultVal = idParts[2];
      let result = $(this).val();
      let categoryName = $(this).attr('data-category-name');

      let answers = {
        questionId: questionId,
        resultValue: resultVal,
        answer: result,
        categoryName: categoryName
      };

      /* 해당 categoryId에 해당하는 객체가 이미 존재하는지 확인 */
      let measureObject = answerList.find(obj => obj.categoryId === categoryId);
      if (!measureObject) {
        measureObject = {categoryId: categoryId, answers: [answers]};
        answerList.push(measureObject);
      } else {
        let existingAnswerIndex = measureObject.answers.findIndex(ans => ans.questionId === questionId);

        if (existingAnswerIndex !== -1) { // 해당 itemCd를 가진 객체가 이미 존재하는 경우
          measureObject.answers[existingAnswerIndex] = answers;
        } else { // 해당 itemCd를 가진 객체가 존재하지 않는 경우
          measureObject.answers.push(answers);
        }
      }
    });
  });
}
```

- 위의 함수는 카테고리 별 다음 버튼, 이전 버튼, 임시 저장 버튼을 클릭할때마다 호출되는 함수로서 데이터를 수시로 저장해주는 함수이다.
- 이 함수를 따로 이렇게 관리 한 이유는 다음과 같다.
  + 기존에는 버튼 클릭할때마다 저장해주어서 코드의 `복잡성`도 있고 `유지보수`를 하려고 하면 데이터를 저장하는 모든 코드들의 수정이 필요했다.

## AjaxController

```java

@PostMapping("/saveAnswerListStorage")
public ResponseEntity<String> saveAnswerListStorage(HttpSession session, @RequestBody List<EmotionalTestAnswerCategoryDto> answerList) {
  try {
    String userId = (String) session.getAttribute("userId");

    EmotionalTestAnswerRequest request = new EmotionalTestAnswerRequest();
    request.setAnswerList(answerList);
    request.setUserId(userId);
    request.setRceptStatusCd("03"); // 임시 저장

    apiConnService.testAnswerUpdate(request);

    return ResponseEntity.ok("임시 저장되었습니다.");
  } catch (IllegalArgumentException e) {
    log.error("데이터 손상 오류: {}", e.getMessage());
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
  } catch (RuntimeException e) {
    log.error("시스템 오류: {}", e.getMessage());
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
  }
}
```

- 위의 메서드는 `임시 저장 버튼 클릭 시 호출되는 메서드`이다.
- 회원 정보와 함께 답변 리스트와 `상태코드를 03` 이라는 임시 저장 코드로 request 객체에 담아 보내준다.

## apiConnService

```java
public void testAnswerUpdate(TestAnswerRequest request) throws RuntimeException {
  try {
    String targetUrl = apiUrl.replaceAll("\"", "") + "/survey/testAnswerInsert";

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    HttpEntity<EmotionalTestAnswerRequest> req = new HttpEntity<>(request, headers);

    ErrorMsgResponse respMsg = restTemplate.exchange(
      targetUrl,
      HttpMethod.POST,
      req,
      ErrorMsgResponse.class
    ).getBody();

    log.debug("respMsg : {}", respMsg);
    String statusCd = Objects.requireNonNull(respMsg).getStatusCd();

    if ("FAIL".equals(statusCd)) {
      log.error("fail msg : {}", respMsg.getMsg());
      throw new IllegalArgumentException(respMsg.getMsg());
    }

  } catch (Exception e) {
    log.error("API 통신 실패: ", e);
    throw new RuntimeException("서버 통신 에러가 발생하였습니다. 관리자에게 문의하여 주시기 바랍니다.");
  }
}
```

- 해당 서비스는 앞단에서 설명했다시피 PC와 MOBILE 의 `공통 로직`을 만들기 위한 오로지 API 연동에 초점을 둔 서비스이다. 그렇기에 `필요 없다면 생략`해도 좋다.
- 여기에서 나는 아쉬운 점들이 몇가지 있었다. 기존 여기의 방침에 따라 Exception 처리의 통일성이 없어서 예외처리에 시간을 많이 투자했다.
- 예외처리에 더 좋은 방법들이 있지 않았을까 하는 아쉬운점들이 남는 부분이 많았다...
- 아 그리고!! 보면 insert url 에 호출을 하는데 이는 임시 저장을 따로 API 를 만들지 않고 답변 저장 부분에서 `상태 코드를 통해 구분`만 지어도 될 거 같다는 생각에 공통 로직으로 구분했다.

## apiController

```java

@PostMapping("/testAnswerInsert")
public StatusMsgResponse testAnswerInsert(@RequestBody AnswerRequest request) throws CustomException {
  try {
    updateService.processTestAnswerInsert(request);

    return new StatusMsgResponse("SUC", "정상적으로 처리 되었습니다.");
  } catch (CustomException e) {
    if ("1111".equals(e.getCode())) {
      return new StatusMsgResponse("FAIL", "이미 결과 처리 완료 상태입니다. 관리자에게 문의 부탁드립니다.");
    } else {
      throw e;
    }
  } catch (Exception e) {
    log.error("예기치 않은 에러 발생 (service err) : ", e);
    throw new CustomException("0004", "예기치 않은 오류 발생 (service err)");
  }
}
```

## apiService

```java
public void processTestAnswerInsert(AnswerRequest request) throws CustomException {
  String customerId = request.getCustomerId();
  String policyYear = request.getPolicyYear();
  int userNo = request.getUserNo();

  /* 회원 번호 조회 */
  int rosterNo = getService.getRosterNo(customerId, policyYear, userNo);
  request.setRosterNo(rosterNo);

  EmotionalTestCheckUpVo checkUpVo = getService.mindTestCheckRoster(rosterNo);
  int checkUpNo = 0;

  if (checkUpVo == null) { // 접수처리된 대상자가 없는 경우

    if (request.getRceptStatusCd() == null || !"03".equals(request.getRceptStatusCd())) { // 임시 저장
      request.setRceptStatusCd("01"); // 접수
    }

    checkUpNo = emotionalTestCheckUpInsert(request);

    if (checkUpNo != 0) {
      insertTestAnswerList(request.getAnswerList(), checkUpNo);
    }

  } else if ("02".equals(checkUpVo.getRceptStatusCd()) || "03".equals(checkUpVo.getRceptStatusCd())) { // 상태코드가 접수 취소 또는 임시 저장인 경우

    String rceptStatusCd = "01";

    if (request.getRceptStatusCd() != null && "03".equals(request.getRceptStatusCd())) { // 임시 저장
      rceptStatusCd = "03"; // 임시 저장
    }

    emotionalTestCheckUpStatusUpdate(checkUpVo.getEmotionalTestCheckupNo(), rceptStatusCd);

    emotionalTestAnswerUpdate(request.getAnswerList(), checkUpVo.getEmotionalTestCheckupNo());

  } else if ("01".equals(checkUpVo.getRceptStatusCd())) {
    log.error("이미 처리된 대상자 입니다.");
    throw new CustomException("1111", "이미 처리된 대상자 입니다.");
  }
}
```

## 마무리

- 오늘은 사용자 화면에서 보여지는 jsp 파일과 가져온 데이터로 질문을 만들고 보여지고 숨기고 하는 이벤트 함수들을 보았다.
- css 같은 경우에는 기존에 기업에 있던 css 파일을 적용하면서 몇가지 추가한거라 본인 화면단에 맞는 스타일로 재적용 하면 될 거 같다.
- 많은 수정이 있었다. 아직까지도 수정이 필요하다고 생각하는 코드들이다. 기존에는 사용성이 같은 함수들을 여러개 만들어 호출을 했었는데 리팩토링을 통해 공통 로직을 따로 구분하고 의존성을 구분짓고 이벤트 함수의
  정의와 알맞게 오로지 사용성에 맞춰진 함수들로 다시 재구성했다.
- 다음 페이지에서는 진행률, 임시저장, 답변 제출 등 다른 이벤트 함수들에 대해 살펴볼 생각이다.
- 코드 리뷰는 항상 큰 도움이 됩니다. 피드백이 있으시면 언제든 환영합니다 ㅎㅎ!!

<br>

[sunghomong 의 깃 허브](https://github.com/sunghomong) <br>
[sunghomong 의 블로그](https://sunghomong.github.io/)_
