# News Explorer Api

News Explorer Api is backend part of News Explorer project, developed as part of [Yandex-Praktikum](https://praktikum.yandex.ru/) training program.

Version 1.0.1

## About

This project is an independent server linked to the [News Explorer frontend part](https://github.com/juzlov/news-explorer-frontend)
The server verifies the token, authorizes the user, saves and returns articles from the database.

- Project API developed following REST principles
- Implemented authentication and authorization of users
- Users and articles are created and validated through Schemas
- List of articles and users is stored in Mongo DataBase
- Password data is pushed in hashed form
- Return of an error message for incorrect request

## Used in project
- **Node.js**
- **Express.js**
- **MongoDB**

## How to start
Please, before start check versions of following components:
- npm version - 6.13.4
- node.js version - 12.16.1

1. Clone project:
```
git clone https://github.com/juzlov/news-explorer-api.git
```

2. Run database
```
mongod
```

3. Run local server in another terminal window
```
npm run dev
```

## How to use

You can test current functionality of server, using any req/res app, for example Postman:

- **Signin**
Request: POST ./signin
```
Data.json: {
    "e-mail" : "key",
    "password" : "keykey"
}
```

- **Signup**
Request: POST ./signup
```
Data.json: {
    "name" : "key",
    "email": "key@key.ru",
    "password": "keykey"
}
```

- **Get info about me**
Request: GET ./users/me
Data.json: {}

- **Get articles**
Request: GET ./articles
Data.json: {}

- **Post article**
Request: POST ./articles
```
Data.json: {
    "keyword": "key",
    "title": "key",
    "text": "key",
    "date": "29.04.2020",
    "source": "key.ru",
    "link": "https://key.ru/",
    "image": "https://key.ru/key.jpg"
}
```

- **Delete article**
Request: DELETE ./articles/:article-id
Data.json: {}

## Public server IP
84.201.179.249

## Domain
https://api.news-explore.tk/
