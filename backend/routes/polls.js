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
    console.log(pollId)
    let data;
    // const query = { _id: new ObjectId(pollId) };
    const poll = await answers//.find({questionid: pollId })
    .aggregate([
        {
          $match: {
            questionid: pollId
          }
        },
        {
          $group: {
            _id: {
              questionid: '$questionid',
              ans: '$ans'
            },
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            answer: '$_id.ans',
            count: 1
          }
        }
      ])
      .toArray().then(result    => data= result )

    console.log(data);
    res.json(data);
});

module.exports = router;
