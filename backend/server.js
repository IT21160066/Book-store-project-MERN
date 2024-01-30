require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3500;

connectDB();

app.use(logger);

app.use(cors(corsOptions));
//now API availble to the public
//other origins can request resources from our API now

//built-in middleware
//to find images, css we are using in the server
app.use("/", express.static(path.join(__dirname, "public")));

//ability process json
//recive and parse json data
//built-in middleware
app.use(express.json());

//able to parse cookies that we recive
app.use(cookieParser());

app.use("/", require("./routes/root"));
app.use("/users", require("./routes/userRoutes"));
app.use("./notes", require("./routes/noteRoutes"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connect to MongoDB");
  app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
});

// mongoose.connection.on("error", (err) => {
//   console.log(err);
//   logEvents(
//     `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
//     "mongoErrLog.log"
//   );
// });

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);

  // Log error details to a file
  const errorDetails = {
    message: err.message,
    stack: err.stack,
    // Add more properties as needed
  };
  logEvents(JSON.stringify(errorDetails), "mongoErrLog.log");
});
