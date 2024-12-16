---
title: 깃허브 블로그 Build error at Setup Ruby 문제 해결
date: 2024-01-07 15:00:00 +0800
categories: [trouble shooting,ruby]
tags: [GitHub,blog,trouble shooting,ruby]
image: /assets/img/post_images/resolveProblem/resolveProblem5.png
---

# ⛔ 문제 상황

잘 쓰던 깃 허브 블로그에 문제가 생겼다.

<img src="/assets/img/post_images/resolveProblem/resolveProblem5.png" alt="resolveProblem5">

이러한 build 문제가 자꾸 생기면서 오류가 뜨고 해당 페이지를 찾으면 404 에러 메시지가 떴다. 문제를 자세히 살펴 보았다.

<img src="/assets/img/post_images/resolveProblem/resolveProblem6.png" alt="resolveProblem6">

- Error: The process ‘/opt/hostedtoolcache/Ruby/3.3.0/x64/bin/bundle’ failed with exit code 5 
- 이러한 에러 메시지가 뜨고 해당 작업을 re-run을 해도 똑같은 오류가 떴다.

# 🧐 원인 조사

## 깃 허브 블로그의 아키텍처

> 깃 허브 블로그는 로컬 > git(push,pull) > git hub > ruby(run) > blog 순으로 되어 있다.

- 깃 허브의 build 과정 문제인 것을 인지하고 깃 허브 블로그의 시스템 과정을 나열해봤다.
- 에러 메시지를 확인하고 ruby 쪽에 문제를 인지했다.

## 해당 오류 검색

- 나는 이러한 문제를 인지하고 비슷한 사례의 원인 해결 과정들을 검색했다.

<img src="/assets/img/post_images/resolveProblem/resolveProblem7.png" alt="resolveProblem7">

<img src="/assets/img/post_images/resolveProblem/resolveProblem8.png" alt="resolveProblem8">

<br>

# ⛔문제 해결

해당 문제의 원인 조사 결과 내가 해결한 방법은 이와 같다.


## ruby 버전 수정

<img src="/assets/img/post_images/resolveProblem/resolveProblem9.png" alt="resolveProblem9">

- github/workflow 의 ruby 버전이 있는 부분을 3 > 3.2 버전으로 수정을 해주었다.
- ruby 버전의 호환성 문제였고 이를 위해서는 버전을 3.2로 유지해주는 것이 필요했다.

## 실행 결과

<img src="/assets/img/post_images/resolveProblem/resolveProblem10.png" alt="resolveProblem10">

- 수정한 결과 build 과정에 문제가 안생기고 정상적으로 작동하는 것을 인지
- blog 페이지 확인 결과 정상적으로 페이지 나오는것을 확인

# 마무리

- 오늘은 github의 문제 해결 과정을 적어보았다.
- 처음에 이런 오류가 떴을때 진짜 당황했고 거기에 아직 익숙치 않은 ruby 관련 오류였지만 원인 검색을 통해 이를 해결 할 수 있었다.
- github 블로그를 운영하는 이상 ruby,Jekyll에 대한 공부가 더 필요할 거 같다.
<br><br>

[sunghomong 의 깃 허브](https://github.com/sunghomong) <br>
[sunghomong 의 블로그](https://sunghomong.github.io/)
