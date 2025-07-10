---
# the default layout is 'page'
icon: fas fa-info-circle
order: 4
---

<h1 style="color: #4a779c; text-align: center;"> 👉 About Me 👈 </h1>

<br>
<div style="text-align: center;">
    <img src="/assets/img/logo_images/profile.jpg" alt="DSC05027-1" style="display: block; margin: 0 auto; height:200px;">
    <br>
    <p>
        <strong>조성호</strong>
        <br><br>
        <strong>Backend Developer</strong>
    </p>
</div>


<table style="margin: 0 auto; text-align: center;">
    <tr>
        <th style="text-align:right;">Email</th>
        <td style="text-align:left;">kidcojsh@gmail.com</td>
    </tr>
    <tr>
        <th style="text-align:right;">GitHub</th>
        <td style="text-align:left;"><a href="https://github.com/sunghomong">https://github.com/sunghomong</a></td>
    </tr>
    <tr>
        <th style="text-align:right;" >Blog</th>
        <td style="text-align:left;"><a href="https://sunghomong.github.io/">https://sunghomong.github.io/</a></td>
    </tr>
</table>

<br>


### Introduce

```
백엔드 개발자로서 안정성과 확장성을 고려한 시스템 설계에 관심이 많으며  
효율적인 데이터 처리, API 최적화, 그리고 서비스 운영 자동화에 집중하고 있습니다.  
또한, 대용량 트래픽을 안정적으로 처리하는 구조 설계와   
보안 강화를 위한 인증 및 권한 관리에도 관심을 가지고 지속적으로 학습하고 있습니다.
```

<br>

<h1 style="color: #4a779c; text-align: center;"> 🏢 Career 🏢 </h1>

## 🏢 Company

|                       |                             |
|----------------------:|:----------------------------|
|                period | 2024.03.12 ~ current (진행 중) |
|          company name | 위메진 소프트                     |
|                  info | 시스템 소프트웨어 개발 및 공급업          |
| dispatch company name | 옴니케어(파견)                    |
| dispatch company info | 경영 컨설팅/전자상거래/응용소프트웨어 개발,공급                    |

<br>

## ✅ 업무 성과

<br>

- 📌 콜 센터 예약 페이지 유지 보수 및 운영
  - 관리자 서비스에 SMS 결제 기능이 도입된 이후 예약 프로세스가 정상적으로 작동하지 않는 오류가 빈번히 발생하여 사용자 및 타 업체들로부터 CS 요청이 지속되어 왔었습니다.
  - 여러 페이지에서 각각 분리되어 호출되던 SMS 결제 알림 발송 로직을 하나의 통합 API로 구조 개선하였고 다양한 예외 상황을 고려해 설계함으로써 관련 CS를 약 64% 감소시키는 성과를 얻었습니다.

- 📌 [결제 내역 페이지 신규 개발 및 운영](https://sunghomong.github.io/posts/service-nicePay_java/)
  - 결제 오류 및 CS 증가에 대응해 신규 결제 내역 조회 페이지 기획·개발하였습니다.
  - 도메인 규모가 점차 확장됨에 따라 기존 쿼리의 성능 저하 문제가 발생하여 이를 해결하기 위해 조회 기준점을 재설계하고 페이징 처리를 도입하여 조회 속도를 개선하였습니다. (기존 평균 응답 시간 약 3.2초 → 0.8초로 개선)
  - 관리자 환경에 적합한 UI/UX를 직접 설계 및 구현하였으며 slick.grid.js를 활용해 대량 데이터에 대한 효율적인 테이블 렌더링 및 사용자 편의성을 제공하였습니다.

- 📌 결제 취소 및 NICE API 연동
  - 갑작스러운 예약 취소 및 기업 지원금 결제의 단순 취소 요구 대응을 위한 결제 취소 전용 프로세스를 개발하였습니다.
  - 결제 상태 오류 해결을 위한 NICE PAY 결제 취소 API 및 결제 내역 조회 API 연동을 통하여 내부-외부 데이터 정합성 확보에 기여하였습니다.
  - 매출 통계 효율화를 위한 엑셀 다운로드 기능 및 다양한 부가 서비스 기능을 제공하였습니다.

- 📌 마음 검진 서비스
  - 사내에서 기업들 대상 마음 검진 플랫폼의 관리자 서비스를 신규 구축하고 운영을 담당하였습니다.
  - 검진 대상자 등록 및 관리, 보고서 다운로드 기능(3사 업체와의 REST API 연동) 등 주요 기능을 개발하였습니다.
  - 관리자 편의성을 고려한 UI/UX를 직접 기획하고, 페이징 처리 기반의 프로세스를 설계하여 효율적인 관리 환경을 제공하였습니다.

- 📌 [설문 평가 서비스](https://sunghomong.github.io/posts/service-survey1/)
  - 기존 직무 스트레스 설문 평가 시스템의 개선을 위해 설문 평가 서비스 신규 개발을 담당하였습니다.
  - 검진 대상자 등록 및 관리 기능을 구현하였으며, 평가 점수를 기반으로 4가지 유형별 점수를 산출하고, 각 유형의 위험도를 분석하는 프로세스를 구축하였습니다.

- 📌 [Keycloak 기반 통합 SSO 구축](https://sunghomong.github.io/posts/service-sso-java01/#-%EA%B0%9C%EB%B0%9C-%EB%B0%B0%EA%B2%BD)
  - Keycloak 기반으로 3개 도메인을 통합한 SSO 환경을 구축하고 OAuth2.0의 state/nonce 처리로 CSRF 및 Replay Attack 방지 등 보안성을 강화했습니다.
  - 전체 가입자의 약 84%가 SSO를 통해 가입하도록 유도했으며 Interceptor를 활용한 자동 로그인 기능도 함께 구현했습니다.
  - 신규 제휴사 연동을 위한 인증 자동화 구조를 설계하여 확장성과 재사용성을 확보했습니다.

- 📌 Microsoft Azure AD(OAuth2.0) 연동
  - Microsoft Azure AD(OAuth2.0) 기반 외국계 협력사들과의 SSO 연동을 통해 간편 로그인 프로세스를 설계 및 구현했습니다.
  - PKCE(code_challenge/code_verifier) 기반 인증으로 Authorization Code 탈취를 방지하고 state 파라미터와 등록된 redirect_uri 기반 검증으로 CSRF 및 인증 요청 무결성을 강화했습니다.

- 📌 [망취소 자동화 시스템 도입](https://sunghomong.github.io/posts/service-nicePay_java01/)
  - 기존에는 결제 완료 후 예약 세션이 유실된 경우 예약은 되지 않았으나 결제는 정상적으로 처리되어 CS 및 환불 처리가 필요했습니다.
  - NICE API 연동을 통해 유실된 예약 건의 결제 여부를 탐지하고 자동 환불 처리 로직을 구현 하여 매월 평균 25건, 6개월간 총 150건 이상의 비정상 결제 건에 대해 자동 환불 처리가 가능해졌고 ‘환불 문의’ 관련 CS 를 약 70% 이상 감소시키는 성과를 냈습니다.

- 📌 전반적인 결제 시스템 개선
  - 예약 등록 및 취소 과정에서 Exception 처리 미흡으로 인해 결제-예약 간 일관성 오류가 발생하는 문제를 확인했습니다.
  - 전체 결제 프로세스를 단일 API로 통합하여 흐름을 정리하고, 예외 발생 구간에 일괄적으로 Exception 핸들링 로직 적용하였습니다.
  - REST API 응답 코드와 실제 나이스페이 결제 상태 간 불일치 케이스를 try-catch로 처리하여 안정성을 강화하였습니다.


<h1 style="color: #4a779c; text-align: center;"> 🏃 Experiences 🏃 </h1>

## 🖥️ Education

|||
|--:|:--|
|title|자바(JAVA)기반 풀스택(프론트엔드,백엔드) 개발 과정|
|period|2023.05.10~2023.11.14|
|project|[https://github.com/sunghomong/meeting_site_project](https://github.com/sunghomong/meeting_site_project)|
|learn|JAVA, Python, HTML, CSS, SQL, Spring, JS, JSP...|

- 객체 지향 프로그래밍(OOP) 핵심 원리 및 Java 기본 문법 학습
- Spring Boot 기반 웹 애플리케이션 개발 실습
- 단기 프로젝트 진행을 통해 실무 감각 향상

|||
|--:|:--|
|title|Udemy - Docker & Kubernetes : 실전 가이드|
|period|2024.03.28~ing|
|project|[https://github.com/sunghomong/Docker_Education](https://github.com/sunghomong/Docker_Education)|
|learn|NodeJS, Docker, DockerHub, JS...|

- Docker의 개념 및 활용
- 작은 프로젝트부터 큰 프로젝트까지 Dockerfile의 활용
- 더 나은 개발 환경 세팅을 위한 Docker 초보자부터 전문가까지의 교육 과정

|||
|-------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------|
|  title | 코틀린 3강으로 끝내기 feat. 안드로이드 개발                                                                                                                       |
| period | 11.01~12.13                                                                                                                                                 |
|    TIL | [코틀린_3강으로_끝내기](https://github.com/sunghomong/TIL/tree/main/Kotlin/%EC%BD%94%ED%8B%80%EB%A6%B0_3%EA%B0%95%EC%9C%BC%EB%A1%9C_%EB%81%9D%EB%82%B4%EA%B8%B0)|
|  learn | kotlin,android studio                                                                                                                                       |  

- Android Studio 설치부터 프로젝트 생성 및 실행까지의 전반적인 과정 습득
- kotlin 기본 문법에 대한 이해
- `Class`, `Object`, `Lambda` 등 Kotlin 의 다양한 기능을 활용한 코드 작성법 익히기
- Navigation 을 통한 앱 내 화면 전환 및 구조 설계 방법
- 다양한 안드로이드 패키지 활용법 및 앱 페이지 생성의 전반적인 이해

|||
|-------:|:-----------------------------------------------------------------------------------------------------------------------------------------------|
|  title | 방송통신대학교 컴퓨터과학과                                                                                                                                 |
| period | 2025-03 ~ 재학 중                                                                                                                                  |
|  learn | 컴퓨터의 이해,파이썬프로그래밍기초,유비쿼터스컴퓨팅개론...                                                                                                               |  

- 컴퓨터의 기초 원리 및 프로그래밍 개념 습득
- 파이썬을 활용한 문제 해결 및 알고리즘 학습
- 유비쿼터스 컴퓨팅 개론을 통해 최신 IT 트렌드 탐색

|||
|-------:|:-----------------------------------|
|  title | 도커-쿠버네티스-스터디                 |
| period | 2025-04 ~ 2025-05                  |
|  learn | Docker,Kubernetes,GitOps,ArgoCD... |  

- Docker 및 Kubernetes를 활용한 컨테이너 오케스트레이션 실습
- GitOps와 ArgoCD 기반의 지속적 배포(CD) 전략 학습
- 인프라 자동화 및 운영 환경 구성에 대한 이해
- 클라우드 네이티브 기술 전반에 대한 실습 중심 교육 진행

## 👥 Project

|||
|--:|:--|
|title|Social Meeting|
|period|2023.10.05~2023.11.17|
|OpenSource|[GitHub_OpenSource](https://github.com/sunghomong/meeting_site_project)|
|Intro|취미 별 모임 기준으로 사용자 간의 관계와 소통을 도와주는 소셜 모임 서비스|

- 취미 별 모임 기준으로 사용자 간의 관계와 소통을 도와주는 소셜 모임 서비스
- Http 통신 방식에서 Web Socket 프로토콜 활용을 실시간 채팅 방식 변환
  - 단방향 통신에서 양방향 통신으로 전송 속도 개선
- DB 정규화와 MyBatis 의 쿼리 개선
- 팀장 역할로서 원활한 커뮤니케이션으로 팀원 구성원들을 정해진 기간내에 서비스 구축
- Spring Boot 를 활용한 프로젝트 구조

## 📘 Diary

|||
|--:|:-------------------------------------------------------------------|
|Title| Blog                                                               |
|period| 2023.09.13~current                                                 |
|link| [https://sunghomong.github.io/](https://sunghomong.github.io/)     |

- 업무 처리 중 만난 문제, 유용하게 사용될 수 있는 기술, 개발자로서의 기록을 자세히 정리하여 공유하기 위한 블로그
- 독학 및 교육 과정에서 얻은 기술들을 꼼꼼하게 기록하는 블로그
- 반복되는 실수를 방지하고자 문제 해결의 과정을 기록하는 블로그
- 끊임 없는 성장을 보여주는 블로그

<h1 style="color: #4a779c; text-align: center;"> 🔨 skills 🔨 </h1>

<br>
제가 배우고 사용했던 기술들 입니다.
<br><br>

<div style="display:flex; flex-direction:column; align-items:flex-start;">
    <!-- Frontend -->
    <p><strong>Frontend</strong></p>
    <div>
        <img src="https://img.shields.io/badge/html5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="html5"> 
        <img src="https://img.shields.io/badge/css-1572B6?style=flat-square&logo=css3&logoColor=white" alt="css"> 
        <img src="https://img.shields.io/badge/javascript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="javascript">
        <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React">
        <img src="https://img.shields.io/badge/JQuery-0769AD?style=flat-square&logo=jquery&logoColor=white" alt="JQuery">
        <img src="https://img.shields.io/badge/Ajax-00758F?style=flat-square&logo=ajax&logoColor=white" alt="Ajax">
        <img src="https://img.shields.io/badge/JSP-00758?style=flat-square&logo=ajax&color=black" alt="JSP">
    </div>
    <!-- Backend -->
    <p><strong>Backend</strong></p>
    <div>
        <img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=Java&logoColor=white" alt="Java">
        <img src="https://img.shields.io/badge/Ruby-CC342D?style=for-the-badge&logo=ruby&logoColor=white" alt="Ruby">
        <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node">
        <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
        <img src="https://img.shields.io/badge/Kotlin-7F52FF?style=for-the-badge&logo=kotlin&logoColor=white" alt="Kotlin">
    </div>
    <!-- Database -->
    <p><strong>Database</strong></p>
    <div>
        <img src="https://img.shields.io/badge/oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white" alt="oracle"> 
        <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="mysql"> 
    </div>
    <!-- Server -->
    <p><strong>Server</strong></p>
    <div>
        <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
        <img src="https://img.shields.io/badge/linux-FCC624?style=for-the-badge&logo=linux&logoColor=black" alt="linux"> 
        <img src="https://img.shields.io/badge/apache%20tomcat-F8DC75?style=for-the-badge&logo=apachetomcat&logoColor=black" alt="apache">
        <img src="https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white" alt="Kubernetes">
    </div>
    <!-- Development Tools -->
    <p><strong>Development Tools</strong></p>
    <div>
        <img src="https://img.shields.io/badge/IntelliJ%20IDEA-000000?style=flat-square&logo=intellij-idea&logoColor=white" alt="IntelliJ">
        <img src="https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=flat-square&logo=visual-studio-code&logoColor=white" alt="Visual">
        <img src="https://img.shields.io/badge/Eclipse%20IDE-2C2255?style=flat-square&logo=eclipse-ide&logoColor=white" alt="Eclipse">
        <img src="https://img.shields.io/badge/android%20studio-3DDC84?style=flat-square&logo=android-studio&logoColor=white" alt="android">
        <img src="https://img.shields.io/badge/dbeaver-382923?style=flat-square&logo=dbeaver&logoColor=white" alt="dbeaver">
    </div>
    <!-- Framework -->
    <p><strong>Framework</strong></p>
    <div>
        <img src="https://img.shields.io/badge/Spring-6DB33F?style=flat-square&logo=spring&logoColor=white" alt="Spring">
        <img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=flat-square&logo=spring-boot&logoColor=white" alt="SpringBoot">
        <img src="https://img.shields.io/badge/Web%20Socket-010101?style=flat-square&logo=socketdotio&logoColor=white" alt="Web">
        <img src="https://img.shields.io/badge/thymeleaf-005F0F?style=flat-square&logo=thymeleaf&logoColor=white" alt="thymeleaf">
    </div>
    <!-- Version Control -->
    <p><strong>Version Control</strong></p>
    <div>
        <img src="https://img.shields.io/badge/Jenkins-D24939?style=flat-square&logo=jenkins&logoColor=white" alt="Jenkins">
        <img src="https://img.shields.io/badge/GitHub%20Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white" alt="GitHub">
        <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white" alt="Git">
        <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub">
    </div>
    <!-- Communication -->
    <p><strong>Communication</strong></p>
    <div>
        <img src="https://img.shields.io/badge/Notion-000000?style=flat-square&logo=notion&logoColor=white" alt="Notion">
        <img src="https://img.shields.io/badge/ERD%20Cloud-gray?style=flat-square&logo=staruml&logoColor=white" alt="ERD">
        <img src="https://img.shields.io/badge/Discord-5865F2?style=flat-square&logo=discord&logoColor=white" alt="Discord">
        <img src="https://img.shields.io/badge/Slack-4A154B?style=flat-square&logo=slack&logoColor=white" alt="Slack">
    </div>
    <p><strong>Security</strong></p>
    <div>
        <img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" alt="JWT">
        <img src="https://img.shields.io/badge/OAuth2.0-4285F4?style=flat-square&logo=google&logoColor=white" alt="OAuth2">
    </div>
</div><br>

## Communication

- 어떤 프로젝트에 있어서 커뮤니케이션이 가장 우선적이라 생각합니다.
- 적극적으로 의사를 전달해 개발 방향성을 잡아 가려고 노력합니다.
- 커뮤니케이션에 있어서 적은것보다 많은게 좋다고 믿고 있습니다.

<br>

