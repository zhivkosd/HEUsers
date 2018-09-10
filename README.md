# HEUsers
Holiday Extras Users API

## App details
* HTTP Rest based on [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/)
* To speed up the dev process are used [Express.js](http://expressjs.com/) and [mongoose](https://mongoosejs.com/)
* If you need to run the app localy you will need:
    * Node.js >= v8.4
    * npm >= 5.3
    * the DB is hosted in [mLab](https://mlab.com). In order to access it you have to set `DB_URL` env variable with the *mLab* url.
* Provides CRUD (Create / Read / Update / Delete HTTP verbs) on a "user_model"
* Every request needs **Basic Authentication**

HTTP verb | URI | Action
----------| --- | ------
GET | /users | list all users
GET | /users/:user_id | get user with user_id
POST | /users | create a new user
PUT | /users/:user_id | modify user with user_id
DELETE | /users/:user_id | delete user with user_id

## Setup
* To start the scripts in `package.json` you can use `npm` or `yarn`
* Install the dependencies `npm install`
* Start the server `npm start`

## Dev Mode
* Start the server using [nodemon](https://nodemon.io/) - `yarn start:dev`

## Tests
* Still in progress, but there are few which can be executed.
* They depend on some `env` variables - `DB_URL`, `AUTH_USER` and `AUTH_PASS` - the credentials that I gave you :)
