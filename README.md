# AWS Infra 스터디

<img src="/images/메인.png" width="700px">

- [AWS 기본개념](#AWS-기본개념)

- [Docker ](#Docker)

- [Nginx](#Nginx)

- [Redis(REmote Dicionary Server)](#Redis)

- [Route53](#Route53)

- [Cloud Watch로 EC2 자동 시작 및 중지](#CloudWatch)
- [에러처리](#에러처리)
- [Linux 명령어](#Linux-명령어)



## AWS 기본개념

## aws(amazon web service)

### IAM(AWS Identity and Access Management)

- AWS 리소스에 대한 액세스를 제어
- AWS 리소스 사용 권한 부여 및 제어

## VPC

1. 격리된 네트워크 환경 구성 가능한 **가상 네트워크 환경**(클라우드 환경)
2. 논리적인 독립 네트워크 구성 리소스
3. CIDR 범위 ⇒ 사설 IP 대역으로 설정, VPC내 자원들은 VPC의 CIDR 범위 안에서 ip 할당

CIDR(Classless Inter-Domain Routing) : 클래스 없는 도메인간 라우팅 기법

[엔클라우드24 - 강력한 클라우드 & Idc 인프라 서비스 : 네이버 블로그](https://blog.naver.com/ncloud24/221208338209)

Route table의 기본 규칙 ⇒ VPC CIDR 블록에서 찾음

**구성요소**

- VPC ← vpc 마법사가 설치해줌
- subnet
- routing table
- Internet gateway

ec2 = instance = vm = computer

### NAT 인스턴스

SSH 원격 프로토콜

ec2 (작은 컴퓨터) 등 가상 머신에 접근하는 방법(t2.micro선택)

<img src="/images/aws1.png" width="700px">

**vscode로 접근법**

[VS Code Remote 사용하기 - SSH 방식](https://noooop.tistory.com/entry/VS-Code-Remote-사용하기-SSH-방식)

1. key.pem 다운로드
2. ssh\config 작성

<img src="./images/aws2.PNG" width="700px">

### Subnet

- 하나의 IP 네트워크 주소를 지역적으로 나누어 여러 개의 서로 연결된 지역 네트워크로 사용할 수 있도록 하는 방법.
- VPC를 CIDR블록을 가지는 단위로 나누어 더 많은 네트워크 망 만들기 가능
- 실제 리소스 생성되는 물리적 공간
- VPC CIDR 블록 범위 안에서 지정 가능
- 인터넷 연결 O ⇒ public subnet
- 인터넷 연결 X ⇒ private subnet

**※ 멀티AZ란**

하나 이상의 Availablity Zone에 유사한 리소스를 동시에 배치하는 기능

AZ는 물리적 공간으로 분리되어 있기 때문에 이중화 구성해 하나의 AZ에 장애가 발생하더라도 서비스 문제 없음

<img src="./images/aws3.PNG" width="700px">


### Internet Gateway

- vpc에서 생성된 리소스들은 인터넷에서 사용 불가
- vpc와 인터넷 연결 관문

**※ 인터넷을 사용하고자 하는 리소스는 public ip 필요(public subnet과 연결해야함!)**

public subnet : 서브넷이 IG로 향하는 라우팅이 있는 라우팅 테이블과 연결되는 경우

private subnet : 서브넷이 IG로 향하는 라우팅이 없는 라우팅 테이블과 연결되는 경우

### VPC의 서브넷에 속한 인스턴스에 대해 인터넷 송수신 액세스를 활성화

- 인터넷 게이트웨이를 생성하여 VPC에 연결합니다.
- 인터넷 바인딩된 트래픽을 인터넷 게이트웨이로 전달하는 라우팅을 서브넷의 라우팅 테이블에 추가합니다.
- 서브넷의 인스턴스에 전역적으로 고유한 IP 주소(퍼블릭 IPv4 주소, 탄력적 IP 주소 또는 IPv6 주소)가 있는지 확인합니다.
- 네트워크 액세스 제어 목록 및 보안 그룹 규칙에서 관련 트래픽이 인스턴스로, 그리고 인스턴스에서 흐르도록 허용되는지 확인합니다.

사용자의 인스턴스 ⇒ VPC 및 서브넷 내부에서 정의된 private IP주소 공간만 인식

IGW

1. 서브넷 ⇒ 인터넷

   회신 주소 : 인스턴스의 public ip주소 또는 EIP

2. 서브넷 ← 인터넷

   트래픽이 vpc로 전달되긴 전에 인스턴스의 private ip주소로 변환

<img src="./images/aws4.PNG" width="700px">

### Bastion Host

침입 차단 소프트웨어가 설치되어 내부와 외부 네트워크 사이에서 일종의 게이트 역할을 수행하는 호스트

<img src="./images/aws5.PNG" width="700px">
VPC 및 EC2 설치 후 React와 Express를 localhost를 통해 연결시켰다.

<img src="./images/aws6.PNG" width="700px">

위와 같은 이미지대로 프로젝트 구성해보는 것이 목적

### reference

[[초보자를 위한 AWS웹 구축\] 4. 네트워크 구성하기(VPC, Subnet, Route Table, Internet Gateway)](https://tech.cloud.nongshim.co.kr/2018/10/16/4-네트워크-구성하기vpc-subnet-route-table-internet-gateway/)

[VS code Remote-ssh로 AWS EC2 인스턴스 접속 및 개발하는 법](https://director-joe.kr/80)

<br/>

## Docker

### 정의

- **컨테이너** 기반의 오픈소스 가상화 플랫폼
- 프로그램, 실행 환경을 컨테이너로 추상화

### 특장점

- 기존과 동일한 인터페이스 제공을 통해 프로그램 배포 및 관리 단순화
- 어떠한 프로그램도 추상화 가능
- 가상머신에 비해 빠른 속도
- PC, AWS, Azure, GCP 등 다양한 환경에서 실행 가능

**컨테이너란?**

- 격리된 공간에서 프로세스가 동작하는 기술
- 여러개의 어플리케이션을 단일 호스트에서 구동하기 위한 개념
- linux namespace라는 기술을 이요해 구현된 가상화 기법을 사용해 각자 독립된 network 공간을 할당받음

<img src="./images/docker1.PNG" width="700px">

**이미지란?**

- 컨테이너 실행에 필요한 모든 파일 및 설정을 포함하고 있는 것
- Immutable
- 컨테이너는 이미지를 실행한 상태로 볼 수 있음

**Docker의 이미지 저장방식**

- 레이어방식을 통해 이미지 관리
- 이미지는 여러 개의 읽기 전용 레이어로 구성
- 컨테이너는 이미지 + 읽기/쓰기 레이어
- 기존 레이어에서 바뀌는 부분만 레이어로 추가

<img src="./images/docker2.PNG" width="700px">

### DockerHub

github처럼 Docker hub를 통해 이미지 관리할 수 있음(push, pull)

<img src="./images/docker3.PNG" width="700px">

### Docker Port

포트 개방은 ⇒ 컨테이너에서 docker 이미지 실행시킬 때, "-p Host Port : Container Port"를 사용해서

호스트 포트와 컨테이너 포트를 연결(연결하지 않으면 외부에 포트 노출 X)

[15. [Docker\] 도커에서 Container 포트와 Host 포트의 개념](https://m.blog.naver.com/PostView.nhn?blogId=alice_k106&logNo=220278762795&proxyReferer=&proxyReferer=https:%2F%2Fwww.google.com%2F)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2421fc60-a233-4d65-bde7-ff665df17097/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2421fc60-a233-4d65-bde7-ff665df17097/Untitled.png)

### Docker Network

컨테이너 사이의 연결!!

컨테이너는 각자 격리된 네트워크 공간이다. 따라서 그 컨테이너 사이의 통신을 주고 받고 싶을 때, 사용한다.

소프트웨어 브릿지 네트워크에 연결된 컨테이너들 끼리 통신할 수 있도록 하면서 해당 브릿지에 연결되지 않은 컨테이너들로 부터 격리하는 기능도 제공한다

<img src="./images/docker4.PNG" width="700px">

### Docker 전체 흐름

1. docker 설치

   [초보를 위한 도커 안내서 - 도커란 무엇인가?](https://subicura.com/2017/01/19/docker-guide-for-beginners-1.html)

2. Dockerfile 작성

   ```java
   //client folder(react)를 이미지 내부로 복사
   FROM node:14.15.4
   
   RUN mkdir -p /client
   
   WORKDIR /client
   
   ADD . /client
   
   COPY ./package.json ./package.json
   RUN npm install
   
   ENV PATH /app/node_modules/.bin:$PATH
   
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

3. Dockerfile build ⇒ 이미지 생성

   ```bash
   docker build -t react_client:v0.0 .
   ```

4. 컨테이너에서 docker 이미지 실행시키기

   ```bash
   docker run -d -p 8000:3000 생성한이미지/태그명
   ```

   ## docker 명령어

   1. 실행중인 docker container list 보기

      ```bash
      docker ps -a
      ```

   2. docker image 모두 보기

      ```bash
      docker image ls
      docker images
      ```

   3. docker 시작

      ```bash
      docker start "컨테이너 ID"
      ```

   4. docker 종료

      ```bash
      docker stop "container ID"
      ```

   5. docker logs

      ```
      docker logs <<컨테이너>>
      ```

   6. docker image 삭제

      ```java
      docker rmi <<이미지ID||별명>> //강제 -f 옵션
      ```

   7. docker container 삭제

      ```java
      docker rm <<컨테이너ID||별칭>>
      ```

   8. docker network

      ```
      docker network create darack 
      docker network ls
      
      sudo docker run -d --name proxy --network darack 
      sudo docker network inspect darack (<<network이름>>)
      //네트워크 그룹에서 연결 해제
      docker network disconnect bridge one
      //두개의 컨테이너가 네트워크를 통해 서로 소통(one => two)
      docker exec <<one>> ping <<two>>
      ```

      <<참고>>

   [Docker 네트워크 사용법](https://www.daleseo.com/docker-networks/)

   [[Docker\] 도커 이미지와 컨테이너 삭제 방법](https://brunch.co.kr/@hopeless/10)

## Nginx

### 정의

트래픽이 많은 웹사이트 확장성을 위해 설계한 **비동기 이벤트 기반구조**의 **웹서버 소프트웨어**입니다

이 프로그램은 가벼움과 높은 성능을 목표로 만들어짐

러시아의 프로그래머, 이고르 시쇼브가 Apache의 C10K Problem(하나의 웹서버에 10,000개의 클라이언트의 접속을 동시에 다룰 수 있는 기술적인 문제)를 해결하기 위해 만든 Event-driven구조의 HTTP, Reverser Proxy, IMAP/POP PROXY server를 제공하는오픈소스 서버 프로그램.

### 용도

1. 정적인 리소스를 전달(안해봄)

   요청이 들어왔을 때, 이미지나 CSS 같은 static resource에 대한 요청은 nginx에게 맡기고, 동적으로 계산되거나 전달되야하는 것들은 어플리케이션 서버에게 맡긴다.

2. **Reverse Proxy Server(아래에서 설명)**

```java
docker image pull nginx //dockerhub에서 nginx push해서 사용하면 간단!
```

<img src="./images/nginx1.PNG" width="700px">

nginx에서 express로 바로 요청하는 것

### Reverse Proxy server

외부에서 내부 서버가 제공하는 서비스 접근 시, proxy서버를 먼저 거쳐서 내부 서버로 들어오는 방식

### 장점

1. 보안

   외부 사용자는 실제 내부망에 있는 서버의 존재를 알 수 없다.(내부 서버의 정보를 외부로부터 숨길 수 있다.) 모든 접속은 Reverse Proxy 서버에게 들어오며(Nginx) Reverse Proxy Server는 요청에 맵핑되는 내부 서버의 정보를 알고 요청을 넘겨준다.

2. 로드밸런싱

   Proxy 서버가 내부 서버의 정보를 알고 있으므로 로드 밸런싱을 통해 부하 여부에 따라 요청 분배할 수 있다.

### react

```jsx
const handleSubmit = (event) => {
        event.preventDefault()
        fetch('**/api/sum/'**, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        })
            .then(res => res.json())
            .then(data => setResult(data.result))
            .catch(error => console.error(error))

    }
```

### node

```jsx
//App.js
app.use('/api', indexRouter);

//routes/index.js
router.use('/sum', sumRouter);

router.get('/', (req, res) => {
    res.render('index');
})
```

### nginx.conf

[default nginx.conf](https://www.notion.so/default-nginx-conf-32ade41183864c9985af0b644e9f1534)

location : proxy 서버로 들어오는 요청 URL에 따라 맵핑된다.

```
     / 로 들어오면, react로 /api로 요청이 들어오면, node로 들어간다.
worker_processes auto;

    events { worker_connections 2048; }

http {

    sendfile on;

    server {
        listen 443;
        server_name www.daracktest.tk;
        return 301 https://daracktest.tk$request_uri;
    }

    server {
        listen 80;

        location / { 
            proxy_pass <http://react:3000>;
        }

        location **/api** { //
            proxy_pass <http://server-redis2:3001>;
        }
    }
}
```

------

참고사이트

[Nginx란 무엇인가?](https://velog.io/@wijihoon123/Nginx란-무엇인가)

<해보고 싶은 것>

[NginX를 이용한 static 컨텐츠 서비스 와 캐시 설정](https://www.joinc.co.kr/w/man/12/nginx/static)

## Redis

### NoSQL

NOSQL은 키-밸류나 컬럼, 문서 형식의 데이터 모델을 이용한다.

아주 많은 양의 데이터를 효율적으로 처리가 필요할 때, 데이터의 분산처리, 빠른 쓰기 및 데이터의 안정성이 필요할 때 사용한다.

특정 서버에 장애가 발생했을 때에도 데이터 유실이나 서비스 중지가 없는 형태의 구조이기 때문에, NOSQL을 사용한다.

### **NOSQL의 종류**

1)**키-밸류 스토리지형 키-밸류형**: **Redis**, memcached, Oracle, Coherence,

2)**열 지향 와이드 컬럼 스토어**: Cassandra, HBASE, Cloud Database

\3) **문서형**: **MongoDB**, Couchbase, MarkLogic, PostgreSQL, MySQL, DynamicDB MS-DocumentDB

\4) **그래프형**: Neo4j

### 특징

메모리 기반의 “키-값” 구조 데이터 관리 시스템이며, 모든 데이터를 메모리에 저장하고 조회하기에 빠른 Read, Write 속도를 보장하는 **비 관계형 데이터베이스**이다.

레디스는 크게 5가지< String, Set, Sorted Set, Hash, List >의 데이터 형식을 지원한다.

Redis는 빠른 오픈 소스 인 메모리 키-값 데이터 구조 스토어이며, 다양한 **인 메모리** 데이터 구조 집합을 제공하므로 사용자 정의 애플리케이션을 손쉽게 생성할 수 있다.

사용 사례 : 캐싱, 세션 관리

**캐싱**

다른 데이터베이스 "앞"에 배치된 Redis는 성능이 뛰어난 인 메모리 캐시를 생성하여 액세스 지연 시간을 줄이고, 처리량을 늘리며, 관계형 또는 NoSQL 데이터베이스의 부담을 줄여줍니다.

**세션 관리**

Redis는 세션 관리 작업에 매우 적합합니다. Redis를 세션 키에 대한 적절한 TTL과 함께 빠른 키 값 스토어로 사용하면 간단하게 세션 정보를 관리할 수 있습니다. 세션 관리는 주로 게임, 전자 상거래 웹 사이트, 소셜 미디어 플랫폼을 비롯한 온라인 애플리케이션에 필요합니다.

 

```jsx
sudo docker pull redis //docker hub에서 redis 가져오기
```

**Node**

```jsx
//app.js
var redis = require('redis');

const redisHost = "13.125.6.99";
var client = redis.createClient(6379, redisHost);

client.on("error", (err) => {
  console.log(err);
});

client.on("ready", () => {
  console.log("Redis is ready");
})

client.on("connect", () => {
  console.log("Connected");
})

app.use(function (req, res, next) {
  req.cache = client;
  next();
})

//server/routes/sumab.js
router.post('/', function (req, res) {
    console.log(req.body)
    let valueA = req.body.valueA;
    let valueB = req.body.valueB;

    let key = "Calc" + valueA + "to" + valueB;
    console.log(key);

    req.cache.hgetall(key, (err, data) => {
        console.log("값 들어오는지 check");
        if (err) console.log(err);
        if (data) {
            console.log(data)
            res.json({
                result: data.result,
                status: data.status,
            })
        } else if (data == null) {
            let value = Number.parseInt(valueA) + Number.parseInt(valueB);
            req.cache.hmset(key, {
                result: value,
                status: "cached",

            })
            res.json({
                result: value,
                status: "uncached",
            });

        }
    })
});

module.exports = router;
```

## Route53

가용성과 확장성이 뛰어난 클라우드 DNS(Domain Name System) 웹 서비스

사용자의 요청을 아래와 같이 AWS에서 실행되는 인프라에 효과적

- EC2 인스턴스
- Elastic Load Balancing 로드 밸런서
- Amazon S3 버킷

한달에 0.55달러 내야한다.

<img src="./images/route531.PNG" width="700px">

1. **무료 도메인 발급**

   (자세한 발급 방법은 아래 참고 사이트를 참조하기!)

   [Freenom - A Name for Everyone](https://www.freenom.com/)

<img src="./images/route532.PNG" width="700px">

1. **ACM 인증받기**

https 는 사용하려는 서비스와 SSL인증서를 통해 안전하게 통신할 수 있는 프로토콜

ACM(AWS Certificate Manager) ← ACM이 해당 서비스의 접근 도메인이 안전한 사이트인지 판별 후, 허가가 되면 인증서를 해당 도메인에 적용을 시켜줄 수 있다.

나는 검증 하루 걸렸다....

1. **Route53에서 호스팅 영역 생성하기**

<img src="./images/route533.PNG" width="700px">

<img src="./images/route534.PNG" width="700px">

**4.  로드밸런서 연결해 https 추가**

<img src="./images/route535.PNG" width="700px">

1. nginx에서도 만약게 경우를 대비해서   http → https로 설정해주기

```jsx
server {     
  listen       80;
  server_name  ~.;
  # redirect https setting
  if ($http_x_forwarded_proto != 'https') {
    return 301 https://$host$request_uri;
  }      
  location / {         
    proxy_set_header X-Real-IP $remote_addr;             
    proxy_set_header HOST $http_host;
    proxy_set_header X-NginX-Proxy true;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    # port setting , 서버의 port와 동일한 port로 pass 시켜야 합니다.
    proxy_pass <http://127.0.0.1:8080>;
    proxy_redirect off;
  }
}
```

1. (추가) www → non www

```jsx
server {
		listen 80;
		server_name www.daracktest.tk;
		return 301 $scheme://daracktest.tk$request_uri;
	}
```

DNS management  → create Hosted Zone

→ Domain name 입력 type : public hosted zone

NS : Name Sever - ip주소랑 도메인을 연결시키준다.

------

참고 사이트

[AWS ELB와 NGINX로 HTTPS 서버 구축하기](https://medium.com/@vdongbin/aws-elb와-nginx로-https-서버-구축하기-736b8c5ee76)

[[2019.06.25\] AWS ACM(Certificate Manager)이란?](https://helloinyong.tistory.com/149)

[[초보자를 위한 AWS 웹구축\] 8. 무료 도메인으로 Route 53 등록 및 ELB 연결](https://tech.cloud.nongshim.co.kr/2018/10/16/초보자를-위한-aws-웹구축-8-무료-도메인으로-route-53-등록-및-elb/)

## CloudWatch

### 정의

Amazon CloudWatch는 개발자, 시스템 운영자, 사이트 안정성 엔지니어(SRE) 및 IT 관리자를 위해 구축된 모니터링 및 관리 서비스

CloudWatch는 애플리케이션을 모니터링하고 시스템 전반의 성능 변경 사항을 이해하고 이에 대응하며, 리소스 사용률을 최적화하고, 운영 상태에 대한 통합된 뷰를 확보하는 데 필요한 데이터와 실행 가능한 통찰력을 제공

**즉, 간단 요약**

인스턴스를 모니터링

중요하게 보고 싶은 메트릭, cpu,  대시보드 ⇒ 기초자료를 긁어온다.

로그를 클라우드 로그에 쌓는다.

로그 인사이트 ⇒ 로그를 쿼리로 해서 필터링을 해서 시각화를 해준다.

클라우드 워치에서 이벤트가 발생하면 람다함수가 실행된다.

### Lambda란?

1. 서버리스 컴퓨팅 서비스
2. 애플리케이션을 실행하기 위한 별도의 서버 셋업 없이 곧바로 코드 실행해주는 서비스
3. 고정비용 없이 사용시간에 대해서만 비용
4. CloudWatch에서 알람 발생 ⇒ SNS 푸시 서비스 호출 ⇒ Lamda 함수 트리거 ⇒ 연동된 Slack 채널로 알람전송

<img src="./images/cloudwatch1.PNG" width="700px">

------

참고사이트

------

[Lambda를 사용하여 EC2 인스턴스를 정기적으로 중지 및 시작하기](https://aws.amazon.com/ko/premiumsupport/knowledge-center/start-stop-lambda-cloudwatch/)



## 에러처리

### Error: ENOSPC: System limit for number of file watchers reached,

⇒ 원인 : 너무 열심히 일해서 시스템의 파일와쳐가 limit에 달했기 때문에

```java
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

### linux에서  node update가 안됨... 강제로 해주기

[[Linux\] node.js, npm 설치 및 업그레이드](https://d2fault.github.io/2018/04/30/20180430-install-and-upgrade-nodejs-or-npm/)

```java
nvm install v14.15.4
nvm use v14.15.4
```

### Linux에 Docker 설치 - ubuntu랑 다름

```java
sudo yum install docker
```

### Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?

[[Docker\] Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running? 에러 해결](https://velog.io/@pop8682/Docker-Cannot-connect-to-the-Docker-daemon-at-unixvarrundocker.sock.-Is-the-docker-daemon-running-에러-해결)

```bash
systemctl start docker
systemctl enable docker
```

### cors문제

<img src="./images/cors1.PNG" width="700px">

<img src="./images/cors2.PNG" width="700px">

### Failed to load resource: net::ERR_CONNECTION_REFUSED

<img src="./images/cors3.PNG" width="700px">

이유 : localhost로 fetch 때렸기 때문(로컬은 "내 컴퓨터")

브라우저를 띄우는 컴퓨터가 현재 aws(클라우드)에 위치하고, fetch때리는 익스프레스 서버 또한 클라우드에 있기 때문에 로컬이 아니라 해당 클라우드에 공용ip를 사용해야한다.



## 리눅스 명령어

### 네트워크 포트 상태 확인

현재 사용하고 있는 TCP 포트를 조회하는 리눅스 명령어

```java
//Listen상태의 모든 포트정보 조회
netstat -tnlp | grep "Listen" 
```

### 프로세스 종료 명령어

```java
kill -9 (프로세스 ID)
ps -ef | grep (프로세스 이름)
```

리눅스 특정 port죽이는 방법.

1. 특정 포트 확인.

   netstat -nap | grep port

   (ex: netstat -nap | grep 1099)

2. 특정 포트에서 사용하는 프로그램 확인.

   lsof -i TCP:port

   (ex: lsof -i TCP:1099)

3. 특정 포트를 사용하는 프로그램 죽이기.

   fuser -k -n tcp port

   (ex:fuser -k -n tcp 1099)

