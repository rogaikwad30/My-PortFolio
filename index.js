const express = require("express")
const app = express()
const bodyParser = require('body-parser')
app.set('view engine', 'html')
app.set('views',"html")
app.use(express.static("public")) 
app.use(bodyParser.urlencoded({ extended: false }))
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
    res.sendFile( __dirname + "/html/dashboard.html")
})

app.get("/home", (req,res)=>{
    res.sendFile( __dirname + "/html/dashboard.html")
    let log = new Log();
    log.url = req.url;
    log.response = res.statusCode;
    console.log(log)
})

app.get("/about" , (req,res)=>{
    res.sendFile( __dirname + "/html/about.html")
    let log = new Log();
    log.url = req.url;
    log.response = res.statusCode;
    console.log(log)
})

app.post("/contact", (req,res)=>{
    let log = new Log();
    log.url = req.url;
    log.response = res.statusCode;
    log.data = req.body;
    console.log(log)
    res.send(req.body)
})

const port = 3000;
app.listen(port,()=>{
    console.log(`server running at port : ${port}`);
})