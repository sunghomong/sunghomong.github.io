---
title: 프로그래머스 이웃한 칸 자바 문제 풀이
author: sunghomong
date: 2024-02-22 10:00:00 +0800
categories: [CodingTest,프로그래머스_JAVA]
tags: [CodingTest,CodingTest_JAVA,알고리즘]
tok: true
---

[문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/250125)

## 문제 인식

1. 고른칸의 위치 h,w 에 해당하는 색깔이 board[h][w] 의 오른쪽,왼쪽,위,아래에 해당 색과 똑같은 색이 몇개 있나 추출하는 문제
2. board의 길이는 1 이상 7 이하
3. h,w는 0 이상 board 길이보다 적어야 함
4. board는 영어 소문자로만 이루어져있음

## 문제 접근 

Lv.1 단계라 문제 속에 풀이를 순서대로 하면 풀리지만 앞으로 알고리즘을 풀기 위해서는 따라칠것만이 아니라 해결과정을 세세하게 파보았다.

- 필요한 변수명들 지정

코테 입문기라 아직 문제의 파악에는 시간이 오래걸렸다.이를 위해서 내가 개선한 방법은 일단 필요한 변수명들을 하나씩 지정해줬다.

필요한 변수명은 보드의 길이를 알려줄 ``n``, 양방향의 같은 색으로 칠해진 개수를 알 수 있는 return 값 ``count``, h와 w의 각각 변화량을 알려줄 리스트 형태의 ``dh,dw``

- for 반복문

```java
int[] dh = {0,1,-1,0}; // h의 변화량
int[] dw = {1,0,0,-1}; // w의 변화량
```
위의 변수명 ``dh,dw``의 리스트 형태에 따라 각각의 위,아래,오른쪽,왼쪽을 비교해봐야하기에 4번의 비교 반복이 필요하다.

- if 조건문

반복안속의 if 조건문이다. 이 문제를 풀기 위해서는 4번의 반복동안 골라준 board[h][w]와 각각 양방향의 색을 비교해봐야 하기에 ``h_check,w_check`` 변수명을 따로 지정해주고
```java
int h_check = h + dh[i];
int w_check = w + dw[i];
if (0 <= h_check && h_check < n && 0 <= w_check && w_check < n){
  if(board[h][w].equals(board[h_check][w_check]))  {
    count += 1;
  } 
}
```
이런식으로 접근 하면 h_check에 dh,dw의 각각 i번째 값을 더하면서 board[h_check][w_check]이 board[h][w]와 동일한지 비교 가능했다.


## 코드

```java
class Solution {
  public int solution(String[][] board, int h, int w) {
    
    // 각 칸에 색깔 이름 담긴 리스트 board
    // 고른칸의 위치 h,w
    
    int n = board.length; // 정수를 저장할 변수, board의 길이
    int count = 0; // 같은 색으로 색칠된 칸의 개수
    int[] dh = {0,1,-1,0}; // h의 변화량
    int[] dw = {1,0,0,-1}; // w의 변화량
    
    for(int i=0; i<=3; i++) {
      int h_check = h + dh[i];
      int w_check = w + dw[i];
      if (0 <= h_check && h_check < n && 0 <= w_check &&w_check < n){ 
        if(board[h][w].equals(board[h_check][w_check])) {
            count += 1;
        }
      }
    }
    return count;
  }
}
```