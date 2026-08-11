require("dotenv").config();
const express = require("express");
const app = express();
const pool = require("./config/db");
const { logger } = require("./middlewares/logEvents");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 3500;

app.use(errorHandler);

const testConnection = () => {
  const connection = pool.getConnection();

  if (connection) {
    console.log("Database has successfully connected!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } else {
    console.log("App failed to run and connect with the database.");
  }
};

testConnection();
