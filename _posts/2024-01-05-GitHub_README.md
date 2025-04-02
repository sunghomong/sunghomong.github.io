---
title: 깃 허브 프로필 꾸미기 (GitHub README)
date: 2024-01-05 15:00:00 +0800
categories: [GitHub,README 꾸미기]
tags: [GitHub,README]
image: /assets/img/post_images/gitHub/github01.png
---

# 🧐 깃 허브 꾸며야 될까?...

안녕하세요. 올해 개발자 풀 스택 개발 과정을 수료 후 취업을 준비 중인 개발자입니다.
이 글이 나중에 나한테, 또는 누군가한테 도움이 될까 기록을 남깁니다.<br>
## 필자가 깃 허브를 꾸민 이유

- 어느 기업이든 필수적으로 보는 깃 허브 페이지
- 개발의 관심도를 어필할 수 있는 프로필
- 치열한 경쟁 속 차별화된 나의 깃 허브

아무래도 기업 차원에서 깃 허브 페이지를 보기에 꾸며서 안 좋을 건 없다고 생각 들었습니다. 그리고 기업 차원에서는 개발에 관심도를 보기에 물론 포트폴리오, 이력서도 있지만 깃 허브도 포함된다고 생각이 들기에 꾸미기 시작했습니다. (개인적인 생각)

# 💻 깃 허브 꾸미기

당시에 깃 허브를 꾸몄던 순서대로 글을 써보려고 한다.<br>
[필자 블로그](https://github.com/sunghomong)

## 👤 프로필 꾸미기 

<div style ="text-align:center;">
  <img src="/assets/img/post_images/gitHub/github01.png" alt="github01" style ="max-height:500px;">
</div>


이 부분은 **Edit Profile** 버튼을 클릭 후 본인 이름, 소개, 성별, 국적, 자신을 알려줄 수 있는 사이트 링크들 등 자신의 프로필을 꾸미면 될 거 같다.

## 📌 README.md

깃 허브를 처음 들어갈 때 나오는 본문 화면을 꾸미기 위해서는 본문의 README가 필요하다.

<div style ="text-align:center;">
  <img src="/assets/img/post_images/gitHub/github02.png" alt="github02" style ="max-height:600px;">
</div>

### 프로필과 연동되는 repository 생성

<img src="/assets/img/post_images/gitHub/github03.png" alt="github03">

1. Github 접속 > Repository > New 클릭
2. repository 본인의 **계정 ID와 동일한 name**을 적을 시에 저렇게 고양이 표시가 나오면서 본인의 특별한 레파지토리를 생성 가능하다고 뜰 거다. (저 빨간색 오류는 제가 이미 생성해서 나온 오류)
3. 하단의 **public, Add a README file**이 체크가 되어 있는지 확인한 후 생성!!
4. 생성이 완료됐으면 본인 ID의 repository가 생성된 걸 확인 가능하다. 이후 작업은 gitgub 페이지 자체에서 수정하거나 본인 로컬로 clone 후 수정 해도 상관없다.

### 본문 꾸미기

꾸미는 부분은 개인 취향적이기에... ㅎㅎ<br>
제가 꾸민 방법은 아래와 같습니다.

#### 헤더 꾸미기

저는 본문의 헤더 부분을 동적인 표현을 위해 두 가지의 API를 사용했습니다. <br><br>
[capsule-render.vercel.app](https://capsule-render.vercel.app/) <br>
[readme-typing-svg.demolab.com](https://readme-typing-svg.demolab.com/demo/) <br><br>
이 두 개의 사이트에서 원하는 부분을 스타일 해서 코드를 복사해 가져올 수 있습니다. 저 같은 경우에는 이렇게 표현했습니다.<br><br>

![wave](https://capsule-render.vercel.app/api?type=waving&color=6994CDEE&text=&animation=twinkling&height=100)

[![Typing](https://readme-typing-svg.demolab.com?font=Alkatra&weight=500&size=45&duration=4000&pause=3&color=6994CDEE&center=false&vCenter=false&multiline=true&repeat=true&width=1000&height=100&lines=Welcome+to+sunghomong's+GitHub!+👋)](https://git.io/typing-svg)

```html
![wave](https://capsule-render.vercel.app/api?type=waving&color=6994CDEE&text=&animation=twinkling&height=100)

[![Typing](https://readme-typing-svg.demolab.com?font=Alkatra&weight=500&size=45&duration=4000&pause=3&color=6994CDEE&center=false&vCenter=false&multiline=true&repeat=true&width=1000&height=100&lines=Welcome+to+sunghomong's+GitHub!+👋)](https://git.io/typing-svg)
```



#### [Shields.io](https://shields.io) : 본문에 뱃지 넣기

저 같은 경우에는 연락처, 기술 스택 등 뱃지를 넣을때 이 사이트를 이용했습니다.

<img src="/assets/img/post_images/gitHub/github04.png" alt="github04">

<br>

해당 사이트에 들어가면 자세한 설명이 있습니다. 저는 아래와 같이 사용했습니다.

```html
<img src="https://img.shields.io/badge/html5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="html5"> 
```

- <img src="https://img.shields.io/badge/html5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="html5"> 위의 코드는 이런 모양의 이미지를 띄웁니다.
- ``https://img.shields.io/badge/<MESSAGE>-<COLOR>?style=&logo=&등`` 형태로 본인이 원하는 모양,색,메시지 등 으로 만들 수 있습니다.
- 적절한 ``logo,logoColor``를 원하시는 분은 [simpleicons.org](https://simpleicons.org/) 사이트를 참고 하시면 될 거 같습니다.


## 📌 Pined repo 활용

<img src="/assets/img/post_images/gitHub/github05.png" alt="github05">

- **gists**를 이용한 자신 깃 허브의 활동 내역이라든지 다양한 정보를 가져올 수 있는 기능이 있습니다.
- 저는 위의 이미지와 같이 **자신의 커밋 시간을 비교해 주는** [productive-box](https://github.com/maxam2017/productive-box)와 **자신의 깃 허브 전체 토털 평균을 보여주는** [github-stats-box](https://github.com/bokub/github-stats-box)를 사용했습니다.
- 위의 링크를 들어가 보시면 자세한 설명이 있기에 따로 설명은 생략 하겠습니다.
- 다른 다양한 gists 라이브러리를 이용할 만한 사이트는 [여기](https://github.com/matchai/awesome-pinned-gists)를 참고하시면 될 거 같습니다.


# 마무리

- 오늘은 기업에서 많이 보는 **깃 허브**를 꾸며 보았다.
- 처음에 어떻게 꾸며야 될지 막막했는데 막상 하나하나씩 꾸미다 보니 점점 채워졌다. 꾸미면서 **느낀 점**은 나의 깃 허브 통계 상황을 봤는데 아직 개발자 초기 단계라 그런 건지 좀 허술한 부분들이 많은 것 같다.
- 이 부분을 **채워가는 재미**도 있을 거 같아 앞으로 더 나아가려고 한다

> 긴 글 읽어 주셔서 감사합니다~ :) 다음에 또 좋은 글로 찾아오겠습니다!


[sunghomong 의 깃 허브](https://github.com/sunghomong) <br>
[sunghomong 의 블로그](https://sunghomong.github.io/)
