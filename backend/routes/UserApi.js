const router = require('express-promise-router')();
const connectToMongoDB = require('../mongoDb.js');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

let userCollection;

async function initializeCollection() {
    const client = await connectToMongoDB();
    const database = client.db('mydatabase');
    userCollection = database.collection('users');
}

initializeCollection()
    .catch(err => {
    console.error('Error initializing collection:', err);
    process.exit(1);});

router.use(bodyParser.json());

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const uuid = uuidv4();

    // Check if the email is already registered
    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: 'Email already registered. Please use a different email.' });
    }

    const pollData = { name, email, password, uuid };

    const result = await userCollection.insertOne(pollData);
    console.log(result);
    res.json({ message: 'Registered successfully' });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await userCollection.findOne({ email });

    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful', userId: user.uuid });
});

module.exports = router;
