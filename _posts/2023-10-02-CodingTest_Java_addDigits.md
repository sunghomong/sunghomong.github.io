---
title: (프로그래머스) 자바 12931번 '자릿수 더하기' 문제 풀이 (LV.1)
author: sunghomong
date: 2023-10-02 10:00:00 +0800
categories: [CodingTest,프로그래머스_JAVA]
tags: [CodingTest,CodingTest_JAVA]
tok: true
comments: true
---

# [프로그래머스] 자바 12931번 '자릿수 더하기' 문제 풀이 (LV.1)
---

## 문제 설명

자연수 N이 주어지면, N의 각 자릿수의 합을 구해서 return 하는 solution 함수를 만들어 주세요.<br>
예를들어 N = 123이면 1 + 2 + 3 = 6을 return 하면 됩니다.
<br><br>

## 제한 조건

- N의 범위 : 100,000,000 이하의 자연수
<br><br>

## 입출력 예<br>

|N|answer|
|:--:|:--:|
|123|6|
|987|24|

## 입출력 예 설명<br>

입출력 예 #1<br>
문제의 예시와 같습니다.

입출력 예 #2<br>
9 + 8 + 7 = 24이므로 24를 return 하면 됩니다.


## Solution.java

### 주어진 샘플

```java
import java.util.*;

public class Solution {
    public int solution(int n) {
        int answer = 0;

        // [실행] 버튼을 누르면 출력 값을 볼 수 있습니다.
        System.out.println("Hello Java");

        return answer;
    }
}
```
<br>

- 이 문제는 각 **자리수의 덧셈**을 구하는 방식이다. 여기서가 힌트인거 같다. <br> 처음에는 1의 자리수 + 10의 자리수 + 100의 자리수...
- 그럼 이것을 어떻게 풀어야할까?...<br>
  나는 이렇게 접근을 해봤다. 예를들어 122466의 정수를 받았다면 하나씩 차근차근 더해주는 반복문을 사용하면 어떨까??
- 122466 % 10 = 6(1의 자리수) --> answer값 0 에 더해줌 --> 122466 / 10 = 12246 --> 반복 --> 결국 answer값에 하나씩 더하면 결국은 받은 n의 값은 없어질것이다. 이를 이용해 풀어보았다!!<br><br>


```java
import java.util.*;

public class Solution {
    public int solution(int n) {
        int answer = 0;

        while (n>0) {
            answer += n%10;
            n /= 10;
        }
        
        return answer;
    }
}
```
  
- 실행결과 테스트 완료!!
- 또 다른 방법이 있다면 코멘트 주시면 너무 큰 도움이 됩니다!
  
---