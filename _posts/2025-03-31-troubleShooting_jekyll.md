---
title: "[gitHub action] ubuntu 24.04 runner fail...? setup ruby 과정 중 에러 발생"
date: 2025-03-31 12:00:00 +0800
categories: [trouble shooting,github action]
tags: [ github action,CI,CD,trouble shooting,ruby,ubuntu ]
image: /assets/img/post_images/error_images/error04.png
---

## ⛔ 문제 상황

gitHub action build 과정 중 아래와 같은 에러가 발생했다.

```shell
Run ruby/setup-ruby@55283cc23133118229fd3f97f9336ee23a179fcf
  with:
    ruby-version: 3.1
    bundler-cache: true
    cache-version: 0
Error: The current runner (ubuntu-24.04-x64) was detected as self-hosted because the platform does not match a GitHub-hosted runner image (or that image is deprecated and no longer supported).
In such a case, you should install Ruby in the $RUNNER_TOOL_CACHE yourself, for example using https://github.com/rbenv/ruby-build
You can take inspiration from this workflow for more details: https://github.com/ruby/ruby-builder/blob/master/.github/workflows/build.yml
$ ruby-build 3.1.4 /opt/hostedtoolcache/Ruby/3.1.4/x64
Once that completes successfully, mark it as complete with:
$ touch /opt/hostedtoolcache/Ruby/3.1.4/x64.complete
It is your responsibility to ensure installing Ruby like that is not done in parallel.
```

## 🧐 문제 원인

```yaml
- name: Setup Ruby
  uses: ruby/setup-ruby@55283cc23133118229fd3f97f9336ee23a179fcf # v1.146.0
  with:
    ruby-version: '3.1' # Not needed with a .ruby-version file
    bundler-cache: true # runs 'bundle install' and caches installed gems automatically
    cache-version: 0 
```

- 기존의 jekyll.yml 의 코드이다.
- [https://github.com/ruby/setup-ruby/issues/595](https://github.com/ruby/setup-ruby/issues/595) 이 분의 issue 가 비슷한 상황이라 글을 읽으며 많은 도움이 됐다.

### Self-hosted runner 감지 오류

- GitHub Actions 에서 ubuntu-24.04-x64 환경이 GitHub 제공 runner 가 아닌 self-hosted runner 로 감지됨.
- 이에 따라 `ruby/setup-ruby` 액션이 정상적으로 동작하지 않고, Ruby 를 수동으로 설치해야 하는 상황 발생.
- 즉 버전 문제

### ruby/setup-ruby 버전 문제

- ruby/setup-ruby@55283cc23133118229fd3f97f9336ee23a179fcf (특정 커밋 버전) 사용 시 self-hosted runner 감지 오류 발생. -> 해당 특정 커밋은 수시로 버전을 업데이트 쳐줘야함.
- 대신 `ruby/setup-ruby@v1` (버전 태그 사용)로 변경하면 정상적으로 실행됨.

### Ruby 및 Bundler 설치 문제

- `bundle install` 실행 시 Ruby 가 제대로 설치되지 않아 `bundle: command not found` 오류 발생 가능성 발견.
- `ruby -v` 명령을 추가하여 Ruby 가 정상적으로 설치되었는지 확인 후 `bundle install` 실행

## ⛔문제 해결


### 1. 특정 커밋 ID 에서 v1 태그로 변경

```yaml
- name: Setup Ruby
  uses: ruby/setup-ruby@v1
  with:
    ruby-version: '3.1'
    bundler-cache: true
```

### 2. Ruby 설치 확인을 위한 디버깅 추가

```yaml
- name: Check Ruby version
  run: ruby -v
```

### 3. 불필요한 캐시 옵션 제거 및 `bundle install` 실행

```yaml
- name: Install dependencies
  run: bundle install
```

### 4. merge 후 GitHub Actions 에서 정상적으로 작동하는지 확인

<img src="/assets/img/post_images/error_images/error05.png" alt="error05">

## 마무리

오늘은 CI/CD GitHub Actions 의 문제 해결한 사례를 정리 해보았다. 모든 문제에 있어서 디버깅 추가하는 것이 효과적이라는 것을 알게됐다.
CD/CD 문제는 단순 설정 오류일 가능성이 크기 때문에 다양한 문서를 토대로 확인하는 것이 중요할 거 같다.
앞으로 GitHub Actions 워크플로우를 설정할 때, self-hosted runner 감지 문제를 고려해야겠다고 느꼈다.

<br>

[sunghomong 의 깃 허브](https://github.com/sunghomong) <br>
[sunghomong 의 블로그](https://sunghomong.github.io/)
