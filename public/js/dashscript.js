document.getElementById('showFormBtn').addEventListener('click', function () {
    var formContainer = document.getElementById('taskFormContainer');
    if (formContainer.style.display === 'none') {
        formContainer.style.display = 'grid';
        document.getElementById('showFormBtn').style.display = 'none';
    } else {
        formContainer.style.display = 'none';
    }
});
document.getElementById('cancelBtn').addEventListener('click', function () {
    var formContainer = document.getElementById('taskFormContainer');
    formContainer.style.display = 'none';

    document.getElementById('showFormBtn').style.display = 'block';
});


document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll(".check").forEach(function (checkImg) {
        checkImg.addEventListener('click', function () {
            const taskId = this.dataset.taskId;

            const confirmed = confirm('Are you sure you want to mark this task as complete?');
            if (!confirmed) {
                return; // Cancel the operation if not confirmed
            }

            fetch(`/task/markascomplete/${taskId}`, {
                method: 'PATCH'
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Error marking task as complete:', error);
                });
        });
    });

    document.querySelectorAll('.delete').forEach(function (deleteImg) {
        deleteImg.addEventListener('click', function () {
            const taskId = this.dataset.taskId;

            const confirmed = confirm('Are you sure you want to delete this task?');
            if (!confirmed) {
                return; // Cancel the operation if not confirmed
            }

            fetch(`/task/deleteTask/${taskId}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Error deleting task:', error);
                });
        });
    });

        document.getElementById("account").addEventListener("click", function () {
            document.getElementById("profile").style.display = "block";
            document.getElementById("account").style.display = "none";
            document.getElementsByClassName('container')[0].style.width = "calc(100% - 200px)";

        })
        document.getElementById("cancel").addEventListener("click", function () {
            document.getElementById("profile").style.display = "none";
            document.getElementById("account").style.display = "block";
            document.getElementsByClassName('container')[0].style.width = "100%";
        })

        // Add event listeners to the "Pending Tasks" and "Completed Tasks" buttons
        document.querySelector("#pendingTasks").addEventListener("click", function () {
            filterTasks(false); // Filter pending tasks
        });
    
        document.querySelector("#completedTasks").addEventListener("click", function () {
            filterTasks(true); // Filter completed tasks
        });

        document.querySelector("#allTasks").addEventListener("click", function () {
            showAllTasks(); // Show all tasks
        });
    
    function filterTasks(completed) {
        // Get all task elements
        var tasks = document.querySelectorAll(".details");
    
        // Loop through each task element
        tasks.forEach(function (task) {
            // Check if the task is completed or pending based on the class
            var isCompleted = task.classList.contains("completed");
    
            // If the task matches the completion status we are looking for, display it; otherwise, hide it
            if (isCompleted === completed) {
                task.style.display = "block"; // Show the task
            } else {
                task.style.display = "none"; // Hide the task
            }
        });
    }
    function showAllTasks() {
        // Get all task elements
        var tasks = document.querySelectorAll(".details");
    
        // Loop through each task element and display it
        tasks.forEach(function (task) {
            task.style.display = "block"; // Show the task
        });
    }
});
