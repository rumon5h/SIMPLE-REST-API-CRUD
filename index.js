const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7jcvfs6.mongodb.net/?retryWrites=true&w=majority`;

async function run(){

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  client.connect((err) => {
    const collection = client.db("test").collection("devices");
    try {
  
  
    } finally {
      // perform actions on the collection object
      //   client.close();
    }
  });
  
}

run().catch(console.dir)

app.get("/", (req, res) => {
  res.write(`<h2>This is a simple Rest API with CURD operations.</h2>`);
  res.end();
});

app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
