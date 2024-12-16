---
title: Docker 배포 후 HTTP 500 오류 해결
date: 2024-02-19 22:00:00 +0800
categories: [trouble shooting,Docker]
tags: [trouble shooting,HTTP,Docker,Error,500Error]
image: /assets/img/logo_images/docker.png
---

## ⛔ 문제 상황

- 기존 spring boot 프로젝트를 Intelli J 에서 실행시키는데 문제가 없었는데 도커로 컨테이너를 활성화 해주니 문제가 발생

## 🧐 문제 원인

```html
<!-- 
  <a class="LinkOnClick_title__0WSZ9" th:if="${session.loginMember == null}" th:href="@{/login}">로그인</a> 
-->
<a class="LinkOnClick_title__0WSZ9" th:if="${session.loginMember == null}" th:href="@{login}">로그인</a>
```

- 위의 주석처리가 원래 기존에 Intelli J 에서는 문제가 없었던 코드이다.
- 문제의 원인은 경로 문제 -> 리눅스에서는 경로를 인식하지 못함.

## ⛔문제 해결

- 기존 프로젝트 모든 경로 메핑 변경...

## 마무리

경로를 인식하지 못하는 이유는 정확하게 파악하진 못하였지만,예상하기로는 로컬에서는 SpringBoot는 내장 톰캣으로 동작하는데, 배포 환경에서는 jar나 war 파일로 배포하여 서버를 띄우기 때문에 다르게 동작 하지 않을까라고 생각합니다.

<br>

[sunghomong 의 깃 허브](https://github.com/sunghomong) <br>
[sunghomong 의 블로그](https://sunghomong.github.io/)
