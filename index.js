const express = require("express")
const app = express()
const mongodb = require('./services/mongodb')
const handlers = require('./controllers/handlers')
const bodyParser = require('body-parser')
const  loginMiddleware = require('./services/jwt').verifyToken


app.set('view engine', 'html')
app.set('views',"views")
app.use(express.static("public")) 
var urlBodyEncoder = bodyParser.urlencoded({ extended: false }) 
app.use(bodyParser.json())

class Log { 
    constructor(){
        this.url = "";
        this.data = "";
        this.response = "";
    }
}

app.get("/", (req,res)=>{
    let log = new Log();
    log.url = req.url;
    log.response = res.statusCode;
    console.log(log)
    res.sendFile( __dirname + "/views/dashboard.html")
})

app.get("/home", (req,res)=>{
    res.sendFile( __dirname + "/views/dashboard.html")
    let log = new Log();
    log.url = req.url;
    log.response = res.statusCode;
    console.log(log)
})

app.get("/about" , (req,res)=>{
    res.sendFile( __dirname + "/views/about.html")
    let log = new Log();
    log.url = req.url;
    log.response = res.statusCode;
    console.log(log)
})

app.get("/admin-login" , (req,res)=>{
    res.sendFile( __dirname + "/views/login.html")
    let log = new Log();
    log.url = req.url;
    log.response = res.statusCode;
    console.log(log)
})


app.get("/admin-dashboard" , (req,res)=>{
    res.sendFile( __dirname + "/views/admin.html")
    let log = new Log();
    log.url = req.url;
    log.response = res.statusCode;
    console.log(log)
})

app.post("/add-comment", handlers.addComment)
app.post("/add-admin", loginMiddleware ,handlers.addAdmin) 
app.post("/comments", urlBodyEncoder , loginMiddleware,  handlers.getComments)
app.post('/signin', urlBodyEncoder, handlers.signin)
app.post('/signup',urlBodyEncoder, handlers.signup)
app.post('/signout',urlBodyEncoder, handlers.signout)

const port = process.env.PORT || 3000;
app.listen(port  ,()=>{
    console.log(`server running at port : ${port}`);
})