# Nodejs/Express Boilerplate with view templates

## Initial Steps to build a simmilar project

1. `$ yarn init -y` to build the package.json of the project.
2. Open package.json and add the following script

```
"scripts":{
  "dev": "nodemon src/index.js -e js"
}
```

3. `$ yarn add nodemon sequelize-cli -D && eslint --init`
4. `$ yarn add bcryptjs express express-session session-file-store pug mysql2 multer`
5. `$ yarn sequelize init` and configure the created files

### Database

The project is using mariadb as database storage

### Sequelize

The ORM module to manipulate the database, migrations and seeds without using raw sql and

### Multer

Module responsable to manage the upload of files

### Session-file-store

Module responsable to manager and generate temporary fisical json file to store active sessions of users inside the server

### View

#### Structure

1. auth -> views of login and register user
2. layout -> layout template pattern of most views
3. partials -> portion of view components are storage here (Ex: header,footer, etc...)
4. general -> the rest of the view remain inside the root of view directory

# Initial Configuration

`$ yarn`
`$ yarn sequilize-cli db:migrate`
goto src/config/env/.env.example copy and paste it, after that rename to .env and set the variables
`$ yarn dev`
