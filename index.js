const express= require('express');

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const port= process.env.PORT || 5000
const app = express();
const cors= require('cors')
app.use(cors());
app.use(express.json())
require('dotenv').config()
app.get('/', (req,res)=>{
    res.send('joob hunter goin on')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.PASSWORD}@cluster0.phwgjt8.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    const categoryCollection= client.db('job-hunter').collection('job-category');
    const jobsCollection= client.db('job-hunter').collection('jobs') 
       
    try{
        app.get('/jobs-categories', async(req,res)=>{
            const query= {};
            const jobsCategorries= await categoryCollection.find(query).toArray();
            res.send(jobsCategorries)
        })
        app.get('/alljobs/:id', async(req, res)=>{
            const id = req.params.id
           const query= {id : id}
           const result = await jobsCollection.find(query).toArray()
           res.send(result)
        })
        
    }
    finally{

    }
}
run().catch(er=>console.log(er))
app.listen(port,(err)=>{console.log(port)})