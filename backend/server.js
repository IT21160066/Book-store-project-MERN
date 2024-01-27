const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

//to find images, css we are using in the server
app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));

app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT}`));
