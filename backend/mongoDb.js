const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://nirnaymittal:myself5430@cluster0.gzoaymz.mongodb.net/?retryWrites=true&w=majority";

async function connectToMongoDB() {
    try {
    const client = await MongoClient.connect(uri);
    console.log('Connected to MongoDB');

    // Perform any necessary setup or operations here

    return client; // Return the client object for later use
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
}

module.exports =connectToMongoDB;