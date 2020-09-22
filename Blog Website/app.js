//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

mongoose.connect("mongodb+srv://shivansh-admin:test123@blogcluster0.qcugf.mongodb.net/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);



const homeStartingContent = "Hello and Welcome to Daily journal Blogwebsite, keep all of your thoughts saved and publish them here using COMPOSE in the right top corner.";
const aboutContent = "A website where new blogs can be added according to the dates, backed up on MongoDB.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


app.get("/", function(req, res) {
  Post.find({}, function(err, foundList) {
    if (!err) {
      res.render("home", {
        startingContent: homeStartingContent,
        posts: foundList
      });
    }

  });

});

app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err) {
    if (!err) {
      res.redirect("/");
    }
  });



});

app.get("/posts/:postId", function(req, res) {
  const requestedId = req.params.postId;
  Post.findOne({
    _id: requestedId
  }, function(err, post) {
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });


});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
