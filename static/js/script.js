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
