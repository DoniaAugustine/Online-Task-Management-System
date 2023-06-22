
// Define the assignedTasks array
let assignedTasks = [];

// Function to load assigned tasks from local storage
function loadAssignedTasks() {
  let storedTasks = localStorage.getItem('assignedTasks');
  if (storedTasks) {
    assignedTasks = JSON.parse(storedTasks);
  }
}




// Function to display the assigned tasks in the table
function displayTasks() {
  let tableBody = document.querySelector('#taskTable tbody');
  tableBody.innerHTML = '';

  const loggedInUser = localStorage.getItem('loggedInUser');

  let filteredTasks = assignedTasks.filter(task => task.assignedTo === loggedInUser);

  for (let i = 0; i < filteredTasks.length; i++) {
    let task = filteredTasks[i];

    let row = document.createElement('tr');
    row.innerHTML = `
      <td>${task.id}</td>
      <td>${task.name}</td>
      <td>${task.description}</td>
      <td>${task.assignedTo}</td>
      <td>${task.startDate}</td>
      <td>${task.endDate}</td>
      <td>${task.hourlyRate}</td>
      <td>
        <select onchange="handleTaskStatusChange(${task.id}, this.value)">
          <option value="Pending" ${task.status === 'Pending' ? 'selected' : ''}>Pending</option>
          <option value="InProgress" ${task.status === 'InProgress' ? 'selected' : ''}>In Progress</option>
          <option value="Completed" ${task.status === 'Completed' ? 'selected' : ''}>Completed</option>
        </select>
      </td>
      <td>${task.status === 'Completed' ? task.completionDateTime : '-'}</td>
      <td>${task.status === 'Completed' ? task.totalHoursTaken : '-'}</td>
      <td>${task.status === 'Completed' ? task.totalCost : '-'}</td>
    `;

    tableBody.appendChild(row);
  }
}


// Function to handle task status change
function handleTaskStatusChange(taskId, status) {
  const taskToUpdate = assignedTasks.find(task => task.id == taskId);
  if (taskToUpdate) {
    taskToUpdate.status = status;
    taskToUpdate.completionDateTime = new Date().toLocaleString();
    
    var date1 = Date.parse(taskToUpdate.startDate);
    var date2 = Date.parse(taskToUpdate.completionDateTime);
    var diffTime = date2 - date1;
    const totalHoursTaken1 = Math.abs(Math.round(diffTime / (1000 * 60 * 60 * 24))); 
    const totalHoursTaken = totalHoursTaken1*8;
    const totalCost = taskToUpdate.totalHoursTaken * taskToUpdate.hourlyRate;
    taskToUpdate.totalHoursTaken = totalHoursTaken;
    taskToUpdate.totalCost = totalCost;
    saveAssignedTasks();
    displayTasks();
    sendStatusToAdmin(taskId, status,totalHoursTaken);
  }
}

// Function to save assigned tasks to local storage
function saveAssignedTasks() {
  localStorage.setItem('assignedTasks', JSON.stringify(assignedTasks));
}

// Function to send task status update to the admin
function sendStatusToAdmin(taskId, status, totalHoursTaken) {
  const taskStatusUpdate = {
    taskId: taskId,
    status: status,
    totalHoursTaken: totalHoursTaken

  };
  localStorage.setItem('taskStatusUpdate', JSON.stringify(taskStatusUpdate));
}


document.getElementById('logoutButton').addEventListener('click', function (){
  // Redirect to the task list page
  window.location.href = 'index.html';
});


// Load assigned tasks from local storage when the page is loaded
window.addEventListener('load', function () {
  loadAssignedTasks();
  displayTasks();
});
