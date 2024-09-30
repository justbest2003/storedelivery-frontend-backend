const express = require("express");
const cors = require("cors");
require("dotenv").config();
const frontend_url = process.env.FRONTEND_URL;
const PORT = process.env.PORT
const corsOption = {
  origin: frontend_url,
};
console.log(frontend_url);
console.log(PORT);

const app = express();
app.use(cors(corsOption));

//List of Stores
const stores = require("./stores")
//console.log(stores);

app.get("/api/stores", (req, res) => {
  res.json(stores);
});



app.get("/", (req, res)=>{
    res.send("<h1>Hello Store Delivery</h1>");
})

app.listen(PORT, ()=>{
    console.log("Server running on port http://localhost:" + PORT);
})