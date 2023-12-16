---
title: (TIL_React) 리엑트 설치부터 실행까지
author: sunghomong
date: 2023-12-16 15:00:00 +0800
categories: [TIL,TIL_React]
tags: [TIL,Daily,React]
---


# 리액트를 공부하게 된 계기

취업을 준비하면서 `리액트`에 관심을 갖게 되었다. 아무래도 기업에서 리액트, 뷰 등 사용하는 개발자를 원하기 때문이다.
아무래도 기존에 사용했던 방식과 다르기 때문에 강의자료가 필요했다.
그래서 찾아보다가 [코딩 애플](https://www.youtube.com/@codingapple)님의 강의를 찾게 되어서 이분 강의를 통해 배우고 느낀 점들을 하나씩 기록해 볼 생각이다.

# 리액트란?

네이버 사전적 의미로는 단일 웹 페이지나 모바일 앱에서 사용자 인터페이스 중 `화면에 표시되는 뷰 부분의 개발`에 사용되는 `자바스크립트 라이브러리`라고 설명 되어있다.
따로 리액트를 검색하면서 찾아본 결과 기존의 HTML과 css를 결합해서 사용할 수 있어서 `확장성이 뛰어난 라이브러리`라 생각하면 될 거 같다. (공부하고 잘 사용만 할 수 있다면 진짜 편리할듯...)

# 리액트 설치

리액트를 설치하려면 기본적으로 필요한 것들이 있다.

- node.js 설치
- Visual Studio Code 설치

node.js 설치하는 이유는 소프트웨어 플랫폼으로서 리액트를 HTML 자체에서 하나씩 다운받는 번거러움을 줄여주기 때문이다.

두개 설치를 완료했다면 아래와 같이 진행해주면 된다.

1. 작업하고자 하는 하나의 폴더 생성 (workspace)
2. 생성한 후 해당 폴더 (Shift + 우클릭) 후 `powerShell 열기`

   <img src="https://i.ibb.co/DCVGVvm/react-start-power-Shell.png" alt="react-start-power-Shell">

3. powerShell창에 명령어 입력 후 `project 생성`

``` bash
npx create-react-app (프로젝트명)
```
<img src="https://i.ibb.co/47jM3xG/react-problem-resolve.png" alt="react-problem-resolve">

위의 프로젝트명은 본인이 원하는 프로젝트명을 작성하면 된다. 생성이 완료됐다면 npm 관련된 명령어들이 나오면서 완료됐다는 걸 확인할 수 있을 것이다.<br>

4. 해당 폴더 vs code 열고 난 후 터미널에 `npm start` 입력

<img src="https://i.ibb.co/4Pz9JRk/react-start-main.png" alt="react-start-main">

<img src="https://i.ibb.co/2gNjjv1/react-start-terminal.png" alt="react-start-terminal">

<img src="https://i.ibb.co/yRsWyKb/react-start-page.png" alt="react-start-page">

- 위의 순서대로 `npm start` 입력을 했을 때 2번째 이미지와 같이 성공했다는 글이 나오면서 3번째 이미지와 같은 창이 떴다면 정상적으로 설치와 실행이 마무리된 것이다.


# 마무리

설치와 실행 단계만 진행을 해보았다. 리액트를 따로 알아보면서 느낀 점은 `HTML, CSS, javascript에 관한 기본 지식`이 없다면 입문하기 어려울 거 같았다. 저번 프로젝트에서도 `node.js`를 사용해 봤지만 또 여기서 편리하다는 점을 한 번 더 느끼는 거 같다.
앞으로 리액트를 공부하면서 계속해서 기록해 볼 생각이다.

# 참고

[2022 new 리액트 1강 : 리액트 뽕주입과 설치법](https://www.youtube.com/watch?v=00yJy7W0DQE&list=PLfLgtT94nNq0qTRunX9OEmUzQv4lI4pnP&index=1) <br>
[React(라이브러리)](https://namu.wiki/w/React(%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC))

<br><br>

[sunghomong 의 깃 허브](https://github.com/sunghomong) <br>
[sunghomong 의 블로그](https://sunghomong.github.io/)