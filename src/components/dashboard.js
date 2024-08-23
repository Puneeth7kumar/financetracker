import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './dashboard.css';

function Dashboard() {
    const [transactions, setTransactions] = useState([]);
    const [incomeData, setIncomeData] = useState(0);
    const [expenseData, setExpenseData] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [formType, setFormType] = useState('');
    const [formData, setFormData] = useState({
        amount: '',
        type: '',
        date: ''
    });

    const handleAddTransaction = () => {
        const newTransaction = {
            type: formType,
            amount: parseFloat(formData.amount),
            date: formData.date,
            category: formData.type
        };
        setTransactions([...transactions, newTransaction]);

        if (formType === 'Income') {
            setIncomeData(incomeData + parseFloat(formData.amount));
        } else if (formType === 'Expense') {
            setExpenseData(expenseData + parseFloat(formData.amount));
        }

        // Reset form and close popup
        setFormData({ amount: '', type: '', date: '' });
        setIsPopupOpen(false);
    };

    const calculateSavings = () => incomeData - expenseData;

    const openPopup = (type) => {
        setFormType(type);
        setIsPopupOpen(true);
    };
    const chartData = {
        labels: ['Income', 'Expenses', 'Savings'],
        datasets: [
            {
                label: 'Amount ($)',
                data: [incomeData, expenseData, calculateSavings()],
                backgroundColor: ['#4caf50', '#f44336', '#ff9800'],
                borderColor: ['#388e3c', '#d32f2f', '#f57c00'],
                borderWidth: 1
            }
        ]
    };
    return (
        <div className="dashboard-container">
            {/* Navigation Bar */}
            <nav className="navbar">
                <div className="brand">Finance Tracker</div>
                <div className="nav-links">
                    <button className="nav-button" onClick={() => openPopup('Income')}>Add Income</button>
                    <button className="nav-button" onClick={() => openPopup('Expense')}>Add Expense</button>
                </div>
                <div className="profile-menu">
                    <img src="path-to-profile-picture" alt="Profile" className="profile-picture" />
                </div>
            </nav>

            {/* Summary Cards */}
            <div className="summary-cards">
                <div className="card income-card">
                    <h3>Total Income</h3>
                    <div className="amount">${incomeData.toFixed(2)}</div>
                </div>
                <div className="card expense-card">
                    <h3>Total Expenses</h3>
                    <div className="amount">${expenseData.toFixed(2)}</div>
                </div>
                <div className="card savings-card">
                    <h3>Savings</h3>
                    <div className="amount">${calculateSavings().toFixed(2)}</div>
                </div>
            </div>

            <div className="spending-container">
                <h3>Spending Analytics</h3>
                <div className="spending-chart">
                    <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
            </div>

            {/* Transactions List */}
            <div className="transaction-container">
                <h3>Recent Transactions</h3>
                <ul className="transaction-list">
                    {transactions.map((transaction, index) => (
                        <li key={index} className="transaction-item">
                            <span>{transaction.category}</span>
                            <span>{transaction.date}</span>
                            <span className={`amount ${transaction.type.toLowerCase()}`}>
                                {transaction.type === 'Income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Popup Form */}
            {isPopupOpen && (
                <div className="popup-container">
                    <div className="popup-content">
                        <h3>Add {formType}</h3>
                        <input
                            type="number"
                            placeholder={`${formType} Amount`}
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder={`${formType} Category`}
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        />
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                        <div className="popup-actions">
                            <button className="submit-button" onClick={handleAddTransaction}>Submit</button>
                            <button className="cancel-button" onClick={() => setIsPopupOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
