const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const noteRoutes = require("./routes/noteRoutes");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.options("*", cors()); // handle preflight
app.use(express.json());

// routes
app.use("/notes", noteRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error(err));
