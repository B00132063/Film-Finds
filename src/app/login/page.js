export async function GET(req, res) {
    // Make a note we are on the api.
    console.log("in the login api page");
  
    // Get the values that were sent across to us.
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const pass = searchParams.get('pass');
  
    console.log(email);
    console.log(pass);
  
    // Database call goes here
  
    // At the end of the process, send something back.
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ "data": "valid" }));
}
