---
title: (TIL_Spring) 스프링을 이용한 로그인 기능 만들어보기
author: sunghomong
date: 2023-09-20 18:00:00 +0800
categories: [TIL,TIL_Spring]
tags: [TIL,Daily,Spring,loginService]
---

# 스프링을 이용한 로그인 기능 만들기
<br>
오늘은 스프링을 이용한 로그인, 비밀번호 변경 기능에 대한 수업을 들었다.<br>
배운것에 대한 정리를 해볼려고한다.<br>
글을 읽기전 [참고 파일](https://github.com/sunghomong/TIL/tree/master/Spring/ex00)을 참고해주시면 좋을 거 같아요!

#### 로그인 기능 처리를 위한 코드 준비

- [vo](#vo)
  + AuthInfo
  + LoginCommand
- [service](#service)
  + AuthService
- [validator](#validator)
  + LoginCommandValidator
- [controllor](#controllor)
  + LoginController
- [jsp](#jsp)
  + loginForm
  + loginSuccess
- [Properties](#properties)
- [xml](#xml)

## VO

#### AuthInfo.java
```java
@AllArgsConstructor
@Getter
public class AuthInfo {
	// 로그인 성공후 세션에 로그인 정보를 저장할 목적
	
	private Long id;
	private String email;
	private String name;
}
```

- @AllArgsConstructor<br>
  Lombok의 하나의 기능이다. <br>
  클래스의 모든 필드에 대한 생성자를 자동으로 생성해주는 어노테이션<br>
  **주의 사항 : 생성자의 Parameter의 순서는 클래스 내부에서 선언된 field의 순서로 매칭 된다.**

#### LoginCommand.java
```java
@Data
public class LoginCommand {
	// 커맨드객체 : 클라이언트에서 서버로 보낼 때 데이터를 묶기 위한 클래스
	//		-> 기본 생성자만을 사용해야 함
	
	private String email;
	private String password;
	private boolean rememberEmail; // 쿠키를 위한 필드
}
```

- @Data <br>
  @Getter, @Setter, @RequiredArgsConstructor, @ToString, @EqualsAndHashCode를 <br> 한꺼번에 설정해주는 종합 선물 세트같은 어노테이션이다.<br>
  매우 유용한 기능인 것 같다.

<br><br>
위의 VO 객체들은 로그인 서비스에 필요한 기본 생성자들을 만드는 클래스들이다.
<br><br>

## service

#### AuthService.java

```java
@Service
public class AuthService {
	
	@Autowired
	private MemberDao memberDao;
	
	// 로그인 인증을 처리하기 위한 메서드
	public AuthInfo authenticate(String email, String password) {
		Member member = memberDao.selectByEmail(email);
		
		if(member == null) { // 회원이 없는 경우
			throw new IdPasswordNotMatchingException();
		}
		
		if(!member.getPassword().equals(password)) { // 비밀번호가 일치하지 않는 경우
			throw new IdPasswordNotMatchingException();
		}
		
		return new AuthInfo(member.getId(), member.getEmail(), member.getName());
	}
}
```

- @Autowired<br>
  필요한 의존 객체의 **타입**에 해당하는 빈을 찾아 주입한다.
- 위 기능에 대한 설명<br>
  + public AuthInfo authenticate(String email, String password)<br>
    email과 password를 받아오는 기능
  + Member member = memberDao.selectByEmail(email)<br>
    email을 통해 해당 email에 속하는 그 사람의 정보를 불러온다.


## validator

#### LoginCommandValidator.java

```java
public class LoginCommandValidator implements Validator{
	// 로그인시 입력한 이메일과 비밀번호 검증
	
	@Override
	public boolean supports(Class<?> clazz) {
		return LoginCommand.class.isAssignableFrom(clazz);
	}

	@Override
	public void validate(Object target, Errors errors) {
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "email", "required");
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "password", "required");
	}
}
```

- Validator<br>
  일단 Validator를 적용하기 위해서는 dependency를 pom.xml에 추가해야 한다.<br>
  검증하기 위한 인터페이스라고 한다.<br>
- public boolean supports(Class<?> clazz) <br>
  어떤 타입의 객체를 검증할 때 이 객체의 클래스가 이 Validator가 검증할 수 있는<br>클래스인 지를 판단하는 매서드
- public void validate(Object target, Errors errors)<br>
  실제 검증 로직이 이루어지는 메서드, 구현할 때 ValidationUtils를 사용하여 편리하게 작성 가능하다.
- class.isAssignableFrom(clazz)<br>
  특정 class가 어떤 클래스/인터페이스를 상속/구현했는지 체크

## controllor

#### LoginController.java

```java
@Controller
@RequestMapping("/login")
public class LoginController {
	
	@Autowired
	private AuthService authService;

  @GetMapping
	public String form(Model model){
    model.addAttribute("loginCommand",new loginCommand());
		return "login/loginForm";
  }
}
```

- 위 기능에 대한 설명<br>
  + private AuthService authService<br>
    서비스 기능 생성자 자동 생성
  + 모델 생성후 필요한 정보 전달

#### LoginController.java 기능 추가

```java
@PostMapping
public String submit(LoginCommand loginCommand , HttpSession session,Errorserror , HttpServletResponse response) {
	
	// 1. 이메일, 비밀번호가 입력되었는지 체크
	new LoginCommandValidator().validate(loginCommand, error);
	
	if(error.hasErrors()) {
		return "login/loginForm";
	}
	
	// 2. 이메일, 비밀번호 인증을 처리
	try {
		AuthInfo authInfo = authService.authenticate(loginCommand.getEmail(), loginCommand.getPassword());
		
		// 로그인 성공시 처리할 코드 => 세션
		session.setAttribute("authInfo", authInfo);
		
		// 로그인 성공시 이메일 저장용 쿠키 생성
		Cookie rememberCookie = new Cookie("rememberEmail",loginCommand.getEmail());
		
		if(loginCommand.isRememberEmail()) {
			rememberCookie.setMaxAge(60*60*24*365);
		}else {
			rememberCookie.setMaxAge(0);
		}
		
		// 쿠키를 클라이언트에게 저장
		response.addCookie(rememberCookie);
		
		return "login/loginSuccess";
	} catch (IdPasswordNotMatchingException e) {
		// 이메일이 없거나, 비밀번호가 틀린경우
		error.reject("idPasswordNotMatching"); // 전역 에러코드
		return "login/loginForm";
	}
}
```

## jsp

#### loginForm.jsp

```html
<%@ taglib prefix ="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix ="spring" uri="http://www.springframework.org/tags" %>
<!-- 스프링 기능을 활용하기 위한 태그 라이브러리 -->

<form:form modelAttribute="loginCommand">
	<form:errors element="div"/> <!-- 전역 에러 -->
		<p>
			<label>
				<spring:message code="email"/> : <br>
				<form:input path="email"/>
				<form:errors path="email"/>
			</label>
		</p>
		<p>
			<label>
				<spring:message code="password"/> : <br>
				<form:password path="password"/>
				<form:errors path="password"/>
			</label>
		</p>
		<p>
			<label>
				<form:checkbox path="rememberEmail"/>
				<spring:message code="rememberEmail"/>
			</label>
		</p>
	<button type="submit"> <spring:message code="login.btn"/> </button>		
</form:form>
```

- 로그인을 위한 폼 생성<br>
  메인 화면에서 로그인 a태그 버튼을 누르면 해당 페이지로 이동<br>
  각각의 input ,password등 필요한 정보 서버에 전달

#### loginSuccess.jsp

```html
<title> <spring:message code="login.title"/> </title>
</head>
<body>
	<p>
		<spring:message code="login.done"/>
	</p>
	<p> <a href="<c:url value= '/main'/>">[<spring:message code="go.main"/>]</a> </p>
</body>
```

- 로그인 성공시 이동하는 페이지 생성<br>
  
## Properties

#### label.properties에 메시지 추가

```txt
# 로그인
login.title=로그인
login.btn=로그인하기
login.done=로그인 성공
rememberEmail=이메일 기억하기

# 로그인 에러코드
idPasswordNotMatching=아이디 또는 비밀번호가 일치하지 않습니다.
```

## XML

#### spring-member.xml 추가

```xml
<!-- 지정된 패키지에 필요한 모든 클래스를 빈으로 읽어들이는 기능 -->
<context:component-scan base-package="spring.controller"/>
<context:component-scan base-package="spring.service"/>
```

