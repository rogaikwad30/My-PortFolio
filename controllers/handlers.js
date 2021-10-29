const commentsModel = require('../models/comments')
const adminsModel = require('../models/admin')
const jwtService = require('../services/jwt')
const validator = require('./validation_errors')


class Log { 
    constructor(){
        this.url = "";
        this.data = "";
        this.response = "";
    }
}

module.exports.addComment = async (req,res)=>{
    try {
        const comment = await commentsModel.create(req.body);
        res.status(200).json(comment)
    } catch (error) {
        const errors = validator.checkErrors(error);
        res.status(400).json(errors)
    }
}

module.exports.addAdmin = async (req,res)=>{
    try {
        const admin = await adminsModel.create(req.body);
        res.status(200).json(admin)
    } catch (error) {
        const errors = validator.checkErrors(error);
        res.status(400).json(errors)
    }
}

module.exports.getComments = async (req,res)=>{
    try {
        const comments = await commentsModel.find({});
        res.status(200).json(comments)
    } catch (error) { 
        res.status(400).json(errors)
    }
}

module.exports.signup = async (req, res) => {
    let log = new Log(req.url , req.body)
    try {
        const user = await adminsModel.create(req.body);
        const response = {
            "status": user.email + " is registered successfully.", 
        } 
        log.response = response;
        res.status(201).json(response)
    } catch (error) {
        const errors = validator.checkErrors(error); 
        log.response = errors;
        res.status(409).json(errors);
    }
    console.log(log);
}

module.exports.signin = async (req, res) => {
    let log = new Log(req.url , { username : req.body.email , password : req.body.password})
    const {email,password} = req.body;
    try {
        const user = await adminsModel.login(email,password);
        console.log('Request received')
        const accessToken  = await jwtService.createToken(user._id);
        const refreshToken = await jwtService.createRefreshToken(user._id);
        res.cookie('accessToken',  accessToken , { httpOnly: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true });
        const response = {
            "status": user.email + " is logged in",
            "accessToken": accessToken,
            "refreshToken": refreshToken
        }
        log.response = response;
        res.redirect('/admin-dashboard')
    } catch (error) { 
        log.response = error.message;
        res.status(400).json({"error":error.message});
    }
    console.log(log);
}

module.exports.signout = async (req, res) => {
    let log = new Log(req.url , "signout request")
    res.cookie('accessToken',  '', { maxAge: 1 })
    res.cookie('refreshToken', '', { maxAge: 1 })
    const response = { "status": "session destroyed" }
    log.response = response;
    console.log(log);
    res.status(200).json(response)
}
