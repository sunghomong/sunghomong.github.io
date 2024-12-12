---
title: (프로그래머스) 자바 12937번 '짝수와 홀수' 문제 풀이 (LV.1)
date: 2023-09-24 22:00:00 +0800
categories: [CodingTest,프로그래머스_JAVA]
tags: [CodingTest,CodingTest_JAVA]
---

# [프로그래머스] 자바 12937번 '짝수와 홀수' 문제 풀이 (LV.1)


### 문제 설명

정수 num이 짝수일 경우 "Even"을 반환하고 홀수인 경우 "Odd"를 반환하는 함수, solution을 완성해주세요.
<br><br>

### 제한 조건

- num은 int 범위의 정수입니다.
- 0은 짝수입니다.
<br><br>

### 입출력 예<br>

|num|return|
|:--:|:--:|
|3|"Odd"|
|4|"Even"|

<br>

### Solution.java

#### 주어진 샘플

```java
class Solution {
    public String solution(int num) {
        String answer = "";
        return answer;
    }
}
```

- 일단 문제 풀기 전 문제 설명을 유심히 봤다. 이거는 홀수와 짝수를 판별하여 홀수인 경우에는 Odd 짝수일 경우 Even을 return으로 돌아오는 answer에 넣어주면 된다!!
- 그럴려면 if 조건을 알아야 될 거 같다. 나는 이와 같이 풀었다.
<br>

```java
class Solution {
		    public String solution(int num) {
		    	String answer = "";
		    	if(num%2 == 0 || num == 0) { // 짝수인 경우
		    		answer = "Even";
		    	} else { // 홀수인 경우
		    		answer = "Odd";
		    	}
		        return answer;
		    }
		}
```

- 위의 풀이를 해석하면 이렇다<br>
  받아온 num을 2로 나눴을때 나머지가 0일 경우에는 짝수, 제한 조건에서 보면 0은 짝수라고 판별하였기에 ||(or연산자)를 통해 나머지가 0일때 또는 num이 0일 경우 answer에 Even을 넣어주고 그밖에 홀수일 경우에는 Odd를 넣어주는 식이다.

  
