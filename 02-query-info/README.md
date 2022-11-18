
# Node tutorial

A small node tutorial


## Installation

Install node_modules

```bash
  npm i
```
    
## How to work

```bash
npm start
```

## ATTENTION!

we are using typescript, so we need to change a few things:

1) package.json:
```json
"type": "module",
"scripts": {
    "start": "ts-node-esm"
}
```
**ts-node-esm** is to work with ES6 modules

2) tsconfig.json:
```json
{
  "compilerOptions": {
    "target": "ES2022",                                  
    "module": "ES2022",                                
    "esModuleInterop": true,  
    "moduleResolution": "node",                           
    "strict": true,                                      
    "skipLibCheck": true                        
  }
}

```

