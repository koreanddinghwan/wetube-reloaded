# setup

## git

git init

repo생성

git remote add origin RepoURL

## npm

`npm i express`

## babel

`touch babel.config.json`

{
"presets": ["@babel/preset-env"]
}

`npm i @babel/core --save-dev` ->최신 문법 사용

`npm i @babel/preset-env --save-dev` -> 바벨 플러그인

`npm i @babel/node --save-dev` -> npm 설정

`"dev": "babel-node src/server.js"`

## nodemon

`"dev": "nodemon --exec babel-node src/server.js"`
