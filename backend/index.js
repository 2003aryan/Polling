const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5001;
const uri = 'mongodb+srv://nirnaymittal:myself5430@cluster0.gzoaymz.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
	try {
		await client.connect();
		await client.db().command({ ping: 1 });
		console.log('Pinged your deployment. You successfully connected to MongoDB!');
	}
	catch (error) {
		console.error('Failed to connect to MongoDB:', error);
	}
}

connectToMongoDB();

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model('Users', UserSchema);

app.use(express.json());
app.use(cors());

app.get('/', (req, resp) => {
	resp.send('App is working');
});

app.post('/register', async (req, resp) => {
	try {
		const user = new User(req.body);
		const result = await user.save();
		const { password, ...userData } = result.toObject();
		resp.send(userData);
		console.log(userData);
	} catch (error) {
		console.error('Failed to register user:', error);
		resp.status(500).send('Something went wrong');
	}
});

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
