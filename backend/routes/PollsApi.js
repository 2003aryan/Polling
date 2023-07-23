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

router.get('/pollslist/:uuid', async (req, res) => {
    try {
        const { uuid } = req.params;
        const polls = await collection.find({ uuid }).toArray();
        res.json(polls);
    } catch (error) {
        console.error('Error fetching polls:', error);
        res.status(500).json({ message: 'Failed to fetch polls' });
    }
});

router.get('/viewpoll/:id', async (req, res) => {
    const pollId = req.params.id;
    const query = { _id: new ObjectId(pollId) };
    const poll = await collection.findOne(query);
    res.json(poll);
});

router.post('/savedata', async (req, res) => {
    // const { question, startDate, startTime, endDate, endTime, options } = req.body;

    // const pollData = {
    //     question,
    //     startDate,
    //     startTime,
    //     endDate,
    //     endTime,
    //     options
    // };

    const result = await collection.insertOne(req.body);
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
        .toArray().then(result => data = result)

    console.log(data);
    res.json(data);
});

router.delete('/deletepoll/:id', async (req, res) => {
    const pollId = req.params.id;
    const query = { _id: new ObjectId(pollId) };

    try {
        const result = await collection.deleteOne(query);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Poll not found' });
        }
        res.json({ message: 'Poll deleted successfully' });
    } catch (error) {
        console.error('Error deleting poll:', error);
        res.status(500).json({ message: 'Failed to delete poll' });
    }
});

router.put('/editpoll/:id', async (req, res) => {
    const pollId = req.params.id;
    const query = { _id: new ObjectId(pollId) };
    const updatedPollData = req.body;

    collection.updateOne(query, { $set: updatedPollData })
        .then(result => {
            if (result.modifiedCount === 0) {
                return res.status(500).json({ message: 'Failed to update poll' });
            }
            res.json({ message: 'Poll updated successfully' });
        })
        .catch(error => {
            console.error('Error updating poll:', error);
            res.status(500).json({ message: 'Failed to update poll' });
        });
});

module.exports = router;
