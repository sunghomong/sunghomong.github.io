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

    .mt-5 {
        margin-top: 1rem !important;
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
                                <i class="far fa-bell mr-2"></i> 이메일로 연락 부탁드립니다.
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
                        Healthcare Product 웹/앱 서비스의 개발 및 운영을 담당하고 있는 백엔드 중심의 풀스택 개발자입니다. Java, Spring Boot 기반의 백엔드 개발을 중심으로 Vue, TypeScript, JSTL, JPA 등을 활용하여 서비스 전반을 개발하고 운영해왔습니다. 결제 시스템 구축, SSO 통합, 레거시 시스템 마이그레이션 등 다양한 프로젝트를 수행하며 서비스 아키텍처 설계부터 운영, 장애 대응 및 개선까지 경험했습니다.
                    </p>
                    <p>
                        AI 기술에 관심을 가지고 있으며, 새로운 기술과 오픈소스를 탐색하고 실무에 적용할 수 있는 방안을 연구하는 것을 즐깁니다. 빠르게 변화하는 IT 환경 속에서 지속적으로 새로운 기술을 학습하고 검증하며 성장하는 개발자가 되고자 노력하고 있습니다.
                    </p>
                    <p>
                        개발은 기술만으로 완성되지 않는다고 생각합니다. 비즈니스 요구사항을 이해하고 다양한 이해관계자와 적극적으로 소통하며 최적의 해결책을 만들어가는 과정을 중요하게 생각합니다. 개인의 역량뿐 아니라 팀의 협업이 좋은 서비스를 만든다고 믿으며, 함께 성장하고 성과를 만들어가는 개발자를 꿈꾸고 있습니다.
                    </p>
                    <p class="text-right"><small>Latest Updated</small> <span class="badge badge-secondary">2026. 07. 13</span></p>
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
                                <h4 style="color:gray">AI Tools</h4>
                            </div>
                            <div class="col-sm-12 col-md-9">
                                <div class="mt-2 mt-md-0 row">
                                    <div class="col-12 col-md-4">
                                        <ul>
                                            <li>Cursor</li>
                                        </ul>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <ul>
                                            <li>ChatGPT</li>
                                        </ul>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <ul>
                                            <li>Gemini</li>
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
                            <h2 style="color:#3c78d8">WORK EXPERIENCE   <span style="font-size:50%"><span class="badge badge-secondary">총 2년 4개월</span></span></h2>
                        </div>
                    </div>
                    <div>
                        <div class="row">
                            <div class="text-md-right col-sm-12 col-md-3">
                                <h4 style="color:gray">2024. 03 ~</h4>
                            </div>
                            <div class="col-sm-12 col-md-9">
                                <h4 style="display:inline-flex;align-items:center">옴니 D&C - 옴니케어 (omnicare) <span style="font-size:65%;display:inline-flex;align-items:center"><span class="ml-1 badge badge-info" style="margin-left: 3px;">2년 4개월</span></span></h4>
                            </div>
                        </div>
                        <div class="mt-2 row">
                            <div class="text-md-right col-sm-12 col-md-3">
                                <span style="color:gray">2024. 03 ~ 현재</span>
                            </div>
                            <div class="col-sm-12 col-md-9">
                                <i style="color:gray">Healthcare Product / 건강 검진 플랫폼 풀스택 개발자</i>
                                <ul class="pt-2">
                                    <li>결제 도메인 전담 (관리자/사용자 기능 개발 및 운영)</li>
                                    <li>외부 기관 연계 REST API 개발 (마음검진, 설문평가, 건강분석 서비스 등)</li>
                                    <li>SSO 로그인 구축 (Keycloak, Microsoft Azure AD)</li>
                                    <li>건강검진 플랫폼 리뉴얼 및 차세대 시스템 구축 (Vue, TypeScript, Spring Boot, JPA...)</li>
                                    <li>신규 서비스 구축을 위한 데이터 모델링 및 ERD 설계</li>
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
                                            <span style="font-weight:400" class="mr-1 badge badge-secondary">Oracle</span>
                                            <span style="font-weight:400" class="mr-1 badge badge-secondary">Redis</span>
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
                                                <h4 style="color:gray">2026. 05 ~ 2026.06</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-9">
                                        <h4>결제 알림톡 개발</h4>
                                        <i style="color:gray">건강검진 플랫폼 결제 모듈 전환</i>
                                        <ul class="pt-2">
                                            <li>외부 결제 링크 방식에서 자체 결제 페이지 (Vue/TypeScript)로 전환 (회원 전환율 5% 개선)</li>
                                            <li>카카오 비즈니스 채널 및 그룹웨어 메일 연동을 통한 다채널 결제 안내 시스템 구축</li>
                                            <li>가상계좌 발급 기능 개발 및 Redis TTL 기반 입금 만료, 예약 취소 자동화 구현</li>
                                            <li>
                                                <strong>Skill Keywords</strong>
                                                <div>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Vue</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">TypeScript</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Spring Boot</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">JPA</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Redis</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Node.js</span>
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
                                                <h4 style="color:gray">2025. 09 ~ 2026.05</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-9">
                                        <h4>비타브릿지 리뉴얼 및 차세대 시스템 구축</h4>
                                        <i style="color:gray">건강검진 플랫폼 리뉴얼 프로젝트</i>
                                        <ul class="pt-2">
                                            <li><a href="https://www.docdocdoc.co.kr/news/articleView.html?idxno=3032565" target="_blank" rel="noreferrer noopener">브타브릿지 차세대 서비스 출시</a></li>
                                            <li>레거시 시스템(JSTL/Spring)을 Vue, TypeScript, Spring Boot, JPA 기반 차세대 아키텍처로 전면 마이그레이션</li>
                                            <li>Spring Security 커스터마이징을 통한 JWT 기반 인증, 인가 체계 구축</li>
                                            <li>회원 서비스 전담 및 ISMS 보안 요구사항 반영</li>
                                            <li>결제 도메인 전담으로 결제 로직 마이그레이션 및 실시간 결제 상태 관리 시스템 구축</li>
                                            <li>개발 환경 배포 프로세스 구축 및 운영 효율화</li>
                                            <li>
                                                <strong>Skill Keywords</strong>
                                                <div>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Vue</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">TypeScript</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Spring Boot</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">JPA</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Spring Security</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Redis</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">MySQL</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">MongoDB</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Linux</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Node.js</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Oracle</span>
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
                                        <i style="color:gray">결제 서비스 전담으로서 개선 및 고도화 작업</i>
                                        <ul class="pt-2">
                                            <li>결제 서비스 전담으로 결제 시스템 2.0 아키텍처 설계 및 고도화</li>
                                            <li>Redis 기반 세션 관리 도입으로 모바일 환경 세션 유실 문제 해결</li>
                                            <li>BFF API 통합 및 마이그레이션을 통한 결제 서비스 구조 개선</li>
                                            <li>결제 관리 관리자 페이지 신규 구축으로 주당 70시간 이상의 운영 업무 절감</li>
                                            <li>자동 환불 프로세스 구축으로 1,425건 이상의 비정상 결제 건 자동 처리</li>
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
                                            <li>Keycloak / Microsoft Azure AD 기반 통합 SSO 구축 (신규 가입자 73%, 약 120만 명 전환)</li>
                                            <li>해외 협력사 Azure AD 연동 및 기술 커뮤니케이션 수행</li>
                                            <li>OIDC, OAuth2.0, PKCE 기반 인증 체계 설계 및 구현</li>
                                            <li>state, nonce 검증을 통한 인증 보안 강화 및 CSRF 대응</li>
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
                                            <li>CODEF API 기반 국가건강검진 조회 서비스 개발</li>
                                            <li>TXID 기반 2단계 인증 및 비동기 데이터 처리 구조 구축</li>
                                            <li>10년치 건강검진 데이터 모델링 및 DB 설계</li>
                                            <li>토큰 재사용 구조 도입으로 API 호출 비용 절감 및 응답 성능 개선</li>
                                            <li>Chart.js 기반 건강검진 데이터 시각화 모듈 개발</li>
                                            <li>
                                                <strong>Skill Keywords</strong>
                                                <div>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">REST API</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Spring Boot</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">JavaScript</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Chart.js</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">MySQL</span>
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
                                            <li>외부 전문 심리 평가 기관 연계 REST API 기반 부가 서비스 설계 및 개발</li>
                                            <li>다양한 문항 유형을 지원하는 동적 설문 시스템 구축</li>
                                            <li>확장 가능한 데이터 모델링 및 ERD 설계로 신규 검사 항목 유연 대응</li>
                                            <li>SFTP 기반 결과지 관리 기능 및 대상자 관리 관리자 페이지 구축</li>
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
        <!-- SIDE PROJECT 섹션 -->
        <div class="mt-5">
            <div class="row">
                <div class="col">
                    <div class="pb-5 row">
                        <div class="col">
                            <h2 style="color:#3c78d8">SIDE PROJECT</h2>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div>
                                <div class="row">
                                    <div class="text-md-right col-sm-12 col-md-3">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <h4 style="color:gray">2023. 10 ~ 2023.11</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-9">
                                        <h4>Social Meeting Service (요즘 뭐해?)</h4>
                                        <i style="color:gray">취미 기반 소셜 모임 서비스 플랫폼 프로젝트</i>
                                        <ul class="pt-2">
                                            <li>팀장으로서 기획, 구축, 개발까지 주도하여 교육 과정 내 최우수 프로젝트(1위) 수상</li>
                                            <li>HTTP Polling 방식의 한계를 개선하고자 WebSocket을 도입하여 실시간 양방향 통신 구현</li>
                                            <li>WebSocket 적용으로 동시 접속 50명 지원, 메시지 지연시간 100ms 이하 달성</li>
                                            <li>게시글, 댓글, 공지사항, 채팅, 관리자 기능 등 주요 기능 구현 및 ERD 설계</li>
                                            <li><strong>Open Source : </strong><a href="https://github.com/sunghomong/social_meeting_site" target="_blank" rel="noreferrer noopener">https://github.com/sunghomong/social_meeting_site</a></li>                                            
                                            <li><strong>회고록 : </strong><a href="https://sunghomong.github.io/posts/Project_Meeting_project" target="_blank" rel="noreferrer noopener">https://sunghomong.github.io/posts/Project_Meeting_project</a></li>
                                            <li>
                                                <strong>Skill Keywords</strong>
                                                <div>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Java</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Spring Boot</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Thymeleaf</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">JavaScript</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">WebSocket</span>
                                                    <span style="font-weight:400" class="mr-1 badge badge-secondary">Oracle</span>
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
                            <small>v.1.0.4 / <a href="https://github.com/sunghomong" target="_blank" rel="noreferrer noopener">Github</a></small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
