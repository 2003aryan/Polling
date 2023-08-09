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
    const result = await collection.insertOne(req.body);
    console.log(result);
    res.json({ message: 'Data saved successfully' });
});

router.post('/viewpoll/:id/saveans', async (req, res) => {
    try {
        const pollId = req.params.id;
        const { ans, name, email, uuid } = req.body;

        if (uuid) {
            // Check if the user has already voted for this poll
            const existingVote = await answers.findOne({ questionid: pollId, uuid });
            if (existingVote) {
                return res.status(409).json({ message: 'You have already voted for this poll.' });
            }
        }

        // Save the user's vote
        const voteData = { ans, questionid: pollId, name, email, uuid };
        const result = await answers.insertOne(voteData);
        console.log(result);

        res.json({ message: 'Answer saved successfully' });
    } catch (error) {
        console.error('Error saving answer:', error);
        res.status(500).json({ message: 'Failed to save answer' });
    }
});



router.get('/viewpoll/:id/pollresults', async (req, res) => {
    try {
        const pollId = req.params.id;
        console.log(pollId);

        // Query 1: Aggregation Query for Poll Results
        const pollResults = await answers.aggregate([
            {
                $match: {
                    questionid: pollId
                }
            },
            {
                $group: {
                    _id: '$ans',
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    answer: '$_id',
                    count: 1
                }
            }
        ]).toArray();

        console.log(pollResults);

        // Query 2: Regular Find Query for Names and Answers
        // const responses = await answers.find({ questionid: pollId }, { _id: 0, name: 1, ans: 1 }).toArray();
        const projection = { _id: 0, name: 1, ans: 1, email: 1 }; // Specify the fields you want to retrieve
        const filter = { questionid: pollId }; // Define the query filter
        const responses = await answers.find(filter, { projection }).toArray()
        console.log(responses);

        res.json({ pollResults, responses });
    } catch (error) {
        console.error('Error retrieving poll results:', error);
        res.status(500).json({ error: 'Failed to fetch poll results.' });
    }
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
