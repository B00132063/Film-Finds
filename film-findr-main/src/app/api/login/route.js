export async function GET(request, response) {
    const {searchParams} = new URL(request.url)
    const email = searchParams.get("email")
    const pass = searchParams.get("pass")

    const {MongoClient} = require("mongodb")
    const url = "mongodb+srv://film-findr:EBgb342FUad2oLnt@cluster0.uj4ky6r.mongodb.net/?retryWrites=true&w=majority"
    const client = new MongoClient(url)
    await client.connect()

    const dbName = "film-findr"
    const db = client.db(dbName)
    const collection = db.collection("user")
    const findEmail = await collection.find({"email": email}).toArray()

    let valid
    if(findEmail.length > 0) {
        const findPassword = await collection.find({"email":email, "pass":pass}).toArray()
        if (findPassword.length > 0) {
            valid = true
            console.log("Valid Email Address and Password")
        }
        else {
            valid = false
            console.log("Invalid or Incorrect Password for this Email Address")
        }
    }
    else {
        valid = false
        console.log("Invalid or Incorrect Email Address")
    }

    return Response.json({ "data": valid})
}
