const express = require("express");
var cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT;


const { userRoute } = require("./routes/allRoute.routes");
const connection = require("./DB/connectDB");
connection();
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(userRoute);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));