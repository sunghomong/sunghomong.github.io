---
title: "[SSO Keycloak] SSO 연동 도입기"
date: 2025-07-06 12:00:00 +0800
categories: [ Service,SSO ]
tags: [ Keycloak,java,service,SSO ]
image: https://www.cncf.io/wp-content/uploads/2023/05/image-20.png" alt="https://www.cncf.io/wp-content/uploads/2023/05/image-20.png
---

## 🧐 개발 배경

현재 나는 건강검진 관련 플랫폼을 운영 및 유지보수 중이다.
최근 협력 사업장 측으로부터 **3개 회사 간 SSO(Single Sign-On) 연동을 통해 하나의 통합 페이지처럼 구성해달라**는 요청을 받았다. 이 신규 개발 건을 내가 맡아 진행하게 되었다.

이번 프로젝트의 특징은, 우리 측에서 직접 Keycloak 서버를 구축하는 방식은 아니다.  
3개 회사 외 한 협력사가 Keycloak 서버를 별도로 구축하고 있고  
**우리는 해당 협력사의 Keycloak 서버와 연동하여 필요한 사용자 인증 데이터를 전달해야 하는 구조**이다.

즉, Keycloak 자체를 직접 운용하기보다는  
**외부 Keycloak 서버의 설정과 요구사항에 맞춰 클라이언트 역할을 수행하는 방식의 SSO 연동**을 작업하는 방식이다.

이를 위해선 Keycloak의 SSO 연동 흐름을 이해하는 것이 필요했고 내가 직접 로컬 환경에서 Keycloak 서버를 임시로 구성하여 테스트를 진행해 보았다.

이번 글에서는 **직접 테스트하고 연동한 전체 흐름**을 정리해보려고 한다.

## ⚙️ 연동 방식 & 흐름 설명

<img src="https://www.cncf.io/wp-content/uploads/2023/05/image-20.png" alt="https://www.cncf.io/wp-content/uploads/2023/05/image-20.png">

출처 : [https://www.cncf.io/blog/2023/05/17/securing-cloud-native-microservices-with-role-based-access-control-using-keycloak/](https://www.cncf.io/blog/2023/05/17/securing-cloud-native-microservices-with-role-based-access-control-using-keycloak/)

1. Keycloak 서버의 리소스 등록
   - 협력사 측에서 Keycloak 서버를 운영 중이므로 우리는 클라이언트(client) 등록을 요청
     - client_id
     - client_secret
     - redirect_uri
     - 인증 방식 (confidential, public 등)
2. SSO 요청 및 인증 흐름
   1. 사용자가 로그인 버튼 클릭 → SSO 인증 요청
   2. 브라우저는 Keycloak 로그인 페이지로 리다이렉트
   3. Keycloak에서 로그인/회원가입 처리 -> 각 사 REST API 를 통해 회원가입 정보 전달
   4. 로그인 성공 시, redirect_uri 로 코드(code) 및 정보 전달
   5. 우리 시스템은 받은 code 를 바탕으로 Access Token 및 사용자 정보 요청
   6. 사용자 정보 기반으로 내부 사용자 매핑 및 세션 처리

[공식홈페이지](https://www.keycloak.org/)

## 💻 코드 예제

### javascript (Ajax) - 컨트롤 할 빈 페이지

```javascript
/**
 * SSO Login 버튼 클릭 시 동작
 * */
function ssoLogin() {
  $.ajax({
    url: '/ssoLogin/getSSOLoginRedirectUrl',
    type: 'POST',
    data: { requestURI : requestURI },
    success: function(data) {
      if (data) {
        /* 전달 받은 URL 로 페이지 전환 */
        location.replace(data);
      } else {
        alert('내부 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        location.replace('/loginPage');
      }
    },
    error: function(xhr, status, error) {
      console.error('SSO 인증 오류:', error);

      alert('내부 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      location.replace('/errorPage');
    }
  });
}
```

### Controller (Ajax)

```java
@RequiredArgsConstructor
@Slf4j
public class SSOAuthController {

  private String redirectUri;
  private String state;
  @Value("${keycloak.client-id}")
  private String clientId;
  @Value("${keycloak.client-secret}")
  private String clientSecret;
  @Value("${keycloak.authorization-uri}")
  private String authorizationUri;
  @Value("${keycloak.scope}")
  private String scope;
  @Value("${keycloak.auth-urn}")
  private String authUrn;

  private void setSSOAuthSetting(String redirectUri, String state) {
    this.redirectUri = redirectUri;
    this.state = state;
  }

  @PostMapping(value = "/getSSOLoginRedirectUrl")
  public ResponseEntity<String> getSSOLoginRedirectUrl(HttpServletRequest request, HttpServletResponse response) throws Exception {
    try {
      String requestURI = request.getParameter("requestURI");
      String baseUrl = SSOUtil.getBaseUrl(request);
      String url = baseUrl + authUrn;
      String bridgeUrl = baseUrl + "/loginPage";

      setSSOAuthSetting(url, SSOUtil.setState(request, response, url, requestURI, bridgeUrl));

      String authUrl = authorizationUri
        + "?client_id=" + clientId
        + "&redirect_uri=" + redirectUri
        + "&response_type=code"
        + "&scope=" + scope
        + "&nonce=" + SSOUtil.generateRandomValue(20)
        + "&state=" + state;

      log.debug("authUrl : {}", authUrl);
      return ResponseEntity.ok(authUrl);
    } catch (Exception e) {
      log.error("로그인 중 에러 발생 : ", e);
      throw e;
    }
  }
}
```

- 용어 정리
  - 🔑 client_id : 어느 애플리케이션에서 요청했는지 식별 값
  - 🔁 redirect_uri : 인증 결과를 전달할 콜백 주소
  - 📩 response_type : 인증 후 어떤 방식으로 응답을 받을지 지정
  - 📦 scope : 요청하는 정보의 범위 (OIDC)
  - 🔐 nonce : 재생 공격(replay attack)을 방지하기 위한 임의의 문자열
  - 🛡️ state : 요청과 응답을 연결하기 위한 고유 식별자 (CSRF 공격 방지)

### server (callBack)

```java
private String ERROCODE = "9999";

@GetMapping(value = authUrn)
public String ssoCallBack (
  @ModelAttribute Oauth2Info oauth2Info,
  HttpSession session,
  RedirectAttributes redirectAttributes,
  HttpServletRequest request) {
  
  log.debug("authInfo : {}", oauth2Info);
  String redirectPage = "redirect:/loginPage";
  String requestURI = "";
  String state = LoginUtil.getCookieValue(request, "state");

  if (!Standard.isEmpty(state)) {
    Map<String, String> stateMap = LoginUtil.stateParamParser(state);

    if (stateMap.containsKey("requestURI")) {
      requestURI = stateMap.get("requestURI");
    }
  }

  if (ObjectUtils.isEmpty(oauth2Info)) {
    setRedirectAttributes(redirectAttributes, "잘못된 요청입니다. 로그인 재시도를 부탁드립니다.", ERROCODE);
    return redirectPage;
  }
  
  /* 대상 일치 여부 판단 (CSRF 공격 방지) */
  if (isInvalidRequest(oauth2Info, state)) {
    log.warn("[sso bad request] sso 요청 대상 불 일치");
    setRedirectAttributes(redirectAttributes, "잘못된 요청입니다. 로그인 재시도를 부탁드립니다.", ERROCODE);
    return redirectPage;
  }

  try {
    /* 전달 받은 code 기반으로 KeyCloak 서버에 Auth 인증 정보 요청 */
    SSOAuthInfoResponse response = ssoService.getAccessToken(oauth2Info.getCode());

    /* ============= Access Token 내부 정보로 내부 회원 정보 관리 ============ */
    Map<String,Object> map = SSOUtil.getTokenMap(response.getAccessToken());
    /* ================================================================== */
    
    /* 내부 조건에 맞게 session setting */
    setSSOLoginSession(session,"token 을 통한 회원 DB 정보 조회 후 내부 서비스에 맞는 DTO 전달");

    /* 요청 당시의 requestURI 를 cookie 에 등록 및 SSO 인증 흐름 체계 거친 후 요청 당시 페이지로 이동 컨트롤 */
    if (StringUtils.isNotBlank(requestURI)) {
      return "redirect:" + requestURI;
    }

    return "redirect:/main";
  }catch (SSOException se) {
    log.error("[ssoCallBack err] error code : {}", se.getCode());
    setRedirectAttributes(redirectAttributes, SSOCode.SERVER_ERROR.getMessage(), ERROCODE);
    return new SSOResponse<>(SSOCode.fromCode(se.getCode()),null);
  }catch (Exception e) {
    log.error("[ssoCallBack err] error : ", e);
    setRedirectAttributes(redirectAttributes, SSOCode.SERVER_ERROR.getMessage(), ERROCODE);
    return new SSOResponse<>(SSOCode.SERVER_ERROR,null);
  }
}

/**
 * redirect request valid check
 */
private boolean isInvalidRequest(Oauth2Info oauth2Info, String state) {
  return StringUtils.isEmpty(oauth2Info.getCode()) ||
    StringUtils.isEmpty(oauth2Info.getState()) ||
    StringUtils.isEmpty(state) ||
    !state.equals(oauth2Info.getState());
}

/**
 * redirect flash msg and code 세팅
 */
private void setRedirectAttributes(RedirectAttributes redirectAttributes, String message, String code) {
  redirectAttributes.addFlashAttribute(SSO_MSG, message);
  redirectAttributes.addFlashAttribute(SSO_CODE, code);
}
```

### Service (code -> return AccessToken)

```java
private String redirectUri;
@Value("${keycloak.client-id}")
private String clientId;
@Value("${keycloak.client-secret}")
private String clientSecret;
@Value("${keycloak.token-uri}")
private String tokenUri;

public SSOAuthInfoResponse getAccessToken(String code) throws SSOException {
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

    MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
    params.add("grant_type", "authorization_code");
    params.add("code", code);
    params.add("redirect_uri", redirectUri);
    params.add("client_id", clientId);
    params.add("client_secret", clientSecret);

    return Connection.sendRequest(tokenUri,params,SSOAuthInfoResponse.class,headers);
}
```

### Utility

#### Port Setting

```java
public static String getBaseUrl(HttpServletRequest request) {
  String scheme = request.getScheme();
  String serverName = request.getServerName();
  int port = request.getServerPort();

  boolean isDefaultPort = (port == 80 && "http".equals(scheme)) || (port == 443 && "https".equals(scheme));
  
  return isDefaultPort || port == -1
    ? scheme + "://" + serverName
    : scheme + "://" + serverName + ":" + port;
}
```

#### Cookie Setting

```java
private String setState(HttpServletRequest request,HttpServletResponse response,String returnUrl,String requestURI,String bridgeUrl) throws UnsupportedEncodingException {
  /* 기존 쿠키 삭제 */
  LoginUtil.clearCookie(request,response,"state");

  /* 새로 state 값 설정 */
  String text = generateRandomValue(10);
  log.debug("returnUrl : {} ", returnUrl);
  String stateText = URLEncoder.encode("secret=" + text + "&returnUrl=" + returnUrl + "&bridgeUrl=" + bridgeUrl + "&requestURI=" + requestURI, "UTF-8");

  /* 새로운 쿠키 생성 */
  Cookie cookie = new Cookie("state", stateText);
  cookie.setMaxAge(60*60);
  cookie.setPath("/");
  response.addCookie(cookie);
  log.debug("state : {} ", stateText);

  return stateText;
}
```

#### Cookie Get

```java
public static @Nullable String getCookieValue(HttpServletRequest request, String cookieName){
    Cookie[] cookies = request.getCookies();

    if (cookies != null) {
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals(cookieName)) {
                return URLDecoder.decode(cookie.getValue(), StandardCharsets.UTF_8);
            }
        }
    }

    return null;
}
```

#### State Parsing

```java
public static Map<String, String> stateParamParser(String state) {
    Map<String, String> paramMap = new HashMap<>();

    // 각 파라미터 분리
    String[] pairs = state.split("&");
    for (String pair : pairs) {
        String[] keyValue = pair.split("=", 2); // '='로 키와 값을 분리
        String key = URLDecoder.decode(keyValue[0], StandardCharsets.UTF_8);
        String value = URLDecoder.decode(keyValue[1], StandardCharsets.UTF_8);
        paramMap.put(key, value);
    }

    return paramMap;
}
```

#### 보안성 난수 생성

```java
public static String generateRandomValue(int length) {
    final String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    final Random random = new SecureRandom();

    return random.ints(length, 0, characters.length())
            .mapToObj(characters::charAt)
            .collect(StringBuilder::new, StringBuilder::append, StringBuilder::append)
            .toString();
}
```

#### Access Token Map parsing

```java
public static Map<String, Object> getTokenMap(String token) throws IOException {

    String[] splitString = token.split("\\.");
    String base64EncodedBody = splitString[1];
    String tokenBody = new String(Base64.getDecoder().decode(base64EncodedBody));
    log.debug("[getTokenMap] tokenBody : {}", tokenBody);

    return new ObjectMapper().readValue(tokenBody, HashMap.class);
}
```

## ✅ 성과 (2025-02 ~ 2025-06)

<img src="/assets/img/post_images/service/ssoJava01.png" alt="img"/>

- 회원 가입률 및 전환율 증가
  - 기존 대비 가입 장벽 대폭 감소
  - 가입 이탈률 감소
  - 전체 가입자의 약 84% 이상이 SSO를 통해 가입
  - 기존 대비 약 5배 이상의 유입 효과
- 로그인/회원가입 시간 단축
- 보안 강화
  - OAuth2/OpenID 인증 체계로 보안 신뢰성 상승
  - CSRF/Replay Attack 방지를 위한 state, nonce 도입
- 운영 효율성 증대
  - 신규 협력사 확장 시 인증 방식 일원화 가능 → 확장성 강화
- 협력사와의 통합 경험 개선
  - 사용자 입장에서 하나의 서비스처럼 느껴짐
  - B2B 협력사에서 만족도 상승 (→ 재계약, 추천 가능성 증가)

## 📘 마무리 & 회고

이번 글에서는 실제 서비스에 SSO 연동을 적용한 과정을 정리해보았다.

기존 운영 중인 사이트에 SSO를 붙이는 작업이었기 때문에 예상보다 시간이 더 소요되었고
Interceptor 설정 등으로 URL 라우팅 제어에도 많은 신경을 써야 했다.

해당 SSO 연동은 기존 사이트에서 연동하는거라 시간이 다소 소비되었고 interceptor 의 추가로 각종 url 호스팅을 잡을 필요가 있었다.

> 💡  SSO 인증은 언어나 프레임워크에 따라 구현 방식이 조금씩 다르다.
이번 프로젝트가 신규 사이트였다면 Spring Security를 중심으로 좀 더 정형화된 방식으로 구성할 수도 있었을 것이다.
{: .prompt-info }

이번 작업은 나에게 첫 실무 SSO 연동 경험이었다.
초기에는 Keycloak 개념을 이해하는 데 다소 시간이 걸렸지만
직접 로컬 환경에 Keycloak 서버를 띄워 테스트하면서 인증 흐름을 명확히 이해할 수 있었다.

이번 경험을 통해 OAuth2 / OpenID Connect 기반 인증 체계에 대한 이해도를 높일 수 있었고
실제 서비스 환경에서 어떻게 적용해야 하는지 큰 흐름을 배울 수 있었다.

이 글 외에도 local 에서 Keycloak 설치부터 연동 및 실행 했던 과정도 정리할 예정이다.

이 글이 Keycloak이나 SSO 연동을 고민하는 개발자들에게
작은 참고라도 되었으면 좋겠다.
