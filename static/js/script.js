// Expense Tracker Logic
const expenses = [];
let totalExpense = 0;

function addExpense(description, amount) {
    const expense = { id: expenses.length + 1, description, amount };
    expenses.push(expense);
    totalExpense += amount;
}
