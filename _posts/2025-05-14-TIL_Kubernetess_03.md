---
title: "[Kubernetes] Kubernetes Probe & GitOps 개요 (4주차)"
date: 2025-05-14 12:00:00 +0800
categories: [TIL,TIL_Kubernetes]
tags: [ Kubernetes,CI,CD,TIL,Education,GitOps,Helm,pod ]
image: https://objectstorage.kr-central-2.kakaocloud.com/v1/c11fcba415bd4314b595db954e4d4422/public/tutorial/gitops-pipeline/GitOps.png
---

출처: https://docs.kakaocloud.com/blog/240524-gitops

# 4주차 - Kubernetes Probe & GitOps 개요

## ☸️ Pod LifeCycle

### 🔍 Pod LifeCycle 개요

<img src="https://i0.wp.com/www.openmaru.io/wp-content/uploads/2023/03/ye_1.png?w=427&ssl=1" alt="img">

출처: https://www.openmaru.io/kubernetes-에서-pod-에-대한-헬스체크-probe/

---

#### `Pending → Running → Succeeded / Failed`

| Phase      | 설명 |
|------------|------|
| **Pending**   | Node에 할당됐지만 컨테이너가 아직 준비되지 않은 상태 (이미지 다운로드 중, 자원 부족 등) |
| **Running**   | 컨테이너가 실행 중이거나 시작/재시작 상태 |
| **Succeeded** | 모든 컨테이너가 정상 종료된 상태 |
| **Failed**    | 하나 이상의 컨테이너가 실패로 종료된 상태 |
| **Unknown**   | 노드와 통신 불가 등으로 상태를 알 수 없음 |

- kubelet은 오류 시 컨테이너를 자동 재시작할 수 있음
- 쿠버네티스는 파드 상태를 추적해 복구 조치를 수행함

---

#### Probe (프로브)

[공식 문서 보기](https://kubernetes.io/ko/docs/concepts/workloads/pods/pod-lifecycle/#%EC%BB%A8%ED%85%8C%EC%9D%B4%EB%84%88-%ED%94%84%EB%A1%9C%EB%B8%8C-probe)

프로브는 **kubelet이 주기적으로 수행하는 컨테이너 진단**으로, 파드의 상태를 확인하는 데 사용

---

#### Probe 수행 방식

| 방식       | 설명 |
|------------|------|
| `exec`     | 컨테이너 내 명령어 실행 → **0으로 종료 시 성공** |
| `grpc`     | gRPC 헬스 체크 → **status가 SERVING이면 성공**<br>(알파 기능, `GRPCContainerProbe` 기능 게이트 필요) |
| `httpGet`  | HTTP GET 요청 → **상태 코드 200~399이면 성공** |
| `tcpSocket`| TCP 포트 연결 → **연결되면 성공** |

---

#### Probe 종류

| 종류              | 설명 |
|-------------------|------|
| `livenessProbe`   | 컨테이너가 **정상 동작 중인지** 확인<br>실패 시 kubelet이 컨테이너를 **재시작** |
| `readinessProbe`  | 컨테이너가 **요청 처리 준비가 되었는지** 확인<br>실패 시 서비스 **엔드포인트에서 제외** |
| `startupProbe`    | 애플리케이션이 **완전히 시작됐는지** 확인<br>성공 전까지 다른 프로브는 **비활성화됨**<br>실패 시 **컨테이너 재시작** |

> 💡 컨테이너가 해당 프로브를 정의하지 않으면 기본 상태는 `Success` (`readinessProbe`는 초기 지연 전까지 `Failure`).
{: .prompt-info }

---

### 🔄 Liveness Probe

- 컨테이너가 **정상 동작 중인지** 여부 판단
- Liveness Probe에 **실패하면 kubelet이 컨테이너를 종료하고 재시작**
- 컨테이너가 Liveness Probe를 정의하지 않으면 **기본 상태는 Success**
- 실패 시 컨테이너 재시작


#### Liveness Probe 실습

```shell
cat <<EOF>> liveness-test.yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    test: liveness
  name: liveness-http
spec:
  containers:
  - name: liveness
    image: registry.k8s.io/e2e-test-images/agnhost:2.40
    args:
    - liveness
    livenessProbe:
      httpGet:
        path: /healthz
        port: 8080
        httpHeaders:
        - name: Custom-Header
          value: Awesome
      initialDelaySeconds: 3
      periodSeconds: 3
EOF

kubectl apply -f liveness-test.yaml
```

- `Probe 설정`
  - 컨테이너의 **8080** 포트의 **/healthz** 경로가 성공(Status 200)하면 Probe 성공
  - **첫 번째 프로브를 수행하기 전 3**초를 기다림
    - `initialDelaySeconds: 3`
  - **kubelet 이 3초마다 LivenessProbe 를 수행**
    - `periodSeconds: 3`

```shell
# Pod 확인
watch kubectl get pod -o wide

...
NAME             READY   STATUS    RESTARTS      AGE   IP            NODE          NOMINATED NODE   READINESS GATES
liveness-http    1/1     Running   2 (14s ago)   51s   10.244.1.17   kind-worker   <none>           <none>
...

# Pod 상세 정보
kubectl describe pod liveness-http

...
Events:
  Type     Reason     Age                 From               Message
  ----     ------     ----                ----               -------
  Warning  Unhealthy  19s (x12 over 79s)  kubelet            Liveness probe failed: HTTP probe failed with statuscode: 500
  Normal   Killing    19s (x4 over 73s)   kubelet            Container liveness failed liveness probe, will be restarted
  Warning  BackOff    7s (x3 over 19s)    kubelet            Back-off restarting failed container liveness in pod liveness-http_default(0f16d9a4-b767-410e-8d06-bd802da16b04)
...
```

---

### 🚥 Readiness Probe (준비성 프로브)

- 컨테이너가 **외부 요청을 처리할 준비가 되었는지**를 판단
- 실패 시, **해당 Pod는 서비스 엔드포인트에서 제외**되어 트래픽이 전달되지 않음
- 재시작은 하지 않으며, **Liveness Probe와 동작 방식이 다름.**
- 초기 지연(초기화) 이전 상태는 **Failure**, 정의하지 않으면 기본은 **Success**
- 실패 시, 해당 Pod로 **트래픽 전달 차단** 및 **컨테이너 그대로 유지** (재시작 X)

#### Readiness Probe 실습

```shell
cat <<EOF>> readiness-test.yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    test: readiness
  name: readiness-http
spec:
  containers:
  - name: readiness
    image: registry.k8s.io/e2e-test-images/agnhost:2.40
    args:
    - liveness
    readinessProbe:
      httpGet:
        path: /healthz
        port: 8080
        httpHeaders:
        - name: Custom-Header
          value: Awesome
      initialDelaySeconds: 3
      periodSeconds: 3
EOF

kubectl apply -f readiness-test.yaml
```

- `Probe 설정`
  - 컨테이너의 **8080** 포트의 **/healthz** 경로가 성공(Status 200)하면 Probe 성공
  - **첫 번째 프로브를 수행하기 전 3**초를 기다림
    - `initialDelaySeconds: 3`
  - **kubelet 이 3초마다 ReadinessProbe 를 수행**
    - `periodSeconds: 3`

```shell
# Pod 확인
watch kubectl get pod -o wide

...
NAME             READY   STATUS    RESTARTS   AGE   IP            NODE          NOMINATED NODE   READINESS GATES
readiness-http   0/1     Running   0          19s   10.244.1.18   kind-worker   <none>           <none>
...

# Pod 상세 정보
kubectl describe pod readiness-http

...
Events:
  Type     Reason     Age                 From               Message
  ----     ------     ----                ----               -------
  Warning  Unhealthy  1s (x16 over 43s)  kubelet             Readiness probe failed: HTTP probe failed with statuscode: 500
...
```

#### Liveness vs Readiness

|  | 재기동 | 트래픽 차단 유무 |
| --- | --- | --- |
| Liveness Probe | 컨테이너 재기동 | 트래픽 차단하지 않음 |
| Readiness Probe | 재기동 X | 트래픽 차단함 |

---

### 🏁 Startup Probe (스타트업 프로브)

- 컨테이너 내 애플리케이션이 **완전히 시작되었는지** 여부를 판단
- `startupProbe`가 설정되면, **성공하기 전까지는 liveness/readiness probe가 작동하지 않음**
- 앱 시작이 오래 걸리는 경우, **초기 구동 중 실패로 인해 재시작되는 문제 방지**
- 실패 시, **kubelet은 컨테이너를 종료**하고 **재시작 정책에 따라 처리**
- 정의하지 않으면 기본 상태는 **Success**

- `Startup Probe 설정 시`

<img src="https://i0.wp.com/www.openmaru.io/wp-content/uploads/2023/04/1.png?resize=1500%2C843&ssl=1" alt="img">

출처: https://www.openmaru.io/kubernetes-에서-pod-에-대한-헬스체크-probe/

- `Liveness Probe 의 InitialDelaySeconds 만 설정 시`

<img src="https://i0.wp.com/www.openmaru.io/wp-content/uploads/2023/04/2.png?resize=1500%2C844&ssl=1" alt="img">

출처: https://www.openmaru.io/kubernetes-에서-pod-에-대한-헬스체크-probe/

---

## 📦 Manifest Management (매니페스트 관리)

> ✅ Kubernetes에서는 모든 리소스를 **YAML 형식의 선언형 파일(Manifest)** 로 정의한다.  
  하지만 환경이 복잡해지고 운영이 정교해질수록, **단순 YAML 관리만으로는 한계**가 있다.  
  이를 보완하기 위해 Helm, Kustomize 같은 **Manifest 관리 도구**들이 등장.
{: .prompt-info } 

### 🧰 Manifest 관리 도구가 필요한 이유

`1. 환경별 구성 분리`

- 개발(dev), 스테이징(stg), 운영(prd) 환경마다 설정이 조금씩 다름.
- 매번 YAML을 복사해서 수정하면 **누락, 오타 등의 Human Error**가 발생하기 쉬움
-> 도구를 사용하면 공통값은 유지하면서 **환경별 차이점만 override** 가능

`2. 템플릿화 및 변수화`

- 반복되는 설정을 템플릿화하면 **구조를 일관되게 유지**할 수 있음
- 변수로 분리하면 **변경이 편하고 재사용성이 높아짐**

`3. 버전 관리 및 롤백`

- Helm, Kustomize는 **버전 관리 기능**을 제공하여 배포 이력 추적이 가능
- 문제 발생 시 손쉽게 **롤백**할 수 있음

`4. 자동화 및 GitOps 연계`

- Git과 CI/CD 시스템과 연동하여 **GitOps 방식**으로 선언형 인프라 관리가 가능
- 코드 기반으로 인프라를 추적 및 자동화할 수 있어 운영 효율이 높아짐

#### 대표적인 Manifest 관리 도구

쿠버네티스에서 선언형 매니페스트를 효율적으로 다루기 위해 다양한 도구들이 존재한다. <br>
그중에서도 가장 널리 쓰이는 두 가지는 **Kustomize**와 **Helm**이다.

`🔧 Kustomize`

> [공식 문서 보기](https://kubernetes.io/ko/docs/tasks/manage-kubernetes-objects/kustomization/)

- `kubectl`에 기본 내장되어 별도 설치 없이 바로 사용 가능

```bash
kubectl version
...
Client Version: v1.32.3
Kustomize Version: v5.5.0
Server Version: v1.32.2
...
```

- 매니페스트를 템플릿 없이 사용자 정의 방식으로 관리할 수 있도록 도와주는 도구

- ✅ **주요 기능**
  - 오버레이(Overlay): 환경별 설정 덮어쓰기
  - 공통 리소스 재사용: base 디렉토리를 통해 중복 제거

`⚙️ Helm`

> [공식 문서 보기](https://helm.sh/ko/)
{: .prompt-info }

- 가장 많이 사용되는 매니페스트 관리 도구
- 쿠버네티스를 사용한다면 Helm 사용법은 거의 **필수**
- Kubernetes 애플리케이션의 배포/관리를 위한 **패키지 매니저** 역할

- ✅ **주요 기능**
  - 템플릿 기반 매니페스트 생성
  - 버전 관리, 업그레이드, 롤백
  - **Chart**라는 구조를 통해 재사용 가능한 패키지화

`🧪 그 외 도구들`

| 도구명 | 설명 |
|--------|------|
| **Kpt** | Google이 만든 매니페스트 관리 도구. GitOps 및 CI/CD 파이프라인 통합에 강점 |
| **Jsonnet** | JSON 기반 DSL(도메인 특화 언어)로, 복잡한 구성도 유연하게 표현 가능 |

---

### 🧩 Kustomize

<img src="https://kubectl.docs.kubernetes.io/images/new_kustomize_banner.jpg" alt="img">

> 🛠️ Kustomize란? <br>
> **K**ubernetes + C**ustomize** = **Kustomize**  
> → 템플릿 없이 순수 YAML을 레이어별로 조합하여 **구성 변경을 선언적으로 관리**할 수 있게 해주는 도구

- 공식 사이트: [https://kustomize.io/](https://kustomize.io/)
- **쿠버네티스 리소스(YAML 파일)를 직접 수정하지 않고, 재정의 및 오버레이로 새로운 구성 생성 가능**
- 마치 Linux의 `sed`처럼, 원본을 보존하면서 원하는 필드만 덮어쓰는 방식
- **`kubectl`에 기본 내장**되어 별도 설치 없이 사용 가능

`🎯 Kustomize의 목표 및 주요 특징`

| 특징 | 설명 |
|------|------|
| 🧩 **템플릿 없이 YAML 기반** | Helm과 달리 템플릿 언어가 아닌 순수 YAML을 활용 |
| 💡 **선언적 구성 (Declarative)** | 모든 커스터마이징은 선언적으로 이루어짐 |
| 🧱 **레이어 기반 오버레이 구조** | base 리소스 위에 환경별 차이점만 덮어쓰기 |
| 🔄 **버전 관리 및 재사용에 용이** | 기존 리소스 복사 없이 재정의 가능 |
| 🔌 **kubectl 내장 / 독립 실행도 가능** | `kubectl apply -k` 또는 별도 바이너리 사용 가능 |
| ✅ **검증 가능한 YAML 아티팩트** | 모든 구성 요소가 YAML로 존재해 정적 분석과 검증이 쉬움 |
| 🔀 **Fork / Modify / Rebase 워크플로우 권장** | GitOps와의 통합에도 유리 |

#### Kustomize 핵심 개념


`📦 Base`

> **공통된 리소스를 저장하는 디렉토리**
{: .prompt-info }

- Kustomize를 통해 **변경할 원본 YAML 파일**들이 위치한 곳
- 여러 환경에서 **공통으로 사용할 수 있는 리소스 정의**
- 보통 `deployment.yaml`, `service.yaml`, `ingress.yaml` 등의 공통 Kubernetes 설정을 포함
- 다른 도구에 비유하면:
  - Terraform → Module
  - Helm → Chart

```text
├── base/
│   ├── deployment.yaml
│   ├── service.yaml
│   └── kustomization.yaml
```

`🎨 Overlay`

> **환경별 커스터마이징을 정의하는 디렉토리**
{: .prompt-info }

- `base` 디렉토리의 리소스를 기반으로 **환경별 차이점만 정의** (overlays/dev, overlays/stg, overlays/prd)

```text
├── overlays/
│ ├── dev/
│ │ └── kustomization.yaml
│ ├── stg/
│ │ └── kustomization.yaml
│ └── prd/
│ └── kustomization.yaml
```

`🧾 kustomization.yaml`

> Kustomize가 동작할 때 참조하는 핵심 설정 파일
{: .prompt-info }

- 어떤 리소스를 사용할지, 어떤 항목을 재정의할지 지정하는 **제어 파일**
- 주요 설정 항목:

| 항목                      | 설명                                           |
|-------------------------|------------------------------------------------|
| `resources`             | 적용할 리소스(YAML) 경로 지정                    |
| `patches`               | 덮어쓸 리소스 정의 (Strategic Merge 방식 등)     |
| `namePrefix` / `nameSuffix` | 리소스 이름에 접두/접미사 추가                |
| `images`                | 이미지 레지스트리나 태그 변경                    |
| `configMapGenerator` / `secretGenerator` | ConfigMap/Secret 자동 생성  |

#### Kustomization.yaml 주요 필드 및 실행 순서

`kustomization.yaml` 파일은 Kustomize가 쿠버네티스 리소스를 어떻게 구성하고 적용할지를 정의하는 핵심 구성 파일이다.

`🔑 주요 필드 설명`

| 필드명                 | 설명                                                                 |
|----------------------|----------------------------------------------------------------------|
| `resources`          | Kustomize를 적용할 기존 Kubernetes 리소스(YAML 파일) 목록을 지정               |
| `generators`         | 새로운 리소스를 생성하기 위한 플러그인 정의 (예: ConfigMap, Secret 등 생성)       |
| `transformers`       | 리소스에 변형(transform)을 적용 (예: namePrefix 추가, 라벨 추가 등)              |
| `validators`         | 리소스를 검증하는 플러그인 지정 (검증 실패 시 배포 중단)                         |
| 기타 Plug-in         | `configMapGenerator`, `namePrefix`, `patches` 등 다양한 확장 필드 사용 가능       |

`실행 순서`

- `resources` → `generators` → `transformers` → `validators`

#### Kustomize 실습

- **Kustomize는 `kubectl`에 기본 통합**되어 있으므로 별도 설치 없이 `kustomize build` 명령 사용 가능
- 단, **고급 기능**이나 **단독 실행**이 필요할 경우 **별도 설치**가 필요함


- 🔍 Kubectl 내장 Kustomize 버전 확인

```bash
# kubectl 버전 확인
kubectl version --client

# 출력 예시
...
Client Version: v1.32.3
Kustomize Version: v5.5.0
...
```

- kubectl 버전에 통합된 kustomize 버전

> [공식문서](https://github.com/kubernetes-sigs/kustomize#kubectl-integration)
{: .prompt-info }

| Kubectl version | Kustomize version |
| --- | --- |
| < v1.14 | n/a |
| v1.14-v1.20 | v2.0.3 |
| v1.21 | v4.0.5 |
| v1.22 | v4.2.0 |
| v1.23 | v4.4.1 |
| v1.24 | v4.5.4 |
| v1.25 | v4.5.7 |
| v1.26 | v4.5.7 |
| v1.27 | v5.0.1 |

- Kustomize 설치

```shell
# Binary 설치
curl -s "https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/hack/install_kustomize.sh" | bash && mv kustomize /usr/local/bin

# MacOS
brew install kustomize

# Chocolatey
choco install kustomize
```

```shell
# 설치 확인
kustomize version

...
v5.6.0
...
```

- kustomize 사용을 위한 파일 생성

```shell
# 실습 디렉토리 생성
mkdir kustomize && cd kustomize
```

```shell
cat << EOF >> kustomization.yaml
resources:
  - pod.yaml

images:
  - name: nginx
    newName: new-nginx
    newTag: 1.23.1
EOF
```

```shell
cat << EOF >> pod.yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    name: nginx
  name: nginx
spec:
  containers:
  - image: nginx:latest
    name: nginx
    resources:
      limits:
        cpu: 100m
        memory: 64Mi
EOF
```

- kustomize 실행

```shell
# Tree 구조 확인
tree .

...
.
├── kustomization.yaml
└── pod.yaml
...

# kustomization.yaml 파일이 있는 PATH 실행
kubectl kustomize <PATH>

# 현재 Directory 에서 실행
kubectl kustomize .

...
apiVersion: v1
kind: Pod
metadata:
  labels:
    name: nginx
  name: nginx
spec:
  containers:
  - image: new-nginx:1.23.1
    name: nginx
    resources:
      limits:
        cpu: 100m
        memory: 64Mi
...
```

> 기존 pod.yaml 가 변경 된걸까?? <br>
-> 기존의 pod.yaml 파일은 변경되지 않았고 kustomize는 원본 YAML 파일을 직접 수정하지 않고, 메모리상에서 변경된 결과물을 출력할 뿐이다.
{: .prompt-info }

```shell
# kustomize 결과를 파일로 추출
kubectl kustomize . > pod-kustomize.yaml

# 기존 Pod 파일과 차이 확인
diff pod.yaml pod-kustomize.yaml
```

- kustomize 리소스 생성

```shell
# kustomize 배포
kubectl kustomize . | kubectl apply -f -

# kustomize 파일로 추출 후 배포
kubectl kustomize . > pod-kustomize.yaml | kubectl apply -f pod-kustomize.yaml

# 배포 확인
kubectl describe pod nginx | grep -i containers: -A4
```

- Kustomize 리소스 삭제

```shell
kubectl kustomize . | kubectl delete -f -
```

#### Kustomize 심화 - kustomization 필드 활용

`Resource 필드`

- kustomization.yaml에 명시된 리소스만 Kustomize의 대상이 된다.
- 같은 디렉토리에 yaml 파일이 있어도, resources 등에 지정하지 않으면 무시
- 따라서 변경하거나 반영하려는 파일은 반드시 kustomization.yaml에 포함시켜야 함.

```shell
mkdir kustomize-1 && cd kustomize-1

cat << EOT > service.yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx
spec:
  selector:
    app: nginx
  ports:
  - port: 80
    targetPort: 80
EOT

cat << EOF > pod-1.yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    name: nginx-1
  name: nginx-1
spec:
  containers:
  - image: nginx:latest
    name: nginx-1
    resources:
      limits:
        cpu: 100m
        memory: 64Mi
EOF

cat << EOF > pod-2.yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    name: nginx-2
  name: nginx-2
spec:
  containers:
  - image: nginx:latest
    name: nginx-2
    resources:
      limits:
        cpu: 100m
        memory: 64Mi
EOF

cat << EOF > kustomization.yaml
resources:
  - pod-1.yaml
  - service.yaml
EOF
```

- kustomize 실행

```shell
tree .

...
.
├── kustomize.yaml
├── pod-1.yaml
├── pod-2.yaml
└── service.yaml
...

kubectl kustomize .
```

`Transformers 필드`

> [공식문서](https://kubectl.docs.kubernetes.io/references/kustomize/builtins/#_namespacetransformer_)

- 리소스의 특정 필드 값을 **변경**하는 기능을 제공
- 다양한 **내장(transformer) 기능**을 지원하여 필드 수정 작업을 쉽게 수행 가능
- 예) 라벨, 어노테이션 변경, 네임스페이스 지정 등


- Namespace 변경

```shell
kubectl create ns test

cat << EOT > kustomization.yaml
namespace: test
resources:
  - pod-1.yaml
  - service.yaml
EOT

kubectl kustomize .
```

- Image Tag 변경

```shell
cat << EOT > kustomization.yaml
namespace: test
images:
  - name: nginx
    newTag: 1.23.1
resources:
  - pod-1.yaml
  - service.yaml
EOT

# kustomize 실행
kubectl kustomize .
```

#### Kustomize 심화 - Base / Overlays 개념 활용

> [공식문서](https://kubectl.docs.kubernetes.io/guides/example/multi_base/)
{: .prompt-info }

- **Base**
  - 변경할 YAML 파일들이 모여있는 재사용 가능한 기본 디렉토리
  - Terraform의 Module, Helm의 Chart와 유사한 개념

- **Overlays**
  - Base에 있는 YAML에 덮어쓰는 환경별 설정 디렉토리
  - 예: overlays/prd, overlays/dev, overlays/stg
  - 비슷한 리소스가 많을수록 관리가 편리해짐  


- 새로운 실습 디렉토리 이동

```shell
cd .. && mkdir kustomize-2 && cd kustomize-2

# 실습 디렉토리 구성
mkdir -p base overlays/dev overlays/prd

tree .
...
.
├── base
└── overlays
    ├── dev
    └── prd
...
```

- Base 생성

```shell
# Base kustomization.yaml 생성
cat << EOT > ./base/kustomization.yaml
resources:
- pod.yaml
EOT

# Base pod.yaml 생성 (공통으로 사용할 YAML 파일)
cat << EOT > ./base/pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
spec:
  containers:
  - name: nginx
    image: nginx:latest
EOT
```

- Overlays 생성 - dev

```shell
cat << EOT > ./overlays/dev/kustomization.yaml
resources:
- ../../base
namePrefix: dev-
EOT

cat << EOT > ./overlays/prd/kustomization.yaml
resources:
- ../../base
namePrefix: prd-
EOT
```

```shell
tree .

# 현재 디렉토리 구조
.
├── base
│   ├── kustomization.yaml
│   └── pod.yaml
└── overlays
    ├── dev
    │   └── kustomization.yaml
    └── prd
        └── kustomization.yaml
```

```shell
# dev kustomize 실행
kubectl kustomize overlays/dev

# prd kustomize 실행
kubectl kustomize overlays/prd
```

---

### ⚙️ Helm

<img src="https://ctf-cci-com.imgix.net/4mpa9wPxoZ8GeAFCpoaryl/9b70f6c2bcd6a93f4692ed3806c4e30e/2023-03-16-image2.png?ixlib=rb-3.2.1&auto=format&fit=max&q=35&dpr=1&w=1347" alt="img">

출처: https://circleci.com/blog/what-is-helm/

#### 🔍 Helm 구조

<img src="https://www.devopsschool.com/blog/wp-content/uploads/2023/03/image-10.png" alt="img">

출처: https://everythingdevops.dev/intro-to-helm-charts-for-complete-beginners/


Helm은 Kubernetes 애플리케이션을 쉽고 체계적으로 배포하고 관리할 수 있는 **패키지 매니저**라고 할 수 있다.

`Helm의 주요 구성요소`

- 📦 **Chart**
  - Helm에서 사용하는 패키지 단위
  - 애플리케이션 실행에 필요한 모든 Kubernetes 리소스(Deployment, Service 등)를 포함
  - `yum`, `apt`, `brew` 같은 역할

- 📚 **Repository**
  - Helm Chart를 저장하고 공유하는 공간
  - 공개 저장소 예: [Artifact Hub](https://artifacthub.io/)
  - 설치형 저장소 예: [Harbor](https://goharbor.io/)

- 🚀 **Release**
  - Chart를 Kubernetes 클러스터에 배포한 인스턴스
  - 하나의 Chart로 여러 환경(예: `myapp-dev`, `myapp-prod`)에 Release 생성 가능

- ⚙️ **Values**
  - `values.yaml` 파일 또는 커맨드라인 인자를 통해 전달하는 사용자 정의 값
  - 템플릿 내 변수로 바인딩되어 동적 리소스 생성 가능

#### 🚀 Helm 실습

- 설치

> [공식문서](https://helm.sh/ko/docs/intro/install/)

```shell
# Mac Homebrew 설치
brew install helm

# Windows Chocolatey
choco install kubernetes-helm

# Helm Version 확인
helm version
helm version --short
```

- 기본사용

```shell
# Helm 디렉토리 이동
mkdir helm-practice

# Helm Repo 확인
helm repo ls

# Helm 생성
helm create mychart
```

```shell
# Helm 구조 확인
cd mychart
tree .

...
.
├── Chart.yaml
├── charts
├── templates
│   ├── NOTES.txt
│   ├── _helpers.tpl
│   ├── deployment.yaml
│   ├── hpa.yaml
│   ├── ingress.yaml
│   ├── service.yaml
│   ├── serviceaccount.yaml
│   └── tests
│       └── test-connection.yaml
└── values.yaml
...
```

- Helm 배포

```shell
# Helm 배포
# helm install <RELEASE_NAME> <패키지 경로> [flags]
helm install myapp .

# Helm Release 확인
helm list

# Helm 으로 배포된 리소스 확인
kubectl get po,deploy,svc,sa

# Helm 삭제
helm delete myapp
```

#### 📦 Helm 심화 - Values.yaml 활용

> 📌 Values.yaml 이란?
> - 템플릿 파일 내 변수들을 바인딩하여 **동적인 Kubernetes 리소스 생성** 가능
> - 환경에 따라 **다른 values.yaml 파일을 적용**하여 dev / stg / prd 분리 가능
> - 실제 운영에서도 OpenSource Helm Chart에 내 환경에 맞는 `values.yaml`을 적용해 사용

- 📦 Helm Repository 설정

```bash
# Bitnami Helm Repository 추가
helm repo add bitnami https://charts.bitnami.com/bitnami

# Helm Repo 목록 확인
helm repo ls

# Bitnami Chart 검색
helm search repo bitnami

# 최신 Chart 정보 갱신
helm repo update
```

- 🚀 Helm Chart 설치

```shell
# nginx 설치 (RELEASE 이름: mynginx)
helm install mynginx bitnami/nginx

# 배포된 nginx 확인
kubectl describe deploy mynginx
kubectl describe deployments.apps mynginx | grep 'Containers:' -A5
```

- Values.yaml로 버전 변경

```shell
cat <<EOF > values.yaml
image:
  tag: 1.24
EOF
```

```shell
# values.yaml 기반으로 버전 업데이트
helm upgrade mynginx bitnami/nginx -f values.yaml

# 변경 확인
kubectl describe deploy mynginx
kubectl describe deployments.apps mynginx | grep 'Containers:' -A5

# Helm Release 확인
helm ls
```

`현업 활용 팁`

- 인증된 공급자의 Helm Chart 사용 -> (ArgoCD, Metrics Server, Nginx Ingress Controller 등)
- values.yaml만 커스터마이징
- 직접 Helm Chart 생성 -> 내부 앱 배포용 (SpringBoot, NextJS 등)

[💡 Helm Template 문법 가이드 바로가기](https://helm.sh/ko/docs/chart_template_guide/getting_started/)

---

## 🚀 GitOps

### 📘 GitOps 개념

<img src="https://objectstorage.kr-central-2.kakaocloud.com/v1/c11fcba415bd4314b595db954e4d4422/public/tutorial/gitops-pipeline/GitOps.png" alt="img">

출처: https://docs.kakaocloud.com/blog/240524-gitops

#### 🧭 GitOps란?

- **GitOps**는 2017년 **Weaveworks**에서 Flux를 개발한 팀이 처음 제안한 개념
- 원하는 클러스터 상태를 **선언형(Declarative)**으로 정의하고,
  이를 **Git 리포지터리에 저장**함으로써 버전 관리, 배포, 감시, 롤백까지 자동화하는 방식이다.
- **애플리케이션 소스코드(CI)** 와 **배포/설정 리포지토리(CD)** 를 **분리**하여 관리
- 배포 설정만 수정할 경우, 빌드 없이도 **즉시 반영 및 롤백** 가능

#### 🛠 핵심 정의

| 키워드          | 설명 |
|------------------|------|
| **Git 중심 운영** | Git을 **단일 진실의 원천(SSOT, Single Source of Truth)** 으로 삼아 모든 설정 및 리소스 정의를 관리 |
| **선언형 인프라** | Kubernetes 리소스를 포함한 모든 인프라를 **YAML 등 선언적 방식**으로 정의 |
| **자동 동기화** | Git 상태와 클러스터 상태를 **자동으로 비교 및 동기화** |
| **자동 롤백 & 감사** | Git의 commit 이력으로부터 **변경 추적, 롤백, 승인 흐름 관리** 가능 |


#### 📌 GitOps 도입 시 고려사항

- **Observability (관찰 가능성)**
- **High Availability (고가용성)**
- 기존 CI/CD 파이프라인과의 통합
- 조직 구조에 맞는 GitOps 리포지터리 설계
- **RBAC 설정 (Namespace 단위 권한 관리)**

> 💡 GitOps는 단순히 Git을 사용하는 것 이상의 개념으로, **운영 자동화**, **보안 강화**, **개발 효율성 향상**을 모두 목표로 한다.


## 🚀 ArgoCD

<img src="https://argo-cd.readthedocs.io/en/stable/assets/argocd-ui.gif" alt="img">

출처 : https://argo-cd.readthedocs.io/en/stable/

### 🎯 ArgoCD란?

- **ArgoCD**는 Git을 배포의 원천(Source of Truth)으로 사용하는 **GitOps 기반의 CD(Continuous Delivery) 도구**
- Git에 작성된 **매니페스트 파일을 기준**으로 클러스터 내 쿠버네티스 리소스 상태를 자동으로 동기화
- **선언형(Declarative)** 방식으로 리소스를 관리하여, 수동 배포나 오염된 상태 방지를 지원
- 다양한 기능 확장을 위해:
  - `Argo Rollouts`로 **카나리, 블루그린 배포 전략**을 적용하거나
  - `Argo CD Notifications`로 **Slack, 이메일** 등 **알림 설정**도 가능

#### ArgoCD 아키텍처

<img src="https://argo-cd.readthedocs.io/en/stable/assets/argocd_architecture.png" alt="img">

- ArgoCD는 **Kubernetes 컨트롤러**로 작동합니다.
- **컨트롤러 작동 방식**:
  1. 클러스터 상태를 지속적으로 관찰
  2. Git의 선언된 리소스 상태와 **불일치 발생 시 자동 조치**

> 💡 의도한(desired) 상태를 지속적으로 유지하는 것이 핵심<br>
> ArgoCD는 단순 배포 도구를 넘어, GitOps 기반 자동화와 운영의 핵심 축으로 자리 잡고 있다.<br>
> 다양한 배포 전략과 **자동 감시**, **롤백 기능**까지 고려할 경우, 필수적인 CD 도구로 간주된다.<br>
> 
> **추천 도서**: [예제로 배우는 ArgoCD - Yes24](https://www.yes24.com/product/goods/125018027)<br>
> **공식 자격증**: [Certified Argo Project Associate (CAPA)](https://www.cncf.io/training/certification/capa/)


### ArgoCD 설치

- Helm 설치

```shell
# ArgoCD Namespace 생성
kubectl create ns argocd

# Terminal 2번
watch kubectl get pod,pvc,svc -n argocd

# Helm Repo 등록
helm repo add argo https://argoproj.github.io/argo-helm
helm repo update

helm install argocd argo/argo-cd --set server.service.type=NodePort --namespace argocd

# ArgoCD 서비스 접근을 위한 노드포트 변경
kubectl patch svc argocd-server -n argocd \
  -p '{"spec": {"ports": [{"port": 443, "targetPort": 8080, "nodePort": 31001}]}}'
  
# 리소스 확인
kubectl get all -n argocd
```

- ArgoCD 접속

```shell
# 초기 비밀번호 확인
kubectl -n argocd get secrets argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d

...
0DtTrgRUaKfy7FPu
...

# ArgoCD UI 접근
open http://localhost:31001
```

### ArgoCD 를 통한 Application 배포

#### Helm Chart

- New App 선택

- **Application 정보 입력**
  - **Application Name** : mynginx
  - **Project**: default
  - **Sync Policy**: Automatic

- **Application Source 입력**
  - **Repository URL** : `https://charts.bitnami.com/bitnami`
  - **Chart**: nginx / **Version:** 20.0.1

- ArgoCD 를 통해 배포할 Cluster 정보 입력

- App 배포

#### Creating Apps Via UI

- New App 선택

- **Application 정보 입력**
  - **Application Name** : guestbook
  - **Project**: default
  - **Sync Policy**: Manual


- **Application Source 입력**
  - **Repository URL** : `https://github.com/argoproj/argocd-example-apps.git`
  - **Revision**: HEAD
  - **Path**: guestbook

- ArgoCD 를 통해 배포할 Cluster 정보 입력

#### ArgoCD 와 Git 연동

- 본인 `Github public repository` 생성 - [Github Link](https://github.com/)
  - 실제로는 Private Repository 를 사용하고, ArgoCD 와 연동하는 과정이 필요하나 편의를 위해 Public Repository 사용
- **Local 에 Git Clone 후 Helm Push**

```shell
# 본인 Repository 클론
git clone https://github.com/본인git/repo

# Helm Chart 생성
helm create argo-test-chart

# Git Push
git add . && git commit -m "Initial Commit" && git push origin main
```

- ArgoCD 연동

- **Application 정보 입력**
  - **Application Name** : custom-nginx
  - **Project**: default
  - **Sync Policy**: Automatic


- **Application Source 입력**
  - **Repository URL** : `https://github.com/본인git/repo`
  - **Revision**: main
  - **Path**: argo-test-chart

- ArgoCD 를 통해 배포할 Cluster 정보 입력

- 배포할 Helm Values.yaml 파일 선택

- 배포 성공

#### values.yaml 변경

```shell
# values 파일 변경
vim values.yaml

...
replicaCount: 2

image:
  repository: nginx
  tag: "1.24"
...

# Git push
git add . && git commit -m "Values Modified" && git push
```

- **ArgoCD 에서 Refresh & Sync**
  - *cf) ArgoCD Default 동기화(조정, Reconciliation) 주기는 3분(180s)*

