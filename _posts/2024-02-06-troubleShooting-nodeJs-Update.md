---
title: nodeJS 최신 버전으로 업데이트 하는 방법(window 환경_nvm)
author: sunghomong
date: 2024-02-03 14:00:00 +0800
categories: [trouble shooting,AWS]
tags: [trouble shooting,AWS EC2,CPU,Error]
tok: true
---

# ⛔ 문제 상황

갑자기 잘 되던 Node.js 서버에서 한 기능이 안되기 시작했다.

```bash
PS C:\Users\user\Documents\GitHub\github-actions-auto> npm run dev
npm ERR! Missing script: "dev"
npm ERR!
npm ERR! To see a list of scripts, run:
npm ERR!   npm run

npm ERR! A complete log of this run can be found in: C:\Users\user\AppData\Local\npm-cache\_logs\2024-02-06T06_26_45_075Z-debug-0.log
```

위의 코드는 nuxt를 사용하려는 과정에서 런(실행)이 안되어서 나오는 에러 코드이다.

위의 코드를 참고 삼아 chatGPT와 1시간 싸움을 했다... 결국은 다운 누락인거 같았고 nodeJS의 버전을 확인해보니 최신 버전이 아니였다. 그래서 이게 문제인가 싶어 nodeJS의 최신 버전으로 업데이트를 해보려 한다.

처음에는 n페키지를 통해서 쉽게 바꿀 수 있다고 해서 설치를 진행 하려고 했는데... 알고보니 window에서는 지원할 수 없다고 한다.

그렇다면 window 환경에 지원되는게 뭘까 찾아 떠났다.

# 🧐 문제 원인

- nuxt install 시 다운 누락 / nodeJS 최신 버전 X
- window 환경에서는 지원이 안되는 n 페키지

<br>

# ⛔문제 해결

## NVM

nodeJS는 설치 후 최신 버전으로 업데이트 생각이 없다가 요번에 업데이트 관련된 글들을 살펴 보았다. 살펴본 결과 window 에서 지원 해주는 ``NVM``페키지가 있다는 걸 확인 했다.

### exe 다운로드

[NVM.exe 다운로드 사이트](https://github.com/coreybutler/nvm-windows/releases)
해당 페이지에서 exe를 다운을 받는다.

[alt text](</posts/post_images/nvm 다운.png>)

```bash
node -v 
nvm list available
nvm install 17.3.0 (nvm install 원하는 버전)
nvm list 
nvm use 17.3.0
node -v
```

- 관리자 권한으로 들어간 뒤 위의 명령어를 순차적으로 한다면 정상적으로 nodeJS 버전을 변경 가능하다.
- list available로 뽑을때 최신버전이 어디까지 있는지 확인 가능
- list는 현재 로컬에 nodeJS가 깔려있는 버전 리스트를 보여줌

# 마무리

오늘은 nodeJS의 버전 관련해서 포스팅을 해봤다.
react,nuxt 등 다양한 프레임워크를 사용하면서 nodeJS가 유용하다는 걸 매번 깨닫는 중이다. 버전 관리에도 신경을 많이 써야될 거 같다.

<br>

[sunghomong 의 깃 허브](https://github.com/sunghomong) <br>
[sunghomong 의 블로그](https://sunghomong.github.io/)
