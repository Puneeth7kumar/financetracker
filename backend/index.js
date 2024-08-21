const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

const cors = require('cors');
app.use(cors());

const serviceAccount = require('./firebase-admin.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(bodyParser.json());

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await admin.auth().getUserByEmail(email);
        res.json({ user });
    } catch (error) {
        res.status(401).json({ error: 'Authentication failed' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
