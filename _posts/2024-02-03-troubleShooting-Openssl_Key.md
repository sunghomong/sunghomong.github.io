---
title: Ubuntu openssl Key 길이 문제 해결 과정
author: sunghomong
date: 2024-01-31 22:00:00 +0800
categories: [trouble shooting,AWS]
tags: [trouble shooting,AWS EC2,CPU,Error]
tok: true
---

# ⛔ 문제 상황

![Key 길이 문제](<post_images/key 길이 문제 발생.png>)

key 설정을 하고 실행하려니 key길이 문제 발생

```linux
ssl.SSLError: [SSL: EE_KEY_TOO_SMALL] ee key too small (_ssl.c:3900)
```

배포 공부를 위해 [도커(Docker) 활용 및 배포 자동화 실전 초급 ② - Jupyter Notebook 설치, HTTPS 적용, 시스템 서비스 설정하기](https://www.youtube.com/watch?v=LoYpXoBJPMc&list=PLRx0vPvlEmdChjc6N3JnLaX-Gihh5pHcx&index=2) 과정 중 사설 인증서를 만들고 실행하는 과정에서 오류가 생겼다. error를 내용을 보니 key 길이 관련된 문제인거 같았다.

이거에 대한 해결 방법은 뭐가 있을지 검색해봤다.

# 🧐 문제 원인

일단 저는 ubuntu 버전은 22.04로 최신 버전을 사용했습니다. 강의 내용상에는 18버전을 사용중이였다. 그래서 다른 사람들이 해결한 내용들을 살펴봤다.

[보안 레벨 낮추기](https://ivorycirrus.github.io/TIL/openssl-seclevel/) <br>
[key 길이 설정](https://velog.io/@jungri89/aws-ubuntu%EC%97%90-jupyter-notebook-openssl-%EC%84%A4%EC%A0%95)

ubuntu 20버전 이후로 부터 보안 레벨값(default)이 올라간거 같다.

나는 이렇게 해결해 보았다.

# ⛔문제 해결

## 기존에 만들었던 키 삭제

```linux
cd ssl/
```

- key를 생성한 폴더로 이동

```linux
rm cert.key
rm cert.pem
```

- key, pem 전부 삭제

## 키 생성

```linux
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout "cert2048.key" -out "cert2048.pem" -batch
```

- key,pem 새로 생성 rsa:1024 -> 2048로 변경
- 변경 후 /.jupyter/jupyter_notebook_config에 해당 key,pem 반영


# 마무리

현재 배포에 대해 공부 중이다. 계속해서 생기는 오류들을 하나씩 기록해볼 예정이다. 버전이 변경하면서 안되는 명령어도 많다는 걸 알게 됐다. 개발 공부가 끝이 없다는 말이 왠지 뼈저리게 느끼는 중이다 ㅎㅎ... 
<br><br>

[sunghomong 의 깃 허브](https://github.com/sunghomong) <br>
[sunghomong 의 블로그](https://sunghomong.github.io/)