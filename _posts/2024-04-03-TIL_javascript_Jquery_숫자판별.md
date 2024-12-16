---
title: (JS) 정규식으로 숫자 체크하기 (with.JQuery)
date: 2024-04-03 12:00:00 +0800
categories: [TIL,TIL_JS]
tags: [js,Jquery,정규식]
image: /assets/img/logo_images/jquery.png
---

## /^[0-9]*$/ - 숫자만 이루어져 있는지 체크하는 정규식

``^`` : 문자열의 시작을 나타냅니다. <br>
``[0-9]`` : 대괄호 내의 모든 문자를 대상으로 합니다. 이 경우, 모든 숫자를 나타냅니다(즉, 0에서 9까지).<br>
``*`` : 앞선 문자나 그룹이 0번 이상 반복될 수 있음을 나타냅니다.<br>
``$`` : 문자열의 끝을 나타냅니다.

```js
var numRegex = /^[0-9]*$/;
```

## oninput 이벤트

해당 이벤트는 input 태그 안의 값들이 변경 될때마다 이벤트가 발생합니다.

```js
$("#text").on("input",function() {});
```

## 실시간 유효성 검사

위의 정규식과 Jquery의 oninput 이벤트를 활용해서 간단한 예제를 보여드리겠습니다.

```js
$("#text").on("input",function() {
	let testBoolean;
	
	const numRegex = /^[0-9]*$/;

	if (numRegex.test($(this).val())) { // 해당 #text 값이 정규식과 일치할 경우
		testBoolean = true;
	} else { // 일치하지 않을 경우
		// alert = "숫자만 입력하세요."
		testBoolean = false;
	}
});
```

- 위의 코드를 설명하자면 이렇습니다. html 에서 id 값 text라는 input 태그 안에 실시간으로 입력하면서 입력할때마다 실시간으로 숫자인지 판별해줍니다. 예를 들어 숫자의 길이에 제한을 두고 싶다면 ``$(this).val().length >= 3)`` 이와 같이 숫자 길이에 제한을 두면 될 거 같습니다.

## 마무리

오늘은 숫자를 판별하는 정규식과 Jquery의 oninput 이벤트에 대해서 알아봤습니다.
각자 상황에 따라 알맞은 정규식을 쓰고 알맞은 이벤트를 활용하는것을 추천드립니다.

잘못된 코드가 있는 경우 피드백은 큰 도움이 됩니다. 

<br>

[sunghomong 의 깃 허브](https://github.com/sunghomong) <br>
[sunghomong 의 블로그](https://sunghomong.github.io/)
