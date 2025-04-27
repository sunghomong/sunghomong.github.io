---
title: "[Kubernetes] Kubernetes 소개 및 Kubernetes 활용 (2주차)"
date: 2025-04-22 12:00:00 +0800
categories: [TIL,TIL_Docker]
tags: [ Kubernetes,CI,CD,TIL,Education ]
image: /assets/img/post_images/TIL/docker_21.png
---

# 2주차 - 쿠버네티스 소개 및 활용

## 🚢 쿠버네티스(Kubernetes) 소개

### 쿠버네티스란?

**Kubernetes(K8s)** 는 컨테이너 기반 애플리케이션을 자동으로 배포하고 관리해주는 오픈소스 플랫폼.
2014년 Google 내부의 컨테이너 관리 시스템 Borg 에서 발전해 2015년에 공개되었으며, 현재는 클라우드 환경에서 핵심적인 인프라로 자리잡고 있다.

- 다수의 컨테이너를 자동으로 배포, 확장, 복구, 관리 Container Orchestration (조율, 관리)
- 맨 처음 k, 맨 끝 s 사이에 8 글자가 있어서 줄여서 k8s 로 지칭
- 조타수, 키잡이, 파일럿을 뜻하는 그리스어 (Kubernetes)에서 유래

#### 🌊 Kubernetes 생태계의 바다 이야기

쿠버네티스와 관련된 툴들은 바다와 항해에 관련된 이름과 로고를 사용하는 경우가 많다.

- `Helm` : 배의 키를 조종하는 장치 (조타륜) → 배의 제어 도구 → 컨테이너 배포를 일관되고 쉽게 할 수 있는 패키지
- `ArgoCD` : 그리스 신화 속 탐험선 Argo 호의 이름 + CD (Continuous Deploymet) + 문어 (지능, 유연, 멀티 태스킹) → 여러 컨테이너 배포를 동시에 처리하는 능력
- `Istio` : 돛을 의미하는 고대 그리스어 histion → 배를 빠르게 이동, 관제 → 서비스 네트워크 제어
- `Harbor` : 항구, 정박지 → 컨테이너를 배에 싣기 전 머무르는 장소 → 컨테이너 이미지 저장소

### 용어정리

- `master(control-plane, leader)` : **마스터**, 컨트롤 플레인, 리더
- `node(worker node)` : 노드, 워커노드 (구 minion 미니언)
- `k8s(kubernetes, k~s 사이에 8글자 == k8s)` : 쿠버네티스, 케이에잇츠, 케이팔에스
- `De facto(라틴어)` : 데 팍토, 사실상의 의미 - **Kubernetes** has become a **de facto** standard.
- `kubectl` : 큐브 컨트롤(control), **큐버 컨트롤**, **큐브 시티엘**, 큐버 시티엘
- `etcd` : 엣시디, 이티시디 - [링크](https://www.ibm.com/cloud/learn/etcd)
- `flannel` : 플라넬
- `calico` : 칼리코, 캘리코
- `istio` : 이스티오
- `helm` : 헬름, 핾, 햄
- `pod` : 파드, 포드
- `label` : 레이블, 라벨

### 쿠버네티스(컨테이너 오케스트레이션) 필요성

- ✅ 컨테이너는 클라우드 애플리케이션의 표준
→ 하지만 도커만으로는 확장성과 안정성 확보 어려움

- ✅ 자동 확장 & 자동 복구
→ 트래픽 증가 시 자동으로 컨테이너 추가
→ 장애 발생 시 자동으로 컨테이너 재시작 (Self-Healing)

- ✅ 배포 자동화
→ 롤아웃/롤백 쉽게 처리 가능

- ✅ 서비스 디스커버리 & 로드 밸런싱
→ 수많은 컨테이너를 효율적으로 연결하고 분산 처리

### 쿠버네티스 아키텍처

`Kubernetes Components` : K8S 클러스터는 Controle Plane(마스터)와 Node(노드)로 구성 - [링크](https://kubernetes.io/docs/concepts/overview/components/)

![https://kubernetes.io/images/docs/components-of-kubernetes.svg](https://kubernetes.io/images/docs/components-of-kubernetes.svg)

#### 🧠 Control Plane (마스터 노드) 핵심 컴포넌트

Control Plane 은 Kubernetes 클러스터의 두뇌 역할을 하고
단일 서버 또는 고가용성을 위한 3대 이상 구성도 가능하며, 클러스터 전반의 상태를 관리를 한다.

📌 주요 컴포넌트 요약

1. `kube-apiserver`
   - 마스터로 전달되는 모든 요청을 받아 드리는 API 서버

2. `etcd`
   - 클러스터내 **모든 메타 정보를 저장**하는 Key-Value 형태의 분산 데이터 저장소
   - 오직 API Server 와 통신, 다른 모듈은 API Server 를 통해 ETCD 접근
3. `kube-scheduler`
   - 사용자의 요청에 따라 적절하게 컨테이너를 워커 노드에 배치하는 스케줄러
   - 할당되지 않은 Pod 를 여러 조건 (자원, Label)에 따라 적절한 Worker Node 에 할당

4. `controller-manager`
   - 현재 상태와 바라는 상태를 지속적으로 확인하며 특정 이벤트에 따라 특정 동작을 수행하는 컨트롤러 - [링크](https://kubernetes.io/docs/concepts/architecture/controller/)
   - 쿠버네티스 리소스 상태 변화를 감지하고 클러스터에 적용
   - ETCD 의 Desired State 와 쿠버네티스의 Current State 비교
   
   1. **Kube-Controller-Manager**
      - 대부분의 쿠버네티스 오브젝트 상태 관리
   2. **Cloud-Controller-Manager**
      - 클라우드 플랫폼(AWS, GCP, Azure 등)에 특화된 리소스를 제어하는 클라우드 컨트롤러 - [링크](https://kubernetes.io/docs/concepts/architecture/cloud-controller/)
      - Ingress 를 통한 ELB 생성, Storage Class 를 통한 EBS 생성 등의 기능
      - EC2 Node 추가/삭제, 로드밸런서 연결, Volume 장착 등

#### 🛠️ Worker Node (워커 노드)

<img src="https://subicura.com/generated/assets/article_images/2019-05-19-kubernetes-basic-1/kubernetes-node-1000-f56fb7943.webp" alt="sss">
출처: https://subicura.com/2019/05/19/kubernetes-basic-1.html

- 실제로 **컨테이너(Pod)** 가 동작하는 서버
- Control Plane과 통신하며 명령을 실행
- 더 많은 컨테이너 배포를 위해 **워커 노드 확장 가능**

🔧 구성 요소

1. `Kubelet`
   - Control Plane 명령에 따라 Pod의 생명 주기(Lifecycle) 관리
   - Pod 상태 점검 및 현재 상태를 API Server에 보고
   - 로그 전달, 명령 수행 등

2. `kube-proxy`
   - Pod 네트워크 연결 및 트래픽 라우팅 제어
   - `iptables`, `IPVS` 기반 네트워크 규칙 설정

3. `Container Runtime`
   - 실제 컨테이너를 실행하는 런타임 환경
   - 주요 예시: `containerd`, `CRI-O`
   - ❌ `Docker`는 Kubernetes 1.24부터 지원 중단
     [쿠버네티스와 도커 결별 이유 보기](https://kubernetes.io/ko/blog/2020/12/02/dont-panic-kubernetes-and-docker/)

#### 🧭 Pod 배포 명령어 수행 시 전체 동작 과정

1. **kubectl apply**
   - 사용자 → API Server 에 배포 요청

2. **API Server → etcd**
   - 요청된 Pod 정보를 `Unscheduled 상태`로 etcd에 저장

3. **Scheduler 작동**
   - Unscheduled Pod 이벤트 감지
   - 노드 리소스/라벨 조건 확인 → 적절한 노드 선택
   - 선택된 노드 정보로 **API Server에 Patch 요청**

4. **API Server → etcd**
   - 해당 Pod가 어느 노드에 배치됐는지 정보 업데이트

5. **Kubelet 작동**
   - 자신의 노드에 할당된 Pod 감지 → 실제로 **Pod 생성**
   - 생성 후 **현재 상태(API Server에 보고)**

6. **API Server 상태 갱신**
   - Kubelet 로부터 받은 상태로 etcd 업데이트


#### 🔌 Kubernetes Add-ons (확장 구성 요소)

쿠버네티스는 기본 기능 외에도 다양한 **Add-on**을 통해 네트워크, 스토리지, DNS, 모니터링 등을 확장할 수 있다.

---

##### 🌐 CNI (Container Network Interface)
- **파드 간 통신**을 위한 네트워크 플러그인 구조
- 다양한 CNI 플러그인 존재 (Calico, Flannel, Cilium 등)
- `Pod ↔ Pod` 간 **NAT 없는 통신** 보장
- 주요 특징:
  - 컨테이너 생성 시 네트워크 연결 담당
  - 삭제 시 리소스 정리
  - 네트워크 정책은 CNI가 구현

📎 [CNI 개념](https://kubernetes.io/docs/concepts/cluster-administration/networking/)  
📎 [네트워크 아키텍처](https://kubernetes.io/ko/docs/concepts/cluster-administration/networking/)

##### 📡 DNS (CoreDNS)
- 클러스터 내부에서 **Service 이름으로 접근 가능**
- IP를 몰라도 `service-name.namespace.svc.cluster.local` 형태로 접근
- 대표 Add-on: **CoreDNS**
- 🧭 서비스 탐색 (Service Discovery):  
→ 파드들이 **동적으로 생성되는 서비스**의 IP를 자동으로 찾아 연결

📎 [CoreDNS](https://coredns.io/)

---

##### 💾 CSI (Container Storage Interface)
- 다양한 스토리지 공급자와 연동해 **영속 스토리지 제공**
- 퍼블릭 클라우드, NFS, 로컬 디스크 등과 연결 가능

📎 [CSI 사양 보기](https://github.com/container-storage-interface/spec/blob/master/spec.md)


## ⚙️ Kubernetes 설치

### 운영 환경용
- **kubeadm**: 공식 배포 도구, 표준적
- **kubespray**: Ansible 기반, 멀티 노드 설치
- **kops**: 클라우드(AWS 등) 최적화

### 개발/테스트용
- **minikube**: 로컬 완전한 K8s 환경, 플러그인 다양
- **kind**: 가벼운 Docker 기반, 빠른 테스트
- **k3d**: k3s를 Docker로 실행
- **getdeck**: 미리 정의된 환경 셋업
- **kwok**: Kubelet 없이 워크플로 시뮬레이션

### Kind vs Minikube
- **Kind**: 가볍고 빠른 테스트
- **Minikube**: 포괄적인 로컬 K8s 환경, 확장성 높음
- 스터디용으로는 가볍고 빠른 kind 선택

### kind 소개 및 설치

#### kind 소개

- **Kind** (Kubernetes in Docker)는 로컬 Kubernetes 클러스터를 위한 도구로, 각 노드는 Docker 컨테이너입니다.
- **테스트 용도**로 최적화되어 있으며, **멀티 노드** 및 **고가용성(HA)** 클러스터를 지원합니다.
- **kubeadm**을 사용하여 클러스터 노드를 설정합니다.

[Kind 공식 사이트](https://kind.sigs.k8s.io/)

#### Windows Docker 설치 (WSL2) - (+Kind) (window 전용)

1. CMD (관리자 권한)
    ```shell
    # Windows WSL2 (Ubuntu) - PowerShell / CMD (관리자 권한)
    dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
    dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
    wsl --list -o
    wsl --install -d ubuntu
    ```
   
   <img src="/assets/img/post_images/TIL/docker_15.png" alt="docker_15">

2. WSL2 Ubuntu
    ```shell
    # WSL2 Ubuntu
    sudo snap install docker
    sudo groupadd docker
    sudo usermod -aG docker $USER
    docker --version
    ```
    
    <img src="/assets/img/post_images/TIL/docker_16.png" alt="docker_16"> 
    
    ```shell
    # Kind 설치
    [ $(uname -m) = x86_64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.27.0/kind-linux-amd64
    sudo chmod +x ./kind
    sudo mv ./kind /usr/local/bin/kind
   
   # Kind Cluster 생성
    kind create cluster
    ```
    
    <img src="/assets/img/post_images/TIL/docker_17.png" alt="docker_17">
    
   ```shell
    # kubectl 설치
    sudo snap install kubectl --classic
    kubectl get pods -A
    
    # Krew 설치
    wget https://github.com/kubernetes-sigs/krew/releases/download/v0.4.5/krew-linux_amd64.tar.gz
    tar zxvf krew-linux_amd64.tar.gz
    ./krew-linux_amd64 install krew
    echo 'export PATH="${KREW_ROOT:-$HOME/.krew}/bin:$PATH"' >> ~/.bashrc
    source ~/.bashrc
    kubectl krew
    ```
    
    <img src="/assets/img/post_images/TIL/docker_20.png" alt="docker_20">

    ```shell
    # k9s 설치
    wget https://github.com/derailed/k9s/releases/download/v0.50.4/k9s_linux_amd64.deb
    sudo dpkg -i k9s_linux_amd64.deb
    sudo apt-get install -f
    k9s
    
    # Helm 설치
    sudo snap install helm --classic
    helm ls
    ```
    
    <img src="/assets/img/post_images/TIL/docker_21.png" alt="docker_21">
    
    <img src="/assets/img/post_images/TIL/docker_22.png" alt="docker_22">
    
##### 설치 중 troubleshooting

<img src="/assets/img/post_images/TIL/docker_18.png" alt="docker_18">

- 파일 search 에러 발생 -> 확장자 명 올바르게 변경

```shell
# error code
tar zxvf krew-linux_amd64 

# fix code
tar zxvf krew-linux_amd64.tar.gz
```
 
<img src="/assets/img/post_images/TIL/docker_19.png" alt="docker_19">

- 권한 에러 발생 -> 명령어 수정

```shell
# error code
export PATH="${KREW_ROOT:-$HOME/.krew}/bin:$PATH"

# fix code
echo 'export PATH="${KREW_ROOT:-$HOME/.krew}/bin:$PATH"' >> ~/.bashrc
```

#### Multi-Node Cluster (Control-plane, Nodes) with kube-ops-view & Mapping ports (Windows)

- yaml 생성

```shell
# '컨트롤플레인, 워커 노드 1대' 클러스터 배포 : 파드에 접속하기 위한 포트 맵핑 설정
cat <<EOT> kind-2node.yaml
# two node (one workers) cluster config
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
- role: worker
  extraPortMappings:
  - containerPort: 30000
    hostPort: 30000
    listenAddress: "0.0.0.0" # Optional, defaults to "0.0.0.0"
    protocol: tcp # Optional, defaults to tcp
  - containerPort: 30001
    hostPort: 30001
EOT
```

```shell
CLUSTERNAME=myk8s
kind create cluster --config kind-2node.yaml --name $CLUSTERNAME

# 배포 확인
kind get clusters
kind get nodes --name $CLUSTERNAME
```

<img src="/assets/img/post_images/TIL/docker_23.png" alt="23">

```shell
# 노드 확인
kubectl get nodes -o wide

# 노드에 Taints 정보 확인
kubectl describe node $CLUSTERNAME-control-plane | grep Taints

kubectl describe node $CLUSTERNAME-worker | grep Taints
```

<img src="/assets/img/post_images/TIL/docker_24.png" alt="24">

```shell
# 컨테이너 확인 : 컨테이너 갯수, 컨테이너 이름 확인
# kind yaml 에 포트 맵핑 정보 처럼, 자신의 PC 호스트에 30000 포트 접속 시, 워커노드(실제로는 컨테이너)에 TCP 30000 포트로 연결
# 즉, 워커노드에 NodePort TCP 31000 설정 시 자신의 PC 호스트에서 접속 가능!
docker ps
docker port $CLUSTERNAME-worker

# 컨테이너 내부 정보 확인 : 필요 시 각각의 노드(?)들에 bash로 접속하여 사용 가능
docker exec -it $CLUSTERNAME-control-plane ip -br -c -4 addr
docker exec -it $CLUSTERNAME-worker  ip -br -c -4 addr
```

<img src="/assets/img/post_images/TIL/docker_25.png" alt="25">

##### kube-ops-view 설치 (Helm 이용)

쿠버네티스 클러스터 상태 시각화 도구인 kube-ops-view 를 Helm 으로 설치하고, NodePort(30000)로 외부 접속을 설정.

```shell
# kube-ops-view
# helm show values geek-cookbook/kube-ops-view
helm repo add geek-cookbook https://geek-cookbook.github.io/charts/
helm install kube-ops-view geek-cookbook/kube-ops-view --version 1.2.2 --set service.main.type=NodePort,service.main.ports.http.nodePort=30000 --set env.TZ="Asia/Seoul" --namespace kube-system

# 설치 확인
kubectl get deploy,pod,svc,ep -n kube-system -l app.kubernetes.io/instance=kube-ops-view

# kube-ops-view 접속 URL 확인 (1.5 , 2 배율)
echo -e "KUBE-OPS-VIEW URL = http://192.168.50.10:30000/#scale=1.5"
echo -e "KUBE-OPS-VIEW URL = http://192.168.50.10:30000/#scale=2"
```

해당 명령어 실행 후 localhost:30000 들어가면 아래와 같은 이미지가 뜹니다.

<img src="/assets/img/post_images/TIL/docker_26.png" alt="docker_26">

##### nginx : NodePort 30001

```yaml
# 디플로이먼트와 서비스 배포
# cat <<EOF | kubectl create -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  name: deploy-websrv
spec:
  replicas: 2
  selector:
    matchLabels:
      app: deploy-websrv
  template:
    metadata:
      labels:
        app: deploy-websrv
    spec:
      terminationGracePeriodSeconds: 0
      containers:
      - name: deploy-websrv
        image: nginx:alpine
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: deploy-websrv
spec:
  ports:
    - name: svc-webport
      port: 80
      targetPort: 80
      nodePort: 30001
  selector:
    app: deploy-websrv
  type: NodePort
# EOF
```

```shell
# 확인
docker ps

kubectl get deploy,svc,ep deploy-websrv
...
NAME                    TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
service/deploy-websrv   NodePort   10.96.204.112   <none>        80:30001/TCP   55s
...

# 자신의 PC에 192.168.50.10:30001 접속 시 쿠버네티스 서비스에 접속 확인
curl -s 192.168.50.10:30001
<title>Welcome to nginx!</title>
...

# 디플로이먼트와 서비스 삭제
kubectl delete deploy,svc deploy-websrv
```

- 이렇게 쿠버네티스 파드에 접속 시 NodePort <포트넘버> 고정하고, kind 배포 시 사용할 포트들은 추가하여 사용하시면 됩니다.
- kind 삭제 : **`kind delete cluster --name $CLUSTERNAME`**

<img src="/assets/img/post_images/TIL/docker_28.png" alt="28">

## 쿠버네티스 기본 활용

### kubectl

- `kubectl`
  - kubernetes + control (큐브컨트롤, 큐브씨티엘)
  - 쿠버네티스를 제어하는 명령을 API Server 로 전달

### 쿠버네티스 리소스 조회 명령어

#### 1. 리소스 조회

```shell
kubectl api-resources | grep pods        # pods - po
kubectl api-resources | grep deployments # deployments - deploy
kubectl api-resources | grep namespaces  # namespaces - ns
kubectl api-resources | grep configmaps  # configmaps - cm
```

#### 2. 리소스 목록 보기

```shell
# 노드 조회
kubectl get node
kubectl get node -o wide

# 파드 조회
kubectl get pods
kubectl get pods -A

# 디플로이먼트 조회
kubectl get deployment
kubectl get deployment -A

# 네임스페이스 조회
kubectl get namespace
```

#### 3. 리소스 상세 보기

```shell
# 파드 상세 조회
kubectl describe pod -n kube-system coredns-6f6b679f8f-krwfh

# 디플로이먼트 조회
kubectl describe deployment -n kube-system coredns

# 네임스페이스 조회
kubectl describe namespace kube-system
```

### 쿠버네티스 컨텍스트

#### 🔹 Context 란?
`kubectl` 명령어가 **어떤 클러스터**, **어떤 사용자**, **어떤 네임스페이스**를 대상으로 동작할지를 지정하는 설정

- 쿠버네티스에 접근하는 인증(Authentication) 과정의 핵심 요소
- 멀티 클러스터 환경에서 유용

---

#### 🔹 Context 구성 요소
- **Cluster**: 연결할 쿠버네티스 클러스터
- **User**: 인증에 사용할 사용자 정보 (토큰, 인증서 등)
- **Namespace**: 기본으로 사용할 네임스페이스

---

#### 🔹 Context 명령어

```shell
# 현재 설정된 컨텍스트 확인
kubectl config current-context

# 모든 컨텍스트 확인
kubectl config get-contexts

# 다른 컨텍스트 전환
kubectl config use-context <Context Name>

# 컨텍스트 삭제
kubectl config delete-context <Context Name>
```

- 컨텍스트 정보는 어디서 가져오는 걸까?

```shell
# Config 정보 확인
cat ~/.kube/config
```

### 🐳 Pod

- 쿠버네티스에서 **배포 가능한 가장 작은 단위**
- **1개 이상**의 컨테이너로 구성
- 컨테이너 간 **Storage, Network 공유**
- 항상 **함께 실행**
- **컨테이너 실행 환경**일 뿐, 직접 실행되는 건 아님
- 일반적으로 **직접 생성하지 않음** → Bare Pod는 지양

#### 🚀 Pod 배포하기

```yaml
apiVersion: v1
kind: Pod               # Pod 리소스 선언
metadata:
  name: nginx           # Pod Name
spec:
  containers:
  - name: nginx         # Container Name
    image: nginx:alpine # Container Image
    ports:              # Container Port
    - containerPort: 80
```

```shell
touch pod.yaml

# 위 yaml 파일 복사 붙여넣기
vim pod.yaml
cat pod.yaml

# 현재 pod 상태 확인
kubectl get pods -A

# pod 배포
kubectl apply -f pod.yaml

#
kubectl get pods
kubectl describe pods nginx

# 삭제
kubectl delete -f pod.yaml
```

#### pod 로그 확인

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: knou
  namespace: knou
spec:
  containers:
  - name: knou
    image: busybox
    env:                      # Pod 내부 변수 선언
    - name: NAME              # 변수 Key
      value: "kyeongbo kim"   # 변수 Value
    command: ["/bin/sh"]
    args: ["-c", "while true; do echo \"Hello My Name is $(NAME)\"; date; sleep 2; done"]
```

```shell
touch pod2.yaml

# 위 yaml 파일 복사 붙여넣기
vim pod2.yaml
cat pod2.yaml

# 현재 pod 상태 확인
kubectl get pods -A

# pod 배포
kubectl apply -f pod2.yaml

#
kubectl get pods
kubectl describe pods knou

# 로그 조회
kubectl logs knou
kubectl logs knou -f

# 삭제
kubectl delete -f pod2.yaml --force
```

#### 컨테이너가 여러개인 Pod 배포

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: knou-multi
spec:
  containers:
  - name: nginx
    image: nginx
  - name: redis
    image: redis
```

```shell
touch multi.yaml

# 위 yaml 파일 복사 붙여넣기
vim multi.yaml
cat multi.yaml

# 현재 pod 상태 확인
kubectl get pods -A

# pod 배포
kubectl apply -f multi.yaml

#
kubectl get pods
kubectl describe pods knou-multi

# 
kubectl delete -f multi.yaml
```

#### Sidecar 패턴 활용

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: knou-mart
spec:
  volumes:
  - emptyDir: {}
    name: varlog
  containers:
  - name: knou-mart
    image: busybox
    command:
    - /bin/sh
    - -c
    - 'i=1; while :;do echo -e "$i: Price: $((RANDOM % 10000 + 1))" >> /var/log/knou-mart.log; i=$((i+1)); sleep 2; done'
    volumeMounts:
    - mountPath: /var/log
      name: varlog
  - name: price
    image: busybox
    args: [/bin/sh, "-c", 'tail -n+1 -f /var/log/knou-mart.log']
    volumeMounts:
    - mountPath: /var/log
      name: varlog
```

```shell
touch sidecar.yaml

# 위 yaml 파일 복사 붙여넣기
vim sidecar.yaml
cat sidecar.yaml

# 현재 pod 상태 확인
kubectl get pods -A

# pod 배포
kubectl apply -f sidecar.yaml

#
kubectl get pods
kubectl describe pods knou-mart

# price 컨테이너 로그 조회
kubectl logs knou-mart -c price -f

# 
kubectl delete -f sidecar.yaml

# 사이드카 패턴을 사용하는 대표적인 서비스가 Istio
## Envoy Proxy 가 Side Car 로 동작하여 Container 의 모든 네트워크 패킷을 감시하고 제어
```

#### ❓ 왜 Pod를 직접 쓰면 안 될까?

- Pod는 **고가용성(HA)**이나 **자가 치유(Self-healing)** 기능이 없음
- 삭제되면 다시 **자동으로 복구되지 않음**
- 서비스 중단 위험 ↑

```shell
kubectl apply -f pod.yaml     # 파드 생성
kubectl delete pods nginx     # 파드 삭제
kubectl get pods              # 파드가 사라짐!
```

#### 🚢 Pod 배포 방법

| 리소스       | 설명 |
|--------------|------|
| **Deployment**  | 가장 기본적인 배포 방식, 다양한 전략 지원 |
| **StatefulSet** | 실행 순서 & 데이터 유지 필요할 때 (ex. DB) |
| **DaemonSet**   | 모든 노드에 1개씩 배포 (ex. 로그 수집, 모니터링) |
| **Job / CronJob** | 일회성 or 주기적인 배치 작업 |

### 🚀 Deployment

- 파드 & 레플리카셋을 **선언적으로 관리**
- **파드 개수** 유지 (ex. 3개 유지 → 자동 복구)
- 다양한 **배포 전략** 지원 (롤링 업데이트 등)
- 핵심 리소스: `Deployment → ReplicaSet → Pod`
- `PodTemplate` 포함 → 어떤 파드를 배포할지 정의

> ✅ 레플리카셋은 Deployment가 **자동 관리** → 직접 수정 ❌

#### Deployment 사용하기

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-v1
spec:
  selector:
    matchLabels:            # PodTemplate 에 선언된 Label 을 지정하여 Deployment 적용
      app: nginx
  replicas: 2               # Pod 개수
  template:                 # PodTemplate 시작
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        env:
        - name: APP_MODE
          value: "v1"
        ports:
        - containerPort: 80 # PodTemplate 종료
```

```shell
touch deploy.yaml

# 위 yaml 파일 복사 붙여넣기
vim deploy.yaml
cat deploy.yaml

# 현재 pod 상태 확인
kubectl get pods -A

# pod 배포
kubectl apply -f deploy.yaml

# Pod, ReplicaSet, Deployment 조회
kubectl get deploy,rs,pods

# 
kubectl delete -f deploy.yaml
```

#### pod 업데이트

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-v1
spec:
  selector:
    matchLabels:            # PodTemplate 에 선언된 Label 을 지정하여 Deployment 적용
      app: nginx
  replicas: 2               # Pod 개수
  template:                 # PodTemplate 시작
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        env:
        - name: APP_MODE
          value: "v2"       # v1 -> v2 변경
        ports:
        - containerPort: 80 # PodTemplate 종료
```

```shell
# 터미널 2
while true; do kubectl get pods -o wide; sleep 1; done

# 터미널 1
kubectl apply -f deploy.yaml

# 동작 방식 (기본 Rolling Update)
# 신규 pod 배포 -> 배포 완료 -> 기존 pod 1대 제거 -> 제거 완료 -> 신규 Pod 배포 -> 배포 완료 -> 기존 Pod 제거 -> 제거 완료 -> N번 반복
```

#### `QoS (Quality of Service)`

- 파드의 자원 보장 수준 분류
- 노드 자원 부족 시, 어떤 파드를 먼저 죽일 시 결정 (BestEffort → Bustable → Guaranteed 순)

#### BestEffort 파드,Burstable 파드, Guaranteed 파드

```yaml
# Request, Limit 없는 Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: qos-besteffort
spec:
  replicas: 1
  selector:
    matchLabels:
      app: qos-besteffort
  template:
    metadata:
      labels:
        app: qos-besteffort
    spec:
      containers:
        - name: nginx
          image: nginx:alpine
# Burstable 
#          resources:
#          requests:
#            memory: "128Mi"
#            cpu: "100m"
#          limits:
#            memory: "256Mi"
#            cpu: "200m"
# Guaranteed 
#          resources:
#            requests:
#              memory: "128Mi"
#              cpu: "100m"
#            limits:
#              memory: "128Mi"
#              cpu: "100m"
```

```shell
touch 파드명.yaml

vim 파드명.yaml

# 배포
kubectl apply -f 파드명.yaml
kubectl get pods

BEST_EFFORT=$(kubectl get pods --no-headers -o custom-columns=":metadata.name" | grep qos-besteffort)

# QoS 확인
kubectl get pod ${BEST_EFFORT} -o jsonpath='{.status.qosClass}'
kubectl describe pod ${BEST_EFFORT}
BestEffort
```

## 마무리

- 2주차 스터디는 쿠버네티스의 개념과 활용적인 측면으로 배웠다. 이를 토대로 기본적인 지식을 얻게 됐고 flow 를 이해하게 됐다.
- 추 후에 해당 내용을 바탕으로 하나씩 심화적으로 살펴볼 생각이다.
