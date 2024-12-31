---
title: ruby 다운로드 방법 및 실행 과정
date: 2024-12-30 12:00:00 +0800
categories: [ Blogging,error ]
tags: [ ruby,error,trouble shooting,git ]
image: /assets/img/post_images/library/ruby01.png
---

# Ruby 다운로드 및 실행

안녕하세요.

이번 글은 window 용 루비 다운로드 및 실행 방법을 설명하려고 합니다.

> 루비란 무엇일까? -> Ruby는 프론트엔드 및 백엔드 웹 개발 및 기타 유사한 애플리케이션을 위해 설계된 스크립팅 언어다. 이 언어는 강력하고 동적으로 입력된 객체 지향 언어이며, 높은 수준의 구문을 사용하여 프로그래밍을 영어 코딩과 거의 비슷하게 만듭니다. {: .prompt-info }

## 1. ruby 설치 파일 다운로드

[window 설치용 ruby](https://rubyinstaller.org/)

<img src="/assets/img/post_images/library/ruby01.png" alt="ruby01.png">

- 자신의 프로젝트 버전에 맞게 설치
- exe 파일 설치가 완료된 후, 실행한다.

## 2. Ruby 설치 환경설정

exe 파일 설피가 완료된 후, 실행하면 아래의 순서대로 진행하면 된다.

<img src="/assets/img/post_images/library/ruby02.png" alt="ruby02.png">

- 동의 후 다음 버튼

<img src="/assets/img/post_images/library/ruby03.png" alt="ruby03.png">

- default 로 설정 후 install

<img src="/assets/img/post_images/library/ruby04.png" alt="ruby04.png">

- 설치 진행

<img src="/assets/img/post_images/library/ruby05.png" alt="ruby05.png">

- 설치 완료 버튼 클릭

<img src="/assets/img/post_images/library/ruby06.png" alt="ruby06.png">

- `enter` 버튼으로 계속 진행 config 과정

<img src="/assets/img/post_images/library/ruby07.png" alt="ruby07.png">

- 설치 완료!!

## 3. Ruby 실행

정상적으로 다운을 완료했다면 아래와 같이 테스트가 가능하다.(jekyll 실행 예제)

<img src="/assets/img/post_images/library/ruby08.png" alt="ruby08.png">

- window 키 클릭후 ruby 검색 후 `start command prompt with ruby` ruby cmd 창 실행

```Start Command Prompt with Ruby
ruby -version
```

- 버전 확인

```Start Command Prompt with Ruby
gem install jekyll bundle
```

- jekyll bundle 다운

<img src="/assets/img/post_images/library/ruby09.png" alt="ruby09.png">

