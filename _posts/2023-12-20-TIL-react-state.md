---
title: (TIL_React) 리액트에서 state를 사용하는 이유
author: sunghomong
date: 2023-12-20 15:00:00 +0800
categories: [TIL,TIL_React]
tags: [TIL,Daily,React]
---

# 리액트 state란??

- state는 컴포넌트 내에서 **지속적으로 변경**이 일어나는 값들을 관리하기 위해 사용된다.
- 사용자의 입력에 따라 새로운 값으로 **자동 재랜더링**이 되며 변경이 가능하다.
- 이해하기 쉽게 설명하면 html에서 변동 시 자동으로 반영되게 하려고 이 state를 사용한다고 생각하면 될 거 같다.

# useState()

```jsx
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let [글제목, b] = useState('남자 코트 추천'); // b = state 변경도와주는 함수
  // 글제목 = '남자 코트 추천' , b = 함수
  let [logo, setLogo] = useState('ReactBlog'); // 사이트 로고는 굳이 state를 쓸필요 없다

  return (
    <div className="App">
      <div className='black-nav'>
        <h4>ReactBlog</h4>
      </div>
      <div className='list'>
        <h4>{ 글제목[0] }</h4>
        <p>2월 17일 발행</p>
      </div>
    </div>
  );
}

export default App;
```

- `import { useState } from 'react';` state를 사용하기 위한 모듈 import 해오기
- `useState`를 이해하려면 `js의 destructuring`을 먼저 이해하면 좋을 거 같다. useState 선언과 동시에 [데이터, 함수] 형태로 `배열 형태`로 리턴해서 가져오게 된다. 여기서 데이터도 배열 형태로 여러 개의 데이터를 묶을 수 있다.
- `사이트 로고, footer 부분 이런 html 부분은 state를 사용할 필요가 없을 거 같다.` state를 사용하는 이유는 `자동으로 html에서 재랜더링`해서 반영이 되는건데 자주 바뀌지 않는 부분은 굳이 쓸 필요가 없다는 거다.

# State 사용해보기

[코딩 애플](https://www.youtube.com/@codingapple)님의 강의에서 나온 숙제를 풀어보았다.

### 아래의 화면과 똑같이 출력해보기

<img src="https://i.ibb.co/ZTjT51D/react-start-study-1.png" alt="react-start-study-1">

### 코드 작성

``` jsx
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let [글제목, b] = useState(['남자 코트 추천','강남 우동맛집','파이썬독학']);

  return (
    <div className="App">
      <div className='black-nav'>
        <h4>ReactBlog</h4>
      </div>
      <div className='list'>
        <h4>{ 글제목[0] }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className='list'>
        <h4>{ 글제목[1] }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className='list'>
        <h4>{ 글제목[2] }</h4>
        <p>2월 17일 발행</p>
      </div>
    </div>
  );
}

export default App;
```

- state를 사용해 데이터를 배열(Array) 형태로 묶고 JSX 문법({변수명})을 사용해 html 화면에 배열[index 번호] 형태로 출력


# 마무리

- 오늘은 **react state의 기초**를 공부해 봤다.
- state를 공부해 보면서 **html 어디 부분에 넣으면 편할지가 중요한 거 같다.** 아무래도 html 전체를 state로 묶는다면 헷갈리고 가독성도 안 좋을 거 같다는 생각이 든다.
- 기존에 사용했던 도구들로 html에 데이터를 어떻게 처리해서 보여줄지 고민이 많았는데 react의 state를 사용하면 **서버 측에서 데이터를 가져와서 간결한 코드로 데이터를 반복적,조건적으로 처리할 수 있을거 같다는 생각이 든다.**


# 참고

- [2022 new 리액트 3강 : state 쓰면 뭐가 좋냐면](https://www.youtube.com/watch?v=fE4t2Ovgp-0)
- [4. React 컴포넌트(3) - State 알아보기(React Hooks 사용)](https://goddaehee.tistory.com/301)

<br><br>

[sunghomong 의 깃 허브](https://github.com/sunghomong) <br>
[sunghomong 의 블로그](https://sunghomong.github.io/)