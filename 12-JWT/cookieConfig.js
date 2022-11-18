export const cookieConfig = {
    httpOnly: true, //não é acessivel pelo js
    sameSite: 'None', //mesmo dominio
   // secure: true, //sent only with https (will not send cookie token while testing)
    maxAge: 1000*60*60*24 // 1 day
}
