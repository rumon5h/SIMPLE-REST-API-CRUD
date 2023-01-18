const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7jcvfs6.mongodb.net/?retryWrites=true&w=majority`;

async function run() {

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  client.connect((err) => {

    const serviceCollection = client.db("rest-api").collection("services");

    try {

      // Get services
      app.get("/services", async (req, res) => {

        const query = {};
        const result = await serviceCollection.find(query).toArray();

        res.status(200).send({
          status: "Success",
          message: "Successfully got all services",
          data: result,
        });

      });

      // Create new service
      app.post('/services', async (req, res) => {
        const service = req.body;
        const result = await serviceCollection.insertOne(service);

        res.status(201).send({
          statusbar: "Success",
          message: "Successfully created the service",
          data: result
        });
      });

      app.patch('/services', async (req, res) =>{
        const service = req.body;
        const {id} = req.query;
        const query = {_id: ObjectId(id)};

        const result = await serviceCollection.updateOne({query}, {$set: service});

        res.status(201).send({
          status: "Success",
          message: "Successfully updated the service",
          data: result
        });
      })

      // Delete a service
      app.delete('/services', async (req, res) =>{
        const {id} = req.query;
        const query = {_id: ObjectId(id)};
        const result = await serviceCollection.deleteOne(query);

        res.status(204).send({
          status: "Success",
          message: "Successfully deleted the service",
          data: result
        });
      });

    } finally {
      // perform actions on the collection object
      //   client.close();
    }
  });
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.write(`<h2>This is a simple Rest API with CURD operations.</h2>`);
  res.end();
});

app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
