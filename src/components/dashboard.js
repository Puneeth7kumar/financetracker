
import React, { useState, useEffect } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { collection, addDoc, onSnapshot, query, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../firebase';
import 'chart.js/auto';
import './dashboard.css';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [transactions, setTransactions] = useState([]);
    const [incomeData, setIncomeData] = useState(0);
    const [expenseData, setExpenseData] = useState(0);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [formType, setFormType] = useState('');
    const [formData, setFormData] = useState({
        amount: '',
        type: '',
        date: '',
        category: '',
        description: ''
    });
    const [editData, setEditData] = useState(null);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();


    useEffect(() => {
        if (user) {
            const q = query(collection(db, 'transactions'), where('uid', '==', user.uid));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                const income = data.filter(item => item.type === 'Income').reduce((acc, item) => acc + item.amount, 0);
                const expense = data.filter(item => item.type === 'Expense').reduce((acc, item) => acc + item.amount, 0);

                setTransactions(data);
                setIncomeData(income);
                setExpenseData(expense);
            });

            return () => unsubscribe();
        }
    }, [user]);

    const handleAddTransaction = async () => {
        if (user) {
            const newTransaction = {
                type: formType,
                amount: parseFloat(formData.amount),
                date: formData.date,
                category: formData.category,
                description: formData.description,
                uid: user.uid
            };

            try {
                await addDoc(collection(db, 'transactions'), newTransaction);

               
                setFormData({ amount: '', type: '', date: '', description: '' });
                setIsPopupOpen(false);
            } catch (error) {
                console.error('Error adding transaction: ', error);
            }
        }
    };

    const handleEditTransaction = async () => {
        if (editData) {
            const transactionRef = doc(db, 'transactions', editData.id);

            try {
                await updateDoc(transactionRef, {
                    amount: parseFloat(formData.amount),
                    type: formData.type,
                    date: formData.date,
                    category: formData.category,
                    description: formData.description
                });

               
                setFormData({ amount: '', type: '', date: '', category: '', description: '' });
                setEditData(null);
                setIsEditPopupOpen(false);
            } catch (error) {
                console.error('Error updating transaction: ', error);
            }
        }
    };

    const handleDeleteTransaction = async (id) => {
        try {
            await deleteDoc(doc(db, 'transactions', id));
        } catch (error) {
            console.error('Error deleting transaction: ', error);
        }
    };

    const calculateSavings = () => incomeData - expenseData;

    const openPopup = (type) => {
        setFormType(type);
        setIsPopupOpen(true);
    };

    const openEditPopup = (transaction) => {
        setEditData(transaction);
        setFormData({
            amount: transaction.amount,
            type: transaction.type,
            date: transaction.date,
            category: transaction.category,
            description: transaction.description
        });
        setIsEditPopupOpen(true);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error(error.message);
        }
    };

    const chartData = {
        labels: ['Income', 'Expenses', 'Current Balance'],
        datasets: [
            {
                label: 'Amount (₹)',
                data: [incomeData, expenseData, calculateSavings()],
                backgroundColor: ['#4caf50', '#f44336', '#ff9800'],
                borderColor: ['#388e3c', '#d32f2f', '#f57c00'],
                borderWidth: 1
            }
        ]
    };
    const lineChartData = {
        labels: ['Income', 'Expenses', 'Current Balance'],
        datasets: [
            {
                label: 'Amount (₹)',
                data: [incomeData, expenseData, calculateSavings()],
                fill: false,
                borderColor: '#4caf50',
                backgroundColor: '#4caf50',
                pointBackgroundColor: ['#4caf50', '#f44336', '#ff9800'],
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                lineTension: 0.2, 
            }
        ]
    };
    const circleChartData = {
        labels: ['Income', 'Expenses', 'Current Balance'],
        datasets: [
            {
                label: 'Amount (₹)',
                data: [incomeData, expenseData, calculateSavings()],
                backgroundColor: ['#4caf50', '#f44336', '#ff9800'],
                borderColor: ['#388e3c', '#d32f2f', '#f57c00'],
                borderWidth: 1,
                hoverBackgroundColor: ['#66bb6a', '#e57373', '#ffb74d'],
                hoverBorderColor: ['#388e3c', '#d32f2f', '#f57c00'],
            }
        ]
    };

    return (

        <div class="slider-thumb">
            <div className="dashboard-container">
                
                <nav className="navbar">
                    <img src="https://blogger.googleusercontent.com/img/a/AVvXsEg1Xusd24wnK3m5HnX1riOOC0oX4W2HalHt1OVIretqHfJd4QtbjXkahfKbhaGpnQO5i0Qv2pE4XDDMntwBKUEuue24NuKvChwXctbyNsv3phcq40M3w3s41TWQ8_rQshvVcFvEnvSWBh9627s8VYS9kJX-t1h7rEkLY4bBvliihnjBmMisCJcfgXCdBiE" alt="Logo" class="logo" />


                    <div className="nav-links">
                        <button className="nav-button" onClick={() => openPopup('Income')}>Add Income</button>

                    </div>
                    <div className="nav-links">
                        <button className="nav-button" onClick={() => openPopup('Expense')}>Add Expense</button>

                    </div>
                    <div className="profile-menu">
                        <button className="nav-button" onClick={handleLogout}>Logout</button>
                    </div>
                </nav>

                <div className="summary-cards">
                    <div className="card income-card">
                        <div className="icon">💰</div>
                        <h3>Total Income</h3>
                        <div className="amount">₹{incomeData.toFixed(2)}</div>
                    </div>
                    <div className="card expense-card">
                        <div className="icon">💸</div>
                        <h3>Total Expenses</h3>
                        <div className="amount">₹{expenseData.toFixed(2)}</div>
                    </div>
                    <div className="card savings-card">
                        <div className="icon">💵</div>
                        <h3>Current Balance</h3>
                        <div className="amount">₹{calculateSavings().toFixed(2)}</div>
                    </div>
                </div>

                <div className="spending-container">
                    <h3>Spending Analytics</h3>
                    <div className="chart-wrapper">
                        <div className="chart-item">
                            <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                        <div className="chart-item">
                            <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                        <div className="chart-item">
                            <Doughnut data={circleChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                    </div>
                </div>



               
                <div className="transaction-container">
                    <h3>Recent Transactions</h3>
                    <ul className="transaction-list">
                        {transactions.map((transaction) => (
                            <li key={transaction.id} className={`transaction-item ${transaction.amount > incomeData ? 'highlighted' : ''}`}>
                                <span>{transaction.category}</span>
                                <span>{transaction.date}</span>
                                <span className={`amount ${transaction.type.toLowerCase()}`}>
                                    {transaction.type === 'Income' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                                </span>
                                <button onClick={() => openEditPopup(transaction)} className="edit-button">Edit</button>
                                <button onClick={() => handleDeleteTransaction(transaction.id)} className="delete-button">Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>

            
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
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            />
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder={`${formType} Description`}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                            <div className="popup-actions">
                                <button className="submit-button" onClick={handleAddTransaction}>Submit</button>
                                <button className="cancel-button" onClick={() => setIsPopupOpen(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}

              
                {isEditPopupOpen && (
                    <div className="popup-container">
                        <div className="popup-content">
                            <h3>Edit Transaction</h3>
                            <input
                                type="number"
                                placeholder="Amount"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Category"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            />
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                            <div className="popup-actions">
                                <button className="submit-button" onClick={handleEditTransaction}>Save</button>
                                <button className="cancel-button" onClick={() => setIsEditPopupOpen(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;



