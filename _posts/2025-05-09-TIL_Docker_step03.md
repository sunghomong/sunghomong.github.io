---
title: "[Kubernetes] Kubernetes Availability & Network (3주차)"
date: 2025-04-22 12:00:00 +0800
categories: [TIL,TIL_Kubernetes]
tags: [ Kubernetes,CI,CD,TIL,Education ]
image: https://devocean.sk.com/editorImg/2023/4/19/bf70cebd7a900531967971cab2bcc05434c8117cea041f7904eb3cd39bdf1ef2
---

# 3주차 - Kubernetes Availability & Network

## 🚢 쿠버네티스 가용성

### 쿠버네티스 가용성 확보를 위한 다양한 방법

쿠버네티스(Kubernetes) 환경에서는 서비스 가용성(Availability) 확보를 위해 다양한 자동 확장 기능을 제공

#### 쿠버네티스 확장 방법

| 확장 방식                               | 설명                                                 |
| ----------------------------------- | -------------------------------------------------- |
| **HPA (Horizontal Pod Autoscaler)** | Pod의 수를 수평으로 자동 조절 (Scale In/Out)                  |
| **VPA (Vertical Pod Autoscaler)**   | Pod의 리소스(CPU/Memory 등)를 수직으로 자동 조절 (Scale Up/Down) |
| **CA (Cluster Autoscaler)**         | 노드를 자동으로 추가/제거 (Cloud 환경에서 활용)                     |

- 이러한 기능을 활용하면 트래픽 증가나 리소스 사용량 변화에 따라 자동으로 자원을 조절하여 시스템의 안정성과 가용성을 높일 수 있음

#### Metrics Server란?

`Metrics Server`는 쿠버네티스의 내장 확장 기능(HPA, VPA 등) 이 동작하는 데 필요한 리소스 사용량 정보를 수집하는 컴포넌트

- Kubelet에서 CPU, 메모리 등 지표를 수집하여 API Server에 전달
- HPA, VPA와 같은 오토스케일러가 이를 바탕으로 리소스 확장을 수행
- 모니터링 솔루션이 아닌, 확장을 위한 데이터 제공자

#### Metrics Server 설치 및 명령어

[참고자료](https://kubetm.github.io/k8s/08-intermediate-controller/hpa/)

- `설치`

```shell
# Metrics Server 설치
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# Kubelet 인증서 검증 비활성화 (TLS 오류 방지)
kubectl patch deployment metrics-server -n kube-system --type=json \
  -p='[{"op": "add", "path": "/spec/template/spec/containers/0/args/-", "value": "--kubelet-insecure-tls"}]'

# 설치 확인
kubectl get pods -n kube-system -l k8s-app=metrics-server
```

- `리소스 사용량 확인 명령어`

```shell
# 전체 노드의 리소스 사용량
kubectl top node

# 전체 네임스페이스의 Pod 사용량
kubectl top pods -A

# CPU 사용량 기준 정렬
kubectl top pods -A --sort-by=cpu

# 메모리 사용량 기준 정렬
kubectl top pods -A --sort-by=memory
```

---

### HPA

<img src="/assets/img/post_images/TIL/HPA.png" alt="HPA">

출처: https://kubernetes.io/ko/docs/tasks/run-application/horizontal-pod-autoscale/

#### 수평 스케일링 (HPA, Horizontal Pod Autoscaling)

- 부하 기반 자동 스케일링 기능
- Pod의 수를 자동으로 늘리거나 줄임(Scale Out/In)
- 기본적으로 CPU와 메모리 사용률, 사용자 정의 지표를 기준으로 작동
- 지표 수집은 Metrics Server를 통해 이뤄지며, 설정한 임계치(Threshold)를 초과하면 Replica 수를 조정함
- `작동 원리`
  - Metrics Server가 CPU, Memory 사용률을 수집
  - HPA가 지정한 타겟 리소스(Deployment 등)의 부하를 모니터링
  - 설정한 기준치를 초과하면 Pod 수를 자동으로 조절

- 기본 구성

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: hpa-sample
spec:
  scaleTargetRef:          # Scale 타겟 지정
    apiVersion: apps/v1
    kind: Deployment
    name: my-app           # Deployment 이름
  minReplicas: 2           # 최소 Pod
  maxReplicas: 10          # 최대 Pod
  metrics:                 # Scale 기준 지표 설정
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 50  # CPU 사용률 50% 기준
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 70  # 메모리 사용률 70% 기준
```


#### HPA 구성

- `Deployment 배포`

```shell
cat << EOF >> hpa-nginx.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hpa-nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: hpa-nginx
  template:
    metadata:
      labels:
        app: hpa-nginx
    spec:
      containers:
      - name: hpa-nginx
        image: nginx
        resources:
          requests:
            cpu: 50m
          limits:
            cpu: 100m
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: hpa-nginx
  labels:
    app: hpa-nginx
spec:
  ports:
  - port: 80
  selector:
    app: hpa-nginx
EOF

cat hpa-nginx.yaml

# Deployment 배포
kubectl apply -f hpa-nginx.yaml

kubectl get deploy,pod
```

- `HPA 구성`

```shell
# HPA 생성
kubectl autoscale deployment hpa-nginx --cpu-percent=50 --min=1 --max=10

# HPA 확인
kubectl get hpa

# HPA 상세 정보 확인
kubectl describe hpa
```

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: hpa-nginx
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: hpa-nginx
  minReplicas: 1
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 50
```

- `Pod 부하 발생시키기`

```shell
# 터미널 1번
while true; do kubectl get hpa; kubectl top pods; sleep 1s; done

# 터미널 2번
kubectl run -i --tty load-generator --rm --image=busybox:1.28 --restart=Never -- /bin/sh -c "while true; do wget -q -O- http://hpa-nginx.default.svc.cluster.local; done"

# 실습 종료 후 리소스 삭제
kubectl delete hpa --all
kubectl delete -f hpa-nginx.yaml
```

---

### VPA

<img src="https://devocean.sk.com/editorImg/2023/4/19/bf70cebd7a900531967971cab2bcc05434c8117cea041f7904eb3cd39bdf1ef2" alt="img">

출처: https://www.sktenterprise.com/bizInsight/blogDetail/dev/4488

#### 수직 스케일링 (VPA, Vertical Pod Autoscaling)

- Pod 단위의 **CPU, Memory 요청량**을 자동으로 튜닝
- HPA는 수평 확장 / VPA는 수직 확장
- **조정 대상**: CPU, Memory의 `Request` 값
- `VPA Recommender`가 애플리케이션의 사용량을 분석하여 최적의 리소스를 적용
- **HPA와 VPA는 하나의 Deployment에 동시에 적용 불가**
- **Kubernetes v1.33**부터 기본 활성화
  - ⚠️ 현재 `kind`는 v1.32까지만 지원 → 별도 컨트롤러 설치 필요

- 기본 구성

```yaml
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: my-app-vpa
spec:
  targetRef:                   # Scale 대상
    apiVersion: apps/v1
    kind: Deployment
    name: my-app               # Deployment 명칭
  updatePolicy:
    updateMode: "Auto"         # VPA Recommender 에 의해 자동 조정 활성화
  resourcePolicy:
    containerPolicies:
      - containerName: my-app-container # Container 명칭 "*" 사용 가능
        minAllowed:            # 컨테이너가 할당받을 수 있는 최소 리소스
          cpu: "200m"
          memory: "512Mi"
        maxAllowed:            # 컨테이너가 할당받을 수 있는 최대 리소스
          cpu: "2"
          memory: "2Gi"
```

#### VPA 테스트

- 0.1 cpu 를 요청한 2개 Pod 배포 (실제 사용량보다 부족한 상태)

```yaml
apiVersion: "autoscaling.k8s.io/v1"
kind: VerticalPodAutoscaler
metadata:
  name: hamster-vpa
spec:
  targetRef:
    apiVersion: "apps/v1"
    kind: Deployment
    name: hamster
  resourcePolicy:
    containerPolicies:
      - containerName: '*'
        minAllowed:
          cpu: 100m
          memory: 50Mi
        maxAllowed:
          cpu: 1
          memory: 500Mi
        controlledResources: ["cpu", "memory"]
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hamster
spec:
  selector:
    matchLabels:
      app: hamster
  replicas: 2
  template:
    metadata:
      labels:
        app: hamster
    spec:
      securityContext:
        runAsNonRoot: true
        runAsUser: 65534 # nobody
      containers:
        - name: hamster
          image: registry.k8s.io/ubuntu-slim:0.14
          resources:
            requests:
              cpu: 100m
              memory: 50Mi
          command: ["/bin/sh"]
          args:
            - "-c"
            - "while true; do timeout 0.5s yes >/dev/null; sleep 0.5s; done"
```

```shell
# 터미널 1번
while true;
 do date "+%Y-%m-%d %H:%m:%S";
 kubectl get pod -l app=hamster; 
 kubectl get vpa; 
 kubectl describe pod | grep "Requests:" -A2; 
 echo "=============="; 
 sleep 5s; 
done

# 터미널 2번 (log 확인 용)
kubectl apply -f examples/hamster.yaml        

# 자원 삭제
kubectl delete -f examples/hamster.yaml
```

---

### CA, KEDA

쿠버네티스 환경에서는 애플리케이션의 부하가 증가하면 **Pod 수**뿐만 아니라, Pod를 배치할 **노드(Node)** 리소스도 부족해질 수 있다.  
이럴 때 사용되는 도구가 바로 **Cluster Autoscaler (CA)** 와 **Karpenter** 이다.

#### 📦 Cluster Autoscaler (CA)

> [공식 문서 보기](https://github.com/kubernetes/autoscaler)

- 쿠버네티스 클러스터의 **노드 수를 자동으로 조절**하는 컴포넌트
- Pod의 요청 리소스를 만족시킬 수 있는 노드가 없으면 → **노드 자동 추가**
- 일정 시간 동안 유휴 상태인 노드가 있으면 → **노드 자동 삭제**
- **클라우드 환경**에서 주로 사용 (AWS, GCP, Azure 등 지원)
- **Pod 단위**로 동작하는 HPA, VPA와 달리, **노드 단위**에서 작동

#### 🚀 Karpenter

> [공식 사이트](https://karpenter.sh/)

- AWS에서 만든 **노드 자동 조절 도구**
- CA와 동일하게 **노드를 자동 생성/삭제**
- **노드 크기(사양)까지 자동 조절** → **HPA + VPA + CA 기능** 통합
- 더 빠른 노드 프로비저닝(생성) 가능
- **CA의 대체 도구**로 각광받고 있음

✅ 정리

| 항목 | Cluster Autoscaler (CA) | Karpenter |
|------|--------------------------|-----------|
| 대상 | 노드 수 자동 조절 | 노드 수 + 노드 사양 자동 조절 |
| 주요 기능 | 유휴 노드 축소, 부족 시 확장 | 적절한 사양과 수의 노드 자동 생성 |
| 속도 | 상대적으로 느림 | 빠름 |
| 운영 환경 | 다양한 클라우드 | AWS 중심 |
| 배포 복잡도 | 비교적 단순 | 다소 복잡하지만 자동화 강점 |

####  ⚡ 이벤트 기반 오토스케일링 - KEDA

<img src="https://keda.sh/img/keda-arch.png" alt="img">

출처: https://keda.sh/docs/2.17/concepts/

> [KEDA 공식 사이트](https://keda.sh/)

- **이벤트 기반 자동 확장 도구**
- HPA와 연동하여 **이벤트 기반**으로 Pod 수를 자동으로 조절
- CPU/Memory 외에도 **Kafka, RabbitMQ, Azure Queue, Prometheus, Cron 등 다양한 이벤트** 기반 확장 가능

---

## 🔧 어플리케이션 변수 관리

### ConfigMap

<img src="https://miro.medium.com/v2/resize:fit:750/format:webp/0*doaioRB-9pQ-Hy21" alt="img">

출처: https://foxutech.medium.com/about-configmap-in-kubernetes-b6b9c0918ac2

- Kubernetes 애플리케이션의 **구성 파일이나 환경 설정**을 Key-Value 형태로 저장하고 관리
- 설정 값을 컨테이너 내부 환경 변수나 파일 형태로 주입 가능
- **애플리케이션 코드를 재빌드하지 않고 설정만 변경**할 수 있음

#### 💡 주요 사용 용도

| 항목 | 설명 |
|------|------|
| 설정 정보 분리 | 소스 코드와 분리된 외부 설정 파일 관리 |
| 환경별 구성 | DEV / STG / PRD 등 환경에 따른 설정 값 분리 |
| 동적 구성 | Pod 재배포 없이 구성 값 수정 가능 |

#### 기본 구성

```yaml
# ConfigMap 샘플 구성
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-config # ConfigMap 명칭
data:
  key1: value1    # Key : Value 형태 값 주입
  key2: value2
```

```yaml
# ConfigMap 사용 예시
apiVersion: v1
kind: Pod
metadata:
  name: my-app
spec:
  containers:
    - name: my-container
      image: my-image
      env:
        - name: MY_CONFIG_KEY  # 컨테이너에서 사용할 변수 Key 값
          valueFrom:
            configMapKeyRef:
              name: my-config  # 사용할 ConfigMap의 이름
              key: key1        # ConfigMap 내의 키 -> 값: value1
```

#### 기본활용

```shell
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  name: mysql
data:
  DBNAME: mydatabase
---
apiVersion: v1
kind: Pod
metadata:
  name: nginx-configmap
spec:
  containers:
  - image: nginx
    name: nginx-configmap
    env:
    - name: DB
      valueFrom:
        configMapKeyRef:
          name: mysql
          key: DBNAME
EOF

# 오브젝트 확인
kubectl get cm,pod

# 상세 정보 조회
kubectl describe cm mysql
kubectl describe pod nginx-configmap

# pod 내부 변수 확인
kubectl exec -it nginx-configmap -- /bin/bash -c env
...
DB=mydatabase
...

# 리소스 삭제
kubectl delete pod --all
kubectl delete cm nginx-configmap
```

#### ConfigMap 으로 설정 파일 관리

```shell
# 테스트 파일 생성
cat << EOF >> config-deploy.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-configmap-deploy
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx-configmap
  template:
    metadata:
      labels:
        app: nginx-configmap
    spec:
      containers:
      - name: nginx
        image: nginx
        ports:
        - containerPort: 80
        volumeMounts:
        - name: config-volume
          mountPath: /etc/nginx/nginx.conf
          subPath: nginx.conf
      volumes:
      - name: config-volume
        configMap:
          name: nginx-config
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx-configmap
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
      nodePort: 31001
  type: NodePort
EOF
```

```yaml
cat << EOF >> configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: nginx-config
data:
  nginx.conf: |
    events {}
    http {
        server {
            listen 80;
            location / {
                return 200 'Hello from nginx configmap!';
            }
        }
    }
EOF
```

`리소스 배포`

```shell
# ConfigMap + Deployment 적용
kubectl apply -f configmap.yaml -f config-deploy.yaml  # ConfigMap과 Deployment 배포

# 리소스 확인
kubectl get cm,deploy,pod                             # 생성된 리소스 목록 확인
kubectl describe deploy                               # Deployment 상세 정보 확인
# -> ConfigMap이 어떻게 마운트되었는지 확인 가능

# Nginx 접속
open http://localhost:31001                           # NodePort로 Nginx 접속

# ConfigMap 수정
vim configmap.yaml                                    # 설정 파일 수정
# 예: return 200 'Modify from nginx configmap!';

# 변경 사항 적용
kubectl apply -f configmap.yaml                       # 변경된 ConfigMap 적용
kubectl rollout restart deploy nginx-configmap-deploy # Deployment 재시작으로 ConfigMap 반영

# 리소스 정리
kubectl delete -f configmap.yaml -f config-deploy.yaml # 리소스 삭제
```

---

### 🔐 Secret – Kubernetes 민감 정보 관리

<img src="https://www.macstadium.com/_next/image?url=https%3A%2F%2Fimages.prismic.io%2Fmacstadium%2F7278f809-5d29-40c1-941b-8c47ef1692a4_Kubernetes%2Bsecrets%2Bdiagram.png%3Fauto%3Dcompress%2Cformat&w=1920&q=75" alt="img">

`Secret`은 Kubernetes에서 **비밀번호, 토큰, API 키** 등 민감 정보를 안전하게 관리하기 위한 리소스이고,  
`ConfigMap`과 유사하지만 **Base64 인코딩**된 형태로 값을 저장한다.

> 📌 Base64는 암호화가 아닌 인코딩입니다. 디코딩이 쉬우므로 별도의 보안 설정이 필요하다.

#### ✅ 주요 특징

- 민감 정보 저장 (비밀번호, 토큰 등)
- Base64 인코딩 필수 (평문 저장 불가)
- 환경 변수나 파일로 Pod에 주입 가능
- `etcd` 저장소에 저장되므로 암호화 및 접근 제어 권장

#### 기본 구성

```yaml
# Secret 샘플
apiVersion: v1
kind: Secret
metadata:
  name: my-secret
type: Opaque
data:
  username: bXl1c2Vy  # base64로 인코딩된 값
  password: bXlwYXNzd29yZA==  # base64로 인코딩된 값
```

```yaml
# Secret 사용 예시
apiVersion: v1
kind: Pod
metadata:
  name: my-app
spec:
  containers:
    - name: my-container
      image: my-image
      env:
        - name: DB_USER        # Container 에서 사용할 변수명
          valueFrom:
            secretKeyRef:
              name: my-secret  # 사용할 Secret의 이름
              key: username    # Secret 내의 키
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: my-secret  # 사용할 Secret의 이름
              key: password    # Secret 내의 키
...

# 마운트 방법
      volumeMounts:
        - name: secret-volume     # Volume 명칭
          mountPath: /etc/secrets # 컨테이너 내부 마운트 위치
  volumes:
    - name: secret-volume         # Volume 명칭
      secret:
        secretName: my-secret     # 사용할 Secret의 이름
```

#### 기본 활용

```shell
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Secret
metadata:
  name: secret-test
type: Opaque
data:
  username: YWRtaW4=  # 'admin'을 base64 인코딩한 값
  password: cGFzc3dvcmQ=  # 'password'를 base64 인코딩한 값
EOF

# Base64 인코딩 방법
echo -n 'admin' | base64
echo -n 'password' | base64

cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: secret-pod
spec:
  containers:
  - name: nginx
    image: nginx
    env:
    - name: DB_USER
      valueFrom:
        secretKeyRef:
          name: secret-test
          key: username
    - name: DB_PASS
      valueFrom:
        secretKeyRef:
          name: secret-test
          key: password
EOF

# Pod 및 Secret 확인
kubectl get pod,secret

# Secret 상세 정보 확인
kubectl describe secret secret-test

# Pod 상세 정보 확인
kubectl describe pod secret-pod

# pod 내부 변수 확인
kubectl exec -it secret-pod -- /bin/bash -c env
...
DB_USER=admin
DB_PASS=password
...

# 리소스 삭제
kubectl delete pod --all                 # 모든 Pod 삭제
kubectl delete secret secret-test        # Secret 삭제
```

#### Secret 을 관리하는 다양한 도구

🟡 1. **AWS Secrets Store CSI Driver (ASCP)**
- AWS Secrets Manager 또는 Parameter Store의 값을 Kubernetes Secret처럼 사용 가능
- CSI(컨테이너 스토리지 인터페이스)를 통해 Pod에 자동 주입
- 자동 rotation, 권한 제어 등 AWS IAM과의 연동 강점

[🔗 공식 문서 보기](https://secrets-store-csi-driver.sigs.k8s.io/)

🟣 2. **HashiCorp Vault**
- 강력한 비밀 관리 솔루션
- 암호화된 데이터 저장, 동적 비밀번호 발급, 정책 기반 접근 제어 지원
- Kubernetes와 연동하여 토큰을 통한 인증 및 자동 주입 가능

[🔗 공식 문서 보기](https://www.vaultproject.io/)

🟢 3. **Sealed Secrets**
- Bitnami에서 제공하는 오픈소스 도구
- GitOps 환경에 최적화 (Git에 안전하게 저장 가능)
- SealedSecret → Secret 으로 컨트롤러가 복호화하여 자동 생성
- 공개키로 암호화, 클러스터 전용 비밀 키로 복호화

[🔗 공식 문서 보기](https://github.com/bitnami-labs/sealed-secrets)

---

## 🌐 Kubernetes 네트워크

<img src="https://kubernetes.io/docs/images/kubernetes-cluster-network.svg" alt="img">

출처: https://kubernetes.io/docs/concepts/cluster-administration/networking/

### 🔧 서비스 종류

#### `service`

- Kubernetes에서 **단일 엔드포인트**를 제공하는 리소스
- 파드(Pod) 집합을 하나의 네트워크 주소로 묶어 외부 혹은 내부 트래픽을 전달
- [공식 문서 바로가기 🔗](https://kubernetes.io/ko/docs/concepts/services-networking/service/)

#### 🟢 `ClusterIP` (기본값)

- **클러스터 내부 전용** 가상 IP 제공
- 외부에서는 접근 불가
- 주로 마이크로서비스 간 통신에 사용  
  [🔗 자세히 보기](https://kubernetes.io/ko/docs/concepts/services-networking/cluster-ip-allocation/)

#### 🟠 `NodePort`
- 각 **노드(Host)의 고정 포트**를 통해 외부 접근 허용
- 외부에서는 `NodeIP:Port` 방식으로 접근 가능
- 간단한 테스트나 소규모 서비스 배포에 활용  
  [🔗 자세히 보기](https://kubernetes.io/ko/docs/concepts/services-networking/service/#type-nodeport)

#### 🔵 `LoadBalancer`
- 클라우드 환경에서 **외부 로드 밸런서** 자동 할당
- 서비스 엔드포인트에 퍼블릭 IP 부여
- AWS, GCP, Azure 등에서 사용 가능  
  [🔗 자세히 보기](https://kubernetes.io/ko/docs/concepts/services-networking/service/#loadbalancer)

---

### 🧪 ClusterIP

#### 테스트 환경 배포

```shell
# 어플리케이션 배포
cat << EOF >> cluster-pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: cluster-pod-1
  labels:
    app: cluster-pod
spec:
  containers:
  - name: container
    image: traefik/whoami
---
apiVersion: v1
kind: Pod
metadata:
  name: cluster-pod-2
  labels:
    app: cluster-pod
spec:
  containers:
  - name: container
    image: traefik/whoami
EOF

# Test 파드
cat << EOF >> netshoot-pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: netshoot-pod
spec:
  containers:
  - name: netshoot-pod
    image: nicolaka/netshoot
    command: ["tail"]
    args: ["-f", "/dev/null"]
EOF

# ClusterIP 서비스 생성
cat <<EOF>> cluster-svc.yaml
apiVersion: v1
kind: Service
metadata:
  name: cluster-svc
spec:
  type: ClusterIP
  selector:
    app: cluster-pod
  ports:
    - name: cluster
      port: 8080
      targetPort: 80
EOF

# 배포
kubectl apply -f cluster-pod.yaml -f cluster-svc.yaml -f netshoot-pod.yaml
```

#### Pod 생성 확인

```shell
# 파드 대역 확인
kubectl get nodes -o jsonpath='{.items[*].spec.podCIDR}'
...
10.244.0.0/24 10.244.1.0/24
...

# SVC 대역 확인
kubectl -n kube-system get pods -l component=kube-controller-manager -o yaml | grep service-cluster-ip-range
...
--service-cluster-ip-range=10.96.0.0/16
...

# 확인
kubectl get pod -o wide
...
NAME                                         READY   STATUS    RESTARTS   AGE     IP            NODE          NOMINATED NODE   READINESS GATES
cluster-pod-1                                1/1     Running   0          8m20s   10.244.1.66   kind-worker   <none>           <none>
cluster-pod-2                                1/1     Running   0          8m20s   10.244.1.65   kind-worker   <none>           <none>
netshoot-pod                                 1/1     Running   0          8m20s   10.244.1.67   kind-worker   <none>           <none>
...

# 서비스 확인
kubectl get svc cluster-svc
...
NAME          TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
cluster-svc   ClusterIP   10.96.138.114   <none>        8080/TCP   9m18s
...

# Endpoint 확인 (Pod IP:Port)
kubectl get endpoints cluster-svc
...
NAME                                ENDPOINTS                       AGE
cluster-svc                         10.244.1.65:80,10.244.1.66:80   9m37s
...
```

#### ClusterIP 확인 (랜덤 트래픽 분산)

```shell
# 클라이언트(TestPod) Shell 실행
kubectl exec -it netshoot-pod -- zsh

# 서비스 ClusterIP 주입
SVC=10.96.138.114

curl $SVC:8080
curl -s $SVC:8080 | grep Hostname

# 100 번 반복 호출
for i in {1..100}; do curl -s $SVC:8080 | grep Hostname; done | sort | uniq -c | sort -nr
...
55 Hostname: cluster-pod-1
45 Hostname: cluster-pod-2
...
```

---

### 🌐 NodePort

#### 테스트 환경 배포

```shell
# 어플리케이션 배포
cat << EOF > nodeport-pod.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nodeport-deploy
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nodeport-deploy
  template:
    metadata:
      labels:
        app: nodeport-deploy
    spec:
      containers:
      - name: container
        image: traefik/whoami
EOF

# ClusterIP 서비스 생성
cat <<EOF> nodeport-svc.yaml
apiVersion: v1
kind: Service
metadata:
  name: nodeport-svc
spec:
  type: NodePort
  selector:
    app: nodeport-deploy
  ports:
    - name: nodeport-svc
      port: 80          # 서비스 포트 (Cluster 내부에서 사용)
      targetPort: 80    # 실제 컨테이너 포트
      nodePort: 31001   # 외부에서 접근할 NodePort
EOF
```

#### 생성 및 확인

```shell
# 생성
kubectl apply -f nodeport-pod.yaml -f nodeport-svc.yaml

# 확인
kubectl get pod,svc
...
NAME                   TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
service/nodeport-svc   NodePort    10.96.66.182   <none>        80:31001/TCP   100s
...

# 연결된 IP:Port 목록 조회
kubectl get endpoints nodeport-svc
NAME           ENDPOINTS                       AGE
nodeport-svc   10.244.1.10:80,10.244.1.11:80   2m50s
```

#### NodePort 동작 확인

```shell
# 노드의 Port 로 curl 요청
curl http://localhost:31001
curl -s http://localhost:31001 | grep Hostname

# 100 번 반복 호출
for i in {1..100}; do curl -s http://localhost:31001 | grep Hostname; done | sort | uniq -c | sort -nr
...
58 Hostname: nodeport-deploy-59b68567d7-6h562
42 Hostname: nodeport-deploy-59b68567d7-k2cpb
...
```

### 🚪 Ingress

<img src="https://outshift-headless-cms-s3.s3.us-east-2.amazonaws.com/blog/k8s-ingress/ingress-fanout-1.png" alt="img">

출처: https://outshift.cisco.com/blog/k8s-ingress

> [참고문서](https://kubernetes.io/ko/docs/concepts/services-networking/ingress/)

#### Ingress 리소스의 주요 특징

- 클러스터 외부에서 내부 서비스로 HTTP/HTTPS 트래픽을 전달
- 서비스 유형 (ClusterIP, NodePort, LoadBalancer)을 외부에 노출
- Ingress를 사용하려면 반드시 Ingress Controller가 필요


#### **대표적인 Ingress Controller**

- Nginx Ingress Controller (가장 널리 사용됨)
- 클라우드 제공 Ingress Controller
  - AWS: ALB Ingress Controller
  - GCP: GCE Ingress Controller

#### 주요 기능

1.**호스트 기반 라우팅**
  - 도메인에 따라 트래픽을 분기
  - 예:
    - `api.example.com` → 서비스 A
    - `www.example.com` → 서비스 B

2.**경로 기반 라우팅**
  - 요청 경로(URL)에 따라 트래픽을 분기
  - 예:
    - `/growth` → 서비스 A
    - `/log` → 서비스 B

3.**TLS 지원**
  - HTTPS 구성 가능 (TLS 인증서 활용)

4.**로드 밸런싱**
  - 여러 백엔드로 트래픽을 분산 처리

#### 기본 구성

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: example-ingress
  namespace: default
spec:
  rules:
  - host: example.com       # Domain Host
    http:
      paths:
      - path: /service1     # URL Path (example.com/service1)
        pathType: Prefix
        backend:
          service:
            name: service1  # /service1 로 들어온 트래픽을 전송할 service 명
            port:
              number: 80
      - path: /service2     # URL Path (example.com/service2)
        pathType: Prefix
        backend:
          service:
            name: service2
            port:
              number: 80    # /service2 로 들어온 트래픽을 전송할 service 명
```

#### Nginx Ingress Controller 설치

```shell
# 기존 리소스 삭제
kind delete cluster

# kind cluster 재배포
kind create cluster --config kind-2node.yaml

# Nginx Ingress Controller 설치
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml

# Service 타입 변경
kubectl patch svc ingress-nginx-controller -n ingress-nginx -p \
'{"spec":{"type":"NodePort","ports":[{"port":80,"targetPort":80,"nodePort":31000},{"port":443,"targetPort":443,"nodePort":31001}]}}'

# Nginx Ingress Controller 리소스 확인
kubectl get -n ingress-nginx svc,deploy,pod
```

#### 서비스 생성

```shell
# Growth 서비스
cat << EOF > svc-growth.yaml
apiVersion: v1
kind: Service
metadata:
  name: growth-service
spec:
  selector:
    app: growth
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: growth-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: growth
  template:
    metadata:
      labels:
        app: growth
    spec:
      containers:
        - name: nginx
          image: nginx
          ports:
            - containerPort: 80
          volumeMounts:
            - name: growth-html
              mountPath: /usr/share/nginx/html
      volumes:
        - name: growth-html
          configMap:
            name: growth-html
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: growth-html
data:
  index.html: |
    <html>
    <body>
      <h1>hello growth</h1>
    </body>
    </html>
EOF

kubectl apply -f svc-growth.yaml
```

```shell
# Log 서비스
cat << EOF > svc-log.yaml
apiVersion: v1
kind: Service
metadata:
  name: log-service
spec:
  selector:
    app: log
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: log-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: log
  template:
    metadata:
      labels:
        app: log
    spec:
      containers:
        - name: nginx
          image: nginx
          ports:
            - containerPort: 80
          volumeMounts:
            - name: log-html
              mountPath: /usr/share/nginx/html
      volumes:
        - name: log-html
          configMap:
            name: log-html
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: log-html
data:
  index.html: |
    <html>
    <body>
      <h1>hello log</h1>
    </body>
    </html>

EOF

kubectl apply -f svc-log.yaml
```

```shell
# 배포 확인
kubectl get pod,svc,cm

# ConfigMap 확인
kubectl describe cm growth-html
kubectl describe cm log-html
```

#### Ingress 배포

```shell
cat << EOF > ingress-sample.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: growth-log-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: / # /growth, /log 요청을 서비스로 전달할 때 접두사 제거. ex) /growth -> growth-service '/'
spec:
  ingressClassName: nginx
  rules:
  - http:
      paths:
      - path: /growth
        pathType: Prefix
        backend:
          service:
            name: growth-service
            port:
              number: 80
      - path: /log
        pathType: Prefix
        backend:
          service:
            name: log-service
            port:
              number: 80
EOF

kubectl apply -f ingress-sample.yaml
```

```shell
# 조회
kubectl get ing,svc

# 상세 정보 조회
kubectl describe ingress growth-log-ingress
```

#### Ingress 동작 확인

```shell
# growth 경로 호출
curl http://localhost:31000/growth
...
<html>
<body>
  <h1>hello growth</h1>
</body>
</html>
...

# Log 경로 호출
curl http://localhost:31000/log
...
<html>
<body>
  <h1>hello log</h1>
</body>
</html>
...
```

## 🧑‍💻 Kubernetes Storage

<img src="/assets/img/post_images/TIL/storage.png" alt="img">

출처: https://kubetm.github.io/k8s/03-beginner-basic-resource/volume/

> [공식문서](https://kubernetes.io/ko/docs/concepts/storage/volumes/)

### 📦 `emptyDir`
- **Pod 내부에서 컨테이너 간 공유**되는 임시 스토리지
- **Pod 삭제 시** 해당 스토리지도 함께 삭제

### 🖥️ `hostPath`
- **Worker Node의 Directory Path**를 Pod에 마운트
- **Pod 삭제 시**에도 Node에 데이터가 남음
- **다른 Node와 공유 불가**, 해당 Node에만 데이터 존재

### 💾 `PersistentVolume (PV)`
- **쿠버네티스 클러스터 전체에서 공유되는 볼륨**
- 다양한 크기의 PV를 미리 생성해 두고 **Pod와 PVC**를 통해 연결하여 사용
