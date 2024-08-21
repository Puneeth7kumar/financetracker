import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

import './dashboard.css';
import IncomeModal from './IncomeModel';
import ExpenseModal from './ExpenseModel';

// Register the required components in Chart.js
Chart.register(...registerables);

function Dashboard() {
    const [data, setData] = useState({
        income: [],
        expenses: [],
        transactionHistory: [],
    });

    const [isIncomeModalOpen, setIncomeModalOpen] = useState(false);
    const [isExpenseModalOpen, setExpenseModalOpen] = useState(false);

    const navigate = useNavigate();

    const toggleIncomeModal = () => setIncomeModalOpen(!isIncomeModalOpen);
    const toggleExpenseModal = () => setExpenseModalOpen(!isExpenseModalOpen);

    const handleAddIncome = (income) => {
        const newTransactionHistory = [...data.transactionHistory, { ...income, type: 'Income' }];
        setData((prevData) => ({
            ...prevData,
            income: [...prevData.income, income],
            transactionHistory: newTransactionHistory,
        }));
    };

    const handleAddExpense = (expense) => {
        const newTransactionHistory = [...data.transactionHistory, { ...expense, type: 'Expense' }];
        setData((prevData) => ({
            ...prevData,
            expenses: [...prevData.expenses, expense],
            transactionHistory: newTransactionHistory,
        }));
    };

    const lineData = {
        labels: data.transactionHistory.map((_, index) => index + 1),
        datasets: [
            {
                label: 'Income',
                data: data.income.map(income => income.amount),
                fill: true,
                backgroundColor: 'rgba(72, 176, 72, 0.1)',
                borderColor: '#48b048',
            },
            {
                label: 'Expenses',
                data: data.expenses.map(expense => expense.amount),
                fill: true,
                backgroundColor: 'rgba(176, 72, 72, 0.1)',
                borderColor: '#b04848',
            },
        ],
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="dashboard-container">
            {/* Navigation Bar */}
            <nav className="navbar">
                <div className="navbar-content">
                    <div className="brand">SmartFinance</div>
                    <div className="profile-menu">
                        <img src="path-to-profile-picture" alt="Profile" className="profile-picture" />
                        <div className="dropdown-content">
                            <span onClick={handleLogout}>Logout</span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Dashboard Content */}
            <div className="cards-container">
                <div className="card" onClick={toggleIncomeModal}>
                    <h3>Add Income</h3>
                </div>
                <div className="card" onClick={toggleExpenseModal}>
                    <h3>Add Expense</h3>
                </div>
            </div>
            <div className="charts-container">
                <div className="line-chart">
                    <h3>Income and Expenses</h3>
                    <Line data={lineData} />
                </div>
                <div className="transaction-history">
                    <h3>Transaction History</h3>
                    <ul>
                        {data.transactionHistory.map((transaction, index) => (
                            <li key={index}>
                                {transaction.type}: ${transaction.amount} on {transaction.date}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <IncomeModal
                isOpen={isIncomeModalOpen}
                onClose={toggleIncomeModal}
                onSubmit={handleAddIncome}
            />
            <ExpenseModal
                isOpen={isExpenseModalOpen}
                onClose={toggleExpenseModal}
                onSubmit={handleAddExpense}
            />
        </div>
    );
}

export default Dashboard;
