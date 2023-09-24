---
title: (TIL_Spring) 스프링을 이용한 비밀번호 변경 기능 만들어보기
author: sunghomong
date: 2023-09-24 22:00:00 +0800
categories: [TIL,TIL_Spring]
tags: [TIL,Daily,Spring,loginService]
---

# 스프링을 이용한 비밀번호 변경 기능 만들어보기
<br>

오늘은 스프링을 이용한 비밀번호 변경 기능에 대해서 알아보자!!<br>
변경 기능에 깊숙히 들어가기 전 여기 [링크](https://github.com/sunghomong/TIL/tree/master/Spring/ex08) 를 참고하시면 하시면 좋을 거 같습니다.<br><br>
일단 변경 기능에 대한 메서드들을 살펴보자!

#### 로그인 변경 기능에 필요한 준비

- vo
  + ChangePwdCommand
- service
  + ChangePasswordService
- validator
  + ChangePwdCommandValidator
- controllor
  + ChangePwdController
- jsp
  + changePwdForm
  + changedPwd
- Properties
- xml

## VO

#### ChangePwdCommand.java

```java
@Data
public class ChangePwdCommand {
	
	private String currentPassword;
	private String newPassword;
}
```

- lombok을 이용한 get,set 자동 생성


## service

#### ChangePasswordService.java

```java
@Service
public class ChangePasswordService { // 비밀번호 변경 기능
	
	@Autowired
	private MemberDao dao; // = new MemberDao();
	
	// Setter메서드를 통한 주입 
	public void setDao(MemberDao dao) {
		this.dao = dao;
	}

	@Transactional
	public void changePassword(String email, String oldPassword, String newPassword) { // 논리적인 작업
		
		Member member = dao.selectByEmail(email);
		
		if(member == null) {
			throw new MemberNotFoundException();
		}
		
		member.changePassword(oldPassword, newPassword);
		
		dao.update(member);
	}
}
```

- @Service<br>
  스프링에 서비스 레이어 클래스임을 알려줌
- @Transactional<br>
  데이터베이스 관리 시스템 또는 유사한 시스템에서 상호작용의 단위이다. 여기서 유사한 시스템이란 트랜잭션이 성공과 실패가 분명하고 상호 독립적이며, 일관되고 믿을 수 있는 시스템을 의미한다. 데이터의 정합성을 보장하기 위해 고안된 방법이다. (쉽게 이해하면 데이터에 전달되기까지 예외들을 체크하고 그에 통과한 값들을 보내주고 아니면 롤백해주는 하나의 기능이라 생각하면 될 거 같다)
- 위 메서드 기능에 대한 설명 <br>
  이메일을 받아와서 데이터에서 꺼낼려고 했을때 데이터를 못가져 오는 경우 오류 처리를 해주고 그게 아니고 받아온 이메일에 해당하는 멤버가 있으면 기존 비밀번호를 받아온 새로운 비밀번호로 바꿔주는 역할을 해준다. 

## validator

#### ChangePwdCommandValidator.java

```java
public class ChangePwdCommandValidator implements Validator{

	@Override
	public boolean supports(Class<?> clazz) {

		return ChangePwdCommand.class.isAssignableFrom(clazz);
	}

	@Override
	public void validate(Object target, Errors errors) {

		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "currentPassword", "required");
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "newPassword", "required");	
	}	
}
```

- validator에 대한 설명은 이전 [자료](https://sunghomong.github.io/posts/TIL-spring-form/)를 참고해주세요
- 위 기능에 대한 설명<br>
  **validator**를 통해 기존의 비밀번호와 새로운 비밀번호의 입력이 올바른지 검증하는 단계

## controllor

#### ChangePwdController.java

```java
@Controller
@RequestMapping("edit/changePassword")
public class ChangePwdController {
	
	@Autowired
	private ChangePasswordService changePasswordService;
	
	@GetMapping
	public String form(Model model) {
		model.addAttribute("changePwdCommand", new ChangePwdCommand());
		
		return "edit/changePwdForm";
	}
	
	@PostMapping
	public String submmited(ChangePwdCommand changePwdCommand, Errors error, HttpSession session) {
		// 1. 검증
		new ChangePwdCommandValidator().validate(changePwdCommand, error);
		
		if(error.hasErrors()) {
			return "edit/changePwdForm";
		}
		
		// 2. 이메일정보를 알아오기 위해 세션에 저장된 로그인 정보를 알아오기
		AuthInfo authInfo = (AuthInfo) session.getAttribute("authInfo");
		
		try {
			
			changePasswordService.changePassword(authInfo.getEmail(), changePwdCommand.getCurrentPassword() , changePwdCommand.getNewPassword());
			
			return "edit/ChangedPwd";
		} catch (IdPasswordNotMatchingException e) {
			// 입력한 기존의 비밀번호와 저장된 비밀번호가 다른 경우
			error.rejectValue("currentPassword", "notMatching");
			
			return "edit/changePwdForm";
		}
	}
}
```

- 우선 이 긴 코드의 기능을 알아보자 ㅎㅎ...
  + private ChangePasswordService changePasswordService<br>
    비밀번호 변경을 위한 서비스 생성
  + 검증<br>
    검증 단계를 통한 기존 비밀번호 및 새로운 비밀번호 검증
  + 정보 알아오기 <br>
    세션에 저장되어 있는 로그인 정보를 가져온 후 try catch를 통해 예외 처리를 잡아준다. 입력한 정보에 오류가 있을 경우 변경 페이지로 다시 이동, 입력한 정보에 오류가 없을 경우 변경후의 페이지로 이동

## jsp

#### edit/changePwdForm.jsp

```html
<title> <spring:message code="change.pwd.title"/> </title>
</head>
<body>
	<form:form modelAttribute="changePwdCommand">
		<p>
			<label> <spring:message code="currentPassword" /> : <form:password
					path="currentPassword" /> <form:errors path="currentPassword" />
			</label>
		</p>
		<p>
			<label> <spring:message code="newPassword" /> : <form:password
					path="newPassword" /> <form:errors path="newPassword" />
			</label>
		</p>
		<button type="submit">
			<spring:message code="change.pwd.btn" />
		</button>
	</form:form>
</body>
```

- 비밀번호 변경 페이지 생성
- modelAttribute<br>
  양식을 지원하는 모델 개체의 이름을 지정하는 키
- <form:errors /><br>
  에러 발생시 보여줄 메시지 생성


#### edit/changedPwd.jsp

```html
<title><spring:message code="change.pwd.title" /></title>
</head>
<body>
	<p>
		<spring:message code="change.pwd.done" />
	</p>
	<p>
		<a href="<c:url value= '/main'/>">[<spring:message code="go.main" />]
		</a>
	</p>
</body>
```

- 비밀번호 변경 완료 한 후 이동할 페이지 생성<br>
  a 태그 생성 메인 페이지로 이동 가능한 버튼 생성

## Properties

#### label.properties 추가

```txt
# 비밀번호 변경
change.pwd.title=비밀번호 변경
currentPassword=현재 비밀번호
newPassword=새 비밀번호
change.pwd.btn=변경하기
change.pwd.done=비밀번호를 변경했습니다.

# 비밀번호 변경 에러코드
notMatching.currentPassword=비밀번호를 잘못 입력했습니다.
```

- message에 전달해줄 메시지 내용들 추가
- <spring:message code="코드명" /> <br>
  코드명=[메시지 내용]

### 마무리

부족한 점이나 궁금 사항이 있으시면 언제든 코멘트 주시면 많은 도움이 됩니다 ㅎㅎ

[sunghomong의 깃 허브](https://github.com/sunghomong) <br>
[sunghomong의 블로그](https://sunghomong.github.io/)