document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Login System Logic ---
    const loginForm = document.getElementById('login-form');
    const loginSection = document.getElementById('login-section');
    const taskSection = document.getElementById('task-section');
    const loginError = document.getElementById('login-error');
    const logoutBtn = document.getElementById('logout-btn');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;

        if (user === 'admin' && pass === '1234') {
            loginSection.style.display = 'none';
            taskSection.style.display = 'block';
            loginError.style.display = 'none';
        } else {
            loginError.style.display = 'block';
        }
    });

    logoutBtn.addEventListener('click', () => {
        loginSection.style.display = 'block';
        taskSection.style.display = 'none';
        loginForm.reset();
        resetFormState(); // Also reset the task form
    });

    // --- 2. Current Date and Time Display ---
    function updateDateTime() {
        const now = new Date();
        const datetimeDisplay = document.getElementById('datetime-display');
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        datetimeDisplay.textContent = "Current Date and Time: " + now.toLocaleDateString('en-AU', options);
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // --- 3. Task Management Logic (CRUD) ---
    const taskForm = document.getElementById('task-form');
    const taskListBody = document.getElementById('task-list-body');
    const formError = document.getElementById('form-error');
    
    // Form UI Elements
    const taskIdInput = document.getElementById('task-id');
    const formTitle = document.getElementById('form-title');
    const submitBtn = document.getElementById('submit-btn');
    const cancelBtn = document.getElementById('cancel-btn');

    let tasks = []; 

    // Function to display tasks in the table
    function renderTasks() {
        taskListBody.innerHTML = ''; 
        
        if (tasks.length === 0) {
            taskListBody.innerHTML = '<tr><td colspan="4" style="text-align:center;">No tasks found. Add a new task above!</td></tr>';
            return;
        }

        tasks.forEach((task, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <strong>${task.title}</strong><br>
                    <small>${task.desc}</small>
                </td>
                <td>${task.courseCode}<br><small>${task.courseName}</small></td>
                <td>${task.dueDate}</td>
                <td>
                    <button class="btn" onclick="editTask(${index})" style="padding: 5px 10px; font-size: 0.8rem; background-color: #f39c12;">Edit</button>
                    <button class="btn btn-cancel" onclick="deleteTask(${index})" style="padding: 5px 10px; font-size: 0.8rem;">Delete</button>
                </td>
            `;
            taskListBody.appendChild(tr);
        });
    }

    // Handle Form Submission (Add OR Update Task)
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault(); 

        // Get values
        const title = document.getElementById('task-title').value.trim();
        const courseCode = document.getElementById('course-code').value.trim();
        const courseName = document.getElementById('course-name').value.trim();
        const dueDate = document.getElementById('due-date').value;
        const desc = document.getElementById('task-desc').value.trim();
        const notes = document.getElementById('task-notes').value.trim();

        // Data Validation
        if (!title || !courseCode || !courseName || !dueDate || !desc) {
            formError.textContent = "Please fill in all required fields.";
            formError.style.display = 'block';
            return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        const selectedDate = new Date(dueDate);

        if (selectedDate < today) {
            formError.textContent = "Due date cannot be in the past.";
            formError.style.display = 'block';
            return;
        }

        formError.style.display = 'none';

        const newTask = {
            title: title,
            courseCode: courseCode,
            courseName: courseName,
            dueDate: dueDate,
            desc: desc,
            notes: notes
        };

        const editingIndex = taskIdInput.value;

        if (editingIndex === "") {
            // Create new task
            tasks.push(newTask);
        } else {
            // Update existing task
            tasks[editingIndex] = newTask;
            resetFormState();
        }

        renderTasks();
        taskForm.reset();
    });

    // Cancel Edit Button Logic
    cancelBtn.addEventListener('click', resetFormState);

    function resetFormState() {
        taskForm.reset();
        taskIdInput.value = "";
        formTitle.textContent = "Create a New Task";
        submitBtn.textContent = "Add Task";
        cancelBtn.style.display = "none";
        formError.style.display = 'none';
    }

    // Global function for Editing Task
    window.editTask = function(index) {
        const task = tasks[index];
        
        document.getElementById('task-title').value = task.title;
        document.getElementById('course-code').value = task.courseCode;
        document.getElementById('course-name').value = task.courseName;
        document.getElementById('due-date').value = task.dueDate;
        document.getElementById('task-desc').value = task.desc;
        document.getElementById('task-notes').value = task.notes;

        taskIdInput.value = index; 
        
        formTitle.textContent = "Edit Task";
        submitBtn.textContent = "Update Task";
        cancelBtn.style.display = "inline-block";
        
        // Scroll to top so user can see the form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Global function for Deleting Task with Confirmation
    window.deleteTask = function(index) {
        // Required by assignment: confirmation dialog box
        const confirmDelete = confirm("Are you sure you want to delete this task?");
        
        if (confirmDelete) {
            tasks.splice(index, 1);
            renderTasks();
            
            // If user deletes the task they are currently editing, reset the form
            if (taskIdInput.value === index.toString()) {
                resetFormState();
            }
        }
    };

    renderTasks();
});