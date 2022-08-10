const express = require('express');
const router = express.Router();
const todos = require('../models/express-models/todos');
module.exports = router;


// write your routes here. Feel free to split into multiple files if you like.

router.post('/:name/tasks', async (req,res,next)=>{
    try{
        const body = await req.body
        const name = req.params.name
        const add = await todos.add(name,body)
        const taskList = await todos.list(name)
        if(taskList[0].content===''){
            return res.sendStatus(400)
        }
        return res.status(201).send(taskList[0])
    }
    catch (e){
        next(e)
    }
})

router.put('/:name/tasks/:index', async (req,res,next)=>{
    try{
        const name = req.params.name
        const idx = req.params.index
        const complete = await todos.complete(name,idx)
        return res.sendStatus(200)
        done()
    }
    catch(e){
        next(e)
    }
})

router.delete('/:name/tasks/:index', async (req, res, next)=>{
    try{
        const name = req.params.name
        const idx = req.params.index
        const remove = await todos.remove(name,idx)
        return res.sendStatus(204)
        done()
    }
    catch(e){
        next(e)
    }
})

router.get('/', async (req,res,next)=>{
    try{
        const people = await todos.listPeople() 
        return res.send(people)
    }
    catch (e){
        next(e)
    }
})

router.get('/:name/tasks', async(req,res,next)=>{
    try{
        let name = req.params.name
        const taskList = await todos.list(name)
        if(taskList===undefined){
        res.status(404)
        }
       res.send(taskList)
    }
    catch (e){
        next(e)
    }
})

