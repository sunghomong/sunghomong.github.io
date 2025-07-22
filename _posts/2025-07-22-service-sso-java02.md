---
title: "[SSO Micro] Microsoft Azure AD(OAuth2.0) SSO 연동 도입기"
date: 2025-07-22 12:00:00 +0800
categories: [ Service,SSO ]
tags: [ Micro,java,service,SSO,Azure,OAuth ]
image: https://learn.microsoft.com/ko-kr/entra/identity-platform/media/v2-oauth2-auth-code-flow/convergence-scenarios-native.svg
---

## 🧐 개발 배경

현재 나는 건강검진 관련 플랫폼을 운영 및 유지보수하고 있다.
최근 외국계 협력사들로부터 SSO(Single Sign-On) 연동을 통한 간편 로그인 기능을 지원해달라는 요청이 들어왔다.
과거에도 SSO 연동 경험이 있었던 나는 이번 신규 개발도 담당하게 되었다.

이번 프로젝트 또한 우리 시스템에서 직접 인증 서버를 운영하는 방식이 아니라
외국계 협력사들이 사용하는 인증 시스템(Microsoft Azure AD)을 통해 인증 과정을 위임받아 처리하는 방식이다.

해당 협력사들은 OAuth2.0 기반의 Microsoft Azure Active Directory(AD) 를 이용해 로그인 시스템을 운영 중이며,
우리는 Azure AD와 연동하여 인증 정보를 받아 사용자 로그인을 처리하는 형태로 구현하게 되었다.

이번 글에서는 **직접 연동한 전체 흐름**을 정리해보려고 한다.

## ⚙️ 연동 방식 & 흐름 설명

<img src="https://learn.microsoft.com/ko-kr/entra/identity-platform/media/v2-oauth2-auth-code-flow/convergence-scenarios-native.svg" alt="intro">

출처 : [https://learn.microsoft.com/ko-kr/entra/identity-platform/v2-oauth2-auth-code-flow](https://learn.microsoft.com/ko-kr/entra/identity-platform/v2-oauth2-auth-code-flow)

1. Microsoft Entra 관리 센터에 클라이언트 등록 요청 (협력사 측 작업)
   - client_id (협력사에서 발급)
   - client_secret (confidential client 인 경우 필수)
   - redirect_uri (인증 완료 후 되돌아올 URI)
   - IP 허용 목록 등록 (우리 시스템 서버의 공인 IP)
   - 인증 방식 (confidential, public 등)
2. SSO 요청 및 인증 흐름
   1. 사용자 로그인 버튼 클릭 → Authorization Endpoint 호출
   2. 브라우저는 협력사 측 Azure AD 로그인 페이지로 리디렉션
   3. 사용자 로그인/회원가입 진행 (협력사 쪽 페이지)
   4. 로그인 성공 시, redirect_uri 로 authorization code 반환
   5. 우리 서버는 받은 code 를 사용하여 Access Token 요청
   6. Azure AD는 Access Token (및 Refresh Token 등) 응답
   7. 응답값 기반으로 내부 사용자 DB 조회 및 회원가입/로그인 처리

[공식홈페이지](https://learn.microsoft.com/ko-kr/entra/identity-platform/v2-oauth2-auth-code-flow)

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

### Controller

```java
@RequiredArgsConstructor
@Slf4j
public class SSOAuthController {

  private String redirectUri;
  private String state;
  private String codeVerifier;
  @Value("${micro.microsoft-url}")
  String microsoftUrl;
  @Value("${micro.auth-urn}")
  String authUrn;
  @Value("${micro.client-id}")
  String clientId;
  @Value("${micro.tenant-id}")
  String tenantId;
  @Value("${micro.client-secret}")
  String clientSecret;
  @Value("${micro.redirect-urn}")
  String redirectUrn;
  @Value("${micro.microsoft-scope}")
  String scope;
  @Value("${micro.response-mode}")
  String responseMode;
  @Value("${micro.response-type}")
  String responseType;
  @Value("${micro.grant_type}")
  String grantType;
  @Value("${micro.code-challenge-method}")
  String codeChallengeMethod;

  private void setSSOAuthSetting(String redirectUri, String state, String codeVerifier) {
    this.redirectUri = uri;
    this.state = state;
    this.codeVerifier = codeVerifier;
  }

  @PostMapping(value = "/getSSOLoginRedirectUrl")
  public ResponseEntity<String> getSSOLoginRedirectUrl(HttpServletRequest request, HttpServletResponse response) throws Exception {
    try {
      String redirectUrl = LoginUtil.getBaseUrl(request,serviceType) + redirectUrn;

      // PKCE용 Code Verifier 및 Code Challenge 생성
      String codeVerifier = LoginUtil.generateCodeVerifier64Byte();
      String codeChallenge = LoginUtil.generateCodeChallenge(codeVerifier);

      // state 와 verifier 정보를 cookie 임시 저장
      setSSOJNJAuthSetting(redirectUrl,LoginUtil.setState(request,response,LoginUtil.generateRandomValue(10)),codeVerifier);

      // scope 인코딩 (공백은 %20으로 인코딩)
      String encodedScope = URLEncoder.encode(scope, StandardCharsets.UTF_8).replace("+", "%20");

      String authUrl = microsoftUrl + "/"
        + tenantId + authUrn
        + "?client_id=" + clientId
        + "&response_type=" + responseType
        + "&redirect_uri=" + redirectUri
        + "&response_mode=" + responseMode
        + "&scope=" + encodedScope
        + "&state=" + state
        + "&code_challenge=" + codeChallenge
        + "&code_challenge_method=" + codeChallengeMethod;

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
  - 🔑 client_id : Azure AD에 등록된 애플리케이션 ID (어떤 앱에서 요청하는지 식별)
  - 🔁 redirect_uri : 인증이 완료된 후 결과를 전달받을 우리 시스템의 콜백 URI
  - 📩 response_type : 응답 방식 지정 (보통 "code" 사용 — Authorization Code Flow)
  - 📦 scope : 요청하는 정보의 범위 (OIDC)
  - 🛡️ state : 요청/응답 연계를 위한 고유 문자열 (CSRF 방지)
  - 🔐 code_challenge : PKCE 보안 강화를 위한 코드 챌린지 문자열
  - 🧮 code_challenge_method : 코드 챌린지 생성 방식 (보통 "S256" 사용)

### server (callBack)

```java
private String SSO_DEFAULT_ERROR_CODE = "9999";

@GetMapping(value = redirect_uri)
public String ssoCallBack (
  @ModelAttribute MicroAzureOauth2Info oauth2Info,
  HttpSession session,
  RedirectAttributes redirectAttributes,
  HttpServletRequest request) {
  
  log.debug("authInfo : {}", oauth2Info);
  String redirectPage = "redirect:/loginPage";
  String state = LoginUtil.getCookieValue(request, "state");

  /* ================== valid check ===================== */
  if (ObjectUtils.isEmpty(oauth2Info)) {
    setRedirectAttributes(redirectAttributes, "잘못된 요청입니다. 로그인 재시도를 부탁드립니다.", SSO_DEFAULT_ERROR_CODE);
    return redirectPage;
  }

  if (StringUtils.isNotEmpty(oauth2Info.getError())) {
    MicrosoftErrorCode code = MicrosoftErrorCode.fromCode(oauth2Info.getError());
    log.error("[sso] error code : {}, msg : {}", code.getCode(), code.getMessage());
    setRedirectAttributes(redirectAttributes, "잘못된 요청입니다. 로그인 후 이용해주시기 바랍니다.", SSO_DEFAULT_ERROR_CODE);
    return redirectPage;
  }
  
  /* 대상 일치 여부 판단 (CSRF 공격 방지) */
  if (isInvalidRequest(oauth2Info, state)) {
    log.warn("[sso bad request] sso 요청 대상 불 일치");
    setRedirectAttributes(redirectAttributes, "잘못된 요청입니다. 로그인 재시도를 부탁드립니다.", SSO_DEFAULT_ERROR_CODE);
    return redirectPage;
  }
  
  /* ===================================================== */

  try {
    /* 전달 받은 code 기반으로 KeyCloak 서버에 Auth 인증 정보 요청 */
    SSOMicroAzureTokenResponse response = ssoService.getSSOMicroAzureAccessToken(oauth2Info.getCode());

    /* ============= Access Token 내부 정보로 내부 회원 정보 관리 ============ */
    Map<String,Object> map = SSOUtil.getTokenMap(response.getAccessToken());
    
    /* 협력사 측과 합의하에 PK 값 정의 */
    String pk = (String) map.get("PK");
    
    VOByPk vo = mapper.getVO(pk);
    /* ================================================================== */
    
    /* 내부 조건에 맞게 session setting */
    setSSOLoginSession(session,"token 을 통한 회원 DB 정보 조회 후 내부 서비스에 맞는 DTO 전달");
    return "redirect:/main";
  }catch (SSOException se) {
    log.error("[ssoCallBack err] error code : {}", se.getCode());
    setRedirectAttributes(redirectAttributes, SSOCode.SERVER_ERROR.getMessage(), SSO_DEFAULT_ERROR_CODE);
    return redirectPage;
  }catch (Exception e) {
    log.error("[ssoCallBack err] error : ", e);
    setRedirectAttributes(redirectAttributes, SSOCode.SERVER_ERROR.getMessage(), SSO_DEFAULT_ERROR_CODE);
    return redirectPage;
  }
}

/**
 * redirect request valid check
 */
private boolean isInvalidRequest(MicroAzureOauth2Info oauth2Info, String state) {
  return StringUtils.isEmpty(oauth2Info.getCode()) ||
    StringUtils.isEmpty(oauth2Info.getState()) ||
    StringUtils.isEmpty(state) ||
    !state.equals(oauth2Info.getState());
}

/**
 * redirect flash msg and code 세팅
 */
private void setRedirectAttributes(RedirectAttributes redirectAttributes, String message, String code) {
  redirectAttributes.addFlashAttribute("SSO_MSG", message);
  redirectAttributes.addFlashAttribute("SSO_CODE", code);
}
```

### Service (code -> return AccessToken)

```java
@Value("${micro.microsoft-url}")
String microsoftUrl;
@Value("${micro.token-urn}")
String tokenUri;

@PostMapping(value = "/getSSOMicroAzureAccessToken")
public SSOMicroAzureTokenResponse getSSOMicroAzureAccessToken(MicroAzureOauth2Info request) throws HopsException {
  String uri = microsoftUrl + "/" + request.getTenant() + tokenUri;

  HttpHeaders headers = new HttpHeaders();
  headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

  MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
  params.add("client_id", request.getClientId());
  params.add("code", request.getCode());
  params.add("redirect_uri", request.getRedirectUri());
  params.add("grant_type", request.getGrantType());
  params.add("code_verifier", request.getCodeVerifier());
  params.add("client_secret", request.getClientSecret());

  SSOMicroAzureTokenResponse response = sendRequest(uri,params, SSOMicroAzureTokenResponse.class,headers);

  /* error check */
  if (StringUtils.isNotBlank(response.getError())) {
    log.error("[micro azure sso] token error cd : {}, error msg : {}", response.getError(), response.getErrorDescription());
    throw new SSOException(response.getError(),response.getErrorDescription());
  }

  /* validate check */
  if (StringUtils.isBlank(response.getAccessToken()) || StringUtils.isBlank(response.getIdToken())) {
    log.error("[micro azure sso] token error accessToken : {}, idToken, {}", response.getAccessToken(), response.getIdToken());
    throw new SSOException(SSOCode.TOKEN_ERROR.getCode());
  }
  
  return response;
}

private static <M, T> T sendRequest(String url, M request, Class<T> responseType, HttpHeaders headers) throws HopsException {
  try {
    HttpEntity<M> entity = new HttpEntity<>(request, headers);

    ResponseEntity<String> responseEntity = restTemplate.exchange(
      url,
      HttpMethod.POST,
      entity,
      String.class
    );

    log.info("[micro azure sso] responseEntity: {}", responseEntity);

    String responseBody = responseEntity.getBody();

    return objectMapper.readValue(responseBody, responseType);
  }catch (HttpClientErrorException | HttpServerErrorException ex) {
    String responseBody = ex.getResponseBodyAsString();
    log.error("[sso] api 요청 실패 응답: {}", responseBody);

    try {
      return objectMapper.readValue(responseBody, responseType);
    } catch (JsonProcessingException je) {
      throw new HopsException(SERVER_ERR);
    }
  }catch (Exception e) {
    log.error("[sso] api 요청 실패 : ", e);
    throw new HopsException(SERVER_ERR);
  }
}
```

### DTO

```java
@Getter
@Setter
public class MicroAzureOauth2Info {

    /** code PK for token */
    private String code;
    /** 상태값 */
    private String state;
    /** error */
    private String error;
    /** error msg */
    private String error_description;
    
}
```

```java
@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class SSOMicroAzureTokenResponse {

    /** 엑세스 토큰 */
    @JsonProperty("access_token")
    private String accessToken;

    /** 재 발급 토큰 */
    @JsonProperty("refresh_token")
    private String refreshToken;

    /** OpenID */
    @JsonProperty("id_token")
    private String idToken;

    /** 토큰의 타입 */
    @JsonProperty("token_type")
    private String tokenType;

    /** 접근 권한 범위 */
    @JsonProperty("scope")
    private String scope;

    /** 유효 시간 */
    @JsonProperty("expires_in")
    private String expiresIn;

    /** 오류 코드 */
    @JsonProperty("error")
    private String error;

    /** 오류 설명 */
    @JsonProperty("error_description")
    private String errorDescription;

    /** 오류 코드 목록 */
    @JsonProperty("error_codes")
    private List<Integer> errorCodes;

    /** 오류가 발생한 시간 */
    @JsonProperty("timestamp")
    private String timestamp;

    /** 요청 추적 ID */
    @JsonProperty("trace_id")
    private String traceId;

    /** 요청 상관 ID */
    @JsonProperty("correlation_id")
    private String correlationId;

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
  String stateText = URLEncoder.encode("secret=" + secretText , "UTF-8");

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

<img src="/assets/img/post_images/service/ssoJava02.png" alt="img"/>

- 회원 전환률 및 사용자 경험 개선
  - 협력사 측 Microsoft 기반 로그인을 통해 기존 계정이 있는 사용자는 별도 가입 없이 빠르게 유입 가능
  - 로그인/회원가입 절차 간소화로 사용자 진입 장벽 감소 및 회원 전환율 상승
- 인증 속도 및 보안 강화
  - OAuth 2.0 / OpenID Connect 기반 인증 도입으로 표준화된 보안 체계 구축
  - state 파라미터를 활용한 CSRF 공격 방지
  - PKCE (code_challenge / code_verifier) 기반 인증으로 Authorization Code 탈취 및 중간자 공격(MitM) 위험 감소
- 운영 효율성 증대
  - SSO 인증 방식 표준화로 향후 신규 협력사 연동 시 개발 부담 최소화
  - 다양한 인증 방식에 대한 내부 대응력을 확보 → 유지보수 효율 향상
- 협력사 만족도 및 사업 확장성 향상
  - 외국계 협력사와의 기술적 연동 경험 축적으로 신뢰 기반 강화
  - 성공적인 연동 경험을 통해 B2B 만족도 향상 및 재계약 가능성 증가
  - 표준화된 인증 연동 경험을 기반으로 타 협력사와의 계약 확대 가능성 확보

## 📘 마무리 & 회고

이번 글에서는 실제 서비스 환경에서 Microsoft Azure OAuth 2.0 기반 SSO 인증 흐름을 적용한 사례를 정리해보았다.

이전에 SSO 연동 경험이 있었기 때문에 전반적인 흐름을 이해하고 구현하는 데는 수월했지만
Microsoft의 OAuth 2.0 체계는 처음 접한 방식이라 공식 문서를 반복해서 참고할 수밖에 없었다.
또한, 다양한 개발자들의 사례를 참고하면서 여러 흐름과 구현 방식이 존재한다는 점도 새롭게 배웠다.

특히 이번 연동 과정에서는 PKCE(code_challenge/code_verifier) 와 같은 보안 요소를 적용하면서
OAuth 보안의 원리와 설계 의도를 깊이 있게 이해할 수 있는 좋은 기회가 되었다.

> 💡  Microsoft Azure OAuth 2.0 인증은 다양한 하이브리드 방식과 흐름이 존재한다.
기회가 된다면 다른 인증 흐름도 실전에서 적용해보며 경험을 넓혀가고 싶다.
{: .prompt-info }

이번 작업은 나에게 두 번째 SSO 연동 경험이었고 이전보다 훨씬 더 매끄럽게 작업을 진행할 수 있었고 
외국계 협력사와의 커뮤니케이션과 협업 역량도 함께 성장할 수 있었던 시간이었다.

무엇보다도 Microsoft 인증 체계에 대한 실제 적용 흐름을 직접 구현해본 경험을 통해
기존 서비스에 이러한 기술을 어떻게 도입할 수 있는지 체감할 수 있었고
비슷한 환경에서의 확장 가능성도 스스로 확인할 수 있었다.

이 글이 Microsoft SSO 연동을 고민하는 개발자들에게 작은 참고자료라도 될 수 있었으면 좋겠다.
