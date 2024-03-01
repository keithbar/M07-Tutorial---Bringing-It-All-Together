const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

//express app
const app = express();

//connect to mongodb
const dbURI = "mongodb+srv://kbarber34:GqfsU5ySDoU3onwL@sdev255.gxv9ds4.mongodb.net/M06Tutorial?retryWrites=true&w=majority&appName=SDEV255"
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//register view engine
app.set("view engine", "ejs");

//middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); //accepting form data
app.use(morgan("dev"));

//basic routes

app.get("/", (req, res) => {
    res.redirect("/blogs");
});

app.get("/about", (req, res) => {
    res.render("about", {title: "About"});
});

//blog routes
app.use(blogRoutes);

//404
app.use((req, res) => {
    res.status(404).render("404", {title: "404"});
});