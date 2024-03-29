export async function GET(request, response) {
    const {searchParams} = new URL(request.url)
    const email = searchParams.get("email")
    const pass = searchParams.get("pass")

    const {MongoClient} = require("mongodb")
    const url = "mongodb+srv://film-findr:EBgb342FUad2oLnt@cluster0.uj4ky6r.mongodb.net/?retryWrites=true&w=majority"
    const client = new MongoClient(url)
    await client.connect()

    const databaseName = "film-findr"
    const database = client.db(databaseName)
    const collection = database.collection("user")
    await collection.insertOne({"email": email, "pass": pass, "acc-type": "customer"})

    let valid = true
    return Response.json({"data": valid})
}
