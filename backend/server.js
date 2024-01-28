const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

//built-in middleware
//to find images, css we are using in the server
app.use("/", express.static(path.join(__dirname, "public")));

//ability process json
//recive and parse json data
//built-in middleware
app.use(express.json());

app.use("/", require("./routes/root"));

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

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
