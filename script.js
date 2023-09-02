const checklist = document.getElementById("checklist");
const addItemButton = document.getElementById("addItem");
const newItemInput = document.getElementById("newItem");
const progressBar = document.getElementById("progress-fill");
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Function to create a new item
function createNewItem(itemName) {
  const item = document.createElement("div");
  item.classList.add("item");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const label = document.createElement("label");
  label.textContent = itemName;
  label.setAttribute("for", itemName);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>'; // Use the trash icon

  item.appendChild(checkbox);
  item.appendChild(label);
  item.appendChild(deleteBtn);

  return item;
}

// Function to update the progress bar
function updateProgress() {
  const totalItems = checklist.querySelectorAll(".item").length;
  const completedItems = checklist.querySelectorAll(".item.completed").length;
  const completionPercentage = (completedItems / totalItems) * 100;

  progressBar.style.width = `${completionPercentage}%`;
}

// Event listeners
addItemButton.addEventListener("click", function () {
  const itemName = newItemInput.value.trim();
  if (itemName !== "") {
    const newItem = createNewItem(itemName);
    checklist.appendChild(newItem);
    newItemInput.value = "";
    updateProgress();
  }
});

checklist.addEventListener("change", function (event) {
  if (event.target.matches('input[type="checkbox"]')) {
    const item = event.target.parentElement;
    item.classList.toggle("completed", event.target.checked);
    updateProgress();
  }
});

checklist.addEventListener("click", function (event) {
  if (event.target.matches(".delete-btn")) {
    const item = event.target.parentElement;
    checklist.removeChild(item);
    updateProgress();
  }
});

themeToggle.addEventListener("change", function () {
  body.classList.toggle("dark-theme");
});

// Initial call to updateProgress to set the progress bar when the page loads
updateProgress();
