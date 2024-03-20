const express = require("express");
const cors = require("cors");
const Product = require("./db/Product");

require("./db/config");

const User = require("./db/User");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let userData = await new User(req.body);
  let result = await userData.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "user not found" });
    }
  } else {
    res.send({ result: "no user found" });
  }
});

app.post("/add", async (req, res) => {
  let product = await new Product(req.body);
  let result = await product.save();
  res.send(result);
});
app.listen(5000);
