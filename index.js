const amountInput = document.getElementById('amount-input');
const descriptionInput = document.getElementById('description-input');
const categorySelect = document.getElementById('category-select');
const addExpenseButton = document.getElementById('add-expense');
const expenseList = document.getElementById('expense-list');

let expenses = []; // Store all expenses
let editingIndex = -1; // Used to track the editing state

function renderExpenses() {
    expenseList.innerHTML = ''; // Clear the existing list
    expenses.forEach((expense, index) => {
        const expenseItem = document.createElement('ul');
        expenseItem.className = 'expense-item';

        // Present the details in a row with each piece in a separate column
        expenseItem.innerHTML = `
            <ul class="expense-content">
                <li class="expense-column">${expense.amount}</li>
                <li class="expense-column">${expense.category}</li>
                <li class="expense-column">${expense.description}</li>
                
                    <button class="delete-btn" data-index="${index}">Delete</button>
                    <button class="edit-btn" data-index="${index}">Edit</button>

            </ul>
        `;

        expenseList.appendChild(expenseItem);
    });
}


// Add new expense or update an existing one
addExpenseButton.addEventListener('click', () => {
    const amount = amountInput.value;
    const description = descriptionInput.value;
    const category = categorySelect.value;

    if (amount && description && category) {
        const newExpense = { amount, description, category };

        if (editingIndex === -1) {
            // Add new expense
            expenses.push(newExpense);
        } else {
            // Edit existing expense
            expenses[editingIndex] = newExpense;
            editingIndex = -1; // Reset after editing
        }

        // Clear input fields
        amountInput.value = '';
        descriptionInput.value = '';
        categorySelect.value = 'Food & Beverage';

        renderExpenses(); // Re-render the updated list
    } else {
        alert('Please fill in all the details');
    }
});

// Handle delete and edit functionality
expenseList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        // Delete the expense
        const index = event.target.getAttribute('data-index');
        expenses.splice(index, 1); // Remove the expense at the given index
        renderExpenses(); // Re-render the updated list
    }

    if (event.target.classList.contains('edit-btn')) {
        // Edit the expense
        const index = event.target.getAttribute('data-index');
        const expense = expenses[index];

        // Pre-fill the inputs with the existing values
        amountInput.value = expense.amount;
        descriptionInput.value = expense.description;
        categorySelect.value = expense.category;

        // Set editing index
        editingIndex = index;
    }
});
