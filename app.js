"use strict";

// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editId = "";

// ****** EVENT LISTENERS **********
// submit form
form.addEventListener("submit", addItems);
// clear items
clearBtn.addEventListener("click", clearItems);

// ****** FUNCTIONS **********
// App logic
function addItems(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();

  if (value && !editFlag) {
    // create element
    const element = document.createElement("article");
    element.classList.add("grocery-item");

    // set attribute
    element.setAttribute("data-id", id);

    // set inner html
    element.innerHTML = `
      <p class="title">${value}</p>
      <div class="btn-container">
        <button type="button" class="edit-btn">
          <i class="fas fa-edit"></i>
        </button>
        <button type="button" class="delete-btn">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;

    // append the element to list
    list.appendChild(element);
    displayAlert("item added to the list", "success");
    container.classList.add("show-container");

    // edit and delet button functionality
    const editBtn = element.querySelector(".edit-btn");
    const deleteBtn = element.querySelector(".delete-btn");

    editBtn.addEventListener("click", editItem);
    deleteBtn.addEventListener("click", deleteItem);

    // add to loacl storage
    addToLocalStorage(id, value);
    // set back to default
    setBackToDefault();
  } else if (value && editFlag) {
    console.log("edit item");
  } else {
    displayAlert("enter a value", "danger");
  }
}

// edit item function
function editItem() {
  console.log("item edited");
}
// delete function
function deleteItem(e) {
  const item = e.currentTarget.parentElement.parentElement;
  const id = item.dataset.id;
  list.removeChild(item);

  if (list.children.length === 0) {
    clearItems();
    return;
  }

  displayAlert("item deleted", "danger");
  setBackToDefault();

  // remove from local storeage
  // removeFromLocalStorage(id);
}

// Alert function
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

// Clear items
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");

  if (items.length > 0) {
    items.forEach((item) => {
      list.removeChild(item);
    });
  }

  container.classList.remove("show-container");
  displayAlert("Cleared items", "danger");
  setBackToDefault();
  // localStorage.removeItem("list");
}

// Set back to default function
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editId = "";
  submitBtn.textContent = "Submit";
}

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
  // console.log("added to local storage");
}

function removeFromLocalStorage(id) {
  // console.log(id);
}

// ****** SETUP ITEMS **********
