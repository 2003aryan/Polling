const connectToMongoDB = require('./mongoDb.js');
const express = require('express');
const app = express();
const pollsRouter = require('./routes/polls');
const userRouter = require('./routes/UserApi');
const cors = require('cors');

app.use(cors())
app.use(express.json());
app.use('/api/polls', pollsRouter);
app.use('/api/user', userRouter);

let mongoClient;

async function startApplication() {
    try {
        mongoClient = await connectToMongoDB();
        const port = process.env.PORT || 5001;
        app.listen(port, () => {
            console.log(`App is listening on port ${port}`);
        });
    } catch (err) {
        console.error('Error starting application:', err);
        process.exit(1);
    }
}

startApplication();

process.on('SIGINT', () => {
    if (mongoClient) {
        mongoClient.close();
        console.log('MongoDB connection closed');
    }
    process.exit(0);
});
