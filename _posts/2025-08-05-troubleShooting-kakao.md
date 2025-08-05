---
title: "[kakao] 실무 중 직접 경험한 카카오 인앱 브라우저 이슈/해결 방법"
date: 2025-08-04 12:00:00 +0800
categories: [trouble shooting,kakao]
tags: [ kakao,url,kakao browser,browser,스킴 ]
image: https://biz.chosun.com/resizer/v2/FO6B7SPR4ZFKDA7AZ2IMOG42QE.png?auth=c2dcc27b9ff8759b9c125df22abe35821370ff0dca4a3d2ff5decdd5c66783c5&width=616
---

## ⛔ 문제 상황

현재 나는 예약 플랫폼을 운영 및 관리 중이다.
사용자의 편의성을 높이기 위해 카카오톡 템플릿 메시지를 통해 예약 URL을 전송하고 있으며
해당 링크를 클릭한 사용자가 카카오톡 인앱 브라우저를 통해 예약 페이지에 접근하는 흐름을 구성하였다.

그러나 인앱 브라우저 환경에서 다음과 같은 문제들에 직면했다.

- window.location.replace(), window.open() 등 모든 JS 기반 이동 제어가 무시됨
- a.click() 과 같은 강제 클릭 트리거도 작동하지 않음
- 결과적으로 원하는 방식으로 페이지를 열거나 리다이렉트하는 것이 불가능함


## 🧐 문제 원인

이 문제의 핵심은 카카오 인앱 브라우저의 보안 및 UX 정책 때문이다.
인앱 브라우저에서는 스크립트를 통한 자동 이동이나 팝업을 제한하고 있으며
이는 피싱, 자동 리디렉션 등의 보안 문제를 막기 위한 조치다.

- 카카오 인앱 브라우저는 window.open, location.href, replace, a.click() 등의 JS 이동 시도를 차단하거나 무시함
- 오직 사용자의 직접 클릭(예: a href target="_blank 형태의 실질적인 클릭 이벤트)만 허용
- 특히 외부 링크를 새 창에서 열도록 유도할 경우 명시적인 사용자 인터랙션이 필수

## ⛔문제 해결

문제 해결 방안으로는 아래와 같은 경우들이 있었다.

### kakaotalk://web/openExternal?url= 스킴 사용 (외부 브라우저 열기)

카카오 인앱 브라우저에서 외부 브라우저로 강제 이동시키고 싶다면 아래와 같은 스킴을 사용할 수 있다.

```javascript
location.href = 'kakaotalk://web/openExternal?url=' + encodeURIComponent(url);
```

이 방식은 카카오에서 공식적으로 제공하는 스킴으로 지정한 URL을 외부 브라우저(크롬/사파리 등)로 열도록 유도한다.

추가적으로 안드로이드 환경이라면 아래와 같이 사용이 가능하다. (IOS는 제한적)

```javascript
location.href = "intent://yourdomain.com#Intent;scheme=https;package=com.android.chrome;end";
```

### 인앱 브라우저 닫기 스킴 활용

만약 외부 링크를 띄우고 나서 인앱 브라우저 자체를 닫고 싶을 때는 다음 스킴을 사용할 수 있다.

```javascript
location.href = (/iPad|iPhone|iPod/.test(navigator.userAgent))
  ? "kakaoweb://closeBrowser"
  : "kakaotalk://inappbrowser/close";
```

iOS/Android 분기 처리 필수

### 사용자 인터랙션 기반의 링크 클릭 유도

사용자가 직접 누를 수 있는 버튼 형식으로 유도하는 것도 한 방법이다.

```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">예약 페이지로 이동</a>
```

### agent 확인

```javascript
const isKakaoTalk = userAgent.includes('kakaotalk');
if (isKakaoTalk) {
  ...
}
```

## 마무리

오늘은 실무에서 실제로 겪었던 카카오 인앱 브라우저 이슈와 그에 대한 대응 방법을 적어보았다.
카카오 링크를 통해 유입되는 사용자 흐름을 안정적으로 처리하기 위해서는 인앱 브라우저의 특성과 제약을 명확히 이해하고 이에 맞는 대응 로직을 갖추는 것이 필요할 것 같다.

해당 내용을 통해 비슷한 문제를 겪고 계신 분들께 실질적인 도움이 됐으면 좋겠다.

<br>

[sunghomong 의 깃 허브](https://github.com/sunghomong) <br>
[sunghomong 의 블로그](https://sunghomong.github.io/)
