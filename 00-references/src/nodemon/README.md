
## Nodemon

> Nodemon is used to restart a server when files are changed.

### :arrow_right: Installing Nodemon

Globally

```bash
# you can use it anywhere on your computer
npm install -g nodemon
```

**_OR_**

Locally as a dev-dependency

```bash
# You can only use it in this project
npm install -save-dev nodemon
```

### :arrow_right: Using Nodemon

> You can use a default file to render or use a different one. As a default, you need to add a script to **_Package.json_** file. If not, just render it normally

1. Enter **_Package.josn_** and add:

    ```json
    "scripts": {
       "nodemon": "nodemon 01-hello-world/hello-world.js -e ejs,js,css,html,jpg,png,scss"
    }
    ```

    > The name you put on your script is the file you want to observe, you can even put an specific folder on it

2. To run it you must type on the terminal:

    ```bash
       npm run nodemon
    ```

**_OR_**

1. Enter the folder that contains **_my-file.js_** and input in the terminal:

    ```bash
    nodemon my-file.js
    ```

### :arrow_right: nodemon.json

Use it to configure different file extensions

```json
{
    "execMap": {
        "ts": "ts-node-esm",
        "js": "node"
    }
}
```