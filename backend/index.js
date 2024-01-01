const express = require('express');
const {createTodo,updateTodo} = require("./types");
const {todo} = require("./db")

const app = express();
const port = 3000;
app.use(express.json());

app.post("/todo",async function(req,res){
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if(!parsedPayload.success){
        req.status(411).json({
            msg: "wromg input"
        })
        return;
    }
    console.log(parsedPayload);
    await todo.create({
        title: parsedPayload.data.title,
        description: parsedPayload.data.description,
        completed: false
    })

    res.json({
        msg: "todo created"
    })

})

app.get("/todos",async function(req,res){
    const todos = await todo.find();
    res.json({
        todos
    });
})


app.put("/completed",async function(req,res){
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg: "wromg input"
        })
        return;
    }

    await todo.updateOne({
        _id: req.body.id
    },{
        completed: true
    })

    res.json({
        msg: "todo marked as completed"
    })
})

app.listen(port,function(){
    console.log(`server is listening on ${port}`);
})