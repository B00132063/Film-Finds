export async function GET(req, res) {

    // Make a note we are on
    // the api. This goes to the console. 
    console.log("in the api page")

    // ================================================= 
    const { MongoClient } = require('mongodb');

    //const url = 'mongodb+srv://stevenakamelu2960:TD09ZlzK2Mnk6Oxw@cluster0.aakaopk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 
     
    const url = 'mongodb+srv://film-findr:12345678qwerty@cluster0.uj4ky6r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  
    
    const client = new MongoClient(url);

    const dbName = 'app'; // database name


    // stevenakamelu2960
    // pw TD09ZlzK2Mnk6Oxw
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('products'); // collection name

    const findResult = await collection.find({}).toArray(); // get everything
    console.log('Found documents =>', findResult);

    //==========================================================
    
    // at the end of the process we need to send something back.
    return Response.json(findResult) }