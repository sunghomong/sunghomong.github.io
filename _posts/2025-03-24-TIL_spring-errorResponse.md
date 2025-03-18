---
title: "[spring] 필자의 경험을 통한 REST API Response Body 형식"
date: 2025-03-24 12:00:00 +0800
categories: [TIL,TIL_SpringBoot]
tags: [ spring,TIL,restApi,response,springBoot ]
image: /assets/img/post_images/TIL/spring01.png
---

# REST API??

> REST API(Representational State Transfer API)는 웹에서 데이터를 주고받는 방식을 정의한 아키텍처 스타일이다. 간단하게 말하면, 클라이언트(프론트엔드, 다른 서버 등)와 서버가 HTTP 프로토콜을 이용해 데이터를 주고받는 방법이다.
{: .prompt-info }

## Http Method

아래는 메서드 활용 예제이다.

- GET → 데이터 조회
- POST → 새로운 데이터 생성
- PUT → 기존 데이터 수정 (전체 업데이트)
- PATCH → 기존 데이터 수정 (부분 업데이트)
- DELETE → 데이터 삭제

## REST API 의 사용 장점

- 확장성 → 여러 시스템과 쉽게 연동 가능
- 가독성 → URL 과 응답 구조가 직관적
- 호환성 → 다양한 클라이언트(웹, 모바일)에서 사용 가능

간단한 설명과 함께, 지금까지 여러 프로젝트를 진행하며 느낀 점을 정리해보려고 한다.

## Response Body

모든 호출에는 응답값이 존재한다.  
예를 들어 `HTTP Status Code`에도 `1xx`, `2xx`, `3xx`... 와 같이 기본적으로 요청에 대한 응답값을 제공하며, 개발자들은 이를 기반으로 사용자에게 적절한 메시지를 전달하는 코드를 작성한다.

이처럼 REST API 를 개발하는 입장에서, 특정 URL 을 호출할 때 적절한 응답 코드값과 메시지를 함께 제공하는 것이 중요하다.

필자는 신사업도 중요하지만, 장기적인 유지보수를 고려했을 때 일관성 있는 응답 형식이 빠른 문제 해결과 개선에 도움이 된다고 생각한다. 이러한 관점에서 다음과 같은 Response Body 형태를 추천한다.

```json
{
	"resultCode": "0000",
	"resultMsg": "SUCCESS",
	"data": {}
}
```

- `resultCode` : 내부 처리에 따라 전달해줄 결과 상태 코드
- `resultMsg` : 코드에 적절한 message 값
- `data` : API 문서 상 전달해줘야 하는 data 값

## resultCode 처리

그렇다면 내부에서는 `resultCode`를 어떻게 처리해서 전달해야 할까?  
필자는 이를 `enum` 타입으로 관리했다.

```java
@Getter
public enum CustomeCode {
    OK("CD-0000","정상적으로 처리되었습니다."),
    DATA_ERROR("CD-4000","데이터 오류가 발생했습니다. "),
    REQUIRED_DATA_NULL("CD-4003","필수 입력 파라미터가 누락되었습니다. (required data is null)"),
    FAIL_SEARCH_USER("CD-4004", "사용자 계정정보 조회에 실패했습니다. (fail search)"),
    USER_ID_NOT_EXIST("CD-4005", "사용자 ID 값이 누락되었습니다. (required data is null)"),
    DB_ERROR("CD-9997", "내부 데이터 조회 중 에러가 발생했습니다."),
    ERROR_CODE_NOT_EXIST("CD-9998", "미등록된 에러 코드 입니다. 관리자에게 문의하세요."),
    SERVER_ERROR("CD-9999", "서버 처리 중 에러가 발생했습니다. 관리자에게 문의하세요.");


    private final String code;
    private final String message;

  CustomeCode(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public static CustomeCode fromCode(String code) {

        for (SSOCode constant : values()) {
            if (constant.code.equals(code)) {
                return constant;
            }
        }

        return ERROR_CODE_NOT_EXIST;
    }
}
```

위 코드는 간단한 예제 코드이다.
이처럼 중복되는 에러 코드를 줄이고 코드 관리의 혼잡성을 피하기 위해, 기본적으로 ERROR_CODE_NOT_EXIST 와 같은 값을 선언해주는 것이 좋다고 판단했다.
이를 통해 API 응답을 일관되게 유지할 수 있으며, 예외 상황에서도 명확한 메시지를 제공할 수 있다.

## Exception

```java
@Getter
public class CustomException extends Exception {

    @Serial
    private static final long serialVersionUID = -4864185459566844601L;

    private final String code;
    private final String message;

    public CustomException(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public CustomException(CustomeCode code) {
        this.code = code.getCode();
        this.message = code.getMessage();
    }

}
```

```java
@RestControllerAdvice
public class CustomExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(CustomExceptionHandler.class);

    /** Exception : 500 */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Response<?>> handleException(Exception ex) {
        logger.error("[ CustomExceptionHandler Error ] : ", ex);
        return new ResponseEntity<>(
                new Response<>(CustomCode.SERVER_ERROR.getCode(), CustomCode.SERVER_ERROR.getMessage()),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

```

이 코드는 프로젝트 초기 설정 시 예외 처리를 어떻게 관리할지에 대한 예제이다.
모든 컨트롤러에서 발생하는 예외를 잡기 위해 `@RestControllerAdvice` 를 사용하며, 이를 통해 기본적인 HTTP 상태 코드와 함께 코드 및 메시지를 응답으로 전달할 수 있다.
이처럼 예외를 중앙에서 처리하면서 적절한 코드와 메시지를 제공하여, 일관된 방식으로 예외를 관리할 수 있다.


## try catch

### controller

```java
@PostMapping(value = "/getUserInfo")
public Response<?> getLoginInfo(@RequestBody RequestBody request) {
    try {
        return new Response<>(CustomCode.OK,service.getLoginInfo(request));
    } catch (CustomException ce) {
        return new Response<>(CustomCode.fromCode(ce.getCode()),null);
    }catch (Exception e) {
        return new Response<>(CustomCode.SERVER_ERROR,null);
    }
}
```

### service

```java
public Object getLoginInfo(RequestBody request) throws VitaException {
  ValidUtil.validNull(request.getId(),CustomeCode.USER_ID_NOT_EXIST);
  
    try {
        return mapper.getLoginInfo(request);
    }catch (Exception e) {
        throw new VitaException(CustomCode.FAIL_SEARCH_USER);
    }
}
```

필자는 예외 처리를 어떻게 하면 가장 효율적으로 관리할 수 있을지 많은 고민을 했다.
MVC 패턴에서 어디서 `throw`하고 어디서 `catch`해야 적절한 코드와 메시지를 전달할 수 있을까?

고민 끝에, 컨트롤러에서 예외를 `catch`하고 적절한 응답을 반환하는 방식이 유지보수에 가장 유리하다는 결론을 내렸다.
서비스 단에서는 내부 로직에 맞게 예외를 던지고, 컨트롤러에서 이를 받아 처리하는 방식이 보다 효율적이다.

예를 들어, DB 조회 중 중복, NULL 값 등 다양한 예외 상황을 서비스에서 감지하고, 컨트롤러에서 이를 적절한 응답 코드로 변환하면 예외 처리가 더 명확하고 일관되게 관리될 수 있다.

## Response Body Object

```java
@Getter
@Setter
public class Response<T> {

    private String resultCode;
    private String resultMessage;
    private T data;

    public Response(String resultCode, String resultMessage, T data) {
        this.resultCode = resultCode;
        this.resultMessage = resultMessage;
        this.data = data;
    }

    public Response(CustomCode constant, T data) {
        this.resultCode = constant.getCode();
        this.resultMessage = constant.getMessage();
        this.data = data;
    }
}
```

이 클래스는 API 응답을 표준화하기 위한 객체다.
`제네릭 타입 <T>`를 사용해 어떤 데이터든 담을 수 있도록 설계되었으며,
응답 코드와 메시지를 함께 전달하여 클라이언트가 응답을 쉽게 해석할 수 있도록 한다.

또한, `CustomCode`를 활용해 일관된 방식으로 응답을 생성할 수 있어 가독성과 유지보수성이 향상된다.
추가적으로, `isSuccess` 같은 필드를 도입하면 성공 여부를 더 명확하게 표현할 수도 있다.


## 마무리

오늘은 다양한 REST API 를 경험하며, 필자의 관점에서 정리해 보았다.
정답은 아닐 수 있지만, 개인적인 경험을 바탕으로 추천하는 방식이다.


[sunghomong 의 깃 허브](https://github.com/sunghomong) <br>
[sunghomong 의 블로그](https://sunghomong.github.io/)
