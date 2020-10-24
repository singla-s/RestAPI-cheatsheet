const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

//App Server configuration
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Database configuration
mongoose.connect("mongodb://localhost:27017/wikiDB");
const wikiSchema = {
        title: String,
        content: String
};

const Article = mongoose.model("article", wikiSchema);

app.route("/articles")
    .get(function(req, res) {
        Article.find({}, function(err, articles) {
            if(!err) {
                res.send(articles);
            } else {
                rs.send(err);
            }
        });
    })
    .post(function(req, res) {
        const title= req.body.title;
        const content = req.body.content;
        const article = new Article({title: title, content: content});
        article.save(function(err) {
            if(!err) {
                res.send("article created successfully!");
            } else {
                res.send(err);
            }
        });
    }).delete(function(req, res) {
        Article.deleteMany(function(err) {
            if(!err) {
                res.send("All articles deleted successfully!");
            } else {
                res.send(err);
            }
        });
    });

app.route("/article/:article")
.get(function(req, res) {
    const articleTitle = req.params.article;
    console.log(articleTitle);
    // Article.find({title: article}, function(err, article) {
    //     if(!err) {
    //         res.send(article);
    //     } else {
    //         rs.send(err);
    //     }
    // });
});








app.listen(3000, function(res) {
    console.log("Server listening at port 3000.");
});
