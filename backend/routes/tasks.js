const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Task = require('../models/Task');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Tasks using: GET "/api/tasks/getuser". Login required
router.get('/fetchalltasks', fetchuser, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.json(tasks)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Task using: POST "/api/tasks/addtask". Login required
router.post('/addtask', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
   
    ], async (req, res) => {
        const errors = validationResult(req);
        try {
            
            const { title, description,date,Priority } = req.body;

            // If there are errors, return Bad request and the errors
            
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const task = new Task({
                title, description,date,Priority, user: req.user.id
            })
            const savedTask = await task.save()

            res.json(savedTask)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

// ROUTE 3: Update an existing Task using: PUT "/api/tasks/updatetask". Login required
router.put('/updatetask/:id', fetchuser, async (req, res) => {
    
    const { title, description } = req.body;
    
    try {
        // Create a newTask object
        const newTask = {};
        if (title) { newTask.title = title };
        if (description) { newTask.description = description };
       
        // Find the task to be updated and update it
        console.log(req.params.id)
        let task = await Task.findById(req.params.id);
        if (!task) { return res.status(404).send("Not Found") }

        if (task.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        task = await Task.findByIdAndUpdate(req.params.id, { $set: newTask }, { new: true })
        res.json({ task });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
//Route 4:Mark the task as completed
router.put('/markdone/:id', fetchuser, async (req, res) => {
    const { title, description} = req.body;
    try {
        let task = await Task.findById(req.params.id);
        if (!task) { return res.status(404).send("Not Found") }

        if (task.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        task = await Task.findByIdAndUpdate(req.params.id, { $set: {complete:"true"} }, { new: true })
        res.json({ task });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 5: Delete an existing Task using: DELETE "/api/tasks/deletetask". Login required
router.delete('/deletetask/:id', fetchuser, async (req, res) => {
    try {
        // Find the task to be delete and delete it
        let task = await Task.findById(req.params.id);
        if (!task) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Task
        if (task.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        task = await Task.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Task has been deleted", task: task });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router