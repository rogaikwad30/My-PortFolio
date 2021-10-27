const commentsModel = require('../models/comments')
const adminsModel = require('../models/admin')

module.exports.addComment = async (req,res)=>{
    try {
        const comment = await commentsModel.create(req.body);
        res.status(200).json(comment)
    } catch (error) {
        res.status(401).json(error)
    }
}

module.exports.addAdmin = async (req,res)=>{
    try {
        const admin = await adminsModel.create(req.body);
        res.status(200).json(admin)
    } catch (error) {
        res.status(401).json(error)
    }
}

module.exports.getComments = async (req,res)=>{
    try {
        const comments = await commentsModel.find({});
        res.status(200).json(comments)
    } catch (error) {
        res.status(401).json(error)
    }
}