---
title: "[JAVA NICE PAY] 결제 조회 API 연동"
date: 2025-04-08 12:00:00 +0800
categories: [ Service,nicePay_java ]
tags: [ nicePay,java,service ]
image: /assets/img/logo_images/nicePayLogo.png
---

## 🧐 개발 배경

서비스 운영 중, 결제 데이터의 싱크가 맞지 않는 사례가 몇 건이 있다는 CS가 들어왔다.
이에 따라 내부 관리자 페이지에서 결제 정보를 실시간으로 조회할 수 있는 기능이 필요하다는 요청이 들어왔다.

해결 방안으로, 관리자 페이지 내부에 결제내역 페이지 생성 및 페이지 내 "NICEPAY 조회" 버튼을 추가하여,
NICEPAY 측 결제 정보와 내부 시스템의 데이터를 직접 비교할 수 있는 기능을 구현하게 되었다.

## ⚙️ 연동 방식 & 흐름 설명

