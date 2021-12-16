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

# 3 introduction to express

## 3.0 your first server

src폴더를 만들고, index.js를 이 폴더에 옮긴다.  
package.json의 scripts의 dev가 index.js를 디렉터리 상에서 찾지 못하므로, 경로를 추가해준다.

```json
"scripts": {
    "dev": "nodemon --exec babel-node src/index.js"
  },
```

그리고 index.js를 server.js로 수정한다.

```js
import express from "express"; //express 넣기
```

node_modules에서 express라는 파일을 찾고, index.js를 불러온다.

```js
const app = express();
```

express함수를 실행하면 express 어플리케이션을 생성한다.

서버는 항상 켜져있고 인터넷에 연결되어있는 컴퓨터이다. request를 listening하고있다.  
서버는 항상 사용자의 request를 listening고있고, 이에 대해 서버는 응답을 해줘야한다.

서버와 상호작용을 하는 모든 행동, 유저의 행동을 계속 주시하고 있는다.
서버가 사람들이 뭔가 요청할때까지 기다리게하는 명ㅇ령어는
app.listen()이다.

listen함수는 어떤 port를 열어놓을지 결정해야한다.
그리고 listen()메서드에는 콜백함수가 필요하다.  
콜백함수는 서버가 시작할때 작동하는 함수이다.

```js
import express from "express";

const app = express();

const handleListening = () => console.log("Server listening on port 4000");

app.listen(4000, handleListening);
```

이 열어놓은 서버에 접속하기위해서는 localhost를 통해 접속할 수 있다.  
`localhost:port#`으로 접속이 가능하다.

## 3.1 GET requests

localhost에 접속하면 보이는 에러
`Cannot GET /`
슬래시 / 는 root를 의미한다. (사이트에 접속하면 가장 먼저 보여주는 화면)  
GET은 Http method이다.  
http는 서버와 유저, 서버끼리 소통하는 방식이다.  
유저가 접속하려고할때 유저의 브라우저에서 http request를 만들어서 서버에 보낸다.

여기서 https request는 /, root 페이지를 get request한다.

`app.get()`함수는 누군가 파라미터(특정 route)로 request를 보내면 반응하는 콜백함수를 정의할 수 있다.

```js
app.get("/", () => {
  console.log("User is trying to go home");
});
```

이 코드를 작성하면 터미널 상에는 console.log가 출력이되지만 로컬호스트로 접속은 불가능하다.

현재 상황에서 브라우저가 get request를 보내고있는데, 서버는 이에 대해 app.get메서드로 반응을하고있다.  
서버는 `/` route에 대해 console.log을 출력하는 콜백함수를 실행하고있다.  
브라우저의 get request에 대해 아무런 response를 하고있지 않기때문에 아무런 페이지가 뜨지 않는다.

여전히 다른 route로 접속(localhost:4000/assd)하게되면 cannot get `route`가 뜨는데,  
`localhost:4000/` route는 서버가 반응을 하고 있지만, 아무런 응답을 보내고있지 않아서  
브라우저가 계속 서버의 응답을 기다리고 있기에 계속 브라우저가 로딩중인것.

## 3.3 Responses

브라우저가 `/`route에 대해 get http method를 보내면 app서버가 이 메서드에 대해서  
`app.get("/", handleHome)`으로 잡아내고 있다.  
express는 get메서드의 콜백함수의 기본인자로(event처럼) response 오브젝트와 request오브젝트가 들어온다.

```js
const handleHome = (req, res) => {
  console.log(req);
  console.log(res);
};
```

Get method로 받은 request에 대해서 서버가 응답을하기 위해서는 콜백함수에서 response를 해줘야한다.
콜백함수의 리턴값을 주면 req는 종료되게된다.(서버의 응답)

res.end를 하면 response 과정이 끝나고, 자동으로 브라우저의 request가 종료된다.

```js
const handleHome = (req, res) => {
  return res.end();
};
```

또는 이렇게 res.send()함수로 응답할수도잇다.

```js
const handleHome = (req, res) => {
  return res.send("hello");
};
```

## 3.4 middleware

브라우저의 요청에 대해 서버가 응답하는데 middleware는 이 중간에 있다.  
브라우저가 request한 다음 서버가 응답하기 전, 이 사이에 middleware가 있다.  
지금까지 다룬 handler가 모두 middleware이다. (controller로 교쳬)

이 controller들은 미들웨어인데, req, res말고도 세번째 인자가 있다. 이 세번째 인자가 `next`
next 인자는 다음 함수를 호출해준다.

```js
app.get("/", gossipMiddleware, handleHome);
```

브라우저가 "/"route를 get하려할거고, express는 gossipMiddleware를 호출한다.

```js
const gossipMiddleware = (req, res, next) => {
  console.log("im middle");
  next();
};
```

이 함수는 콘솔출력 후, next()로 다음 함수를 호출하고,

```js
const handleHome = (req, res) => {
  return res.send("<h1>hello</h1>");
};
```

handleHome에서 send로 html을 보낸다.

next()함수를 호출하는 콜백함수들은 middleware가 된다.  
middleware는 request에 응답하지 않고, request를 계속 유지한다.

```js
const gossipMiddleware = (req, res, next) => {
  console.log(`someone is going to ${req.url}`);
  next();
};
```

request object에서 url은 req가 요청하고있는 route를 뜻함.

## 3.6 global middleware

`app.use()`는 global middleware을 만들 수 있게 해준다.
어느 URL에도 작동할 수 있는 middleware이다.

```js
const gossipMiddleware = (req, res, next) => {
  console.log(`someone is going to ${req.url}`);
  next();
};
app.use(gossipMiddleware);
```

이 gossipMiddleware는 유저가 요청하는 모든 URL에 대해 작동한다.

protection middleware는

## 3.7 morgan

middleware 모듈, nodejs용 request logger middleware임.

morgan 함수를 호출하면 설정한대로 middleware를 리턴한다.  
morgan()함수의 괄호 안에는 "dev", "combined" 등등 여러 기능을 가진 middleware를 리턴한다.

# 4.0router

router객체는 routes와 middleware의 고립된 인스턴스이다.  
미들웨어 및 라우팅 기능만 수행할 수 있는 "미니 애플리케이션"으로 생각할 수 있습니다.  
모든 Express 애플리케이션에는 앱 라우터가 내장되어 있습니다.

라우터는 미들웨어처럼 작동하므로 app.use()에 대한 인수로 또는 다른 라우터의 use() 메서드에 대한 인수로 사용할 수 있습니다 .

최상위 express개체에는 새 개체 를 만드는 Router() 메서드가 router있습니다.

router만들기 전에 플랜을 세워야한다.  
프로젝트에 대해 생각할때, 가장 먼저 생각해야하는건 데이터이다.  
wetube에는 video, user, 그리고 기본적인 로그인과같은 페이지가 필요하다.

-Global router-
/ -> Home
/join -> Join
/login -> Login
/search -> Search

-User router-
/users/edit -> Edit User
/users/delete -> Delete User

/videos/watch -> Watch video
/videos/edit -> Edit Video
/videos/delete -> Delete Video
/videos/comment -> Comment on a Video
/videos/comment/delete -> Delete comment of a video

라우터는 작업중인 주제를 기반으로 URL을 구분해준다.

## 4.2 cleaningcode

라우터 정리
src에 routers 디렉터리 생성, 여기에 라우터들을 모듈화한다.

globalRouter.js의 코드를 이렇게 작성한다.

```js
import express from "express";

const globalRouter = express.Router();
const handleHome = (req, res) => res.send("home");

globalRouter.get("/", handleHome);

export default globalRouter;
```

`export default globalRouter`를 통해 이 파일은 파일 내부에서 globalRouter라는 변수를 export하게된다.
(참고)[https://ko.javascript.info/import-export#ref-4122]
export default는 `개체 하나만 선언되어있는 모듈`을 내보내기할때 유리하다.  
파일 개수가 많아지는 문제가 있지만, 프로젝트를 짜임있게 잘 구성하면 용이하다.

## 4.3 exports

유저가 특정 route로 접속하면 Router들이 컨트롤러를 실행한다.  
이 컨트롤러에서 유저에게 정보를 보내거나 받아오는 역할을하는데, 코드가 굉장히 길어지므로 컨트롤러들을 따로 만들어서 import하자.

유저와 관련된 controller들과 비디오와 관련된 controller들로 구분하는데,  
글로벌 라우터에서 사용된 handlejoin은 user, handleHome은 video 컨트롤러로 구분한다.

여기서 export할때는 컨트롤러가 export해야하는 변수가 2개이상이므로 export {} 중괄호로 내보내고, import할때 중괄호 {}로 가져온다.
<br>
-videoControllers-

```js
const trending = (req, res) => res.send("Home Page Videos");

const WatchVideo = (req, res) => res.send("Watch Video");
const EditVideo = (req, res) => res.send("Edit Video");

export { EditVideo, WatchVideo, trending };
```

<br>
-userControllers-

```js
const Join = (req, res) => res.send("Join here");
const EditUser = (req, res) => res.send("Edit user");
const DeleteUser = (req, res) => res.send("Delete user");

export { EditUser, DeleteUser, Join };
```

<br>
-globalRouter-

```js
import express from "express";
import { trending as Home } from "../controllers/videoControllers";
import { handleJoin as Join } from "../controllers/userControllers";
const globalRouter = express.Router();

globalRouter.get("/", Home);
globalRouter.get("/join", Join);
export default globalRouter;
```

또는 as로 별칭을 붙이면 이 별칭으로 이 파일을 사용할 수 있다.

컨트롤러가 export하는 변수명이 바뀌었으므로 각 라우터가 import하는 변수명도 변해야한다.
<br>
-userRouter-

```js
import express from "express";
import { DeleteUser, EditUser } from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.get("/edit", EditUser);
userRouter.get("/delete", DeleteUser);

export default userRouter;
```

<br>
-videoRouter-

```js
import express from "express";
import { EditVideo, WatchVideo } from "../controllers/videoControllers";

const videoRouter = express.Router();

videoRouter.get("/watch", WatchVideo);
videoRouter.get("/edit", EditVideo);

export default videoRouter;
```

## 4.6 planning routes

/ -> Home
/join -> Join
/login -> Login
/search -> Search

/users/:id -> See User
/users/logout -> log out
/users/edit -> edit my profile
/users/delete -> Delete myprofile

특정id의 비디오를 보거나, 수정하거나, 삭제가 가능해야한다.
/videos/:id -> see video
/videos/:id/edit -> Edit Video
/videos/:id/delete -> Delete Video
/videos/upload

## 4.7 URL파라미터

라우터에 URL에 `:`를 넣는데 이것의 의미는?  
URL안에 변수를 포함시킬 수 있게 해준다.

URL창에 있는 숫자가 바로 변수.  
이 파라미터는 브라우저가 여기에 변수를 넣는 것을 허용한다는 의미이다.

현재 접속해보면 `http://localhost:4001/videos/341234` 이렇게 해도 오류페이지가 안뜨는 이유는

```js
videoRouter.get("/:id", Seevideo);
```

videoRouter에서 URL파라미터를 넣고있기 때문!

위 주소로 들어가면 유저의 브라우저가 서버에 request를 넣는데, 이 경로는 videoRouter가 담당한다.

```js
videoRouter.get("/:id", Seevideo);
```

videoRouter가 /:id로 경로설정이 되어있으므로 `/`뒤의 변수를 받아들인다.  
이 경로에 대한 콜백함수로 `Seevideo`가 호출되므로 이 함수에서

```js
const Seevideo = (req, res) => {
  console.log(req);
  console.log(req.params);
  res.send("Watch Video");
};
```

유저의 request를 조회해보면

```js
params: { id: '341234' },
```

이렇게 params라는 객체가 있는 것을 볼 수 있다.

### URL파라미터쓸때 주의사항

URL파라미터는 가장 나중에 써야한다. 코드는 항상 맨 위부터 확인하면서 내려오기때문에

```js
videoRouter.get("/:id", Seevideo);
videoRouter.get("/upload", Upload);
videoRouter.get("/:id/edit", Editvideo);
videoRouter.get("/:id/delete", Deletevideo);
```

만약에 유저가 /upload 경로로 들어와도 express는 그걸 :id 파라미터의 변수로 인지해버릴 것이다.  
URL 파라미터를 안쓰는 Route부터 탐색하도록

```js
videoRouter.get("/upload", Upload);
videoRouter.get("/:id", Seevideo);
videoRouter.get("/:id/edit", Editvideo);
videoRouter.get("/:id/delete", Deletevideo);
```

이렇게 바꿔주자

### 파라미터에 변수강제

이 프로젝트에서 id는 숫자만 받을 것이다.  
유저가 요청하는 URL을 정규식으로 필요한 정보를 추출해낼 수 있다.  
`:id(\\d+)`로 route를 설정하면 숫자정보만 id변수값으로 받을 수 있다.

# 5 templates

HTML을 리턴하는 용도로 Pug를 사용한다.

## 설치

`npm i pug`

## 사용

HTML을 더 간편한 문법으로 작성해 전달하기 위해서 뷰엔진으로 pug를 사용한다.

```js
app.set("view engine", "pug");
```

express는 기본적으로 CWD 디렉터리에서 views라는 폴더에서 뷰를 찾는다. 이때 이 뷰를 읽어올 변환기를 선택할 수 있는데, `.set("view engine", pug)`를하면 변환기를 pug로 설정한다.

## render

`const trending = (req, res) => res.render("home");`
이제 views 라우터.get의 콜백함수의 response의 render메서드로 렌더링할 pug파일을 보여줄 수 있다.

## 루트변경

`process.cwd() + '/views'`
expressjs.com에서 views에 대한 문서에서 기본값으로 설정된 경로.  
현재 작업중인 폴더(current working directory) 에서 /views라는 폴더를 찾고, 여기서 어플리케이션의 뷰를 찾는다.

cwd란 어디서 nodejs를 부르고 서버를 가동하는지가 기준이다.  
nodejs를 시동하고 실행하는건 `package.json`이 있는 곳이다.

기본값을 바꾸려면  
`app.set("views", process.cwd() + "/src/views");`
를 적용해주자.

## pug의 장점

pug는 자바스크립트 기반이기대문에 자바스크립트의 문법을 사용할 수 있다.  
`#{}`이 안에 자바스크립트 코드를 작성할 수 있다.

pug의 장점은 반복작업을 할 필요가 없다는 것이다.  
현재 파일들에서 footer가 반복되고있는데, 이를 views/partials에 떼어내서 footer.pug파일을 만들고 다른 파일들에서 이 경로로 들어가서 파일 안의 코드를 가져올 수 있다.

pug는 `include`를 통해 다른 파일을 사용할 수 있다.

`views/home.pug`

```pug
doctype html
html(lang = "ko")
    head
        title Wetube
    body
        h1 Welcome to Wetube
    include partials/footer.pug
```

`views/partials/footer.pug`

```pug
footer &copy; #{new Date().getFullYear()} Wetube
```

## inheritance

### extends

베이스를 만들고, 이로부터 확장해나가는 방식, jekyll 블로그의 구조가 이와같다.

기본적인 layout들, 그리고 각각의 layout이 상황에 따라 다른 layout을 상속하거나 includes를 사용하면서 페이지를 그려나간다. 이와 같은 개념인 것 같다.

특정 파일을 상속하기 위해서는

```pug
extends extends base.pug
```

이렇게 적어주면된다.

### block

jekyll에서 각각의 layout들이 상속 할때 자신을 상속하는 내용이 들어갈 공간을 `{{ content }}`이렇게 선언해주었다.  
이 공간에 상속받는 layout의 내용이 들어갔는데, pug에서는 `block content`로 선언한다.

```pug
doctype html
html(lang="ko")
    head
        title Wetube
    body
        block content
    include partials/footer.pug
```

```pug
extends base.pug

block content
    h1 Home
```

jekyll에서는 layout들을 보면 content가 1개만 선언되어있는데, pug에선 특정 변수로 block을 선언하면 상속받는 파일에서 block을 그 변수로 선언하면돼서 여러개의 block을 선언할 수 있다는 것이다.

```pug
doctype html
html(lang="ko")
    head
        block head
    body
        block content
    include partials/footer.pug
```

```pug
extends base.pug

block head
    title Home | Wetube

block content
    h1 Home
```

### 컨트롤러에서 변수전달하기

```pug
doctype html
html(lang="ko")
    head
        title #{pageTitle} | Wetube
    body
        block content
    include partials/footer.pug
```

`#{}`은 pug에게 변수를 선언해준다.  
pug는 라우터가 콜백함수로 호출하는 컨트롤러들이 페이지를 요청하면 html을 전달한다.

pug에 선언되어있는 변수를 컨트롤러가 렌더링할때 변수를 직접 넣어줄 수 있는데,

```js
const trending = (req, res) => {
  res.render("home", { pageTitle: "Home" });
};
```

이렇게 렌더링할 view에 선언되어있는 변수를 객체형태로 넣어주면된다.

## MVP CSS

base의 head에 css파일을 추가한다.

`<link rel="stylesheet" href="https://unpkg.com/mvp.css">`

## Conditionals

pug에서 연산자를 사용하는 방법

단순히 변수를 할당해줄 수 있다.

`h1=pageTitle`
이렇게 연산자를 사용해서 value 할당해줄 수 있는데, 이렇게 `=`을 사용하는 것은  
`h1 #{pageTitle}`과 같다.

또는 if~ else문을 사용할 수 있는데,  
videoController에서 가짜 유저데이터를 만들어 home에 전달하면

```js
const fakeUser = {
  username: "Nicolas",
  loggedIn: true,
};

const trending = (req, res) => {
  res.render("home", { pageTitle: "Home", fakeUser: fakeUser });
};
```

`home.pug`로 불러와지는 html에서 컨트롤러가 전달하는 객체에 접근할 수 있다.

```pug
doctype html
html(lang="ko")
    head
        title #{pageTitle} | Wetube
        <link rel="stylesheet" href="https://unpkg.com/mvp.css">
    body
        header
            if fakeUser.loggedIn
                small Hello #{fakeUser.username}
            nav
                ul

                    if fakeUser.loggedIn
                        li
                            a(href="/logout") Logout
                    else
                        li
                            a(href="/login") Login

            h1=pageTitle

        main
            block content
    include partials/footer.pug
```

### iteration

controller에서 데이터를 전달할때, 전달하는 데이터가 배열형태라면?
`videos = [1,2,3,4,5]` 이 배열이

`res.render("home", { pageTitle: "Home", videos });`
이렇게 전달된다면, pug에서는

```pug
extends base.pug

block content
    h2 Welcome here you will see the trending videos
    ul
        each video in videos
            li=video
        else
            li Sorry Nothing found.
```

`pug`에서는 `each`로 전달할 수 있다.

### mixins

복잡한 객체 데이터를 다뤄야할때 코드의 재사용성을 높이기 위해 사용한다.  
데이터를 받을 수 있는 일종의 미리 만들어진 HTML block이라고 볼 수 있음.

`views/mixins/videos.pug`

```pug
mixin video(info)
    div
        h4=info.title
        ul
            li #{info.rating}/5
            li #{info.comments} comments
            li Posted #{info.createdAt}
            li #{info.view} views.
```

이 mixin은 함수와 같다고 생각하면된다.  
parameter로 info가 들어오면, 그 parameter를 이용해 html객체를 리턴한다.

mixin을 사용하는 방법으로

```pug
extends base.pug
//- include로 mixin을 불러오고
include mixins/video

block content
    h2 Welcome here you will see the trending videos

    each potato in videos
        //- 불러온 mixin은 +를 앞에 붙여서 사용가능
        +video(potato)


    else
        Sorry Nothing found.
```

each로 iterate하고 있는 객체에 각각 `video mixin`을 적용한다.  
그리고 각각의 `video mixin`은 html 객체를 리턴할 것이다.

# 6 MONGODB & MONGOOSE

## 6.0

DB를 구축하기전에, 어떻게 DB에 데이터를 보낼 것인가가에 대해서 먼저 다룬다.

먼저 알아야하는건 우리가 지금까지 `get`만 하고 있다는 것.

`get`은 URL 파라미터나 URL 쿼리로데이터를 보냈는데, `post`는 http 패킷의 body안에 담아서 보낸다. 자세한 비교는 블로그 글 참고

단순 사용을 비교하자면 `get`은 사용자의 요청에 대해 단순히 서버상에서 데이터를 보내주고, 보여줘야할때만 사용하고, `post`는 서버상에서 데이터를 조작해야할때 사용한다.

- 사용자가 작성한 글을 저장->post
- 사용자가 '/home'페이지를 요청 -> get
- 사용자가 작성한 글을 수정하고자함 -> post

일단 post방식으로 데이터를 조작하는걸 연습해보자

DB를 구축하기 전에 `video`배열을 fake DB로 사용하자.

`videos`데이터를 let으로 바꾸어 수정가능하게하고, home 페이지에서 모든 비디오가 렌더링되게하자.

`form 태그에서 action이 중요한 이유는 Ajax통신의 메서드를 정할 수 있다는 것!!이다.`  
form이 어떤 메서드를 가지냐에따라 이 방식이 달라져용~~

form의 메서드를 post로 바꿔주면 post request를 서버에 날리는데, 서버가 이걸 받아주기 위해선

`videoRouter.post("/:id(\\d+)/edit", postEdit);` 해당 경로로 post를 받고, 함수를 실행하게 해줘야하고,

```js
export const postEdit = (req, res) => {
  ...
};
```

함수를 정의해줘야한다.

이제 받은 정보를 어떻게 할 것인가가 문제다.

입력한 데이터를 담고있는 건 req.body이다.

```
Contains key-value pairs of data submitted in the request body. By default, it is undefined, and is populated when you use body-parsing middleware such as express.json() or express.urlencoded().
```

`key-value 형태로 submit된 data를 받는데, key값은 form 태그 내에서 value를 가지는 태그들의 name, 그리고 value값은 이 태그들의 value값들이다.`

초기값으로 undefined되어있기 때문에, `body-parsing middleware`를 사용해야한다.

업데이트하기위해선

```js
const { title } = req.body.title;

videos[id - 1].title = title;
```
