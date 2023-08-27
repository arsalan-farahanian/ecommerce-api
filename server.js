const express = require("express");
const mongoose = require("mongoose").default;

const { PORT, MONGO_URL } = require("./config");

const app = express();

app.listen(PORT, () => {
  console.log(`Server Running: Port ${PORT}`);
});

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("DATABASE CONNECTION ESTABLISHED..."))
  .catch(() => console.log("DATABASE CONNECTION FAILED!!!"));
