// Function to go back to the previous page
function goBack() {
    window.history.back();
  }
  
  // Function to load assigned tasks from local storage
  function loadAssignedTasks() {
    const storedTasks = localStorage.getItem('assignedTasks');
    if (storedTasks) {
      const assignedTasks = JSON.parse(storedTasks);
      displayTasks(assignedTasks);
    }
  }
  
  // Function to display the assigned tasks in the table
  function displayTasks(assignedTasks) {
    const tableBody = document.querySelector('#taskTable tbody');
    tableBody.innerHTML = '';
  
    for (let i = 0; i < assignedTasks.length; i++) {
      const task = assignedTasks[i];
  
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${task.id}</td>
        <td>${task.name}</td>
        <td>${task.description}</td>
        <td>${task.assignedTo}
        <td>${task.startDate}</td>
        <td>${task.endDate}</td>
        <td>${task.status}</td>
        <td>${task.hourlyRate}</td>
        <td>${task.totalHoursTaken}</td>
        <td>${task.totalCost}</td>
      `;
  
      tableBody.appendChild(row);
    }
  }
  
  document.getElementById('logoutButton').addEventListener('click', function (){
    // Redirect to the task list page
    window.location.href = 'index.html';
  });
  
  // Load assigned tasks from local storage when the page is loaded
  window.addEventListener('load', function () {
    loadAssignedTasks();
  });
  