---
title: "[Docker] Docker 소개 및 Docker 활용 (1주차)"
date: 2025-04-20 12:00:00 +0800
categories: [TIL,TIL_Docker]
tags: [ Docker,CI,CD,TIL,Education ]
image: /assets/img/logo_images/docker.png
---

# 1주차 - Docker 소개 및 Docker 활용

최근 컨테이너 기술에 대한 관심이 높아지는 가운데, 김경보님께서 도커(Docker)와 쿠버네티스(Kubernetes)를 주제로 스터디를 개설해주셨다. <br>
이 기회를 놓치지 않고 스터디에 참여하게 되었고, 앞으로 김경보님의 경험을 바탕으로 다양한 인사이트와 실무적인 정보들을 공유받으며 학습해 나갈 예정이다.

사전 설정을 위한 AWS 생성은 이전에 활용 사례가 있어서 기록한 내용을 토대로 설정을 진행했다. [AWS EC2 인스턴스 생성 및 접속해보기 !!](https://sunghomong.github.io/posts/TIL_Docker_Start/)

## 1. Docker란?

스터디 첫 주차에서는 도커의 기본 개념과 활용 사례에 대해 학습했다.
도커(Docker)는 애플리케이션을 **컨테이너(Container)** 라는 가상 실행 환경 안에서 구동할 수 있도록 해주는 오픈소스 플랫폼이다.

### 아키텍처

<img src="https://docs.docker.com/get-started/images/docker-architecture.webp" alt="img">
출처 : https://docs.docker.com/get-started/docker-overview/#docker-architecture

## 2. 도커 설치

```shell
# [터미널1] 관리자 전환
sudo su -
whoami

# 도커 설치
curl -fsSL https://get.docker.com | sh

# 도커 정보 확인 : Client 와 Server , Storage Driver(overlay2), Cgroup Version(2), Default Runtime(runc)
docker info
docker version

# 도커 서비스 상태 확인
systemctl status docker -l --no-pager

# 도커 루트 디렉터리 확인 : Docker Root Dir(/var/lib/docker)
tree -L 3 /var/lib/docker

# Ubuntu 사용자를 docker 그룹에 추가 (docker socket 접근 권한)
sudo usermod -aG docker Ubuntu

# 위 명령어 입력 후 SSH 재접속
exit
```

### Docker 기본 명령어

```shell
# 현재 컨테이너 프로세스 조회
docker ps
docker ps -a

# 이미지 다운로드
docker pull hello-world:latest

latest: Pulling from library/hello-world
e6590344b1a5: Pull complete
Digest: sha256:424f1f86cdf501deb591ace8d14d2f40272617b51b374915a87a2886b2025ece
Status: Downloaded newer image for hello-world:latest
docker.io/library/hello-world:latest


# 로컬 이미지 조회
docker images

# 도커 실행
docker run --help
docker run --name first-docker hello-world:latest
docker run --name nginx-docker -p 3000:80 -d nginx:latest

# 네트워크 상태 조회
netstat -ntlp

# 컨테이너 프로세스 재조회
docker ps --help
docker ps
docker ps -a

# 컨테이너 로그 조회
docker logs --help
docker logs first-docker
docker logs -f nginx-docker

# 컨테이너 내부에서 sh 실행
docker exec --help

# [터미널 2]
docker exec -it nginx-docker /bin/bash
curl http://localhost

#
exit
curl http://localhost:3000

curl https://ipinfo.io/ip

# IP 가 다른 이유는?? -> 컨테이너 네트워크에서 다룰 내용
127.0.0.1 - - [10/Apr/2025:10:53:31 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/7.88.1" "-"
172.17.0.1 - - [10/Apr/2025:10:53:57 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/7.81.0" "-"
221.143.247.216 - - [10/Apr/2025:10:54:12 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/8.7.1" "-"

# 컨테이너 정보 조회
docker inspect nginx-docker

... 생략 ...
"Networks": {
    "bridge": {
        "Gateway": "172.17.0.1",
        "IPAddress": "172.17.0.2",
    }
}
... 생략 ...

# 컨테이너 네트워크 조회
docker network ls
docker network inspect bridge
docker network inspect bridge | grep 'Containers' -A8

## 172.17.0.1 은 어디서 온걸까?
ip addr
ip addr show dev docker0

# 컨테이너 중지
docker stop nginx-docker
docker stop $(docker ps -aq)

# 컨테이너 제거
docker rm nginx-docker
docker rm $(docker ps -aq)

# 컨테이너 이미지 제거
docker rmi nginx:latest hello-world:latest
```

기존에 공부했던 내용들이 겹치는 부분들이 있어서 github 에 올려놓은 자료들을 공유해보려고한다.

[Docker & Kubernetes : 실전 가이드](https://github.com/sunghomong/Docker_Education/tree/main)

## 마무리

- 1주차 스터디에서는 심화 과정에 들어가기 전에, 도커의 기본적인 소개와 활용 방법에 대해 배웠다.
- 기존에 WAS에 도커를 활용해본 경험을 바탕으로, 이번 스터디 내용을 정리해볼 예정이다.

<br><br>

[sunghomong 의 깃 허브](https://github.com/sunghomong) <br>
[sunghomong 의 블로그](https://sunghomong.github.io/)

