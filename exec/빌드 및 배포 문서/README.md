1. 사용한 JVM, 웹서버, WAS 제품 등의 종류와 설정값, 버전(IDE버전 포함) 기재 

   **IDE** 

   IntelliJ 

   MySQL Workbench 

   VSCode

   **BE** 

   Java open-JDK zulu `11.0.16` 

   SpringDataJPA `2.7.3` 

   queryDsl `5.0.0`

   Lombok `1.18.24` 

   SpringBoot `2.7.4` 

   Spring Security `5.7.3` 

   junit4 `4.13.1` 

   Swagger2 `2.9.2`

   JWT `0.11.5`

   JCodec `0.2.3` 

   Oauth2 `2.7.5`

   **DB** 

   MySQL `8.0.31`

   redis `2.7.3.RELEASE`

   **SERVER** 

   Ubuntu `20.04 LTS`

   MobaXterm `v22.1` 

   Docker `20.10.21`

   Jenkins `2.361.4`

   **FE** 

   React 18.2

   ```
   React-Redux 8.0.4
   
   Reduxjs/toolkit 1.8.6
   
   Three.js 0.146.0
   
   Material-ui 5.10.11
   
   React-Query 4.12
   
   TypeScript 4.4.2
   
   Emotion/react 11.10.4
   
   **Open Source**
   ```

2. 빌드 시 사용되는 환경 변수 등의 주요 내용 상세 기재

- FE

  ```
  // .env 파일에 정리된 프론트엔드 환경 변수
  REACT_APP_URL=http://localhost:3000
  REACT_APP_BACKEND_URL=http://k7b108.p.ssafy.io:8080/api
  REACT_APP_JAVASCRIPT_KEY=7fe8136ac331bc43dd5f0ad7cea38472
  REACT_APP_KAKAO_REST_KEY=29250d362049cababb2b673f785f8ff2
  ```

3. 배포 시 특이사항 기재

4. DB 접속 정보 등 프로젝트(ERD)에 활용되는 주요 계정 및 프로퍼티가 정의된 파일 목록
   **MySQL**
   Hostname: [k7b108.p.ssafy.io](http://k7b108.p.ssafy.io/)
   Port: 3306
   Username: hipster
   Password: b108
