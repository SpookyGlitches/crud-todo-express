const Task = require("../models/task");

exports.index = async (req, res) => {
    try{
        let tasks = await Task.findAll({where:{
            user_id: req.session.userId
        }})
        res.render("home", {
            tasks,
            userId: req.session.userId
        })
    }catch(err){
        res.send(err)
    }
};

exports.create = async (req, res) => {
    try{
        let task = await Task.create({
            user_id: req.session.userId,
            title: req.body.title,
            is_completed: 0
        })
        if(!task) throw "Unable to create task."
        res.redirect('back')
    }catch(err){
        res.send(err)
    }
};

exports.complete = async (req, res) => {
    req.body.mark = req.body.mark ? true : false;
    try{
        await Task.update({is_completed: req.body.mark},{
            where: {
                user_id: req.session.userId,
                id: req.params.taskId
            }
        })
        res.redirect('back')
    }catch(err){
        res.send(err)
    }
};

exports.edit = async (req, res) => {
    try{
        await Task.update({
            title: req.body.title,
        }, {
            where:{
                user_id: req.session.userId,
                id: req.params.taskId
            }
        })
        res.redirect('back')
    }catch(err){
        res.send(err)
    }
};

exports.deleteT = async (req, res) => {
    try{
        await Task.destroy({
            where:{
                id: req.params.taskId,
                user_id: req.session.userId
            }
        })
        res.redirect('back')
    }catch(err){
        res.send(err)
    }

};