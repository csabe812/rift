const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Post = require("./models/post");
const jsonParser = bodyParser.json();
const mongoose = require("mongoose");

//84.0.33.187

mongoose
  .connect(
    "mongodb+srv://csabe812:hB2oXpcYwCnnaxF6@cluster0.taac8at.mongodb.net/rift?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connection successful");
  })
  .catch(() => {
    console.log("Something went wront");
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", jsonParser, (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save();
  res.status(201).json({
    message: "Post added successfully",
  });
});

app.get("/api/posts", (req, res, nex) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: "Post fetched successfully",
      posts: documents
    });
  });
});

module.exports = app;
