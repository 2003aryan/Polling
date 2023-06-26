const router = require('express-promise-router')();
const connectToMongoDB = require('../mongoDb.js');
const bodyParser = require('body-parser');

let collection; // Store the reference to the collection

async function initializeCollection() {
    const client = await connectToMongoDB();
    const database = client.db('mydatabase');
    collection = database.collection('mycollection');
}

// Initialize the collection
initializeCollection().catch(err => {
    console.error('Error initializing collection:', err);
    process.exit(1); // Exit the process if collection initialization fails
});

// Parse JSON request bodies
router.use(bodyParser.json());

router.get('/pollslist', async (req, res) => {
    const query = {};
    const result = await collection.find(query).toArray();
    res.json(result);
});

router.post('/savedata', async (req, res) => {
    const { question, startDate, startTime, endDate, endTime, options } = req.body;

    const pollData = {
        question,
        startDate,
        startTime,
        endDate,
        endTime,
        options
    };

    const result = await collection.insertOne(pollData);
    console.log(result);

    res.json({ message: 'Data saved successfully' });
});

module.exports = router;
