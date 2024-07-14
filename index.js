document.addEventListener('DOMContentLoaded', function() {
    let expenses = [];
    let totalAmount = 0;

    const amountInput = document.getElementById('amount-input');
    const descriptionInput = document.getElementById('description-input');
    const categorySelect = document.getElementById('category-select');
    const addBtn = document.getElementById('add-btn');
    const expensesTableBody = document.getElementById('expense-table-body');
    const totalAmountCell = document.getElementById('total-amount');

    addBtn.addEventListener('click', function() {
        const amount = parseFloat(amountInput.value);
        const description = descriptionInput.value.trim();
        const category = categorySelect.value;

        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }
        if (description === '') {
            alert('Please enter a description');
            return;
        }
        if (category === '') {
            alert('Please select a category');
            return;
        }

        const expense = { amount, description, category };
        expenses.push(expense);

        totalAmount += amount;
        updateTotalAmount();

        addExpenseToTable(expense);

        clearForm();
    });

    function addExpenseToTable(expense) {
        const newRow = expensesTableBody.insertRow();

        const amountCell = newRow.insertCell();
        amountCell.textContent = expense.amount;

        const descriptionCell = newRow.insertCell();
        descriptionCell.textContent = expense.description;

        const categoryCell = newRow.insertCell();
        categoryCell.textContent = expense.category;

        const actionsCell = newRow.insertCell();
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function() {
            deleteExpense(newRow, expense);
        });

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', function() {
            editExpense(expense);
        });

        actionsCell.appendChild(deleteBtn);
        actionsCell.appendChild(editBtn);
    }

    function deleteExpense(row, expense) {
        const index = expenses.indexOf(expense);
        if (index !== -1) {
            expenses.splice(index, 1);
            totalAmount -= expense.amount;
            updateTotalAmount();
            row.remove();
        }
    }

    function editExpense(expense) {
        amountInput.value = expense.amount;
        descriptionInput.value = expense.description;
        categorySelect.value = expense.category;

        addBtn.disabled = true;

        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'Save';
        saveBtn.classList.add('save-btn');
        saveBtn.addEventListener('click', function() {
            saveExpense(expense);
        });

        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.classList.add('cancel-btn');
        cancelBtn.addEventListener('click', function() {
            cancelEdit();
        });

        addBtn.parentNode.appendChild(saveBtn);
        addBtn.parentNode.appendChild(cancelBtn);
    }

    function saveExpense(expense) {
        const newAmount = parseFloat(amountInput.value);
        const newDescription = descriptionInput.value.trim();
        const newCategory = categorySelect.value;

        if (isNaN(newAmount) || newAmount <= 0) {
            alert('Please enter a valid amount');
            return;
        }
        if (newDescription === '') {
            alert('Please enter a description');
            return;
        }
        if (newCategory === '') {
            alert('Please select a category');
            return;
        }

        const index = expenses.indexOf(expense);
        if (index !== -1) {
            totalAmount += newAmount - expense.amount;
            updateTotalAmount();
            expense.amount = newAmount;
            expense.description = newDescription;
            expense.category = newCategory;

            const row = expensesTableBody.rows[index];
            row.cells[0].textContent = newAmount;
            row.cells[1].textContent = newDescription;
            row.cells[2].textContent = newCategory;

            cancelEdit();
        }
    }

    function cancelEdit() {
        addBtn.disabled = false;
        const saveBtn = document.querySelector('.save-btn');
        if (saveBtn) {
            saveBtn.remove();
        }
        const cancelBtn = document.querySelector('.cancel-btn');
        if (cancelBtn) {
            cancelBtn.remove();
        }
        clearForm();
    }

    function updateTotalAmount() {
        totalAmountCell.textContent = totalAmount.toFixed(2);
    }

    function clearForm() {
        amountInput.value = '';
        descriptionInput.value = '';
        categorySelect.value = '';
    }
});
