const connectToMongoDB = require('./mongoDb');
const mongoose = require('mongoose');

async function startApplication() {
	try {
		mongoClient = await connectToMongoDB();
	} catch (err) {
		console.error('Error starting application:', err);
	}
}
startApplication();

//MongoDB Basic Code
const express = require('express');
const app = express();
const pollsRouter = require('./routes/polls');
app.use('/api/polls', pollsRouter);
app.listen(5001, () => {
	console.log("App listen at port 5001");
});
//END


let mongoClient;


process.on('SIGINT', () => {
	if (mongoClient) {
		mongoClient.close();
		console.log('MongoDB connection closed');
	}
	process.exit(0);
});

//MODELS-START-----------------------------------
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
//MODEL-END----------------------------------------


// For backend and express
const cors = require("cors");
// console.log("App listen at port 5001");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {

	resp.send("App is Working");
	mongoClient.db("nirnay").collection('Users').insertOne({ 'name': "Pranay", 'email': 'pranay@test.com' })
	// You can check backend is working or not by
	// entering http://loacalhost:5000

	// If you see App is working means
	// backend working properly
});

app.post("/register", async (req, resp) => {
	try {
		const user = new User(req.body);
		let result = await user.save();
		result = result.toObject();
		if (result) {
			delete result.password;
			resp.send(req.body);
			console.log(result);
		} else {
			console.log("User already register");
		}

	} catch (e) {
		resp.send("Something Went Wrong");
	}
});


// const [users,setUser]=useState([])
//   useEffect(()=>{
//     fetch("http://localhost:4000/todo").then((result)=>{
//       result.json().then((resp)=>{
//         // console.warn(resp)
//         setUser(resp)
//       })
//     })
//   },[])
//   console.warn(users)


