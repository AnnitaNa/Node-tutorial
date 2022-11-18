// * BREVE EXCPLICAÇÃO

// jwt -> token que garante a autenticidade -> assinatura quando um usuário se autentica no sistema (com usuário e senha), o servidor gera um token com data de expiração. Durante as requisições seguintes, o JWT é enviado no cabeçalho caso esteja válido, permite acesso aos recursos sem a necessidade de se autenticar novamente.

// ***** PACOTES *****
// * jsonwebtoken: pacote que implementa o protocolo JSON Web Token;
// * dotenv: pacote para gerenciar variáveis de ambiente

import express from 'express'
import { router } from './router.js';
import path from 'path'
import * as dotenv from 'dotenv'

const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.resolve();
const envPath = path.join(__dirname,'../.env')

dotenv.config({path: envPath});  //loads .env file (where are my env variables)

app.use('/', router)

app.listen(port);