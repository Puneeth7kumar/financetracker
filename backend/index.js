const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(bodyParser.json());

const serviceAccount = require('./firebase-admin.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});


app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await admin.auth().getUserByEmail(email);
        res.json({ user });
    } catch (error) {
        res.status(401).json({ error: 'Authentication failed' });
    }
});

app.post('/api/transactions', async (req, res) => {
    const { userId, amount, type, category, date } = req.body;

  
    if (!['Income', 'Expense'].includes(type)) {
        return res.status(400).json({ error: 'Invalid transaction type' });
    }

    try {
        const transactionData = {
            amount: parseFloat(amount),
            type: type,
            category: category,
            date: date,
            uid: userId,
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        };

      
        await admin.firestore()
            .collection('transactions')
            .add(transactionData);

        res.status(201).json({ message: 'Transaction added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add transaction' });
    }
});


app.get('/api/transactions/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const transactionsRef = admin.firestore()
            .collection('transactions')
            .where('uid', '==', userId);

        const snapshot = await transactionsRef.get();

        if (snapshot.empty) {
            return res.status(404).json({ message: 'No transactions found' });
        }

        const transactions = snapshot.docs.map(doc => doc.data());

        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
