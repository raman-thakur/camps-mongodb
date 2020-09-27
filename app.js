var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/yelp_camp_v10", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  discription: String,
});

var Campground = mongoose.model("Campground", campgroundSchema);

app.get("/", function (req, res) {
  res.render("landing");
});

app.get("/campgrounds", function (req, res) {
  // res.render("campgrounds", { campgrounds: campgrounds });
  Campground.find({}, function (err, allCampgrounds) {
    if (err) console.log(err);
    else {
      res.render("campgrounds", { campgrounds: allCampgrounds });
    }
  });
});
app.post("/campgrounds", function (req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var discription = req.body.discription;
  var newcampground = { name: name, image: image, discription: discription };
  Campground.create(newcampground, function (err, newone) {
    if (err) console.log(err);
    else {
      res.redirect("/campgrounds");
    }
  });
  // campgrounds.push(newcampground);
});

app.get("/campgrounds/new", function (req, res) {
  res.render("new");
});

app.get("/campgrounds/:id", function (req, res) {
  Campground.findById(req.params.id, function (err, foundcampground) {
    if (err) console.log(err);
    else {
      res.render("show", { campground: foundcampground });
    }
  });
});
app.listen(3022, function () {
  console.log("Example app listening on port 3000!");
});
