---
title: (TIL_WebSocket) WebSocket을 이용한 실시간 채팅 구현하기
author: sunghomong
date: 2023-10-16 15:00:00 +0800
categories: [TIL,TIL_WebSocket]
tags: [TIL,Daily,WebSocket,SpringBoot,ChatService]
---

# 웹소켓이란?
<br>

웹소켓(WebSocket)은 클라이언트와 서버(브라우저와 서버)를 연결하고 `실시간`으로 통신이 가능하도록 하는 첨단 `통신 프로토콜`이다. 웹소켓은 하나의 TCP 접속에 전이중(duplex) 통신 채널을 제공한다.<br><br>
 
쉽게 말해, 웹소켓은 Socket Connection을 유지한 채로 실시간으로 양방향 통신 혹은 데이터 전송이 가능한 프로토콜이다.<br><br>
 
오늘날 채팅 어플리케이션, SNS, 구글 Docs, LOL 같은 멀티플레이 게임, 화상회의 등 많은 분야에서 사용되고 있다.<br><br>
참고 : [코드 연구소:티스토리](https://code-lab1.tistory.com/300 )<br><br>

# 웹소켓을 공부하게 된 이유
<br>
최근에 있었던 팀 프로젝트 기간 동안 채팅 서비스에 욕심이 생겨서 과감하게 도전을 하게 되었다. 내가 구현한 채팅 서비스는 모임을 생성하고 그 모임에 속해 있는 인원들끼리 자유로운 실시간 채팅을 할 수 있게끔 구현했다.<br><br>

<img src="https://i.ibb.co/vk15cHL/websocket-chatimg1.png" alt="websocket-chatimg1">
<br><br>

아무래도 웹 소켓 활용은 처음이라 시간이 좀 걸렸다. 하지만 어떻게 전송이 되고 어떻게 전달이 되는지 동작원리만 정확히 이해한다면 활용하는데 큰 문제가 없을 것이다.

# 웹소켓의 동작 원리

