const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express()
// app.use(express.static(path.join(__dirname, "./frontend/build")));

// app.get("*", function (_, res) {
//   res.sendFile(
//     path.join(__dirname, "./address-collector-client/build/index.html"),
//     function (err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//     }
//   );
// });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nfewxzd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const addressCollection = client.db("address_collector").collection("all_address");
        app.post('/all-address', async(req, res) => {
            const addAddress = req.body;
            const result = await addressCollection.insertOne(addAddress);
            res.send(result);
        })
        app.get('/all-address',async(req,res)=>{
            const query = { };
            const cursor = addressCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('My name is Tapu!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})