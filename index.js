const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = 5000


const uri = `mongodb+srv://xff:2e8oQw0PsLup1Y90@cluster0.5rgf1kx.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const footballCollection = client.db('footballCollection').collection('matchs');
    console.log("You successfully connected to MongoDB!");
    app.get('/matchs', async(req,res)=>{
      const qurey = {}
      const cursor =  footballCollection.find(qurey)
      const matchs = await cursor.toArray()
      console.log(matchs);
      res.send(matchs)
    })
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

