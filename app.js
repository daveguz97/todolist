// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListener();

//Load all event listeners
function loadEventListener() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);

  // Remove task event
  taskList.addEventListener('click', removeTask);

  // Clear task event
  clearBtn.addEventListener('click', clearTasks);

  // Filter task event
  filter.addEventListener('keyup', filterTasks);
}

//Get Task from local storage
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task) {
    // Create an li element
    const li = document.createElement('li');
    // Adds a class to the li
    li.className = 'collection-item';
    // Create a text Node and append it to the li
    li.appendChild(document.createTextNode(task));

    // Create new link element
    const link = document.createElement('a');
    // Add class to the link
    link.className = 'delete-item secondary-content';

    // Add icon html
    link.innerHTML = '<i class= "fa fa-remove"></i>';
    // Append the link to the li
    li.appendChild(link);

    // Append the li to the ul
    taskList.appendChild(li);
  });
}

// Add Tasks
function addTask(e) {
  // Make sure there's a value in the task
  if (taskInput.value === '') {
    alert('Add a task');
  }

  // Create an li element
  const li = document.createElement('li');
  // Adds a class to the li
  li.className = 'collection-item';
  // Create a text Node and append it to the li
  li.appendChild(document.createTextNode(taskInput.value));

  // Create new link element
  const link = document.createElement('a');
  // Add class to the link
  link.className = 'delete-item secondary-content';

  // Add icon html
  link.innerHTML = '<i class= "fa fa-remove"></i>';
  // Append the link to the li
  li.appendChild(link);

  // Append the li to the ul
  taskList.appendChild(li);

  // Store to Local Storage
  storeTasksInLocalStorage(taskInput.value);

  // Clears Input
  taskInput.value = '';
  // Prevents the default
  e.preventDefault();
}

// Store to Local Storage
function storeTasksInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Tasks
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure You Want To Delete This Task?')) {
      e.target.parentElement.parentElement.remove();
      // Remove from DOM
      removeTasksFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//Remove from DOM
function removeTasksFromLocalStorage(taskItem) {
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks(e) {
  // taskList.innerHTML = '';

  // A faster way
  if (confirm('Are You Sure You Want To Clear Your Tasks?')) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }

  // Clear from Local Storage
  clearTasksFromLocalStorage();
}

// Clear from Local Storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}
// Filter Tasks
function filterTasks(e) {
  //This variable gets the text you type in the filter input
  const text = e.target.value.toLowerCase();

  //This grabs all the list items
  document.querySelectorAll('.collection-item').forEach(function(task) {
    //This grabs the text content of the list and stores it in     item
    const item = task.firstChild.textContent;
    //If there is at least one letter typed in the filter
    if (item.toLowerCase().indexOf(text) != -1) {
      //Display the task as a block
      task.style.display = 'block';
    } else {
      //Else don't display the task
      task.style.display = 'none';
    }
  });
}
