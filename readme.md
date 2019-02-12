# Real-time multiplayer Conway's Game of Life

### Description

Real-time multiplayer Conway's Game of Life implementation using NodeJS web-socket server.

Complements [UI app](https://github.com/isSerge/game-of-life-websocket-server)

### Start locally

-   `git clone git@github.com:isSerge/game-of-life-websocket-server.git`
-   `cd game-of-life-websocket-server`
-   `npm install`
-   `npm run dev`

### Configuration

-   The board size is 20 cells by default, to set another value - provide `BOARD_SIZE` environmental variable
-   The tick interval is 1000ms (1 second) by default, to set another value - provide `TICK_INTERVAL` environmental variable

### Scripts

Note: Commands should run inside app folder

-   `npm run dev` - run in dev mode
-   `npm start` - run in prod mode
-   `npm test` - run test

### Deployment

-   `heroku create game-of-life-websocket-server`
-   `git push heroku master`

To verify that app is running - check logs `heroku logs --tail`

Note: In order to deploy app to Heroku you need to have (Heroku CLI)[https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up] and be logged in

### Technical choices and trade-offs

My intention was to go with as minimal setup as possible:

-   Server is built using built-in NodeJS [http](https://nodejs.org/api/http.html) module
-   The app utilizes only one package from NPM - [websocket](https://www.npmjs.com/package/websocket) module, which is one of the most common web-socket implementations in JavaScript.
-   In order to make the app modular and extendable I have separated logic for handling web-socket messages and connections (index.js), accessing storage and sending responses to user or users (service.js) and board update (board.js)
-   For data storage I used in-memory storage, however for the real-world application I would use database solution like Firebase, RethinkDB, Redis, etc. For this purpose storage is a separate module, which can be later replaced by another solution without affecting the whole app.
-   In order to make code more testable I utilized factory pattern and pure functions.
