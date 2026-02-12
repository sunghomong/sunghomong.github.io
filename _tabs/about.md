---
# the default layout is 'page'
layout: blank
icon: fas fa-info-circle
order: 4
---

<style>
    @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');
    
    body {
        font-family: 'Pretendard', sans-serif;
        font-weight: 300;
        word-wrap: break-word;
        word-break: keep-all;
        line-height: 1.8;
        background: #ffffff;
        margin: 0;
        padding: 0;
        color: #2c3e50;
    }
    
    p, li, span, div {
        color: #2c3e50;
    }
    
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
    }
    
    h1 {
        color: #3c78d8;
        margin-bottom: 20px;
    }
    
    h2 {
        color: #3c78d8;
        margin-top: 40px;
        margin-bottom: 20px;
    }
    
    h4 {
        color: #555;
        font-weight: 500;
    }
    
    i {
        color: #666;
    }
    
    a {
        color: #3c78d8;
        text-decoration: none;
    }
    
    a:hover {
        color: #2c5aa0;
        text-decoration: underline;
    }
    
    small {
        color: #777;
    }
    
    .badge {
        display: inline-block;
        padding: 0.25em 0.6em;
        font-size: 75%;
        font-weight: 700;
        line-height: 1;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: 0.25rem;
    }
    
    .badge-primary {
        color: #fff;
        background-color: #007bff;
    }
    
    .badge-secondary {
        color: #fff;
        background-color: #6c757d;
    }
    
    .badge-info {
        color: #fff;
        background-color: #17a2b8;
    }
    
    .alert {
        position: relative;
        padding: 0.75rem 1.25rem;
        margin-bottom: 1rem;
        border: 1px solid transparent;
        border-radius: 0.25rem;
    }
    
    .alert-secondary {
        color: #2c3e50;
        background-color: #e2e3e5;
        border-color: #d6d8db;
    }
    
    hr {
        margin-top: 1rem;
        margin-bottom: 1rem;
        border: 0;
        border-top: 1px solid rgba(0,0,0,.1);
    }
    
    ul {
        padding-left: 20px;
    }
    
    .text-right {
        text-align: right;
    }
    
    .text-center {
        text-align: center;
    }
    
    .text-md-right {
        text-align: right;
    }
    
    .text-md-left {
        text-align: left;
    }
    
    @media (max-width: 768px) {
        .text-md-right {
            text-align: center;
        }
        .text-md-left {
            text-align: center;
        }
    }
</style>

<div id="__next">
    <div style="font-family:Pretendard, sans-serif;font-weight:300;word-wrap:break-word;word-break:keep-all; line-height:1.8" class="container">

        <!-- 프로필 섹션 -->
        <div class="mt-5">
            <div class="row">
                <div class="col-sm-12 col-md-3">
                    <div class="pb-3 text-md-right text-center">
                        <img style="max-height:320px" class="img-fluid rounded" src="/assets/img/logo_images/profile.jpg" alt="Profile">
                    </div>
                </div>
                <div class="col-sm-12 col-md-9">
                    <div class="row">
                        <div class="text-center text-md-left col">
                            <h1 style="color:#3c78d8">조성호 <small>(Cho Sung Ho)</small></h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="pt-3 col">
                            <div class="pb-2 row">
                                <div class="text-right col-1">
                                    <i class="fas fa-envelope"></i>
                                </div>
                                <div class="col-auto">
                                    <a href="mailto:kidcojsh@gmail.com" target="_blank" rel="noreferrer noopener">kidcojsh@gmail.com</a>
                                </div>
                            </div>
                            <div class="pb-2 row">
                                <div class="text-right col-1">
                                    <i class="fas fa-phone"></i>
                                </div>
                                <div class="col-auto">
                                    <span style="color:black;">Please contact me by email</span>
                                </div>
                            </div>
                            <div class="pb-2 row">
                                <div class="text-right col-1">
                                    <i class="fas fa-pen"></i>
                                </div>
                                <div class="col-auto">
                                    <a href="https://sunghomong.github.io/" target="_blank" rel="noreferrer noopener">https://sunghomong.github.io/</a>
                                </div>
                            </div>
                            <div class="pb-2 row">
                                <div class="text-right col-1">
                                    <i class="fab fa-github"></i>
                                </div>
                                <div class="col-auto">
                                    <a href="https://github.com/sunghomong" target="_blank" rel="noreferrer noopener">https://github.com/sunghomong</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="mt-3 alert alert-secondary fade show" role="alert">
                                <i class="far fa-bell mr-2"></i> 가급적 이메일로 연락 부탁드립니다.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- INTRODUCE 섹션 -->
        <div class="mt-5">
            <div class="row">
                <div class="col-sm-12 col-md-3">
                    <h2 style="color:#3c78d8">INTRODUCE</h2>
                </div>
                <div class="col-sm-12 col-md-9">
                    <p>
                        코드 너머의 소통을 지향하고 비즈니스 성장에 기여하는 것을 좋아하는 개발자 조성호입니다. 좋은 성과에는 개개인의 역량도 중요하지만 팀 구성원들과 함께 만들어 나간다고 생각하기에 적극적인 커뮤니케이션과 함께 협업해왔습니다.
                    </p>
                    <p>
                        백엔드 개발자로서 전문성을 계속 확장해 나가면서도 팀과 조직과 함께 성장하는 개발자가 되고자 합니다. 서비스 개발은 결국 개발과 비즈니스의 긴밀한 커뮤니케이션 위에서 완성된다고 믿습니다.
                    </p>
                    <p class="text-right"><small>Latest Updated</small> <span class="badge badge-secondary">2026. 02. 10</span></p>
                </div>
            </div>
        </div>
        
        <!-- SKILL 섹션 -->
        <div class="mt-5">
            <div class="row">
                <div class="col">
                    <div class="pb-5 row">
                        <div class="col">
                            <h2><span style="color:#3c78d8">SKILL</span></h2>
                        </div>
                    </div>

                    <div>
                        <div class="row">
                            <div class="text-md-right col-sm-12 col-md-3">
                                <h4 style="color:gray">Languages</h4>
                            </div>
                            <div class="col-sm-12 col-md-9">
                                <div class="mt-2 mt-md-0 row">
                                    <div class="col-12 col-md-4">
                                        <ul>
                                            <li>Java</li>
                                            <li>JavaScript</li>
                                        </ul>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <ul>
                                            <li>TypeScript</li>
                                            <li>HTML/CSS</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div><hr>
                        <div class="row">
                            <div class="text-md-right col-sm-12 col-md-3">
                                <h4 style="color:gray">Frameworks & Libraries</h4>
                            </div>
                            <div class="col-sm-12 col-md-9">
                                <div class="mt-2 mt-md-0 row">
                                    <div class="col-12 col-md-4">
                                        <ul>
                                            <li>Spring Boot</li>
                                            <li>JPA</li>
                                            <li>Node.js</li>
                                        </ul>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <ul>
                                            <li>Thymeleaf</li>
                                            <li>Vue</li>
                                            <li>REST API</li>
                                        </ul>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <ul>
                                            <li>JSP</li>
                                            <li>WebSocket</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div><hr>
                        <div class="row">
                            <div class="text-md-right col-sm-12 col-md-3">
                                <h4 style="color:gray">Infrastructure & Databases</h4>
                            </div>
                            <div class="col-sm-12 col-md-9">
                                <div class="mt-2 mt-md-0 row">
                                    <div class="col-12 col-md-4">
                                        <ul>
                                            <li>MySQL</li>
                                            <li>Oracle</li>
                                        </ul>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <ul>
                                            <li>Docker</li>
                                            <li>Redis</li>
                                        </ul>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <ul>
                                            <li>SFTP</li>
                                            <li>MongoDB</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div><hr>
                        <div class="row">
                            <div class="text-md-right col-sm-12 col-md-3">
                                <h4 style="color:gray">Security</h4>
                            </div>
                            <div class="col-sm-12 col-md-9">
                                <div class="mt-2 mt-md-0 row">
                                    <div class="col-12 col-md-4">
                                        <ul>
                                            <li>OAuth2</li>
                                        </ul>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <ul>
                                            <li>Keycloak</li>
                                        </ul>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <ul>
                                            <li>Microsoft Azure AD</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div><hr>
                        <div class="row">
                            <div class="text-md-right col-sm-12 col-md-3">
                                <h4 style="color:gray">Collaboration</h4>
                            </div>
                            <div class="col-sm-12 col-md-9">
                                <div class="mt-2 mt-md-0 row">
                                    <div class="col-12 col-md-4">
                                        <ul>
                                            <li>Notion</li>
                                            <li>Slack</li>
                                        </ul>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <ul>
                                            <li>Git</li>
                                        </ul>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <ul>
                                            <li>Redmine</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- EXPERIENCE 섹션 -->
        <div class="mt-5">
            <div class="row">
                <div class="col">
                    <div class="pb-5 row">
                        <div class="col">
                            <h2 style="color:#3c78d8">EXPERIENCE   <span style="font-size:50%"><span class="badge badge-secondary">총 1년 11개월</span></span></h2>
                        </div>
                    </div>
                    
                    <div>
                        <div class="row">
                            <div class="text-md-right col-sm-12 col-md-3">
                                <h4 style="color:gray">2024. 03 ~</h4>
                            </div>
                            <div class="col-sm-12 col-md-9">
                                <h4 style="display:inline-flex;align-items:center">위메진 소프트 - 옴니케어 (omnicare) <span style="font-size:65%;display:inline-flex;align-items:center">
                                <span class="ml-1 badge badge-primary" style="margin-left: 10px;">파견 중</span><span class="ml-1 badge badge-info" style="margin-left: 3px;">1년 11개월</span></span></h4>
                            </div>
                        </div>
                        <div class="mt-2 row">
                            <div class="text-md-right col-sm-12 col-md-3">
                                <span style="color:gray">2024. 03 ~ 현재</span>
                            </div>
                            <div class="col-sm-12 col-md-9">
                                <i style="color:gray">Healthcare Product / 건강 검진 플랫폼 풀스택 개발자</i>
                                <ul class="pt-2">
                                    <li>건강검진 예약 플랫폼 결제 서비스 백엔드 API 개발</li>
                                    <li>결제 관련 관리자 기능 개발</li>
                                    <li>마음 검진 서비스 풀스택 개발</li>
                                    <li>Keycloak 기반 통합 SSO 구축</li>
                                    <li>Microsoft Azure AD(OAuth2.0) 연동</li>
                                    <li>국가건강검진 데이터 파싱</li>
                                    <li>마이그레이션 및 차세대 플랫폼 구축</li>
                                    <li>
                                        <strong>Skill Keywords</strong>
                                        <div>
                                            <span style="font-weight:400" class="mr-1 badge badge-secondary">Spring Boot</span>
                                            <span style="font-weight:400" class="mr-1 badge badge-secondary">MySQL</span>
                                            <span style="font-weight:400" class="mr-1 badge badge-secondary">MongoDB</span>
                                            <span style="font-weight:400" class="mr-1 badge badge-secondary">Keycloak</span>
                                            <span style="font-weight:400" class="mr-1 badge badge-secondary">Microsoft Azure AD</span>
                                            <span style="font-weight:400" class="mr-1 badge badge-secondary">Node.js</span>
                                            <span style="font-weight:400" class="mr-1 badge badge-secondary">Vue</span>
                                            <span style="font-weight:400" class="mr-1 badge badge-secondary">REST API</span>
                                            <span style="font-weight:400" class="mr-1 badge badge-secondary">JPA</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- PROJECT 섹션 -->
        <div class="mt-5">
            <div class="row">
                <div class="col">
                    <div class="pb-5 row">
                        <div class="col">
                            <h2 style="color:#3c78d8">PROJECT</h2>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col">
                            <div>
                                <div class="row">
                                    <div class="text-md-right col-sm-12 col-md-3">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <h4 style="color:gray">2025. 09 ~ 현재</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-9">
                                        <h4>비타브릿지 마이그레이션 및 차세대 플랫폼 구축</h4>
                                        <i style="color:gray">건강검진 플랫폼 전환 프로젝트</i>
                                        <ul class="pt-2">
                                            <li><a href="https://www.docdocdoc.co.kr/news/articleView.html?idxno=3032565" target="_blank" rel="noreferrer noopener">브타브릿지 차세대 서비스 출시</a></li>
                                            <li>레거시 시스템(JSTL/Spring)을 Vue, TypeScript, Spring Boot, JPA 기반 모던 스택으로 전면 마이그레이션 및 아키텍처 재설계</li>
                                            <li>Spring Security 커스터마이징을 통한 JWT 기반 인증 체계 구축 및 전역 예외 처리 표준화</li>
                                            <li>ISMS 심사 규정 준수 개발 및 소셜 로그인(Naver, Kakao, Pass) 연동을 통한 간편가입 기능 구현</li>
                                            <li>결제 통보 시스템 구축으로 모든 결제 건 실시간 처리 및 상태 관리 자동화</li>
                                            <li>개발 서버 배포 파이프라인 구축 및 상태 모니터링 및 관리</li>
                                            <li>
                                                <strong>Skill Keywords</strong>
                                                <div>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Vue</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">TypeScript</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Spring Boot</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">JPA</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">JWT</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Redis</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">MySQL</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">MongoDB</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Linux</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Node.js</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>                            
                            <div><hr>
                                <div class="row">
                                    <div class="text-md-right col-sm-12 col-md-3">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <h4 style="color:gray">2024. 10 ~ 2025. 09</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-9">
                                        <h4>비타브릿지 결제 서비스 개선</h4>
                                        <i style="color:gray">건강검진 플랫폼 결제 서비스 개선 및 고도화</i>
                                        <ul class="pt-2">
                                            <li>Redis 도입으로 모바일 브라우저 환경의 세션 데이터 유실 문제 해결</li>
                                            <li>공통 영역, 검진 예약, SMS 결제 등 핵심 비즈니스 기능의 BFF API 마이그레이션 및 통합</li>
                                            <li>관리자 페이지 신규 구축(서비스이용료 발송, 결제 내역 관리)으로 운영 효율성 향상</li>
                                            <li>Scheduler 기반 자동화 시스템 구축으로 6개월간 150건 이상의 비정상 결제 건 자동 환불 처리</li>
                                            <li>결제 시스템 2.0 아키텍처 설계 및 핵심 비즈니스 로직 고도화</li>
                                            <li>
                                                <strong>Skill Keywords</strong>
                                                <div>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Redis</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Spring Boot</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">JSP</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">JavaScript</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">REST API</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div><hr>
                                <div class="row">
                                    <div class="text-md-right col-sm-12 col-md-3">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <h4 style="color:gray">2025. 02 ~ 2025. 05</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-9">
                                        <h4>SSO (Single-Sign-On) 연동</h4>
                                        <i style="color:gray">통합 SSO 구축 및 외부 인증 연동</i>
                                        <ul class="pt-2">
                                            <li>Keycloak 기반 3개 도메인 통합 SSO 구축으로 전체 신규 가입자의 84%를 SSO로 전환 달성</li>
                                            <li>Microsoft Azure AD 연동을 통한 외국계 협력사 직원 로그인 서비스 지원</li>
                                            <li>OAuth2.0 state/nonce, PKCE 적용으로 보안 강화 및 CSRF 공격 방지</li>
                                            <li>Keycloak OIDC 및 Azure AD 인증 프로세스 설계/개발</li>
                                            <li>해외 협력사와의 Azure AD 연동을 위한 기술 스펙 조율 및 영문 기술 문서 작성 및 커뮤니케이션</li>
                                            <li>
                                                <strong>Skill Keywords</strong>
                                                <div>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Microsoft Azure AD</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Keycloak</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">PKCE</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">OAuth2.0</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Spring Boot</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div><hr>
                                <div class="row">
                                    <div class="text-md-right col-sm-12 col-md-3">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <h4 style="color:gray">2024. 09 ~ 2025. 02</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-9">
                                        <h4>국가건강검진 조회</h4>
                                        <i style="color:gray">10년치 건강검진 기록 조회 및 표시</i>
                                        <ul class="pt-2">
                                            <li>CODEF API 연동을 위한 비동기 데이터 파이프라인 설계 및 개발</li>
                                            <li>TOKEN 테이블 활용으로 API 발급 비용 절감 및 서비스 응답 속도 단축</li>
                                            <li>10년치 국가 건강검진 데이터 연동을 위한 고효율 데이터베이스 구조 설계</li>
                                            <li>Chart 라이브러리를 활용해 비정형 검진 항목 카테고리별 데이터 시각화 모듈 개발</li>
                                            <li>TXID 기반의 2-PHASE 인증 및 데이터 처리 구조 완성</li>
                                            <li>
                                                <strong>Skill Keywords</strong>
                                                <div>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">REST API</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Spring Boot</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">JavaScript</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Chart.js</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div><hr>
                                <div class="row">
                                    <div class="text-md-right col-sm-12 col-md-3">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <h4 style="color:gray">2024. 04 ~ 2024. 09</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-9">
                                        <h4>마음검진 서비스</h4>
                                        <i style="color:gray">외부 전문 심리 평가 기관 API 연동 및 마음검진 서비스 설계/개발</i>
                                        <ul class="pt-2">
                                            <li>외부 심리 평가 기관과의 SFTP 기반 데이터 파이프라인 구축</li>
                                            <li>객관식, 서술형 등 다양한 문항 유형을 처리할 수 있는 유연한 백엔드 및 프론트엔드 개발</li>
                                            <li>확장 가능한 ERD 설계로 검사 항목 추가/변경 시 코드 수정 없이 대응 가능한 구조 구현</li>
                                            <li>답변 형태 테이블 기반 동적 화면 구성으로 클라이언트 의존도 최소화</li>
                                            <li>마음검진 대상자 관리 및 운영을 위한 관리자 페이지 신규 구축</li>
                                            <li>
                                                <strong>Skill Keywords</strong>
                                                <div>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">SFTP</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">REST API</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Spring Boot</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">JavaScript</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
        
        <!-- OPEN SOURCE 섹션 -->
        <div class="mt-5">
            <div class="row">
                <div class="col">
                    <div class="pb-5 row">
                        <div class="col">
                            <h2 style="color:#3c78d8">OPEN SOURCE</h2>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col">
                            <div>
                                <div class="row">
                                    <div class="text-md-right col-sm-12 col-md-3">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <h4 style="color:gray">NICE PAY 연동 모듈</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-9">
                                        <ul class="">
                                            <li>NICE PAY 결제 시스템 연동을 위한 Java/Spring Boot 기반 오픈소스 모듈 개발</li>
                                            <li>Java & Spring Boot</li>
                                            <li><a href="https://github.com/sunghomong/NICEPAY_JAVA" target="_blank" rel="noreferrer noopener">https://github.com/sunghomong/NICEPAY_JAVA</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>                            
                            <div><hr>
                                <div class="row">
                                    <div class="text-md-right col-sm-12 col-md-3">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <h4 style="color:gray">SSO 연동 모듈</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-9">
                                        <ul class="">
                                            <li>Microsoft Azure AD 및 Keycloak 기반 SSO 연동을 위한 Java/Spring Boot 오픈소스 모듈 개발</li>
                                            <li>Microsoft Azure AD & Keycloak</li>
                                            <li>Java & Spring Boot</li>
                                            <li><a href="https://github.com/sunghomong/SSO_PROJECT" target="_blank" rel="noreferrer noopener">https://github.com/sunghomong/SSO_PROJECT</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div><hr>
                                <div class="row">
                                    <div class="text-md-right col-sm-12 col-md-3">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <h4 style="color:gray">Jekyll Blog</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-9">
                                        <ul class="">
                                            <li>Jekyll 테마(Chirpy)를 fork하여 커스터마이징한 개인 블로그 구축 및 운영</li>
                                            <li>Rollup과 Babel을 활용한 JavaScript 번들링 및 트랜스파일링 구성</li>
                                            <li>GitHub Actions를 활용한 자동 빌드 및 배포 파이프라인 구성</li>
                                            <li><a href="https://github.com/sunghomong/sunghomong.github.io" target="_blank" rel="noreferrer noopener">Repository</a> / <a href="https://github.com/cotes2020/jekyll-theme-chirpy" target="_blank" rel="noreferrer noopener">Original Theme</a></li>
                                            <li>
                                                <strong>Skill Keywords</strong>
                                                <div>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Jekyll</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Ruby</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">JavaScript</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">SCSS</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Bootstrap</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Rollup</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Babel</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">GitHub Actions</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Markdown</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Liquid</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- EDUCATION 섹션 -->
        <div class="mt-5">
            <div class="row">
                <div class="col">
                    <div class="pb-5 row">
                        <div class="col">
                            <h2 style="color:#3c78d8">EDUCATION</h2>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col">
                            <div>
                                <div class="row">
                                    <div class="text-md-right col-sm-12 col-md-3">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <h4 style="color:gray">2025. 04 ~ 2025. 05</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-9">
                                        <h4>도커-쿠버네티스-스터디</h4>
                                        <i style="color:gray">스터디 모임활동</i>
                                        <ul class="pt-2">
                                            <li>GitOps, ArgoCD 등을 활용한 지속적 배포(CD) 및 자동화 환경 구성 실습</li>
                                            <li>인프라 자동화 및 운영환경에 대한 이해도를 높이고 클라우드 네이티브 및 MSA 환경에 대한 실전 감각 향상을 목표로 스터디 참여</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div><hr>
                                <div class="row">
                                    <div class="text-md-right col-sm-12 col-md-3">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <h4 style="color:gray">2025. 03 ~ 2025. 08</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-9">
                                        <h4>Growth Log - 3기</h4>
                                        <i style="color:gray">대학교 커뮤니티 참여</i>
                                        <ul class="pt-2">
                                            <li>대학생 개발 커뮤니티에 참여하여 지식 공유 및 팀 단위 프로젝트 수행을 목적으로 활동</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div><hr>
                                <div class="row">
                                    <div class="text-md-right col-sm-12 col-md-3">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <h4 style="color:gray">2025. 03 ~ 현재</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-9">
                                        <h4>방송통신대학교</h4>
                                        <i style="color:gray">컴퓨터과학과 재학 중</i>
                                        <ul class="pt-2">
                                            <li>컴퓨터 구조, 자료구조, 운영체제 등 컴퓨터 공학의 기초 이론을 학습</li>
                                            <li>직무 관련 실무 경험과 이론 지식을 병행하여 이론 기반의 문제 해결 능력을 향상</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div><hr>
                                <div class="row">
                                    <div class="text-md-right col-sm-12 col-md-3">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <h4 style="color:gray">2024. 03 ~ 2024. 10</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-9">
                                        <h4>Docker & Kubernetes : 실전 가이드</h4>
                                        <i style="color:gray">Udemy 강의 수료</i>
                                        <ul class="pt-2">
                                            <li>Docker 컨테이너 활용 및 Kubernetes 오케스트레이션을 실습 위주로 학습</li>
                                            <li>CI/CD 구성 감각을 익히고 개발-배포 파이프라인 자동화의 기본 구조 이해에 목적을 두고 초급부터 전문가 수준까지의 영상 기반 강의를 수료</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div><hr>
                                <div class="row">
                                    <div class="text-md-right col-sm-12 col-md-3">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <h4 style="color:gray">2023. 12</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-9">
                                        <h4>정보처리 산업기사</h4>
                                        <i style="color:gray">자격증 취득</i>
                                        <ul class="pt-2">
                                            <li>소프트웨어 개발 직무에 필요한 기초 이론과 실무 능력 검증을 목적으로 취득</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div><hr>
                                <div class="row">
                                    <div class="text-md-right col-sm-12 col-md-3">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <h4 style="color:gray">2023. 05 ~ 2023. 11</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-9">
                                        <h4>자바(JAVA)기반 풀스택 개발 과정</h4>
                                        <i style="color:gray">프론트엔드, 백엔드 개발 과정</i>
                                        <ul class="pt-2">
                                            <li>총 6개월 과정으로 객체지향 프로그래밍(OOP) 개념부터 Java 웹 개발 실무 전반을 학습</li>
                                            <li>프론트엔드와 백엔드를 연계한 웹 시스템 구현 프로젝트 경험 및 프로젝트 1등 수상</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ETC 섹션 -->
        <div class="mt-5">
            <div class="row">
                <div class="col">
                    <div class="pb-5 row">
                        <div class="col">
                            <h2 style="color:#3c78d8">ETC</h2>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col">
                            <div>
                                <div class="row">
                                    <div class="text-md-right col-sm-12 col-md-3">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <h4 style="color:gray">2020. 04 ~ 2023. 03</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-9">
                                        <h4>건설업 종사</h4>
                                        <i style="color:gray">도면 작업, 현장 관리</i>
                                    </div>
                                </div>
                            </div>                            
                            <div><hr>
                                <div class="row">
                                    <div class="text-md-right col-sm-12 col-md-3">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <h4 style="color:gray">2022. 11</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-9">
                                        <h4>방수기능사</h4>
                                        <i style="color:gray">한국산업인력공단 자격증 취득</i>
                                    </div>
                                </div>
                            </div>                            
                            <div><hr>
                                <div class="row">
                                    <div class="text-md-right col-sm-12 col-md-3">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <h4 style="color:gray">2020. 07</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-9">
                                        <h4>건축도장기능사</h4>
                                        <i style="color:gray">한국산업인력공단 자격증 취득</i>
                                    </div>
                                </div>
                            </div>

                            <div><hr>
                                <div class="row">
                                    <div class="text-md-right col-sm-12 col-md-3">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <h4 style="color:gray">2018. 08 ~ 2020. 03</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-9">
                                        <h4>해병대 병장 만기 전역</h4>
                                        <i style="color:gray">군대 만기 전역</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="row">
            <div style="background-color:#f5f5f5;padding-left:0;padding-right:0;margin-top:50px;height:80px" class="col">
                <div class="text-center mt-4">
                    <div class="row">
                        <div class="col">
                            <small>v.1.0.1 / <a href="https://github.com/sunghomong" target="_blank" rel="noreferrer noopener">Github</a></small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
