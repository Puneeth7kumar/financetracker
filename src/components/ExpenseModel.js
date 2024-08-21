import React, { useState } from 'react';
import './modal.css';

function ExpenseModal({ isOpen, onClose, onSubmit }) {
    const [expense, setExpense] = useState({
        amount: '',
        type: '',
        date: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpense((prevExpense) => ({ ...prevExpense, [name]: value }));
    };

    const handleSubmit = () => {
        onSubmit(expense);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Add Expense</h3>
                <input name="amount" placeholder="Amount" value={expense.amount} onChange={handleChange} />
                <input name="type" placeholder="Expense Type" value={expense.type} onChange={handleChange} />
                <input name="date" type="date" value={expense.date} onChange={handleChange} />
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default ExpenseModal;
