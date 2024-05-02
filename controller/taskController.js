const { response } = require('express');
const Task = require('../model/task');
async function addTask(req, res) {
    const userId = req.session.userId;
    const username = req.session.username;
    console.log(userId,username);
    try {
        const { task, description, category, date, time } = req.body;
        const createTask = await Task.create({task, description, category, date, time,userId});
        if (createTask) {
            res.redirect('/user/dashboard');

        } else {
            res.status(404).json({ success: false, message: 'Task not added' });
        }
        console.log(req.body);
    }
    catch (err) {
        // console.log(userId);
        res.status(500).send("Task failed to be created");
    }
}

async function markascomplete(req, res) {
    const taskId = req.params.id;
    taskData = {
        completed:true
    }
    try {
        // Find the user by ID and update their data
        const updatedTask = await Task.findByIdAndUpdate(taskId, taskData, { new: true });

        if (updatedTask) {
            res.json({ success: true, message: 'Task updated successfully', data: updatedTask });
        } else {
            res.status(404).json({ success: false, message: 'Task not found' });
        }
    } catch (error) {
        console.error('Error marking task:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

async function deleteTask(req, res) {
    const taskId = req.params.id;
    console.log(taskId+" deleted");
    try {
        // Find the user by ID and delete them
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (deletedTask) {
            res.json({ success: true, message: 'Task deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Task not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

module.exports = {
    addTask,
    markascomplete,
    deleteTask
}