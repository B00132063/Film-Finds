export async function GET(req, res) {
// Make a note we are on
// the api. This goes to the console.
    console.log("in the AddToProfile api page")
// get the values
// that were sent across to us.
    const { searchParams } = new URL(req.url)
    const title = searchParams.get('title')
    console.log(title);
// =================================================
    const { MongoClient } = require('mongodb');
    const url = "mongodb+srv://film-findr:12345678qwerty@cluster0.uj4ky6r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(url);
    const dbName = 'film-findr'; // database name
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('Profile'); // collection name
    var myobj = { title: title, username: "sample@test.com"};
    const insertResult = await collection.insertOne(myobj);
//==========================================================
// at the end of the process we need to send something back.
    return Response.json({ "data":"" + "inserted" + ""})
}