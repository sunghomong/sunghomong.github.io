---
title: Jekyll Chirpy 테마 라이브러리 not found 에러
date: 2024-11-01 12:00:00 +0800
categories: [ Blogging,error ]
tags: [ ruby,error,trouble shooting,git ]
---

# ⛔ 문제 상황


```console
bundle exec jekyll serve
[2024-11-01 10:42:16] ERROR `/assets/lib/bootstrap/bootstrap.min.css' not found.
[2024-11-01 10:42:16] ERROR `/assets/lib/jquery/jquery.min.js' not found.
[2024-11-01 10:42:16] ERROR `/assets/lib/bootstrap/bootstrap.bundle.min.js' not found.
[2024-11-01 10:42:16] ERROR `/assets/lib/lazysizes/lazysizes.min.js' not found.
[2024-11-01 10:42:16] ERROR `/assets/lib/dayjs/locale/en.min.js' not found.
[2024-11-01 10:42:16] ERROR `/assets/lib/dayjs/plugin/relativeTime.min.js' not found.
[2024-11-01 10:42:16] ERROR `/assets/lib/dayjs/plugin/localizedFormat.min.js' not found.
```

- 로컬에서 bundle exec jekyll serve 명령어로 서버를 실행하는 중에 에러가 발생
- 해당 라이브러리의 파일들을 찾을 수 없다는 오류 메시지가 출력

# 🧐 문제 원인

문제의 원인을 파악하기 위해 원격 브랜치를 확인한 결과, 해당 라이브러리 파일들이 원격의 main 브랜치에는 존재하는 것을 확인했다. 하지만 로컬 브랜치에는 존재하지 않았다.

- 원격 브렌치의 경우 푸시와 동시에 해당 라이브러리 및 버전에 맞는 CI/build 과정이 있음.
- 로컬 저장소는 자동으로 업데이트되지 않으므로, 개발자가 수동으로 원격 브랜치의 변경 사항을 가져와야 함
- 이로 인해 파일을 못찾는 에러가 발생한 상태일 가능성이 있음.

# ⛔문제 해결

- 해결하기 위해서 내가 했던 단계이다.

## 1. 원격 브랜치에서 변경 사항 가져오기

```bash
git pull origin main
```

- 로컬에서 원격 데이터 누락 가능성이 있을 수 있어서 실행

## 2. Gemfile 업데이트

```bash
bundle install
```

## 3. lib 업데이트

[README.md](https://github.com/cotes2020/chirpy-static-assets/blob/6737eab720e4cdd8330d32053053356f200d8819/README.md)

- 위의 해당 파일을 보면 자세한 설명이 나와있다... 이를 왜 못봤을까 ㅜㅜ


```bash
$ git submodule init
$ git submodule update
```

- 로컬 라이브러리 업데이트 처리

## 4. build

```bash
bundle exec jekyll build
```

## 5. 서버 재시작

```bash
bundle exec jekyll serve
```

# 마무리

- 현재 개발을 시작하고 현업으로 뛰어들어온지 벌써 7개월이 흘러가고 있는 시점에서 처음에 블로그 fork 하고 개인 블로그를 만들고 난 뒤 관리에는 소홀했던 거 같아서 블로그 관련 소스들을 분석하며 오류를 찾아나가는 중이다.
- 독자가 더 보기 좋은 블로그를 만들기 위해 나의 공부 내용을 기록하는 이 블로그를 더 이해하고 깊게 들어가볼 생각이다. 앞으로 더 좋은 글로 찾아뵙겠습니다!!


[sunghomong 의 깃 허브](https://github.com/sunghomong) <br>
[sunghomong 의 블로그](https://sunghomong.github.io/)
