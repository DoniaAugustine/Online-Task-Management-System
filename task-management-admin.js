// Define the assignedTasks array
let assignedTasks = [];

function displayTasks() {
  const tableBody = document.querySelector('#assignedTasksTable tbody');
  tableBody.innerHTML = '';

  assignedTasks.forEach((task) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${task.id}</td>
      <td>${task.name}</td>
      <td>${task.assignedTo}</td>
      <td>${task.startDate}</td>
      <td>${task.endDate}</td>
      <td>${task.hourlyRate}</td>
      <td>${task.status}</td>
      <td>${task.completionDateTime}</td>
      <td>${task.totalHoursTaken}</td>
      <td>${task.totalCost}</td>
    `;
    tableBody.appendChild(row);
  });
}


// Function to store the assigned tasks in local storage
function saveAssignedTasks() {
  localStorage.setItem('assignedTasks', JSON.stringify(assignedTasks));
}

// Function to load assigned tasks from local storage
function loadAssignedTasks() {
  const savedTasks = localStorage.getItem('assignedTasks');
  if (savedTasks) {
    assignedTasks = JSON.parse(savedTasks);
    displayTasks();
  }
}

// Function to add a new task
function handleCreateTaskForm(event) {
  event.preventDefault();

  // Get form values
  const taskId = document.querySelector('#taskId').value;
  const taskName = document.querySelector('#taskName').value;
  const taskDescription = document.querySelector('#taskDescription').value;
  const assignedTo = document.querySelector('#assignedTo').value;
  const startDate = document.querySelector('#taskStartDate').value;
  const endDate = document.querySelector('#taskEndDate').value;
  const hourlyRate = document.querySelector('#taskHourlyRate').value;

  // Create new task object
  const newTask = {
    id: taskId,
    name: taskName,
    description: taskDescription,
    assignedTo: assignedTo,
    startDate: startDate,
    endDate: endDate,
    hourlyRate: hourlyRate,
    status: 'Pending',
    completionDateTime: '-',
    totalHoursTaken: '-',
    totalCost: '-'
  };

  // Add the task to the assignedTasks array
  assignedTasks.push(newTask);

  // Clear the form fields
  // document.getElementById('taskId').value = '';
  // document.getElementById('taskName').value = '';
  // document.getElementById('taskDescription').value = '';
  // document.getElementById('assignedTo').value = '';
  // document.getElementById('taskStartDate').value = '';
  // document.getElementById('taskEndDate').value = '';
  // document.getElementById('taskHourlyRate').value = '';

  // Store the assigned tasks in local storage
  saveAssignedTasks();
  //displayTasks();

  // Display a success alert
  alert('Task created successfully.');
  document.getElementById('taskForm').reset();

  // Redirect to the task list page
  window.location.href = 'task-list.html';
}

function logout() {
  window.location.href = 'index.html';
}

// Load assigned tasks from local storage when the page is loaded
window.addEventListener('load', function () {
  loadAssignedTasks();
  displayTasks();
});

// Attach event listener to the form submit event
document.querySelector('#taskForm').addEventListener('submit', handleCreateTaskForm);
//document.getElementById('logoutButton').addEventListener('submit', logout);
// Attach event listener to the logout button
document.getElementById('logoutButton').addEventListener('click', function (){
  // Redirect to the task list page
  window.location.href = 'index.html';
});


// Attach event listener to the "View Tasks" button click event
document.getElementById('viewTasks').addEventListener('click', function () {
  // Redirect to the task list page
  window.location.href = 'task-list.html';
});

