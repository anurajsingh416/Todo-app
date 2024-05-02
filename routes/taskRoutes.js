const taskController = require('../controller/taskController');
const { isAuthenticated } = require('../middleware/userAuth')
const express = require('express');

const router = express.Router();
router.post('/addtask',isAuthenticated,taskController.addTask);
router.patch('/markascomplete/:id',isAuthenticated,taskController.markascomplete);
router.delete('/deleteTask/:id',isAuthenticated,taskController.deleteTask);

module.exports = router;
