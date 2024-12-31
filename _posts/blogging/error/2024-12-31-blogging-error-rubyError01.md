---
title: Jekyll Could not find gem wdm (wdm not found 에러)
date: 2024-12-24 12:00:00 +0800
categories: [ Blogging,error ]
tags: [ ruby,error,trouble shooting,git ]
image: /assets/img/logo_images/rubyError01.png
---

## ⛔ 문제 상황

```shell
> bundle exec jekyll build
> Could not find gem 'wdm (~> 0.1.1) mingw, x64_mingw, mswin' in locally installed gems.
  Run `bundle install` to install missing gems.
```

- 프로그램 재설치를 하고 ruby 설치 후 jekyll 실행 중 이러한 에러가 발생했다.

## 🧐 문제 원인

- devkit 이 없는 ruby 설치.
- wdm 잼이 설치 누락.
- 해당 프로젝트내에 gemfile wdm 버전 호환성 문제 (3.3.0 은 `wdm` 잼과 호환되지 않을 가능성이 높음.)

## ⛔문제 해결

- 알아본 결과 아래와 같은 방법들을 알아냈다.

### 1. wdm 잼 수동 설치

- `wdm` 잼 수동 설치 명령어 입력

```shell
gem install wdm
```

- 설치 성공 후 다음 명령을 통해 다시 실행

```shell
bundle install
```

### 2. DevKit 포함 한 ruby 재설치

- 해당 페이지로 이동 후 재설치 하면 된다.

[window 설치용 ruby](https://rubyinstaller.org/)

### 3. Bundler 업데이트

```shell
gem update --system
```

```shell
gem install bundler
```

```shell
bundle install
```

- 위와 같은 3가지 순으로 업데이트 처리를 해서 해결하는 방법도 있다.

### 4. Gemfile 수정

```Gemfile
# Gemfile에서 wdm 제거
# gem "wdm", "~> 0.1.1", platforms: [:mingw, :mswin, :x64_mingw]
```

### 5. ruby 버전에 맞게 재설치

[window 설치용 ruby](https://rubyinstaller.org/)

- 해당 페이지에서 버전에 맞게 재설치 하는 방법도 있다.


## 마무리

- `wdm` 잼 관련 오류에 대해 알아보았다. 
- 나는 버전 문제로 ruby 버전에 맞게 devkit 을 포함한 window 환경용 ruby 재설치를 통해 해결했다.


[sunghomong 의 깃 허브](https://github.com/sunghomong) <br>
[sunghomong 의 블로그](https://sunghomong.github.io/)
