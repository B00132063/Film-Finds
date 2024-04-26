export async function GET(req, res) {

  // Make a note we are on
  // the api. This goes to the console.
  console.log("In the login api page")


  // get the values
  // that were sent across to us.
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')
  const pass = searchParams.get('pass')

  console.log(email);
  console.log(pass);


 

  // database call goes here
  const { MongoClient } = require('mongodb');
  const url = 'mongodb+srv://film-findr:12345678qwerty@cluster0.uj4ky6r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  
  
  
  const client = new MongoClient(url);
  const dbName = 'app'; // database name
  await client.connect();



  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('login'); // collection name
  const findResult = await collection.find({"username":"test"}).toArray();
  console.log('Found documents =>', findResult);
  
  if(findResult.length >0 ){
    return Response.json({ "data":"valid" })
  } else {

    return Response.json({ "data":"notvalid" })

  }




  // at the end of the process we need to send something back.
  
}
