# Personal Finance Tracker

![Logo](./src/components/images/logo1.png)

A comprehensive personal finance tracker that helps you manage your income, expenses, and budget. Built with a modern frontend using React.js, a robust backend with Node.js, and Firebase for authentication and database management.This project also integrates Redux for state management and features rich analytics to help users track their spending.

## Features

- **User Authentication**: 
  - Sign up and login with email/password.
  - Google Sign-In for quick access.
- **Dashboard**:
  - View total income, total expenses, and current balance.
  - Access recent transactions with options to edit and delete.
- **Add Income/Expenses**:
  - Popup forms for entering details such as amount, category, date, and description.
- **Spending Analytics**:
  - Visualize spending habits with bar, line, and pie chart.
- **Responsive Design**: 
  - Optimized for both desktop and mobile devices.

## Screenshots

### Login and Registration
![Login](src/components/screenshots/login.png)
![Registration](src/components/screenshots/registernew.png)

### Dashboard Overview
![Dashboard](src/components/screenshots/dashboard.png)

### Add Income/Expense
![Add Income](src/components/screenshots/addIncome.png)
![Add Expense](src/components/screenshots/addExpense.png)

### Spending Analytics
![Analytics](src/components/screenshots/SpendingTransactions.png)

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: Firebase Firestore
- **Authentication**: Firebase Authentication (Email/Password, Google Sign-In)
- **State Management**: Redux
- **Styling**: CSS 
- **Graphs and Charts**: Chart.js, D3.js 

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/smartfinance.git
    cd smartfinance
    ```

2. Install the dependencies for both frontend and backend:

    ```bash
    # Install frontend dependencies
    cd client
    npm install

    # Install backend dependencies
    cd ../server
    npm install
    ```

3. Set up Firebase:
    - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
    - Configure Firebase Authentication and Firestore.
    - Add your Firebase configuration in the respective files (usually a `.env` file or directly in your codebase).

4. Start the development server:

    ```bash
    # Start frontend
    cd client
    npm start

    # Start backend
    cd ../server
    npm start
    ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

1. **Sign Up/Login**: Register a new account or sign in using Google.
2. **Dashboard**: View your financial summary and recent transactions.
3. **Add Income/Expense**: Use the buttons in the navigation bar to add new income or expense records.
4. **Edit/Delete Transactions**: Manage your transactions easily through the dashboard.
5. **Analyze Spending**: Use the provided graphs to get insights into your financial habits.

## Live Website:
Link: https://smartbudgetplan.web.app

## Contributing

Puneeth Kumar NNM23MC107

## License

This project is licensed under the MIT License.

## Contact

For any questions, please contact [puneethpandith@gmail.com](mailto:puneethpandith@gmail.com).

