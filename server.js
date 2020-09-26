const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Article = require("./models/article");
const articleRouter = require("./routes/articles");
const methodOverride = require("method-override");
const app = express();

const un = process.env.username;
const pw = process.env.password;

mongoose.connect(
  `mongodb+srv://${un}:${pw}@cluster0.karo6.mongodb.net/blog?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

app.set("view engine", "ejs");

//access different parameters from our article form in our article route
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (request, response) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  response.render("articles/index", { articles: articles });
  // [
  // {
  //   title: "Test Article",
  //   createdAt: new Date(),
  //   description: "Test Description",
  // },
  // ];
  // response.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);

app.listen(5000);
