---
title: (TIL_WebSocket) WebSocket을 이용한 실시간 채팅 구현하기
date: 2023-12-13 15:00:00 +0800
categories: [TIL,TIL_WebSocket]
tags: [TIL,Daily,WebSocket,SpringBoot,ChatService]
---

# 웹소켓이란?
<br>

웹소켓(WebSocket)은 클라이언트와 서버(브라우저와 서버)를 연결하고 `실시간`으로 통신이 가능하도록 하는 첨단 `통신 프로토콜`이다.

쉽게 말해, 웹소켓은 Socket Connection을 유지한 채로 실시간으로 양방향 통신 혹은 데이터 전송이 가능한 프로토콜이다.

오늘날 채팅 어플리케이션, SNS, 구글 Docs, LOL 같은 멀티플레이 게임, 화상회의 등 많은 분야에서 사용되고 있다.

# 웹소켓을 공부하게 된 이유

<br>
최근에 있었던 팀 프로젝트 기간 동안 채팅 서비스에 욕심이 생겨서 과감하게 도전을 하게 되었다. 내가 구현한 채팅 서비스는 모임을 생성하고 그 모임에 속해 있는 인원들끼리 자유로운 실시간 채팅을 할 수 있게끔 구현했다.<br><br>

<img src="/assets/img/post_images/TIL/websocket_chatimg1.png" alt="websocket-chatimg1">

<br>

아무래도 웹 소켓 활용은 처음이라 시간이 좀 걸렸다. 하지만 어떻게 전송이 되고 어떻게 전달이 되는지 동작원리만 정확히 이해한다면 활용하는데 큰 문제가 없을 것이다.

# 구현

## gradle 추가

```build.gradle
dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-websocket'
}
```

- 채팅을 위한 웹소캣 라이브러리 추가를 해준다.

## WebSocketConfig 추가

```java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/websocket/{chatRoomId}")
                .setAllowedOrigins("*")
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/app");
        registry.enableSimpleBroker("/topic");
    }
}
```

- 웹 소켓을 사용하기 위한 설정 파일 생성
- `@Configuration`을 통해 해당 파일이 Bean 설정을 할 것을 나타낸다.
- `@EnableWebSocketMessageBroker`을 통해 WebSocket사용을 나타낼 수 있다.
- `addEndpoint`를 통해 채팅방의 엔드포인트 등록이 가능함.
  쉽게 말해서 여러 채팅방을 만들경우 저렇게 chatRoomId를 통해 여러개의 채팅방 엔드포인트를 설정 가능 
- `setAllowedOrigins` 은 허용할 도메인 주소를 뜻한다.
  예를 들어서 `https://url주소.com/~~`, 본인이 사용하는 주소 url을 등록해놓으면 된다 여러개도 가능하다. 톰캣을 통해서 사용중이라면 `http://localhost:8085`이런식으로 가능할것이다.
- `withSockJS`는 spring을 사용하는 경우라면 이 프로토콜이 일반적일것이다. 웹소켓을 지원하지 않는 브라우저에서도 정상적으로 동작할수 있도록 지원해준다.
- `registerStompEndpoints` 이 메소드에 보면 STOMP라는 단어가 있다. STOMP가 필요 한 이유는 websocket은 통신 프로토콜이지 특정 주제에 가입한 사용자에게 메시지를 전송하는 기능을 제공하지 않는다. 이를 쉽게 사용하기 위해 STOMP를 사용한다.
- `setApplicationDestinationPrefixes`
  도착경로에 대한 prefix를 설정하는것이다. 예를 들어서 /app 이라고 설정해두며 /topic/12 라는 토픽에 대해 구독을 했을 경우 실제 경로는 /app/topic/12가 되는 것이다.
- `enableSimpleBroker`
  메시지브로커를 등록하는 코드이다. 보통 /topic과 /queque를 사용한다, /topic은 한명이 메시지를 보낼때 해당 토픽을 구독하고 있는 여러명에게 메시지를 뿌려야 하는 상황에 사용되고, /queque는 한명이 메시지를 보낼때 다시 그 메시지 정보를 보내는 경우에 사용된다. 저는 topic 하나만 사용했습니다.

## ChatController 추가

```java
@Controller
public class ChatController {

    // 사용자가 채팅방에 들어올 경우
    @MessageMapping("/chat.register")
    public void  register(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {

        // 새로운 사용자의 세션 정보에 사용자 이름 저장
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());

        // 채팅방 아이디를 추출하고 해당 아이디로 메시지를 전달
        String chatRoomId = chatMessage.getChatRoomId();
        simpMessagingTemplate.convertAndSend("/topic/chatRoom/" + chatRoomId, chatMessage);
    }

    // 사용자가 채팅 메시지를 전송할 경우
    @MessageMapping("/chat.send")
    public void sendMessage(@Payload ChatMessage chatMessage) {
        // 채팅방 아이디를 추출하고 해당 아이디로 메시지를 전달
        String chatRoomId = chatMessage.getChatRoomId();

        simpMessagingTemplate.convertAndSend("/topic/chatRoom/" + chatRoomId, chatMessage);
    }
}
```

- `@MessageMapping` 는 getMapping setMapping과 비슷한 쓰임이다. 클라이언트로부터 해당 url로 요청이 들어오면 해당 메서드를 처리한다는 것이다.
- `convertAndSend` SendTo와 비슷한 형태이다. convertAndSendToUser()이라는 특정한 사용자에게 보낼수 있는 형태도 있다. 해당 채팅방에 메시지를 보낸다는 뜻이다.
- 여기서 보면 나는 chatRoomId를 따로 클라이언트에게 받아서 채팅방을 다중으로 관리하고 있는것을 확인할 수 있다.
- 아마 눈치가 빠른 사람은 여기서 알게 될 것이다. 여기에서 모든 처리가 가능하다는 것을!! 클라이언트로부터 메시지를 받아서 DB에 저장하는 것도 가능할 것이고 메시지의 형태도 변경해서 관리가 가능하다는 것을 눈치챘을 것이다.

### chat.js
```js
$(document).ready(function(){

    // WebSocket 클라이언트와 사용자 이름 관련 변수
    var stompClient = null;
    var username = null;

    // 채팅방 ID를 URL에서 추출
    var chatRoomId = [[${chatRoom.chatRoomId}]];
    // 사용자 이름을 세션에서 추출
    var username = [[${userName}]];

     if(username) {
        // SockJS를 통해 WebSocket 연결 설정
        // WebSocket 서버에 연결을 시도
        var socket = new SockJS('/websocket/' + chatRoomId);
         stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);
    }

    function onConnected() { // 연결 성공 후

      stompClient.subscribe('/topic/chatRoom/' + chatRoomId , onMessageReceived);

      var messageTime = new Date();
      stompClient.send("/app/chat.register",
        {},
        JSON.stringify({ userId: userId, chatRoomId:chatRoomId, sender: username, type: 'JOIN' messageTime: messageTime})
      )
    }
    
    // WebSocket 연결 오류 발생 시 호출되는 함수
    function onError(error) {
        connectingElement.textContent = 'WebSocket에 연결할 수 없습니다. 페이지를 새로 고치거나 관리자에게 문의하십시오.';
        connectingElement.style.color = 'red';
    }
    // 채팅 메시지를 서버로 전송하는 함수
    function send(event) {
        var messageContent = messageInput.value.trim();

        if(messageContent && stompClient) {
            var messageTime = new Date();
            var chatMessage = {
                userId: userId, // 회원 아이디
                chatRoomId: chatRoomId, // 방 아이디
                sender: username, // 보낸이
                content: messageInput.value, // text 창 내용들
                type: 'CHAT', // 타입 chat
                messageTime: messageTime // 현재 시간을 추가
            };

            stompClient.send("/app/chat.send", {}, JSON.stringify(chatMessage));
            messageInput.value = '';
        }
        event.preventDefault();
    }
});
```
- 채팅방 관련된 javascript이다.
- `connect`를 통해 웹소켓 서버에 연결될 경우 `onConnected` 함수를 호출하게 된다. `stompClient.subscribe`를 통해 해당 목적지로 구독을 하게 됩니다. 그 후 json 형태로 묶어서 메시지를 해당 url에 전달해 줍니다.
- 이처럼 데이터 보내는 형식은 이와 같습니다.

## 참고

[https://lahuman.jabsiri.co.kr/202](https://lahuman.jabsiri.co.kr/202) <br>
[https://dev-gorany.tistory.com/224](https://dev-gorany.tistory.com/224) <br>
[https://hyeooona825.tistory.com/89](https://hyeooona825.tistory.com/89) <br>

## 마무리

- 개인적으로 처음 사용해 보는 거라 많이 익숙지 않았고 투자할 시간이 필요했다. 그렇기에 다음에 까먹지 않기 위해 이렇게 기록을 해봤다.
- 공부해 본 결과 진짜 동작원리랑 흐름만 잘 파악한다면 쉽게 구현할 수 있다는 것이었다...
- 이외에 다양한 기능을 구현을 해봤는데 기회가 된다면 그것도 하나씩 기록을 해볼 생각이다. ex) `이전 데이터 조회, 채팅방 나갈 경우 데이터 초기화,채팅방 관리 기능,날짜 별 채팅 기록 등`
<br><br>
  
[sunghomong 의 깃 허브](https://github.com/sunghomong) <br>
[sunghomong 의 블로그](https://sunghomong.github.io/)
