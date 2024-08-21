import React, { useState } from 'react';
import './modal.css';

function IncomeModal({ isOpen, onClose, onSubmit }) {
    const [income, setIncome] = useState({
        amount: '',
        type: '',
        date: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIncome((prevIncome) => ({ ...prevIncome, [name]: value }));
    };

    const handleSubmit = () => {
        onSubmit(income);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Add Income</h3>
                <input name="amount" placeholder="Amount" value={income.amount} onChange={handleChange} />
                <input name="type" placeholder="Income Type" value={income.type} onChange={handleChange} />
                <input name="date" type="date" value={income.date} onChange={handleChange} />
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default IncomeModal;
