require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./db.js");
const apiRouter = require("./api.js");
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(apiRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
