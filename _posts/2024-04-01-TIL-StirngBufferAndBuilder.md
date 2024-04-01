---
title: StringBuffer와 StringBuilder를 왜 사용할까?
author: sunghomong
date: 2024-04-01 12:00:00 +0800
categories: [TIL,TIL_JAVA]
tags: [java,StringBuffer,StringBuilder]
toc: true
toc_sticky: true
toc_label: 목차
math: true
mermaid: true
---

## 불변의 값 String

사전 적 의미로 몇 개의 문자들로 구성된 문자열 하나를 값으로 취할 수 있는 변수(String) 이라고 한다.
불변은 말 그대로 변하지 않는 값을 의미한다. 이는 값을 변경하려면 기존의 값을 버리고 새로운 값을 할당해야 된다는 것이다.

예를 들어 "나는" 이라는 intro(string) 변수가 있다고 했을때 "나는 ~~이에요" 라는 문자를 추가해서 intro(stirng) 변수에 할당 하고 싶다면 기존의 intro 변수의 값을 버리고 다시 할당을 해줘야한다.

## concat 또는 +

이를 위해서 String에는 .concat 또는 +를 사용한다. 하지만 이도 문제점이 있다. 데이터가 많을수록 속도가 너무 느려져 비효율적이다.

이러한 이유들 때문에 가변적인 StringBuffer나 StringBuilder를 사용하는 것이다.

## StringBuffer StringBuilder

StringBuffer와 StringBuilder의 차이는, StringBuffer는 멀티 스레드 완경에서 안전하다는 장점이 있고, StringBuilder는 문자열 파싱 성능이 가장 우수하다는 장점이 있다. 일반적으로는 Builder를 사용하면 된다.

StringBuffer와 StringBuilder의 일반적으로 많이 사용되는 메소드를 확인 해보자.

|||
|--:|:--|
|.append(값)|뒤에 값을 붙인다|
|.insert(인덱스, 값)|특정 인덱스부터 값을 삽입|
|.delete(인덱스, 인덱스)|특정 인덱스부터 특정 인덱스까지 값을 삭제|
|.indexOf(값)|값이 어느 인덱스에 들어있는지 확인|
|.substring(인덱스, 인덱스)|인덱스부터 인덱스까지 값을 잘라서 가져옴|
|.length()|길이 확인|
|.replace(인덱스, 인덱스, 값)|특정 인덱스부터 특정 인덱스까지 값으로 변경|
|.reverse()|글자 순서를 뒤집는다.|

위의 메소드들을 활용해서 올바르게 StringBuffer와 StringBuilder를 사용하면 될 거 같다.

## 마무리

StringBuffer와 StringBuilder를 사용하는게 무조건 옳은 것은 아니다. 불변 값을 활용해야 하는 상황이 있을 것이고 가변 적인 메소드를 활용해야 하는 상황이 있을 것이다. 각각 상황에 맞게 사용하면 될 거 같다.

