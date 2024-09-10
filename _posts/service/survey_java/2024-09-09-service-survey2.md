---
title: JAVA 설문평가 서비스 만들기 (2)
author: sunghomong
date: 2024-09-09 12:00:00 +0800
categories: [ Service,Survey_java ]
tags: [ java,api,controller,service,survey ]
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
<p class="center-text">이번 글은 지난 <a href="https://sunghomong.github.io/posts/service-survey1/">JAVA 설문평가 서비스 만들기 (1)</a> 글에 이어서 2번째 글을 작성해보려고 합니다.</p>
<br>
<br>
<p class="center-text">지난 글은 대상자 판별 후 그 대상자의 상태에 따라 이동 경로를 설정해주는 부분이였다면 이번엔 서비스의 핵심 질문 데이터를 조회 후 해당 질문 리스트 들을 추출 해 사용자 client 가 이용할 수 있게끔 보여주는 서비스를 정리해보려고 한다.</p>
<br>

## Controller

```java

@GetMapping("/surveyTest")
public String getMindTestQuestion(HttpSession session, Model model) {
  try {
    /* 필요하다면 해당 대상자의 정보를 세션에 담아 -> url errorPage 또는 검사 결과 완료 페이지로 이동 */

    GetTestListResponse response = apiConnService.getTestList(); // 질문 리스트 조회

    if (response != null) {
      model.addAttribute("questionDtoList", response.getQuestionDtoList()); // 질문 리스트
      model.addAttribute("answerDtoList", new Gson().toJson(response.getAnswerDtoList())); // 임시 저장을 위한 가공 답변 리스트 -> 임시 저장 기능을 사용 안한다면 생략 가능
    } else {
      return "errorPageUrl"; // 에러페이지 이동
    }

    return "survey/surveyTest";
  } catch (Exception e) {
    log.error("질문 리스트 조회 중 오류 발생 : ", e);
    return "errorPageUrl";
  }
}
```

- 위와 같은 컨트롤러는 해당 테스트 페이지로 이동시 실행되는 메서드이다.
- answerDtoList 같은 경우 임시저장을 위한 데이터이다. 질문 리스트 추출과 동시에 가공 답변 리스트를 불러와 DB에 저장하며 임시 저장 데이터를 갖고 있는 형태로 유지 된다.

## apiConnService (생략 가능)

- 해당 api 를 연결해주는 서비스는 이전 글과 동일하게 PC 와 모바일을 따로 관리하기에 공통 로직으로 만들기 위한 오로지 연결을 위한 서비스이기에 생략 가능하다.

```java
public GetTestListResponse getTestList() {
  HttpHeaders headers = new HttpHeaders();
  headers.setContentType(MediaType.APPLICATION_JSON);

  String targetUrl = apiUrl.replaceAll("\"", "") + "/survey/getQuestionList";

  HttpEntity<Void> req = new HttpEntity<>(headers);

  return restTemplate.exchange(targetUrl, HttpMethod.GET, req, GetTestListResponse.class).getBody();
}
```

## apiController (생략 가능)

```java

@GetMapping("/getQuestionList")
public @NonNull GetTestListResponse getTestListResponseEntity() throws CustomException {
  try {
    return service.getTestListResponseEntity();
  } catch (CustomException e) {
    throw e;
  } catch (Exception e) {
    log.error("질문 리스트 조회 중 오류 발생 (service err) : ", e);
    throw new CustomException("0002", "질문 리스트 조회 중 오류 발생 (service err) ");
  }
}
```

### apiService (질문 리스트 조회 및 답변 dto 가공)

```java
public GetTestListResponse getTestListResponseEntity() throws CustomException {
  try {
    /* 데이터 가공 */
    GetTestListResponse response = new GetTestListResponse();
    List<QuestionListDto> questionDtoList = new ArrayList<>();
    List<TestAnswerCategoryDto> answerCategoryDtoList = new ArrayList<>();
    
    /* Category 리스트 조회 */
    List<CategoryVo> categoryList = mapper.getCategoryList();

    /* category 별 질문 리스트 추출 */
    for (CategoryVo category : categoryList) {

      /* 해당 카테고리의 질문 리스트를 추출 */
      List<QuestionDto> questionList = mapper.getQuestionListByCategory(category);

      TestAnswerCategoryDto answerCategoryDto = new TestAnswerCategoryDto();

      answerDto.setCategoryId(category.getCategoryId());

      List<TestAnswerDto> answerDtoList = new ArrayList<>();

      /* 각 질문의 응답 유형을 파싱하여 설정 */
      for (QuestionDto question : questionList) {

        String responseTypeStr = question.getResponseTypeDescription();

        List<String> responseType = Arrays.asList(responseTypeStr.split("\\|"));

        question.setResponseTypeList(responseType);

        /* 답변 dto 가공 */
        TestAnswerDto dto = new TestAnswerDto();

        dto.setQuestionId(String.valueOf(question.getQuestionId()));
        dto.setCategoryName(question.getCategoryName());

        answerDtoList.add(dto);
      }

      answerCategoryDto.setAnswers(answerDtoList);

      answerCategoryDtoList.add(answerCategoryDto);

      QuestionListDto questionListDto = new QuestionListDto();

      questionListDto.setQuestionList(questionList);
      questionListDto.setCategoryId(category.getCategoryId());
      questionListDto.setCategoryNo(category.getCategoryNo());
      questionListDto.setCategoryTitle(category.getCategoryTitle());

      questionDtoList.add(questionListDto);
    }

    response.setAnswerDtoList(answerCategoryDtoList);
    response.setQuestionDtoList(questionDtoList);

    return response;
  }catch (Exception e) {
    log.error("질문 리스트 조회중 에러 발생 (DB err) : ", e);
    throw new CustomException("0002","질문 리스트 조회중 에러 발생 (DB err)");
  }
}
```

- 해당 서비스는 질문 리스트를 추출하고 답변 dto 를 가공해주는 서비스이다.
- 메서드 호출 시 DB의 카테고리를 추출 후 해당 카테고리의 질문들을 추출한 데이터를 갖고 응답 데이터, 답변 dto 를 가공해주는 역할을 한다.
- 이 서비스만 보면 어떤 역할을 하는지 어려울 수 있기에 아래 객체에 대한 정보와 조회 쿼리를 간단히 설명해보려고 한다.

### Object

- 아래는 위에서 가공한 객체 데이터이다.
- 해당 객체로 관리하는 거는 정답이 아니다. JSON 형태로 파싱도 가능할거고 나는 유지보수와 가독성을 위해 객체로 관리하는 게 편해서 이렇게 사용하는 편이다.

```java
@Getter
@Setter
public class GetTestListResponse {
  /** 카테고리별 질문 리스트 */
  List<QuestionListDto> questionDtoList;
  /** 답변 리스트 */
  List<TestAnswerCategoryDto> answerDtoList;

  @Getter
  @Setter
  public static class QuestionListDto {
    /** 카테고리 아이디 */
    private String categoryId;
    /** 카테고리 제목 */
    private String categoryTitle;
    /** 카테고리 순번 */
    private int categoryNo;
    /** 질문 리스트 */
    List<QuestionDto> questionList;

    @Getter
    @Setter
    public static class QuestionDto {
      /** 카테고리 이름 */
      private String categoryName;
      /** 카테고리 기본 질문 */
      private String categoryBasicQuestion;
      
      /** 질문 아이디 */
      private int questionId;
      /** 질문 내용 */
      private String questionContents;
      /** 질문 순번 */
      private int questionNo;
      /** 응답 점수 형태
       * 10 : 1~4
       * 20 : 4~1(역순)
       * 30 : 0~3 (0점부터)
       * 40 : (String)
       * */
      private String responseScoreType;
      
      /** 응답 내용 문자형 */
      private String responseTypeDescription;
      /** 응답 형태
       * 10 : 주관식
       * 20 : 객관식
       * */
      private String responseType;
      /** 응답 내용 리스트
       * (주관식,예|아니오,전혀 아니다|아니다...)
       * */
      private List<String> responseTypeList;
    }
  }
}
```

- 답변 객체

```java
@Getter
@Setter
public class TestAnswerCategoryDto {
    /** 카테고리 아이디 (PHQ-9,PHQ-8...) */
    private String categoryId;
    /** 답변 리스트 */
    private List<TestAnswerDto> answers;
    @Getter
    @Setter
    public static class TestAnswerDto {
        /** 카테고리 이름  */
        private String categoryName;
        /** 답변 점수 */
        private String resultValue;
        /** 답변 */
        private String answer;
        /** 질문 아이디 */
        private String questionId;
    }
}
```

```java
@Getter
public class CategoryVo {
    /** 카테고리 아이디 */
    private String categoryId;
    /** 카테고리 이름 */
    private String categoryName;
    /** 카테고리 기본 질문 */
    private String categoryBasicQuestion;
    /** 카테고리 순번 */
    private int categoryNo;
    /** 카테고리 제목 */
    private String categoryTitle;
}
```

- 사실 상 나는 이 서비스를 만들면서 많은 아쉬운 점들이 있었다. 더욱 더 간결하게 데이터들을 관리할 수 있었던 거 같은데 처음부터 너무 복잡하게 생각한 건 아닐까...? 아무튼 이러면서 성장해 나가는 거라 생각한다!! -> 리팩토링이 따로 필요하다는 뜻이기에 본인 입맛에 수정하면 되지 않을까? ㅎㅎ...
- 아무래도 해당 데이터만 보고선 어떻게 사용되는지 이해가 안갈수도 있다. 간단한 설명 후 프론트 단에서 보여지는 화면을 통해 이해가 될 거라 생각한다.
- GetTestListResponse -> Client 에게 전송해줄 데이터 (API 호출(request) -> 응답 데이터 (response))
- QuestionListDto -> 질문 리스트를 담아줄 객체
- TestAnswerCategoryDto -> 가공 답변 dto 리스트 질문 당 1개의 답변 데이터를 갖고 있음
- CategoryVo -> 질문 리스트 추출을 위한 카테고리 VO 객체

### Mapper.xml (DB)

- 카테고리 조회 부분 같은 경우에는 해당 데이터를 모두 조회 하는거기에 생략 하고 필수적은 쿼리만 작성해보려고 한다.

```xml
<select id="getQuestionListByCategoryIdAndName" parameterType="String" resultType="GetTestListResponse$QuestionListDto$QuestionDto">
  SELECT
    HC.CATEGORY_NAME AS categoryName,	/* 카테고리 이름 */
    HC.CATEGORY_BASIC_QUESTION AS categoryBasicQuestion,	 	/* 기본 질문 */
    HQ.QUESTION_ID AS questionId,	/* 질문 아이디 */
    HQ.QUESTION_CONTENTS AS questionContents,	/*  질문 내용 */
    HQ.QUESTION_NO AS questionNo,	/*  질문 순번 */
    HQ.RESPONSE_SCORE_TYPE AS responseScoreType, /* 10 : 일반문항(1~4) 20 : 역문항(4~1) 30 : 0점 시작(0~3) 40 :  String */
    HR.RESPONSE_TYPE_DESCRIPTION AS responseTypeDescription,  /* 응답 내용 (주관식,예|아니오,전혀 아니다|아니다...) */
    HR.RESPONSE_TYPE AS responseType /* 응답 형태 10 : 서술형 20 : 주관식 */
  FROM
    HC_TEST_CATEGORY HC
    JOIN HC_TEST_QUESTION HQ ON HC.CATEGORY_ID = HQ.CATEGORY_ID
        AND HC.CATEGORY_NAME = HQ.CATEGORY_NAME
    JOIN HC_TEST_RESPONSE HR ON HQ.RESPONSE_TYPE_ID = HR.RESPONSE_TYPE_ID
  WHERE
    HC.CATEGORY_ID = #{categoryId}
  ORDER BY
    HQ.QUESTION_NO ASC;
</select>
```

- 해당 쿼리를 보고 이해가 되는 사람도 있을거고 안되는 사람도 있을거라 생각한다. 예상 의문점을 하나씩 적어보려한다. -> 댓글로 질문을 남겨주시면 그거에 대한 답변을 적어보도록 하겠다! 나에게는 피드백이 정말 성장에 많은 도움이 돼요 ㅎㅎ...

1. 결국 조회하는 데이터는 한 객체에 전부 담는데 이거로만 사용할 수 있는거 아닌가요? -> 아마 앞단의 프론트 부분을 보면 내가 왜 이렇게 구성했는지 알 수 있을 것이다.
2. 흠... 한쿼리에서 전부 조회 할 수 있었던 거 아닌가요? -> 사실 상 이것도 고민을 해봤다. 한 쿼리에서 JOIN 을 이용해 전부 조회가 한번에 가능하지 않을까? 쿼리의 복잡성도 있고 서비스 단에서 분리해주는게 조회 부분에서는 더 효율적이지 않을까 라는 생각에 이렇게 서비스 로직을 짰다. 사실 정답은 없다.
3. 테이블 관계도가 어떻게 되는건가요? -> <a href="https://sunghomong.github.io/posts/service-survey1/">JAVA 설문평가 서비스 만들기 (1)</a> 관계도는 앞단에서 설명한 거를 참고 하면 될 거 같다.

- 나도 더욱 더 효과적인 방법들이 있을거라 생각한다. 리팩토링은 언제나 끝이 없으니까 ㅎㅎ...

## 마무리

- 사실 상 질문의 대한 형태가 많은 변화가 없고 양수가 적다면 프론트단에서 하드 코딩하는것도 나쁘지 않은 거 같다. 나는 기업자체에서 하는 서비스라 언제 변화가 있을지 모르기에 질문, 응답형태, 점수 등을 DB에 저장해 나중에 유지보수성을 위해서 이렇게 로직을 짠 거고 어떤 서비스를 하냐에 따라 본인이 잘 선택하면 될 거 같다.
- 오늘은 설문평가의 질문 리스트 추출, 답변 dto 가공 후 Client 에 데이터를 전송해주는 과정까지 봤다. 다음 페이지에서는 이 데이터를 갖고 사용자 화면에 어떻게 보여지는지 다룰 생각이다!
- 피드백은 항상 큰 도움이 됩니다! 포스팅을 보고 피드백 할 게 있다면 부탁드립니다!

<br>

[sunghomong 의 깃 허브](https://github.com/sunghomong) <br>
[sunghomong 의 블로그](https://sunghomong.github.io/)_
