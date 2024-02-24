const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://manishamera1213:X2poNHsGsMaLG3la@cluster0.iemuuvx.mongodb.net/gofood?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    const food_data = client.db("gofood").collection("food_data");
    const data = await food_data.find({}).toArray();
    global.food_item = data;
    const food_category = client.db("gofood").collection("food_category");
    const foodCategory = await food_category.find({}).toArray();
    global.foodCategory = foodCategory;
    
  } 
  catch (err) {
    console.error(err);
  }
}

module.exports = { run, client };
