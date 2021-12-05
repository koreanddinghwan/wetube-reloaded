# 1.1 git init

1. 만들고자하는 폴더에서 git init
2. github에서 연결하고자하는 repository 생성
3. repository URL을 폴더의 터미널에서
   `git remote add origin {URL}`
4. npm init을하면 package.json생성됨

# 1.2 npm install

1. 폴더의 터미널에서 `npm i express`
2. node_modules에는 npm으로 설치한 모든 패키지가 저장된다.
3. express는 다른 패키지도 필요하기때문에 다른 패키지들도 같이 설치된다.
4. express 폴더의 package.json을 보면, dependencies가 있는데, express가 실행되기위해 필요한 패키지들을 의미한다.
5. 각각의 패키지들의 dependencies로 연결되어 설치된다.

# 1.3 understanding dependencies

1. 폴더에서 node_modules폴더와 packaage-lock.json을 삭제
2. npm install만 명령
3. 알아서 express가 설치되는 이유는 npm이 현재 package.json에서 dependencies를 보고 필요한 패키지들을 알아서 설치한다.
4. 프로젝트를 동작시킬때, 필요한 모듈이 어떤 것이 있는지 package.json이 유지하고 있기에 자동으로 설치한 것이다.
5. package-lock.json은
