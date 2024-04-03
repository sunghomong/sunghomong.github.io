---
title: (TIL_Spring) 스프링을 이용한 설문조사 기능 구현
author: sunghomong
date: 2023-09-20 12:34:00 +0800
categories: [TIL,TIL_Spring]
tags: [TIL,Daily,Spring,]
comments: true
---

# 스프링을 이용한 설문조사 기능 구현

Today I learned 를 처음 시작하는 날이네요<br>
공부하는 날마다 습득한 내용들을 기록해볼 생각입니다.<br>
다소 부족할 수 있는점 양해 부탁드려요 ㅎㅎ...<br>
일단 개인별로 공부 방법이 다르기에 참고용으로만 봐주시면 감사하겠습니다!<br>
오늘은 spring mvc 패턴을 이용한 설문조사 기능을 구현에 대해서 알아보자!<br>
일단 글 읽기전 여기 [오픈소스](https://github.com/sunghomong/TIL/tree/master/Spring/ex00)를 통해서 자료를 참고하시면 좋을 거 같아요! <br><br>
<br><br>


## 스프링을 이용한 설문조사 기능 구현해보기 <br><br>

### URL을 통한 경로 이동
<br>

```java
<body>
	<h2>안녕하세요</h2>
	<p> <a href="<c:url value= '/register/step1'/>">[회원가입하기]</a> </p>
	<p> <a href="<c:url value= '/survey'/>">[설문조사]</a> </p>
</body>
```
<br>
일단 a 태그로 경로 설문조사로 가는 경로 이동을 만들어보자<br>
스프링을 공부하는 중이라면 보통 서블릿을 공부한 후 넘어오는 경우가 많다.<br>
서블릿과 JSP를 공부했다면 경로 이동의 방법이 request,redirect등을 생각할 것이다.<br>
스프링의 경로 이동 방법은 다른듯 하다!!<br><br>

### 경로 이동시 컨트롤 해줄 클래스 생성
<br>

```java
@Controller 		// @Controller => HTML, JSP응답
@RequestMapping("/survey")
public class SurveyController {
  @GetMapping
	public String form() {
		return "survey/surveyForm";
	}
	
	@PostMapping
	public String submit(AnsweredData data) {
		return "survey/submitted";
	}
}
```
<br>

- @RequestMapping <br>
  간단하게 RequestMapping의 정의를 간단하게 보면 이렇다.<br>
  우리는 특정 uri로 요청을 보내면 Controller에서 어떠한 방식으로 처리할지 정의를 한다.<br>
  이때 들어온 요청을 특정 메서드와 매핑하기 위해 사용하는 것이 @RequestMapping이다.<br>
  [RequestMapping](https://mungto.tistory.com/436) 이분 포스트가 도움이 많이 됐다.

이 스프링의 기능을 활용해 저 위의 a태그를 클릭하면 **survey/surveyForm** 경로로 이동하게 된다.
<br>

### 컨트롤 기능 사용을 위한 빈 생성
<br>

```xml
<bean id="surveyController" class="spring.controller.SurveyController"/>
```
아이디는 자신이 원하는 명을 사용해도 괜찮을 거 같다.
<br>
<br>

### 매핑에 대응되는 jsp 생성 : surveyForm.js
<br>

```html
<h2>설문 조사</h2>
<form method="POST">
	<p>
		1. 당신의 역할은? <br>
		<label> <input type="radio" name="responses[0]" value="서버"> 백엔드 개발자 </label>
		<label> <input type="radio" name="responses[0]" value="프론트"> 프론트 개발자 </label>
		<label> <input type="radio" name="responses[0]" value="풀스택"> 풀스택 개발자 </label>
		
		<select name= "responses[0]">
			<option value = "백엔드">백엔드 개발자</option>
			<option value = "프론트">프론트 개발자</option>
			<option value = "풀스택">풀스택 개발자</option>
		</select>
		
		<form:select path="responses[0]" items="옵션몰고"/>
	</p>
	<p>
		2. 가장 많이 사용하는 개발도구는? <br>
		<label> <input type="radio" name="responses[1]" value="Eclipse"> Eclipse </label>
		<label> <input type="radio" name="responses[1]" value="IntelliJ"> IntelliJ </label>
		<label> <input type="radio" name="responses[1]" value="NetBeans"> NetBeans </label>
	</p>
	<p>
		3. 하고싶은 말? <br>
		<input type="text" name="responses[2]">
	</p>
</form>
```
<br>

### 매핑에 대응되는 jsp 생성 : submitted.js
<br>

```html
<h2>응답 내용</h2>
<ul>
	<c:forEach var="response" items="${answeredData.responses}" varStatus="s">
		<li> ${s.index+1} 번 문항의 답변 : ${response} </li>
	</c:forEach>
</ul>
<p>응답자 사는 지역 : ${answeredData.respondent.location}</p>
<p>응답자 나이 : ${answeredData.respondent.age}</p>
```
<br>
해당 JSP들은 자신이 원하는 느낌으로 바꾸면 될 거 같다!!
<br><br>

### Model을 통해 컨트롤러에서 뷰에 데이터 전달하기
<br>

#### Question.java
```java
public class Question {
	
	private String title; // 질문
	private List<String> option; // 선택답안

	public Question(String title, List<String> option) {
		this.title = title;
		this.option = option;
	}
	
	public Question(String title) {
		this.title = title;
	}
	
	public String getTitle(){
		return title;
	}

	public List<String> getOption() {
		return option;
	}

	public boolean isChoice() { // 옵션값이 있다면 (선택답안이 있다면)
		return option != null && !option.isEmpty();
	}
}
```

#### ServeyController.java 에 설문 문제를 만들기위한 메서드 추가

```java
private List<Question> createQuestion() { // 설문 문제를 만들기위한 메서드
	Question q1 = new Question("당신의 역할은 무엇입니까?", Arrays.asList("백엔드","프론트","풀스택"));
	Question q2 = new Question("많이 사용하는 개발 도구는 무엇입니까?", Arrays.asList("Eclipse","IntelliJ","NetBeans"));
	Question q3 = new Question("하고 싶은 말을 적어 주세요");
	
	return Arrays.asList(q1,q2,q3);
}
@GetMapping
public String form(Model model) { // 설문조사 폼페이지로 이동
	// 질문지 생성
	List<Question> questions = createQuestion();
	// 질문지를 폼페이지로 넘겨주어야 함 => Model
	model.addAttribute("questions",questions);
	// 컨트롤러에서 JSP로 데이터를 보낼때 Model객체를 사용한다.
	
	return "survey/surveyForm";
}
```
<br>

- model.addAttribute("questions",questions)<br>
  전에 서블릿 파트에서는 request.setAttribute("questions",questions) 이런 형태로 보내주는 방식이였다. 하지만 스프링에서는 이와 같이 데이터를 보내줄 때 model객체를 사용한다.<br><br>
- 위의 메서드 기능 설명<br>
  위의 두 메서드는 surveyForm.js 설문지 페이지를 더욱더 간단하게 만들기 위한 기능이다.<br>
	위의 jsp 페이지 같은 경우에는 하나하나 작성하는 방식이지만 이의 스프링 기능을 통해 짧고 간결한 코드를 생성 가능하다.

<br>

#### surveyForm.jsp 변경

```html
<form>
	<c:forEach var="q" items="${questions}" varStatus="s">
		<p>
			${s.index+1}. ${q.title} <br>
			<c:if test="${q.choice}">
				<!-- 선택지 있다면 -->
				<c:forEach var="option" items="${q.option}" varStatus="">
					<label> <input type="radio" name="responses[${s.index}]"
						value="${option}">${option}</label>
				</c:forEach>
			</c:if>
			<c:if test="${!q.choice}">
				<!-- 선택지 없다면 -->
				<input type="text" name="responses[${s.index}]">
			</c:if>
		</p>
	</c:forEach>

	<p>
		<label> 사는 곳 : <input type="text" name="respondent.location">
		</label>
	</p>
	<p>
		<label> 나이 : <input type="number" name="respondent.age">
		</label>
	</p>
	<button type="submit">전송</button>
</form>
```

<br>

- JSTL을 활용한 설문지 페이지<br>
	기존의 **surveyForm.jsp** 보다 더욱더 간결해진걸 확인 할 수 있다.<br>
	이처럼 JSTL을 이용해서 조건을 걸고 반복적으로 자기가 원하는 질문들을 뽑아낼 수 있고 유용하게 사용이 가능할 거 같다.<br><br>
- 모두 수정이 완료 됐다면 한번 실행해보자!!<br>
  
<br>

### 마무리

하하하... 아무래도 첫 포스팅이다보니 제가 봐도 부족한 점들이 많은 거 같네요 ㅎㅎ...<br>
앞으로 습득한 내용을 어떻게 더 좋게 배포할 수 있을지 생각해 봐야 될 거 같아요!!<br>
혹시나 오류나 기타사항 있으면 언제든 피드백 주세요!!<br>
글 읽어주셔서 감사합니다!

