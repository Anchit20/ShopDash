const express = require("express");
const cors = require("cors");
const Product = require("./db/Product");

const jwt = require("jsonwebtoken");
const jwtKey = "shopDash";

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
  jwt.sign({ result }, jwtKey, { expiresIn: "1h" }, (err, token) => {
    if (err) {
      res.send({ result: "somethinggg went wrong" });
    }
    res.send({ result, auth: token });
  });
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      jwt.sign({ user }, jwtKey, { expiresIn: "1h" }, (err, token) => {
        if (err) {
          res.send({ result: "somethinggg went wrong" });
        }
        res.send({ user, auth: token });
      });
    } else {
      res.send({ result: "user not found" });
    }
  } else {
    res.send({ result: "no user found" });
  }
});

app.post("/add", verifyToken, async (req, res) => {
  let product = await new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/products", verifyToken, async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "no products found" });
  }
});

app.delete("/product/:id", verifyToken, async (req, res) => {
  // res.send(req.params.id);
  let result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/product/:id", verifyToken, async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  res.send(result);
});

app.put("/product/:id", verifyToken, async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(result);
});

app.get("/search/:key", verifyToken, async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { brand: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    // console.log("middleware call,", token);
    jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.status(401).send({ result: "please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({ result: "please add token with header" });
  }
  // console.log("middleware call", token);
  // next();
}
app.listen(5000);
