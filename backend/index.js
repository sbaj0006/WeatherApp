const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT | 80;

mongoose.connect(
  "mongodb+srv://weatherapp:Weather@123@cluster0.btrap.mongodb.net/weatherapp?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", require("./routes/index"));
app.listen(port);
