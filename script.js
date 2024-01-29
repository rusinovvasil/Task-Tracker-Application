const tasks = [
  {
    name: "Complete project",
    description: "Finish the project by the deadline",
    dueDate: "2022-03-01",
    priority: "High",
    completed: false,
  },
  {
    name: "Read a book",
    description: "Read the latest bestseller",
    dueDate: "2022-03-15",
    priority: "Medium",
    completed: false,
  },
  {
    name: "Exercise",
    description: "Go for a run or hit the gym",
    dueDate: "2022-03-10",
    priority: "Low",
    completed: true,
  },
];

let editingIndex = -1;

function renderTasks() {
  const taskListElement = document.getElementById("taskList");
  taskListElement.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        <div>
          <strong>${task.name}</strong>
          <br>
          Description: ${task.description} | Due Date: ${
      task.dueDate
    } | Priority: ${task.priority} | Completed: 
          <input type="checkbox" id="completionCheckbox${index}" ${
      task.completed ? "checked" : ""
    }>
          <button type="button" onclick="editTask(${index})">Edit</button>
        </div>
      `;

    const completionCheckbox = taskItem.querySelector(
      `#completionCheckbox${index}`
    );
    completionCheckbox.addEventListener("change", () => {
      tasks[index].completed = completionCheckbox.checked;
      renderTasks();
    });

    taskListElement.appendChild(taskItem);
  });
}

function handleScroll() {
  const scrollContainer = document.getElementById("scrollContainer");
  scrollContainer.addEventListener("scroll", handleScroll);
  const taskList = document.getElementById("taskList");

  // Calculate the scroll position percentage
  const scrollPercentage =
    (scrollContainer.scrollTop /
      (taskList.clientHeight - scrollContainer.clientHeight)) *
    100;

  // Move tasks vertically based on scroll percentage
  taskList.style.transform = `translateY(-${scrollPercentage}%)`;
}

// Add scroll event listener to the container
const scrollContainer = document.getElementById("scrollContainer");
scrollContainer.addEventListener("scroll", handleScroll);

function addOrEditTask() {
  const taskForm = document.getElementById("taskForm");
  const { value: taskName } = document.getElementById("taskName");
  const { value: taskDescription } = document.getElementById("taskDescription");
  const { value: dueDate } = document.getElementById("dueDate");
  const { value: priority } = document.getElementById("priority");

  if (editingIndex === -1) {
    tasks.push({
      name: taskName,
      description: taskDescription,
      dueDate,
      priority,
      completed: false,
    });
  } else {
    tasks[editingIndex] = {
      name: taskName,
      description: taskDescription,
      dueDate,
      priority,
    };
    editingIndex = -1;
  }

  taskForm.reset();
  renderTasks();
  toggleButtons("addAction");
}

function editTask(index) {
  editingIndex = index;
  const task = tasks[index];

  document.getElementById("taskName").value = task.name;
  document.getElementById("taskDescription").value = task.description || "";
  document.getElementById("dueDate").value = task.dueDate;
  document.getElementById("priority").value = task.priority;

  toggleButtons("editAction");
}

function cancelEdit() {
  editingIndex = -1;
  document.getElementById("taskForm").reset();
  toggleButtons("addAction");
}

function deleteSelectedTasks() {
  const selectedTasksIndexes = Array.from(
    document.querySelectorAll("input[type=checkbox]:checked")
  )
    .map((checkbox) =>
      parseInt(checkbox.id.replace("completionCheckbox", ""), 10)
    )
    .sort((a, b) => b - a);

  selectedTasksIndexes.forEach((index) => tasks.splice(index, 1));
  renderTasks();
}

function toggleButtons(action) {
  document.getElementById("addAction").style.display =
    action === "addAction" ? "inline" : "none";
  document.getElementById("editAction").style.display =
    action === "editAction" ? "inline" : "none";
  document.getElementById("cancelAction").style.display =
    action === "cancelAction" ? "inline" : "none";
}

document.getElementById("addAction").addEventListener("click", () => {
  addOrEditTask();
});

document.getElementById("editAction").addEventListener("click", () => {
  addOrEditTask();
});

document.getElementById("cancelAction").addEventListener("click", () => {
  document.getElementById("taskForm").reset();
  toggleButtons("addAction");
  editingIndex = -1;
});

document
  .getElementById("deleteSelectedButton")
  .addEventListener("click", () => {
    deleteSelectedTasks();
  });

renderTasks();
