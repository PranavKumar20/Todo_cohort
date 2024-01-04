const mongoose = require('mongoose')

// mongoose.connect('mongodb+srv://pranav:Pranavqwert123@cluster0.mtaa3ai.mongodb.net/?retryWrites=true&w=majority')
mongoose.connect('mongodb://127.0.0.1:27017/todoch')

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: {
        type : Boolean,
        default: false
    }
})

const todo = mongoose.model('todos',todoSchema);

module.exports = {
    todo
}