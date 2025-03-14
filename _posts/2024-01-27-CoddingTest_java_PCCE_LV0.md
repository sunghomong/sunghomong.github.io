---
title: 프로그래머스 PCCE 기출문제 LV.0 모음_자바
date: 2024-01-27 10:00:00 +0800
categories: [CodingTest,프로그래머스_JAVA]
tags: [CodingTest,CodingTest_JAVA,PCCE기출문제]
image: /assets/img/post_images/codingtest/PCCE_01.png
---

## PCCE

프로그래머스 코딩필수역량인증시험<br>
취업준비를 하면서 코딩테스트 또한 필수라는것을 알게되었다. 이를 통해 프로그래머스 코딩테스트를 찾아보는 과정 중 PCCE 기출문제에 접하게 되었다.

다른 문제들과 다르게 좀 특이한 점들이 있었다.<br>
빈칸 채우기, 1줄 수정과 같이 재미있게 접근이 가능했다!!

### 1. 출력

<img src="/assets/img/post_images/codingtest/PCCE_02.png" alt="PCCE_02">

- 엥? 할정도로 너무 쉬었던 문제
- 위와 같이 3개의 문자를 출력하는 형태였다.

### 2. 피타고라스의 정의

<img src="/assets/img/post_images/codingtest/PCCE_03.png" alt="PCCE_03">

- 삼각형의 a,c(빗변) 길이의 값을 가지고 b 제곱근을 구하는 공식이였다.
- 말그대로 제곱근을 구하는거기에 c 제곱에서 b제곱을 빼줬다.

### 3. 나이 계산

<img src="/assets/img/post_images/codingtest/PCCE_04.png" alt="PCCE_04">

- 2030년 기준으로 만 나이와 우리 나라 나이 계산법으로 나이를 구하는 문제였다.
- 솔직히 너무 쉬운 문제이기에... 한국이라는 문자가 도착하면 2030 - 2000 + 1 (한국은 만 나이 + 1)

### 4. 저축

<img src="/assets/img/post_images/codingtest/PCCE_05.png" alt="PCCE_05">

- 70 아래일 경우에는 before 값을 더해주고 100 이하까지는 after의 저축값을 더해주고 총 몇달이 걸리는지 계산하는 문제이다.

### 5. 산책

<img src="/assets/img/post_images/codingtest/PCCE_06.png" alt="PCCE_06">

- NSEW 문자열 형태를 받아와서 각각의 문자를 switch 문으로 해당하는 문자일 경우 그에 맞는 값을 더하거나 빼는 형식이다.

### 6. 가채점

<img src="/assets/img/post_images/codingtest/PCCE_07.png" alt="PCCE_07">

- 쉽게 이해하면 `numbers`는 인덱스 번호를 의미하고 `our_score`는 가채점 한 점수를 나열한 배열 형태, `score_list`는 실제 점수를 나열한 배열 형태이다.
- `numbers`는 인덱스 번호인데 1부터 시작하기에 배열형태는 0부터 시작한다. 그에 맞게 -1을 해줘야한다.

### 7. 가습기

<img src="/assets/img/post_images/codingtest/PCCE_08.png" alt="PCCE_08">

- 하나의 기계라고 생각하고 접근햇다.
- `mode_type`은 어떤 모드를 선택할건지 결정하고 `humidity`는 습도의 정도 `val_set`은 설정값 즉 type에 따라 올바른 함수를 호출해서 이를 해결해야한다.
- return으로는 처리된 단계를 의미

### 8. 창고 정리

<img src="/assets/img/post_images/codingtest/PCCE_09.png" alt="PCCE_09">

- 풀어본 8문제 중에 제일 난이도 있는?? 문제였다.
- storage의 모든 물건의 배열 형태와 개수를 받아와 중복되는 물건이 있다면 같이 더해주고 return해주는 문제이다.
- if문 안에서의 조건을 보면 물건의 이름이 같을 경우 중복이 되면 안되기에 저런 형태로 풀어볼 수 있었다.


## 마무리

PCCE LV.0 단계는 문제를 인지하는 능력을 키우는 느낌이였다.취업 준비를 하면서 코딩 테스트 또한 많은 기업들이 본다는 사실을 인지하고 코딩 테스트 수준을 늘려볼 생각이다.

<br><br>

[sunghomong 의 깃 허브](https://github.com/sunghomong) <br>
[sunghomong 의 블로그](https://sunghomong.github.io/)
