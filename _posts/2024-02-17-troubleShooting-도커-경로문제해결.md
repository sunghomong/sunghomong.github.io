---
title: Error Unable to access jarfile (Docker ENTRYPOINT 오류 해결)
author: sunghomong
date: 2024-02-17 14:00:00 +0800
categories: [trouble shooting,Docker]
tags: [trouble shooting,Dockerfile,Docker,Error]
tok: true
---
## ⛔ 문제 상황

기존에 작업했던 spring boot 프로젝트를 배포하는 과정 중 오류가 발생했다.

```Dockerfile
FROM eclipse-temurin:11-jdk-alpine
VOLUME /tmp
EXPOSE 8080
COPY ./build/libs/*.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]
```

```shell
Error: Unable to access jarfile
```

위의 코드는 build과정중 문제가 발생한 토커파일과 오류 코드이다.<br>
2시간을 이 코드와 함께 싸움을 했다... Dockerfile 수정을 여러번 했다...<br>
chatGPT와 아무리 얘기를 해도 말이 통하지 않아 차근차근 하나씩 보면서 수정을 해봤다.<br>

## 🧐 문제 원인

문제의 원인을 찾는데 이분의 글이 도움이 됐다. <br>
[Dockerfile Entrypoint 와 CMD의 올바른 사용 방법](https://bluese05.tistory.com/77)

해당 글 내용과 같이 나의 문제는 아래와 같았다.

- build 과정중 app.jar를 찾을 수 없음.

<br>

## ⛔문제 해결

### gradle project jar 파일 확인

<img src="https://i.ibb.co/GVx1gR4/2024-02-17-173212.png">

- 만약 본인이 spring boot 프로젝트를 사용중이라면 build의 libs에 생성된 jar 파일이 있을것이다. 그 파일의 명을 확인해서 ENTRYPOINT에 적용시켜주면 된다.

### Dockerfile 수정

```Dockerfile
FROM eclipse-temurin:11-jdk-alpine
VOLUME /tmp
EXPOSE 8080
COPY ./build/libs/*.jar /app/
ENTRYPOINT ["java","-jar","/app/본인 jar 파일명.jar"]
```

- 위와 같이 본인의 jar 이름을 복사해서 넣어주면 된다.

### 수정 후 build 해보기

<img src="https://i.ibb.co/9HMHKR1/2024-02-17-173647.png">

- 수정을 완료하고 저와 같이 스프링 부트를 사용했다면 이렇게 Docker 컨테이너가 정상적으로 작동하는것을 확인 가능하다.


## 마무리

오늘은 배포 과정중 오류 코드에 대한 글을 올려보았다. 아직까지 Dockerfile의 명령어들의 숙지가 필요한것을 느꼈다.

<br>

[sunghomong 의 깃 허브](https://github.com/sunghomong) <br>
[sunghomong 의 블로그](https://sunghomong.github.io/)