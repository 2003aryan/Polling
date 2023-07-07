const router = require('express-promise-router')();
const connectToMongoDB = require('../mongoDb.js');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');

let collection, answers;

async function initializeCollection() {
    const client = await connectToMongoDB();
    const database = client.db('mydatabase');
    collection = database.collection('mycollection');
    answers = database.collection('answers');
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

router.get('/viewpoll/:id', async (req, res) => {
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

router.post('/viewpoll/:id/saveans', async (req, res) => {
    // const ans = req.body;
    // const pollans = { ans }
    const result = await answers.insertOne(req.body);
    console.log(result);
    res.json({ message: 'Answer saved successfully' });
});

router.get('/viewpoll/:id/pollresults', async (req, res) => {
    const pollId = req.params.id;
    // const query = { _id: new ObjectId(pollId) };
    const poll = await answers.aggregate([
        { $match: { questionid: pollId } }, // Match documents within a date range
        { $group: { ans: "$ans", questionid: "$questionid", resCount: { $sum: 1 } } }, // Group by product and calculate total sales
    ]).toArray(function (err, results) {
        if (err) {
            console.log('Error retrieving data from MongoDB:', err);
            return;
        }
        console.log('Response count:', results);
    });

    console.log(poll);
    res.json(poll);
});

module.exports = router;
