const express = require("express");
const app = express();
const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Application is running !" });
});

require("./routes/routes.js")(app);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening at port ${port}.`);
});