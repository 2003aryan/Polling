const router = require('express-promise-router')();
const connectToMongoDB = require('../mongoDb.js');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');

let collection;

async function initializeCollection() {
    const client = await connectToMongoDB();
    const database = client.db('mydatabase');
    collection = database.collection('mycollection');
}

initializeCollection().catch(err => {
    console.error('Error initializing collection:', err);
    process.exit(1);
});

router.use(bodyParser.json());

router.get('/pollslist', async (req, res) => {
    const result = await collection.find({}).toArray();
    res.json(result);
});

router.get('/poll/:id', async (req, res) => {
    const pollId = req.params.id;
    const query = { _id: new ObjectId(pollId) };
    const poll = await collection.findOne(query);
    res.json(poll);
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
