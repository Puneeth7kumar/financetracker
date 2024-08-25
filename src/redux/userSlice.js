// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        transactions: [],
        income: 0,
        expenses: 0
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setTransactions: (state, action) => {
            state.transactions = action.payload;
            state.income = action.payload.reduce((acc, transaction) => transaction.type === 'Income' ? acc + transaction.amount : acc, 0);
            state.expenses = action.payload.reduce((acc, transaction) => transaction.type === 'Expense' ? acc + transaction.amount : acc, 0);
        },
        addTransaction: (state, action) => {
            state.transactions.push(action.payload);
            if (action.payload.type === 'Income') {
                state.income += action.payload.amount;
            } else if (action.payload.type === 'Expense') {
                state.expenses += action.payload.amount;
            }
        }
    }
});

export const { setUser, setTransactions, addTransaction } = userSlice.actions;

export default userSlice.reducer;
