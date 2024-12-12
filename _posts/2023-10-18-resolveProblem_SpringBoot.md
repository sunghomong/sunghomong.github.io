---
title: (SpringBoot) DispatcherServlet 오류 문제 해결 
date: 2023-10-18 16:00:00 +0800
categories: [문제 해결 능력,SpringBoot_resolveProblem]
tags: [resolveProblem,SpringBoot]
---

# DispatcherServlet 오류 문제 해결 

## nio-(host)-exec-1 o.a.c.c.C.Tomcat.localhost./ : Initializing Spring DispatcherServlet 'dispatcherServlet' 오류

프로젝트 하는 도중 404 SpringBoot의 기본적인 메핑 문제에 계속 시달렸다... 나중에 또 이런 문제를 방지하기 위해서 기록을 해보려고 한다.
<br>

<img src="/assets/img/post_images/resolveProblem/resolveProblem1.png" alt="resolveProblem1">

<img src="/assets/img/post_images/resolveProblem/resolveProblem2.png" alt="resolveProblem2">

코드상에는 문제가 없어 실행을 해보았다.

<br>

<img src="/assets/img/post_images/resolveProblem/resolveProblem3.png" alt="resolveProblem3">

아니다 다를까 바로 에러 발생... ㅎ

<img src="/assets/img/post_images/resolveProblem/resolveProblem4.png" alt="resolveProblem4">

```shell
nio-8085-exec-1 o.a.c.c.C.Tomcat.localhost./ : Initializing Spring DispatcherServlet 'dispatcherServlet'
```

이게 도대체 뭘까... 처음에 그래서 코드를 계속해서 어디가 문제일까 찾게 되고 인터넷도 계속해서 검색해봤다 메핑의 문제라는데...

## 문제 해결

```java
@Controller
@RequestMapping("menager") // 클레스 레벨 멥핑 (menager (X)) -> (manager (O))
public class ManagerController {

    @GetMapping("/")
      public String createForm() {
          return "main";
      }
    @GetMapping("/update")
      public String updateForm() { // 클래스 멥핑의 예시를 위한 메서드
        return "updateForm";
      }
}
```

<br>

- 고민한 내가 너무 멍청해지는 오류였다...
- 클래스 레벨 맵핑의 URL에 오타를 쳤고 잘못 설정했다...
- 클래스 레벨 맵핑의 이해도가 부족했던거 같다.
  - 클래스 레벨 맵핑 : 
공통적인  부분을 클래스 단위로 RequestMapping 해 주고, 각 메서드 마다 Mapping을 한번 더 해준다면 URL은 클래스 - 메서드 순으로 읽혀지게 된다.
  - 즉, 위의 updateForm 메서드의 URL은 **/menager** ***/update*** 가 된다.


## 마무리

- 앞으로 매핑의 오류를 볼때 오타, URL 경로를 잘 살펴야될 것 같다.
<br><br>

[sunghomong 의 깃 허브](https://github.com/sunghomong) <br>
[sunghomong 의 블로그](https://sunghomong.github.io/)
