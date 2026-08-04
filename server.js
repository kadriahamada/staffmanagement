require("dotenv").config();
const express = require("express");
const pool = require("./config/db");

const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 3500;

app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));

app.get("/", (req, res) => {
  res.json("App is successfully running.");
});

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
