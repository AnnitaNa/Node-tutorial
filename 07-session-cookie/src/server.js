import express from "express";
import session from "express-session";

// * SESSION: info stored on the server side -> begins with logins and ends with logout -> identify user with  sessionID -> secure
// * COOKIES: info stored on the client side -> has expiration time -> insecure


const app = express();
const port = process.env.PORT || 3000;

app.use(session({
	secret: "mySecretKey",
	resave: true,
	saveUninitialized: true,
	cookie: {cookieName: "cookieValue"}
}));


const userCookie = {
	user:"Tati",
	role:"god-ex"
};

app.get("/", (req,res) => {  //! create session variable
	req.session.sessionVariable = "my session variable";
	res.cookie("cookie1", userCookie, {
		httpOnly: true,
		sameSite: "None",
		secure: true, //sent only with https
		maxAge: 1000*60*60*24 // 1 day
	});    //! created cookie
	res.end("set session variable and cookies");
});

app.get("/session", (req, res) => {
	res.end(req.session.sessionVariable);
});

app.get("/cookie", (req, res) => {
	res.end(JSON.stringify(req.session.cookie));
});

app.get("/destroy", (req, res) => {
	req.session.destroy((err) => {console.log("destroyed");});  //! destroy session variable
	res.clearCookie("cookie1");   //! destroy cookie
	if (!req.session?.sessionVariable ) {
		res.end("cannot access variable because it was destroyed");
	}
	res.end();
    

});

app.listen(port, () => 
{
	console.log("connected");
});