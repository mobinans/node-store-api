require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("<h1>Store API</h1><a href='/api/v1/products'>Products route</a>");
});

app.use("/api/v1/products", productsRouter);

// Products Route

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log(`Server is start listening port ${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
