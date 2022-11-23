
## Eslint

> it is used to reinforce style in code

### :arrow_right: Installing Eslint

```bash
npm init @eslint/config
```

select the options below

```bash
√ How would you like to use ESLint? · style       
√ What type of modules does your project use? · esm
√ Which framework does your project use? · none
√ Does your project use TypeScript? · Yes
√ Where does your code run? · node
√ How would you like to define a style for your project? · prompt
√ What format do you want your config file to be in? · JSON
√ What style of indentation do you use? · tab
√ What quotes do you use for strings? · double
√ What line endings do you use? · unix
√ Do you require semicolons? · Yes
√ Would you like to install them now? · Yes
√ Which package manager do you want to use? · npm
```

### :arrow_right: .eslintrc.json

it should generate a **.eslintrc.json** file. configure it like below:

```json
{
    "env": {
        "node": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "indent": [
            "warn",
            "tab"
        ],
        "linebreak-style": [
            "warn",
            "unix"
        ],
        "quotes": [
            "warn",
            "double"
        ],
        "semi": [
            "warn",
            "always"
        ]
    }
}
```


### :arrow_right: Using eslint


1. Enter **_Package.josn_** and add:

    ```json
    "scripts": {
        "lint": "eslint ./src/** ", //it looks at all files inside src
        "lint:fix": "eslint  --ext **.js,**.ts src --fix" // it fix all files with extension .js and .ts inside src
    }
    ```
> Attention! ./src/** -ext .js -> will not work! It will look at all files inside src

2. To run it you must type on the terminal:

    ```bash
       npm run lint
    ```

    ```bash
       npm run lint:fix
    ```

