# 공부기록

# set up

## 1.1 git init

1. 만들고자하는 폴더에서 git init
2. github에서 연결하고자하는 repository 생성
3. repository URL을 폴더의 터미널에서
   `git remote add origin {URL}`
4. npm init을하면 package.json생성됨

## 1.2 scripts

1. package.json에서 `"scripts": {"win": "node index.js"},`를 만들어준다.

2. 이렇게되면 `npm run win`을 실행하면 자동으로 `node indexjs`를 실행한다.
3. 나중에 다양한 스크립트를 실행할 수 있다. css를 압축하거나, 서버를 시작하는 등..

## 1.3 npm install

1. 폴더의 터미널에서 `npm i express`
2. node_modules에는 npm으로 설치한 모든 패키지가 저장된다.
3. express는 다른 패키지도 필요하기때문에 다른 패키지들도 같이 설치된다.
4. express 폴더의 package.json을 보면, dependencies가 있는데, express가 실행되기위해 필요한 패키지들을 의미한다.
5. 각각의 패키지들의 dependencies로 연결되어 설치된다.

## 1.4 understanding dependencies

1. 폴더에서 node_modules폴더와 packaage-lock.json을 삭제
2. npm install만 명령
3. 알아서 express가 설치되는 이유는 npm이 현재 package.json에서 dependencies를 보고 필요한 패키지들을 알아서 설치한다.
4. 프로젝트를 동작시킬때, 필요한 모듈이 어떤 것이 있는지 package.json이 유지하고 있기에 자동으로 설치한 것이다.
5. package-lock.json은 말그대로 잠겨있고, 패키지가 변경되었는지 해시값으로 유지한다.
6. 이 프로젝트가 package.json으로 유지되는데, 친구에게 이 파일과 package-lock.json, index.js를 주면 정확하게 package-lock에 저장된 버전으로 패키지를 다운로드해준다.
7. node_modules 폴더의 용량이 큰데, 이걸 깃허브에 올라가지 않도록하려면, .gitignore파일을 만들어 파일 루트를 추가한다.

## 1.5 babel

### 바벨

바벨은 자바스크립트 컴파일러이다. nodejs가 이해하게끔 자바스크립트 언어를 컴파일해준다.

babel을 사용하면 최신자바스크립트언어를 nodejs에서 사용할 수 있다.

### devDependencies

`npm i --save-dev @babel/core`명령어를 실행하면 설치가능

설치하면 package.json에서

```md
"devDependencies": {
"@babel/core": "^7.16.0"
}
```

를 찾을 수 있는데, babel은 node_modules에 설치되어있는 상태이다.

dependencies와 devDependencies는 똑같이 node_modules에 설치되지만, 개발자입장에서 필요한 dependencies를 말해주는게 `devDependencies`이다.

`npm i --save-dev @babel/core` 명령어에서 `--save-dev`를 빼더라도, node_modules에 babel이 설치된다.

json파일은 단지 텍스트이기때문에, `--save-dev`를 작성하는 것을 까먹고 dependencies에 있어도 `"@babel/core": "^7.16.0"`를 devDependencies에 위치하도록하면된다.

### babel.config.json

바벨을 사용하기 위해서는 설정이 필요하다

터미널에서 `touch babel.config.json`실행하면 babel.config.json이 터미널 루트상으로 생성된다.  
이 폴더에

```
{
  "presets": ["@babel/preset-env"]
}

```

을 입력하고 저장.

`npm i @babel/preset-env --save-dev`실행

바벨은 설정파일을 확인하고, 설정파일에서 `presets`을 확인한다.  
`presets`은 바벨 플러그인인데, 이 플러그인은 최신 자바스크립트 구문을 사용할 수 있게 해준다.

바벨을 사용하기 위해서는 js 코드상으로 직접 컴파일하는 방법도 있는데,  
직접하기보다는 package.json의 scripts에서 컴파일을 실행하도록 하자.

이를 위해 `@babel/node`를 설치해야한다.
`npm i @babel/core @babel/node --save-dev`

`@babel/node`를 설치했기때문에 package.json - scripts에서  
`"dev": "babel-node index.js"`를 설정할 수 있다.

<br>
이제 npm run dev를 하면 babel이 코드를 nodejs가 이해할 수 있도록 바꿔서 index.js를 실행한다.

## 1.6 nodemon

<br>
여기서 문제점은 index.js가 바뀔때마다, 계속 npm run을 실행해줘야하는데 이를 위해 `nodemon`이라는 것을 사용한다.

nodemon은 파일이 수정되는 것을 감지하는데, 파일이 수정되면 자동으로 재시작을 해준다.
`npm i nodemon --save-dev`로 nodemon을 설치하고,

```json
"scripts": {
    "dev": "nodemon --exec babel-node index.js"
  },
```

이렇게 스크립트를 변경한 후, 다시 npm run dev를 실행하면 파일이 수정될때마다 nodemon이 알아서 재시작해준다.
