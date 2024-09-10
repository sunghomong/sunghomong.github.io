---
title: JAVA 설문평가 서비스 만들기 (2)
author: sunghomong
date: 2024-09-11 12:00:00 +0800
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
<p class="center-text">이번 글은 지난 <a href="https://sunghomong.github.io/posts/service-survey2/">JAVA 설문평가 서비스 만들기 (2)</a> 글에 이어서 3번째 글을 작성해보려고 합니다.</p>
<br>
<br>
<p class="center-text">1 ~ 2 의 과정은 대상자 선정 후 해당 테스트 페이지로 이동시에 질문 데이터를 조회 후 Client 에 전달해주는 역할을 하는 과정을 살펴 봤다면 요번에는 Client 사용자 화면에 보여지는 화면 단을 다뤄볼 생각이다.</p>
<br>

<div class="center-text">
<a href="https://ibb.co/vjBR5G3"><img src="https://i.ibb.co/ZMJ7sPB/image.png" alt="image"></a>
</div>


## surveyTest.jsp

- 아래는 위의 화면을 보여주는 jstl 을 활용한 jsp 파일이다.

```html
<div class="contents-wrap">
  <!-- Contents -->
  <section class="contents">
    <div class="contents-area test-wrap">
      <div class="co-cont-section">
        <section class="co-article test-list-wrap">

          <!-- 설문평가 검사 항목 리스트 -->
          <form id="testForm">
            <div class="condition-field">
              <c:set var="prevCategoryName" value=""/>
              <c:set var="prevBasicQuestion" value=""/>

              <c:forEach var="item" items="${questionDtoList}" varStatus="status">

                <div class="exam-field" data-category-index="${item.categoryNo}">
                  <h3 class="title">${item.categoryTitle}</h3>

                  <!-- 항목 별 -->
                  <c:forEach var="dto" items="${item.questionList}" varStatus="status2">

                    <div class="exam-article" role="group"
                         aria-labelledby="test${status.count}-chk${status2.count}"
                         id="exam-article-${status.count}-${status2.count}"
                         data-question-index="${item.categoryNo}-${status2.count}"
                         data-question-id="${dto.questionId}">
                      
                      <!-- 카테고리 기본 질문 -->
                      <c:if test="${prevBasicQuestion != dto.categoryBasicQuestion }">
                        <p>${dto.categoryBasicQuestion} </p>
                        <c:set var="prevBasicQuestion" value="${dto.categoryBasicQuestion}"/>
                      </c:if>

                      <!-- 해당 카테고리 이름 -->
                      <c:if test="${prevCategoryName != dto.categoryName }">
                        <h3 class="subtitle">${dto.categoryName}</h3>
                        <c:set var="prevCategoryName" value="${dto.categoryName}"/>
                      </c:if>

                      <!-- 질문 문항 -->
                      <p id="test${status.count}-chk${status2.count}"
                         class="cont">${dto.questionNo} ${dto.questionContents}</p>
                      <div class="row chk">
                        <!-- responseType (10 : 서술형, 20 : 객관식) -->
                        <!-- 그 외의 경우 라디오 버튼 생성 -->
                        <!-- responseType 개수에 따라 라디오 버튼 생성 -->
                        <c:choose>
                          <c:when test="${dto.responseType == '10'}">
                                                			<textarea
                                                        id="${item.categoryId}_${dto.questionId}_text"
                                                        name="test${status.count}_chk${status2.count}_text"
                                                        data-category-name="${dto.categoryName}"
                                                        rows="3" cols="30"
                                                        placeholder="주관식 응답을 입력하세요"
                                                        style="resize: none; width:50%; min-width:50%;"></textarea>
                          </c:when>
                          <c:otherwise>
                            <c:forEach var="response" items="${dto.responseTypeList}"
                                       varStatus="responseStatus">
                              <c:choose>
                                <c:when test="${dto.responseScoreType == '10'}"> <!-- 일반 문항 (1~4점) -->
                                  <div class="c-chkbox type-blue">
                                    <input type="radio"
                                           id="${item.categoryId}_${dto.questionId}_${responseStatus.count}"
                                           name="test${status.count}-chk${status2.count}"
                                           data-category-name="${dto.categoryName}"
                                           value="${response}">
                                    <label
                                      for="${item.categoryId}_${dto.questionId}_${responseStatus.count}"
                                      class="chk-label">
                                      <i></i>
                                      <span>${response}</span>
                                    </label>
                                  </div>
                                </c:when>
                                <c:when test="${dto.responseScoreType == '20'}"> <!-- 역문항 (4~1점) -->
                                  <div class="c-chkbox type-blue">
                                    <input type="radio"
                                           id="${item.categoryId}_${dto.questionId}_${5 - responseStatus.count}"
                                           name="test${status.count}-chk${status2.count}"
                                           data-category-name="${dto.categoryName}"
                                           value="${response}">
                                    <label
                                      for="${item.categoryId}_${dto.questionId}_${5 - responseStatus.count}"
                                      class="chk-label">
                                      <i></i>
                                      <span>${response}</span>
                                    </label>
                                  </div>
                                </c:when>
                                <c:when test="${dto.responseScoreType == '30'}"> <!-- 0~3점 -->
                                  <div class="c-chkbox type-blue">
                                    <input type="radio"
                                           id="${item.categoryId}_${dto.questionId}_${responseStatus.count - 1}"
                                           name="test${status.count}-chk${status2.count}"
                                           data-category-name="${dto.categoryName}"
                                           value="${response}">
                                    <label
                                      for="${item.categoryId}_${dto.questionId}_${responseStatus.count - 1}"
                                      class="chk-label">
                                      <i></i>
                                      <span>${response}</span>
                                    </label>
                                  </div>
                                </c:when>
                                <c:when test="${dto.responseScoreType == '40'}"> <!-- String -->
                                  <div class="c-chkbox type-blue">
                                    <input type="radio"
                                           id="${item.categoryId}_${dto.questionId}_${response}"
                                           name="test${status.count}-chk${status2.count}"
                                           data-category-name="${dto.categoryName}"
                                           value="${response}">
                                    <label
                                      for="${item.categoryId}_${dto.questionId}_${response}"
                                      class="chk-label">
                                      <i></i>
                                      <span>${response}</span>
                                    </label>
                                  </div>
                                </c:when>
                                <c:when test="${dto.responseScoreType == '50'}"> <!-- String,String -->
                                  <div class="c-chkbox type-blue">
                                    <input type="checkbox"
                                           id="${item.categoryId}_${dto.questionId}_${response}"
                                           name="test${status.count}-chk${status2.count}"
                                           data-category-name="${dto.categoryName}"
                                           value="${response}">
                                    <label for="${item.categoryId}_${dto.questionId}_${response}"
                                           class="chk-label">
                                      <i></i>
                                      <span>${response}</span>
                                    </label>
                                  </div>
                                </c:when>
                              </c:choose>
                            </c:forEach>
                          </c:otherwise>
                        </c:choose>
                      </div>
                    </div>
                  </c:forEach>
                  <div class="progress-bar-container" id="progress-bar-container-${item.categoryNo}"
                       style="display:none;">
                    <p id="progress-text-${item.categoryNo}">진행률</p>
                    <div class="progress-bar-background">
                      <div class="progress-bar" id="progress-bar-${item.categoryNo}"></div>
                    </div>
                  </div>
                </div>
              </c:forEach>
            </div>
          </form>


        </section>
        <div class="co-btn-field justify-cont-c">
          <div class="buttons">
            <button id="saveStorage" class="co-btn bg-navy-1" type="button"
                    style="margin-right: 20px; width: 110px;"><span>임시저장</span></button>
          </div>
          <div class="buttons">
            <button id="testComp" class="co-btn bg-navy-1" type="button"><span>답변 제출하기</span></button>
          </div>
        </div>
        <div class="btm-nav-board" style="border-top : 1px solid rgba(28, 28, 27, 0.1); margin-top: 50px;">
          <div class="col">
            <a href="javascript:;" id="preCategory" onclick="prevCategory()">
              <p id="preTitle">이전 페이지</p>
              <i class="prev is-blind">이전페이지</i>
            </a>
          </div>
          <div class="col">
            <a href="javascript:;" id="nextCategory" onclick="nextCategory()">
              <p id="nextTitle">다음 페이지</p>
              <i class="next is-blind">다음페이지</i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- // Contents -->
</div>
```

- 이제 이 jsp 파일을 보면 뒷단에서 내가 왜그렇게 짰는지 이해가 될 것이다. 간단하게 설명해보도록 하겠다.
- 현재 카테고리라는 한 타이틀로 박스로 묶고 그 해당 카테고리의 타이틀에 **질문들의 리스트**가 들어가게된다. 그 해당 질문들마다 **응답 리스트**가 있을것이다 (ex. 예,아니오 ... 주관식... 그렇다,전혀아니다 등) 다양한 리스트를 반복 돌리며 하나의 박스로 또 묶고 라디오 또는 checkBox 형태, textArea 로 보여지고 있다.
- 아래의 js 파일들에서 설명하겠지만 현재 모든 질문 리스트를 추출한 상태이다. 나는 하나의 페이지에서 **모든 데이터를 갖고있는 상태**에서 보여지고 숨기고 하는 이벤트를 설정했다.

## javascript

- 아래는 위의 화면의 이벤트를 설정해주는 함수들이다.


### 초기 세팅

```javascript
/* 1번 카테고리 1번 항목 추출 */
showCheckedQuestion(1);

let data = [[${answerDtoList}]]; // 답변 dto 세팅

answerList = data[0][0];

function showCheckedQuestion(categoryIndex) {
  $('.exam-field').addClass('hidden'); // 모든 카테고리 숨김
  $('.exam-article').addClass('hidden'); // 모든 질문 숨김
  $('#nextCategory').addClass('disabled'); // 다음 카테고리로 이동하는 버튼
  $('#testComp').addClass('hidden'); // 답변 제출하기 버튼

  let field = $('.exam-field[data-category-index="' + categoryIndex + '"]'); // 해당 카테고리
  let subField = field.next(".exam-field");

  if (field.length !== 0) {
    field.removeClass("hidden");

    // .exam-field 안에 있는 .exam-article 개수를 가져옴 -> 진행률을 표시하기 위한 변수
    examTotalCount = field.find('.exam-article').length;
  }

  let questionCount = 0;

  field.find('.exam-article').each(function () { // 체크되어 있는 라디오 버튼 다시 보여주기
    let checkedQuestion = $(this).find('input[type="radio"]:checked');

    if (checkedQuestion.length !== 0) {
      $(this).removeClass('hidden');
      questionCount += 1;
    }
  });

  let nowQuestionArticle;
  let nextQuestionArticle;

  if (questionCount === 0 && categoryIndex === 1) {
    $('#saveStorage').addClass('hidden'); // 임시저장 버튼
  }
  
  if (questionCount === 0) { // 처음 화면일 경우
    nowQuestionArticle = $('.exam-article[data-question-index="' + categoryIndex + '-' + 1 + '"]');
    nextQuestionArticle = nowQuestionArticle.next(".exam-article");
    if (nowQuestionArticle.length !== 0) {
      nowQuestionArticle.removeClass('hidden');
    }
  } else { // 저장된 데이터가 있는 경우
    nowQuestionArticle = $('.exam-article[data-question-index="' + categoryIndex + '-' + questionCount + '"]');
    nextQuestionArticle = nowQuestionArticle.next(".exam-article");
    if (nextQuestionArticle.length !== 0) {
      nextQuestionArticle.removeClass('hidden');
    } else {
      $('#nextCategory').removeClass('disabled');
    }
  }

  if (nextQuestionArticle.length === 0 && subField.length === 0) {
    $('#testComp').removeClass('hidden');
    $('#nextCategory').addClass('disabled');
  }

  if (parseInt(categoryIndex) !== 1) { // 이전 버튼 및 다음 버튼 활성화 세팅
    $('#preCategory').removeClass('disabled');
  } else {
    $('#preCategory').addClass('disabled');
  }

  let nowQuestionId = nowQuestionArticle.attr('id');

  /* 진행률 세팅 */
  setProgress(nowQuestionId);
}
```

- 위의 함수를 보면 임시저장 기능 및 진행률 표시 때문에 몇가지 세팅이 추가되어 있지만 만약에 그 기능을 추가 안한다면 jstl 반복문의 해당 카테고리 인덱스의 질문 인덱스를 1,1 로 보여지는 초기 설정 후 화면에 보여주는 형태가 될 것이다.

### on change 이벤트 (질문 응답 클릭 시)

```javascript
$("input, textarea").on("change input", function () {
  // 현재 질문 요소 찾기
  let categoryField = $(this).closest(".exam-field");
  let currentQuestion = $(this).closest(".exam-article");

  let nowQuestionId = currentQuestion.attr('id');

  setProgress(nowQuestionId); // 진행률 세팅

  // 다음 질문 요소 찾기
  let subQuestion = currentQuestion.next(".exam-article");
  let subCategory = categoryField.next(".exam-field");

  // 다음 질문 요소가 마지막 질문이 아니라면
  if (subQuestion.length !== 0 && subQuestion.hasClass('hidden')) {
    subQuestion.removeClass("hidden");
  }

  let removeHidden = false;

  $('.exam-article:not(.hidden)').each(function () {
    let colsChk = $(this).find('input[type="radio"]');
    let cheboxChk = $(this).find('input[type="checkbox"]');

    if ($(this).find('input[type="radio"]:checked').length === 0 && colsChk.length > 0) {
      removeHidden = true;
    } else if ($(this).find('input[type="checkbox"]:checked').length === 0 && cheboxChk.length > 0) {
      removeHidden = true;
    }
  });

  $('#saveStorage').removeClass('hidden'); // 임시 저장 버튼 활성화

  if (removeHidden) {
    $("#nextCategory").addClass('disabled'); // 다음 버튼 비활성화
  } else {
    if (subQuestion.length === 0 && subCategory.length === 0) { // 모든 질문이 끝났다면
      $('#testComp').removeClass('hidden'); // 제출하기 버튼 활성화
      $("#nextCategory").addClass('disabled'); // 다음 버튼 비활성화
    } else {
      $("#nextCategory").removeClass('disabled'); // 다음 버튼 활성화
    }
  }
});
```

- 위의 함수는 해당 질문에 사용자가 응답을 클릭했을 때 실행되는 함수이다.
- 위의 함수를 통해 질문을 동적으로 보여지고 숨기고 할 수 있는 기능이 추가되었다.

### 다음, 이전 버튼 (다음 카테고리, 이전 카테고리)

```javascript
/* 다음 페이지 이동 버튼 클릭시 */
function nextCategory() {
  let nextCategory = $('.exam-field:not(.hidden)').next('.exam-field');
  let prevCategoryIndex = parseInt(nextCategory.data('category-index'));

  /* 유효성 검사 */
  if (testCompValidate()) {
    saveAnswerStorage(); // 데이터 저장
    showCheckedQuestion(prevCategoryIndex); // 저장된 데이터 토대로 체크된 질문들 노출
  }

  $('html').animate({scrollTop: 0}, 400); // 스크롤 최상단으로 이동
}

/* 이전 페이지 이동 버튼 클릭시 */
function prevCategory() {
  let currentQuestion = $('.exam-field:not(.hidden)');
  let currentCategoryIndex = parseInt(currentQuestion.data('category-index'));
  let prevCategoryIndex = currentCategoryIndex - 1;

  showCheckedQuestion(prevCategoryIndex); // 저장된 데이터 토대로 체크된 질문들 노출

  $("#nextCategory").removeClass('disabled'); // 다음 버튼 활성화

  $('html').animate({scrollTop: 0}, 400); // 스크롤 최상단으로 이동
}
```

- 위의 함수는 이전, 다음 버튼을 클릭 시 실행되는 함수이다.
- showCheckedQuestion 함수는 [초기세팅](#초기-세팅) 이 부분을 다시 확인하면 될 거 같다. 

## 마무리

- 오늘은 사용자 화면에서 보여지는 jsp 파일과 가져온 데이터로 질문을 만들고 보여지고 숨기고 하는 이벤트 함수들을 보았다.
- css 같은 경우에는 기존에 기업에 있던 css 파일을 적용하면서 몇가지 추가한거라 본인 화면단에 맞는 스타일로 재적용 하면 될 거 같다.
- 많은 수정이 있었다. 아직까지도 수정이 필요하다고 생각하는 코드들이다. 기존에는 사용성이 같은 함수들을 여러개 만들어 호출을 했었는데 리팩토링을 통해 공통 로직을 따로 구분하고 의존성을 구분짓고 이벤트 함수의 정의와 알맞게 오로지 사용성에 맞춰진 함수들로 다시 재구성했다.
- 다음 페이지에서는 진행률, 임시저장, 답변 제출 등 다른 이벤트 함수들에 대해 살펴볼 생각이다.
- 코드 리뷰는 항상 큰 도움이 됩니다. 피드백이 있으시면 언제든 환영합니다 ㅎㅎ!!

<br>

[sunghomong 의 깃 허브](https://github.com/sunghomong) <br>
[sunghomong 의 블로그](https://sunghomong.github.io/)_
