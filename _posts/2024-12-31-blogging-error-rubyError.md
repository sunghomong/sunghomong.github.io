---
title: Jekyll Chirpy 블로그 실행 중 build 에러 (CommandNotFoundException)
date: 2024-12-18 12:00:00 +0800
categories: [ Blogging,error ]
tags: [ ruby,error,trouble shooting,git ]
image: /assets/img/post_images/error_images/error03.png
---

## ⛔ 문제 상황

```shell
> bundle exec jekyll build
> bundle : 'bundle' 용어가 cmdlet, 함수, 스크립트 파일 또는 실행할 수 있는 프로그램 이름으로 인식되지 않습니다. 이름이 정확한지 확인하고 경로가 포함된 경우 경로가 올바른지 검증한 다음 다시 시도하십시오.
  위치 줄:1 문자:1
  + vim Gemfile
  + ~~~
      + CategoryInfo          : ObjectNotFound: (vim:String) [], CommandNotFoundException
      + FullyQualifiedErrorId : CommandNotFoundException
```

- 컴퓨터 포멧 후 새롭게 프로젝트 clone 후 jekyll 실행 중 해당 에러가 발생했다.
- bundle 용어를 찾지 못함.

## 🧐 문제 원인

간단한 문제이다. 명령어가 실행이 안된다면 당연히 해당 프로그램 설치가 정상적으로 안된것이다.

- ruby 미설치

## ⛔문제 해결

문제 해결방법은 따로 포스팅을 해서 준비했다. 아래의 글을 참고해보고 실행해보면 될 것 같다.

[ruby 다운로드 방법 및 실행 과정](https://sunghomong.github.io/posts/library-ruby-download/)

설치와 실행을 완료하고 아래와 같이 실행해보았다.

```shell
bundle install
```

- gemfile read 후 의존성 gem 설치 -> gemfile 수정 내용이 있을때나 초기 설정때 사용

```shell
bundle exec jekyll build
```

- jekyll 실행

```shell
bundle exec jekyll serve
```

- 서버 열기

<img src="/assets/img/post_images/error_images/error03.png" alt="error03">

- blog 서버 열렸는지 확인

## 마무리

- 컴퓨터 교체 후 새롭게 환경 세팅을 하는 과정 중에 생긴 trouble shooting 이다.
- 매번 느끼는건데 환경 세팅할때마다 구글링을 하는일이 생겨 이렇게 정리를 해보았다. 다음번엔 내 글 보고 세팅해야지...


[sunghomong 의 깃 허브](https://github.com/sunghomong) <br>
[sunghomong 의 블로그](https://sunghomong.github.io/)
