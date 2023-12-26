const addTaskBtn = document.querySelector('.add-task-btn');
const taskInput = document.querySelector('.task-input');
let currentTaskListContainer = document.querySelector('.current-task-list-container')
const invoiceTotalEl = document.querySelector('.invoice-total');
const removeContainer = document.querySelector('.current-task-list-container');



let totalAmountArray = []
let invoiceTotal = 0

addTaskBtn.addEventListener('click', function() {
  let chosenDollar = logChosenDollar();
  let taskInputValue = getTextInput()
  if (getTextInput().trim() === '') {
    alert(`Please enter a task`);
    return
  }
  currentTaskListContainer.innerHTML += `
        <div class="task-total-container">
          <p class="task">${taskInputValue} <span class="remove">Remove</span></p>
          <p class="total">${chosenDollar}</p>
        </div>
    `
    totalAmountArray.push(chosenDollar);
    updateInvoiceTotal()
    taskInput.value = '';
})

function logChosenDollar() {
  return document.getElementById('prices').value
}

function getTextInput() {
  return document.getElementById('task-input').value
}

function updateInvoiceTotal() {
invoiceTotal = 0;
for (let i = 0; i < totalAmountArray.length; i++) {
  let numericValue = parseFloat(totalAmountArray[i].replace('$', ''))
  if (!isNaN(numericValue)) {
  invoiceTotal += numericValue
  }
}
invoiceTotalEl.textContent = `$${invoiceTotal.toFixed(2)}`
}

// Code to find which remove button is clicked //

removeContainer.addEventListener('click', function(e) {
  if (e.target.classList.contains('remove')) {
    const taskContainer = e.target.closest('.task-total-container');
    const removedDollarAmount = taskContainer.querySelector('.total').innerText;
    taskContainer.remove();
    const indexToRemove = totalAmountArray.indexOf(removedDollarAmount);
    if (indexToRemove !== -1) {
      totalAmountArray.splice(indexToRemove, 1);
    }
  }
  updateInvoiceTotal()
})