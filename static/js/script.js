// Expense Tracker Logic
const expenses = [];
let totalExpense = 0;

function addExpense(description, amount) {
    const expense = { id: expenses.length + 1, description, amount };
    expenses.push(expense);
    totalExpense += amount;
}

function editExpense(id, updatedData) {
    const expense = expenses.find((e) => e.id === id);
    if (expense) {
        for (const key in updatedData) {
            if (expense.hasOwnProperty(key)) {
                totalExpense -= expense[key];
                expense[key] = updatedData[key];
                totalExpense += updatedData[key];
            }
        }
        return true; // Expense was edited successfully
    }
    return false; // Expense with the given id was not found
}

function deleteExpense(id) {
    const index = expenses.findIndex((e) => e.id === id);
    if (index !== -1) {
        totalExpense -= expenses[index].amount;
        expenses.splice(index, 1);
        return true; // Expense was deleted successfully
    }
    return false; // Expense with the given id was not found
}

// Event handler for form submission
document.querySelector('#expenseForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const description = document.querySelector('#description').value;
    const amount = parseFloat(document.querySelector('#amount').value);
    addExpense(description, amount);
    displayExpenses();
    document.querySelector('#description').value = '';
    document.querySelector('#amount').value = '';
});

// Display expenses in the DOM
function displayExpenses() {
    const expenseList = document.querySelector('#expenseList');
    expenseList.innerHTML = '';
    expenses.forEach((expense) => {
        const expenseElement = document.createElement('div');
        expenseElement.innerHTML = `
                    <p>${expense.description} - $${expense.amount}</p>
                    <button onclick="editExpenseForm(${expense.id})">Edit</button>
                    <button onclick="deleteExpense(${expense.id})">Delete</button>
                `;
        expenseList.appendChild(expenseElement);
    });
    // Update the total expenses display
    document.querySelector('#totalExpenses').textContent = totalExpense.toFixed(2);
}

// Function to show an edit expense form
function editExpenseForm(id) {
    const expense = expenses.find((e) => e.id === id);
    if (expense) {
        const updatedDescription = prompt('Enter the new description:', expense.description);
        const updatedAmount = parseFloat(prompt('Enter the new amount:', expense.amount));
        const updatedData = {
            description: updatedDescription,
            amount: updatedAmount,
        };
        editExpense(id, updatedData);
        displayExpenses();
    } else {
        alert('Expense not found.');
    }
}

// Initial display of expenses
displayExpenses();