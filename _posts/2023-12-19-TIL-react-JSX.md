---
title: (TIL_React) 리액트 JSX 문법 알아보기
author: sunghomong
date: 2023-12-19 15:00:00 +0800
categories: [TIL,TIL_React]
tags: [TIL,Daily,React,JSX]
---

# JSX 란?

리액트를 시작한다면 필수적인 `JSX` 문법!!
정의에 대한 설명은 [리액트 공식 페이지](https://ko.legacy.reactjs.org/docs/introducing-jsx.html) 에 너무 잘 나와있기에 간단하고 이해하기 쉽게 정리하고 넘어가겠습니다!

- JSX는 뭐고 이거를 왜 사용할까?
  - react는 js 안에서 코드를 짜기에 html 언어의 기존의 사용하는 문법을 사용한다면 충돌되는 가능성이 있기에 이를 방지하고자 만든 새로운 문법이라고 이해하면 편할 것 같다.

# JSX 문법

## className

```jsx
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='black-nav'>
        <h4>블로그</h4>
      </div>
      <h4>블로그 글 제목</h4> 
    </div>
  );
}

export default App;
```

- 위의 코드를 보면 css 스타일 및 이벤트 효과를 주기 위한 `class를 className`이라고 정의하는 걸 볼 수 있다.
- 기존의 `html 코드는 class = "black-nav"`로 사용되지만 `react는 js 안에서 코드가 짜이기에 class를 정의하면 하나의 class가 만들어진다.` 그렇기에 이의 충돌을 방지하고자 `className`이라고 문법이 쓰인다.

## {변수명}

```jsx
import logo from './logo.svg';
import './App.css';

function App() {

  let post = '강남 우동 맛집'; // 서버에서 가져온 데이터라고 가정
  // document.querySelector('h4').innerHTML = post; 기존의 js 스타일
  return (
    <div className="App">
      <div>
        <h4>블로그</h4>
      </div>
      <h4>{ post }</h4> 
      {/* 데이터 바인딩 = {변수이름} */}
    </div>
  );
}

export default App;
```

- 기존의 `js 코드는 document.querySelector('h4').innerHTML = post;` 형태의 문법으로 사용자가 보기에도 어려운 코드였다. 하지만 `react에서는 간단하게 {post}`로 데이터를 화면에 출력이 가능하다.
- `데이터 바인딩` : 화면에 있는 객체와 데이터를 일치시키는 것
- 위의 코드를 보면 post(서버에서 가져온 데이터) 변수를 h4 태그 안에 넣어준다. 데이터를 가져와서 h4 태그 부분 화면에 출력되는 것을 확인할 수 있다.

## style = { {이름:'값'} }

```jsx
import logo from './logo.svg';
import './App.css';

function App() {
  
  return (
    <div className="App">
      <div>
        <h4 style={{color : 'red' , fontSize : '16px'}} >
          블로그
        </h4>
        {/* style={{color : 'red' , fontSize : '16px'}} */}
      </div>
      <h4>블로그 글 제목</h4> 
    </div>
  );
}

export default App;
```

- 기존의 `html에서는 style = "color : red; font-size : 16px;"`로 사용된다. 하지만 react에서는 각 태그의 style 속성을 주기 위한 문법이 `style = { {이름:'값'} }` 형태로 쓰이고 `-(하이픈)은 빼기로 인식`하기에 fontSize로 사용되는 것을 확인할 수 있다.


# 마무리

오늘도 [코딩 애플](https://www.youtube.com/@codingapple) 님의 강의를 들으면서 `react JSX 문법`에 대해 공부해 봤다. 기존에 js를 사용한 입장으로서 js에서 복잡하게 사용했던 문법들을 `편하게 접근`할 수 있을 거 같다. 일찍 공부를 시작했다면 얼마나 좋았을까...라는 생각이 드는 것도 사실... ㅎㅎ 공부를 하면서 데이터가 어떻게 받아와지고 화면에 반복적으로 출력을 한다는 등 `다양한 기능`을 안다면 정말 편리할 거 같다는 생각이 많이 든다.


# 참고

- [2022 new 리액트 2강 : JSX 문법은 3개가 다임](https://www.youtube.com/watch?v=qocQ7ekeMI4)
- [JSX 문법 설명](https://ko.legacy.reactjs.org/docs/introducing-jsx.html)

<br><br>

[sunghomong 의 깃 허브](https://github.com/sunghomong) <br>
[sunghomong 의 블로그](https://sunghomong.github.io/)


