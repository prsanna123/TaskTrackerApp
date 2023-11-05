const mongoose = require('mongoose');
const { Schema } = mongoose;
// Schema to store the details of the Task
const TasksSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true, 
    },
    date:{
        type: Date,
        required: true, 
    },
    Priority:{
        type: String,
        required: true
    },
    complete:{
        type:Boolean,
        default:false
    }
  });

  module.exports = mongoose.model('tasks', TasksSchema);