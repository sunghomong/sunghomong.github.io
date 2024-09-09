---
title: (프로그래머스/코딩기초트레이닝) 9일간의 후기 (~Day9)
author: sunghomong
date: 2024-09-06 12:00:00 +0800
categories: [CodingTest,프로그래머스_JAVA]
tags: [java,CodingTest,Daily,programmers,CodingTest_JAVA,코딩기초트레이닝]
toc: true
toc_sticky: true
toc_label: 목차
math: true
mermaid: true
---

<div style="">
<img src="https://i.ibb.co/CtkDBqD/image.png" alt="image">
</div>


## 개요

- 현업에서 일을 하다 보니 알고리즘 해결 능력을 더 키우고 싶다는 욕심이 들어서 시작하게 되었다.
- 아무래도 현업에서 일을 하다 보면 끝 없는 공부지만 알고리즘의 문제에 겪게 되면 일단 머리 아프고 본다 ㅋㅋ...
- 이러한 점들을 해결하기 위해 코테도 필요하다는 점을 알게되었다.

## 코딩 기초 트레이닝

- 기초부터 시작한 이유는 취업전 코테 시험들을 보고 다닐때 나의 부족한 점들을 너무나 많이 깨달았었다.
- 이를 보완하기 위해서는 기초부터 다져야된다는 생각이 들어서 시작하게 되었다.

## 문제

- 아래의 문제는 내가 풀면서 한편으로는 내 힘으로 풀었다는게 뿌듯하고 내 입장에서는 어렵다고 생각한 문제이다. 문제 설명 링크와 함께 테스트 통과한 코드만 간추려 보려고 한다.

```java
import java.util.*;

class Solution {
    public int solution(int a, int b, int c, int d) {
        int[] numbers = {a,b,c,d};
        Arrays.sort(numbers);

        if (numbers[0] == numbers[3]) {
            return 1111 * numbers[0];
        }
        if (numbers[0] == numbers[2] || numbers[1] == numbers[3]) {
            int p = numbers[1];
            int q = numbers[0] == numbers[1] ? numbers[3] : numbers[0];
            return (int) Math.pow(10 * p + q, 2);
        }

        if (numbers[0] == numbers[1] && numbers[2] == numbers[3]) {
            int p = numbers[0];
            int q = numbers[2];
            return (p + q) * Math.abs(p - q);
        }

        if (numbers[0] == numbers[1] || numbers[1] == numbers[2] || numbers[2] == numbers[3]) {
            int p, q, r;
            if (numbers[0] == numbers[1]) {
                p = numbers[0];
                q = numbers[2];
                r = numbers[3];
            } else if (numbers[1] == numbers[2]) {
                p = numbers[1];
                q = numbers[0];
                r = numbers[3];
            } else {
                p = numbers[2];
                q = numbers[0];
                r = numbers[1];
            }
            return q * r;
        }

        return numbers[0];
    }
}
```
[코딩 기초 트레이닝 / 주사위 게임 3](https://github.com/sunghomong/Codding_Test_Study/blob/main/Java%2F20240904_%EC%A3%BC%EC%82%AC%EC%9C%84_%EA%B2%8C%EC%9E%843.md)

## 9일간의 기초 트레이닝 후기

- 일단 아직 9일밖에 되지 않았지만 점점 기초가 다져지는 느낌을 받는 거 같다. 처음에 보면 몰랐던 코드들을 아 이거 이거 응용하면 금방 풀겠다 라는 생각이 들었다.
- 풀면서 다른 사람들 풀이를 보면 배울게 많았다. 내가 몰랐던 메서드들 자바의 베이직 함수들... 배우는 시간이 많이 되었던 거 같다.
- 풀면서 진짜 딜레마에 빠지게 되었다. '진짜 모르겠는데... 이거 정답을 봐??? vs 아니야 힌트라도 받고 내힘으로 풀자' 이 갈등이 계속해서 반복되었다. 이는 나의 성장에 있어서 발판이 되어준 거 같다.
- 나는 솔직하게 재미있게 한 거 같다. 알고리즘이 내 힘으로 풀릴때는 진짜 뿌듯했고 한편으로 그게 왜 안풀리지라는 고민에 빠지게 된 내가 뿌듯했다.
- 만약에 기초를 다지고 싶다면 난 이 트레이닝을 추천하고 싶다.

## 마무리

- 앞으로 25일간의 모든 문제를 풀어보고 다시 포스팅을 해볼 생각이다!!
- 이 문제를 다 풀고 나의 코테 Lv 을 올리고 싶다는 욕심이 더 들어서 계속 하지 않을까 라는 생각이 든다 ㅎㅎ
- 암튼 저는 개인적으로 이 트레이닝 추천!!

<br>

[sunghomong 의 깃 허브](https://github.com/sunghomong) <br>
[sunghomong 의 블로그](https://sunghomong.github.io/)
