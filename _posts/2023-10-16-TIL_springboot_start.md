---
title: (TIL_SpringBoot) 스프링 부트를 이용한 Hello World 출력해보기! 
date: 2023-10-16 15:00:00 +0800
categories: [TIL,TIL_SpringBoot]
tags: [TIL,Daily,SpringBoot]
---

# 스프링 부트를 이용한 "Hello World" 출력하기
<br>

프로젝트를 들어가면서 스프링 부트에 대해 공부하게 됐다.<br>
[김영한 강사](https://www.youtube.com/@yhdev)님의 강의 자료를 참고하여 공부를 시작했다.<br>
오늘은 스프링 부트를 활용하여 제일 기초 단계인 "Hello World"를 출력해보려고 한다!

## Spring Initializr를 통해 빠르게 시작하기

https://start.spring.io/ 에 들어가서 Spring Initializr를 통해 필요한 라이브러리를 zip으로 다운을 받아서 실행 시켜줬다.

#### project
- Gradle - Groovy
  
#### Language
- JAVA (11버전)
  
#### Spring Boot
- 2.7.16 (이 부분은 자바의 버전에 따라 다르게 설정하셔야 됩니다.)

#### Dependencies
- Spring Web
- Thymeleaf 
<br><br>
  
---
<br>

- 위와 같이 라이브러리들을 다운 받고 실행 시켜주면 스프링 부트를 사용하기 위한 준비가 다 끝났다.

## static or templates

- 폴더 중 src/main/resources에 보면 static 과 templates가 보일 것이다.
  <img src="https://i.ibb.co/H77Vpr5/image-2.png" alt="image-2">
- templates : 스프링이 계속 버전이 올라가면서 view 엔진이 JSP 대신 thymeleaf로 바뀌었습니다.templates폴더는 thymeleaf의 파일들을 두는 곳입니다.
- static : content들을 두는 곳입니다. 보통 css나 js를 두곤합니다./static 을 이용해서 웹에서 호출할 수도 있습니다.

## static에 "Hello World" index 페이지 생성

- 일단 정적인 페이지 static에 Hello World를 출력해보자.
  
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <title>hello</title>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
</head>
<body>
Hello World!!
</body>
</html>
```

## 서버 실행

- 페이지를 만들었다면 서버를 실행 시켜서 정상적으로 나오는지 확인해보자!
- 아래의 이미지와 같이 HelloSpringApplication 우클릭 후 서버를 run 해주면 필요한 라이브러르들을 자동으로 다운 받고 서버가 실행될 것 이다.
<img src="https://i.ibb.co/Pt6HQ48/image.png" alt="image" border="0">
- 이후 서버가 정상적으로 열린다면 localhost:8080(당신이 설정한 호스트 주소)를 검색창에 검색한다면 정상적으로 ``Hello World``가 출력될 것이다.

## 마무리

- 너무나도 유명한 Hello World 출력하기를 해보았다!!
- spring boot는 처음이지만 기존에 사용했던 spring 보다 더욱더 편하고 유용한 기능들이 많은 것 같다. 중간중간 여러가지 기능을 구현해보면서 기록을 남겨볼 생각이다.

<br><br>

[sunghomong 의 깃 허브](https://github.com/sunghomong) <br>
[sunghomong 의 블로그](https://sunghomong.github.io/)
