---
title: AWS EC2 인스턴스 생성 및 접속해보기 !!
author: sunghomong
date: 2024-01-20 15:00:00 +0800
categories: [TIL,TIL_Docker]
tags: [AWS,서버 배포,EC2,Docker]
---

# AWS를 공부하게 된 계기

현재 팀 프로젝트(Public Scedule)를 진행하는 중이다. 
전 팀 프로젝트는 배포까지 못한 아쉬움이 남고 끝나버렸다.
아쉬움을 풀고싶어 현 프로젝트는 배포까지 하기로 결심했다.
배포에 관한 정보들을 찾고 **AWS(Amazon Web Services)** 를 선택한 이유는 비용적,보안,유연성 및 확장성이 다른 플랫폼에 비해 뛰어난 플랫폼이라고 생각하기 때문이다.

이분의 강의를 토대로 공부했습니다.<br>
[도커(Docker) 활용 및 배포 자동화 실전 초급 ① - 실습용 AWS EC2 인스턴스 생성 및 접속](https://www.youtube.com/watch?v=HbKCxBFT2wk&list=PLRx0vPvlEmdChjc6N3JnLaX-Gihh5pHcx&index=1)


# AWS 란?

Amazon Web Services는 아마존(Amazon)에서 제공하는 클라우드 서비스로, 네트워킹을 기반으로 가상 컴퓨터와 스토리지, 네트워크 인프라 등 다양한 서비스를 제공하는 플랫폼

## AWS 계정 생성

- 일단 시작전에 AWS에 계정을 생성해줘야 한다.
- 계정 생성시에 카드를 등록하라고 나오는데 가입과 동시에 100원 요금이 빠져나가고 처음 시작하는 가입하는 사람은 12개월 무료 버전이 있기에 걱정없이 카드를 등록해도 된다.


## AWS 인스턴스 생성

### 인스턴스 시작

- 계정을 생성 했다면 이제 하나의 인스턴스를 생성해줘야 한다.
- 저는 EC2를 사용했습니다. 자세한 설명은 [아마존 공식 홈페이지](https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/concepts.html) 여기를 참고하시면 될 거 같습니다.
- 콘솔 홈에 들어가서 EC2를 선택하고 아래와 같은 페이지에서 인스턴스 시작 버튼을 누른다.

<img src="https://i.ibb.co/jDWyd3X/2024-01-20-174610.png" alt="2024-01-20-174610">

### 이름 및 태그

- 본인의 원하는 이름으로 정하면 될 거 같다.

<img src="https://i.ibb.co/Qmf5F4C/2024-01-20-175241.png" alt="2024-01-20-175241">

### Application and OS Images (Amazon Machine Image)

- 저는 배포 형태를 리눅스 기반인 **Ubuntu**를 이용했습니다. Ubuntu의 자세한 설명은 [이분의 포스팅이](https://story.pxd.co.kr/732) 도움이 됐습니다.
- 그리고 타입은 무료 사용 가능한걸로 선택했습니다.

<img src="https://i.ibb.co/34tZv9J/2024-01-20-175516.png" alt="2024-01-20-175516">

### 인스턴스 유형

- 인스턴스 유형은 본인이 구현하고자 하는 서비스 유형에 따라 요구 사항 맞게 정하면 된다. [참고 사이트](https://aws.amazon.com/ko/ec2/?gclid=Cj0KCQiA-62tBhDSARIsAO7twbaNj2Y7IU8qin-pC6etGxLVZGdbStPwkhXQq5rzm4bPhL9sW-tT_64aAomsEALw_wcB&trk=bc3c5de1-7376-43c7-ad4f-f0f3f8248023&sc_channel=ps&ef_id=Cj0KCQiA-62tBhDSARIsAO7twbaNj2Y7IU8qin-pC6etGxLVZGdbStPwkhXQq5rzm4bPhL9sW-tT_64aAomsEALw_wcB:G:s&s_kwcid=AL!4422!3!588924203175!e!!g!!aws%20%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4%20%EC%9C%A0%ED%98%95!16390049454!133992835419)
- 인스턴스 유형도 마찬가지로 무료 사용 가능한 t3.micro를 이용했습니다.

<img src="https://i.ibb.co/Q8rChBL/2024-01-20-180220.png" alt="2024-01-20-180220">

### 키페어 생성

- 제일 중요한 부분이다!!! 이 키페어를 통해 관리자 권한을 갖기에 꼭!! 프로젝트에 있어서 관리자 권한급만 이를 관리하게끔 해야 한다.
- 키 페어 유형(Key pair type)에서 RSA 또는 ED25519를 선택할 수 있는데 ED25519 키는 Windows 인스턴스, EC2 인스턴스 Connect 또는 EC2 직렬 콘솔에서 지원되지 않는다.
- 프라이빗 키 파일 형식(Private key file format)에서 프라이빗 키를 저장할 형식을 선택한다. OpenSSH에서 사용할 수 있는 형식으로 프라이빗 키를 저장하려면 pem을 선택한다. PuTTY에서 사용할 수 있는 형식으로 프라이빗 키를 저장하려면 ppk를 선택합니다.
- 저는 유형은 RSA , 형식은 대부분 많이 쓰는 pem을 선택했습니다.
- 키 페어 생성을 하면 .pem(ppk)파일이 다운이 되는데 이는 꼭 중요 보관하며 자신의 데스크 탑에만 저장을 해놓는걸 추천한다. (보안 유지)

<img src="https://i.ibb.co/MRqXZCV/2024-01-20-181127.png" alt="2024-01-20-181127">

### 네트워크 설정

- 저는 나중에 편의성을 위해서 트래픽을 모두 체크했습니다.
- default 값으로 해도 상관 없음

<img src="https://i.ibb.co/Syzg2jQ/2024-01-20-182245.png" alt="2024-01-20-182245">

### 스토리지 구성

- 스토리지 크기를 정하는 부분이다.
- 무료 사용일 경우 30기가 아래까지 가능 (초과시 가격 추가)
- 저는 default값인 8기가로 했습니다.

<img src="https://i.ibb.co/MgwNBLJ/2024-01-20-182809.png" alt="2024-01-20-182809">

### 인스턴스 시작

- 고급세부정보는 따로 찾아보며 개인의 요구 사항에 맞게 설정하시면 될 거 같습니다. 저는 따로 설정을 안하고 넘어갔습니다.
- 모든 설정이 완료 됐다면 오른쪽의 시작 버튼을 누르고 아래와 같이 화면이 뜬다면 정상적으로 시작이 된겁니다.

<img src="https://i.ibb.co/jbx9M2Y/2024-01-21-144738.png" alt="2024-01-21-144738">

<img src="https://i.ibb.co/qWvvnNj/2024-01-21-145113.png" alt="2024-01-21-145113">

## 인스턴스 접속

### 인스턴스 연결

- 인스턴스가 생성된걸 확인 했다면 해당 인스턴스 ID를 클릭 후 들어가면 오른쪽 상단에 연결버튼을 클릭한다.

<img src="https://i.ibb.co/Gp5xXpj/2024-01-21-145633.png" alt="2024-01-21-145633">

### SSH 클라이언트 원격 접속

<img src="https://i.ibb.co/qsLNwgg/2024-01-21-145816.png" alt="2024-01-21-145816">

- SSH 클라이언트 실행 후 키 페어 생성한 폴더로 경로 이동

<img src="https://i.ibb.co/ZhrkSJX/2024-01-20-163902.png" alt="2024-01-20-163902">

- 위의 이미지에 보다시피 예시로 나와있는 ssh 명령어 그대로를 복사 후 입력하여 원격 접속을 해주면 됩니다.

<img src="https://i.ibb.co/n8TfxdR/2024-01-20-163927.png" alt="2024-01-20-163927">

- 접속이 완료 됐다면 저렇게 초록색 글씨로 ip 주소와 함께 접속이 된것을 확인 가능합니다.

<img src="https://i.ibb.co/6FvQfYS/2024-01-20-163942.png" alt="2024-01-20-163942">

<br><br>

# 마무리

오늘은 **AWS EC2 인스턴스**를 생성부터 접속만 하는 단계로 마무리를 했습니다. 계속해서 공부하면서 느끼는점은 나의 linux 언어의 부족한 점들이였다. linux언어가 능숙한 사람들은 아무래도 편할 거 같다는 생각이 많이 들었다. 앞으로도 계속해서 배포 실습을 하면서 기록할 예정이다!!


긴 글 읽어주셔서 감사합니다 ~ :)

<br><br>

[sunghomong 의 깃 허브](https://github.com/sunghomong) <br>
[sunghomong 의 블로그](https://sunghomong.github.io/)
