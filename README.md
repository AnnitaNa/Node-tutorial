# Table of Contents

- [Table of Contents](#table-of-contents)
    - [Run project](#run-project)
    - [Typescript](#typescript)
  - [Require, import and export](#require-import-and-export)
    - [:arrow_right: Require](#arrow_right-require)
    - [:arrow_right: Import / export](#arrow_right-import--export)
  - [Environment Variables](#environment-variables)
  - [Postgres and Sequelize](#postgres-and-sequelize)
    - [:arrow_right: Config and .env files](#arrow_right-config-and-env-files)
    - [:arrow_right: Migration and Model](#arrow_right-migration-and-model)
    - [:arrow_right: Seeders](#arrow_right-seeders)

---

### Run project

1. install node modules: on terminal, use:

    ```bash
    npm i
    ```

2. To run .ts files, put nodemon + folder/fileName. ex.:

    ```bash
    nodemon 12-JWT/server.js
    ```

3. To test the applican and see the request download Thunder Client on your VS Code extensions

### Typescript

> how to use typescript

1. download

    ```bash
    npm install typescript ts-node nodemon --save-dev
    ```

2. configure nodemon.json

    ```json
    {
        "execMap": {
            "ts": "ts-node-esm",
            "js": "node"
        }
    }
    ```

    you need to use ts-node-esm because in this work I am using ES6 (import and export) and not common.js (require) modules

3. Also dowloand @types of what you are using or VS CODE may not recognize it:

    ```bash
    npm i --save-dev @types/express @types/node @types/express-session @types/request
    ```

---

<br>



## Require, import and export

> In your document, you can chose to use Require or Import.
>
> **Warning** Do not try to use both at the same time!

### :arrow_right: Require

1. Requiring module

    ```javascript
    //  src/app.js

    const http = require("http"); //default module
    const message = require("./exportedMessage"); //local module
    ```

2. Exporting local module

    ```javascript
    //  src/exportedMessage.js

    const message = "my local module";
    module.exports = message;
    ```

**_OR_**

### :arrow_right: Import / export

1. Exporting local module

    ```javascript
    //  src/exportedMessage.js

    export const message = "my local module";
    ```

2. Importing

    ```javascript
    //  src/app.js

    import { message } from "./exportedMessage.js";
    import http from "http";
    ```

3. Add to package.json

⮚ Adding the line below will make the code interpret every \*.js file as a module

```json
"type": "module",
```

> **Note** on this project we will be using the last method with _Import_



<br>

## Environment Variables

1. download dotenv
    ```
    npm i dotenv
    ```
2. Create a <b>.env</b> file and put:

    ```
    ACCESS_TOKEN_SECRET =
    REFRESH_TOKEN_SECRET =
    ```

3. Generate your token secrets, put on terminal:

    ```bash
    node
    ```

    This will open a node terminal. then put

    ```bash
    require('crypto').randomBytes(64).toString('hex')
    ```

    This will generate a random string. Copy it without the ''. Your .env file will be like:

    ```bash
    ACCESS_TOKEN_SECRET = 42f8bf844e4bb2270230f1ab2510d9158623a42e0b3b7a0af19aace22668454f3ddff69f9ce39c08d7816928fb8251bd2919955da0000214967e84b32dc8e0fd
    REFRESH_TOKEN_SECRET = 2a0f97f3eb9de5d7802863ecaaeab2eb178d7f03850a0a1261313994fcbbe99092e118574f55b58a61f194047685c7a76b876a84d5c7793d5f64248fe5de5272
    ```

4. Add your .env file to gitignore

---

<br>

## Postgres and Sequelize

To use postgres and Sequelize, you need to install on your application:

1. Download

    ```bash
       npm i sequelize sequelize-cli pg pg-hstore
    ```

2. Create a server on ElephantSQL

<div style="display:flex;justify-content:center">
    <img src="./utils/img/elephantSQL.png" style="width:600px">
</div>

1. create core folders and files

    ```bash
    npx sequelize-cli init
    ```

    It will create:

    <div style="display:flex;justify-content:center">
        <img src="./utils/img/npx-sequelize-cli-init.png" style="width:200px">
    </div>

### :arrow_right: Config and .env files

1. configuration file

    > rename config.json to config.js to use environment variables

    ```javascript
    import dotenv from "dotenv";

    dotenv.config();

    export default {
        development: {
            dialect: "postgres",
            url: process.env.DATABASE_ELEPHANT,
            define: {
                timestamp: true,
                underscored: true,
                underscoredAll: true,
            },
        },
    };
    ```

2. .env file
    ```javascript
    DATABASE_ELEPHANT=postgres://DATA_BASE:PASSWORD@babar.db.elephantsql.com/ypwbbegs
    ```

### :arrow_right: Migration and Model

0. you can create migration and model files at the same time with the command:

    ```bash
    npx sequelize model:generate --name User --attributes name:string,password_hash:string, provider:boolean, created_At:date,updated_at:date
    ```

    Or you can create them one in a time

1. Create Model

    ```javascript
    import Sequelize, { Model, Sequelize } from "sequelize";

    export class User extends Model {
        static init(sequelize) {
            super.init(
                {
                    name: Sequelize.STRING,
                    password_hash: Sequelize.STRING,
                    email: Sequelize.STRING,
                    provider: Sequelize.BOOLEAN,
                },
                {
                    sequelize,
                    modelName: "User",
                }
            );
        }
    }
    ```

2. Create migration files

    ```bash
    npx sequelize-cli migration:generate --name=create-users
    ```

    it will generate a migration file that can be filled like:

    ```javascript
    module.exports = {
        up: async (queryInterface, Sequelize) => {
            // to do migration

            return await queryInterface.createTable("users", {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                provider: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                    allowNull: false,
                },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                updated_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
            });
        },

        down: async (queryInterface, Sequelize) => {
            //to undo migration
            return await queryInterface.dropTable("users");
        },
    };
    ```

    > **Warning** Both cases you need to Rename the migration file to extention .cjs (it uses common modules to work)

3. Do migration
    ```bash
    npx sequelize-cli db:migrate
    ```
    It will generate a new table or make the modifications on your database (in this case, i can see it online at ElephantSQL)

### :arrow_right: Seeders

1. create a seeder

    ```bash
    sequelize seed:generate --name populate-User
    ```

2. file seeder

    ```javascript
    "use strict";

    /** @type {import('sequelize-cli').Migration} */
    module.exports = {
        async up(queryInterface, Sequelize) {
            await queryInterface.bulkInsert("users", [
                {
                    name: "teste1",
                    password_hash: "123",
                    email: "teste1@email.com",
                    provider: true,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: "teste2",
                    password_hash: "1234",
                    email: "teste2@email.com",
                    provider: false,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ]);
        },

        async down(queryInterface, Sequelize) {
            await queryInterface.bulkDelete("users", null);
        },
    };
    ```

3. run seeder
    ```bash
    npx sequelize db:seed:all
    ```
