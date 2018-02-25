var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware"); //will automatically require index.js in directory
var geocoder = require("geocoder");

router.get("/", function(req,res){
  // Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: allCampgrounds, page: "campgrounds"});
    }
  });
  // res.render("campgrounds", {campgrounds: campgrounds});
});

// CREATE - Add new campground to DB
router.post("/", middleware.isLoggedIn, function(req,res){
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var price = req.body.price;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  geocoder.geocode(req.body.location, function(err, data){
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newCampground= {name: name, price: price, image: image, description: desc, author: author, location: location, lat: lat, lng: lng};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
      if(err){
        console.log(err)
      } else {
        console.log(newlyCreated);
        res.redirect("/campgrounds");
      }
    });
  });
});

//NEW - Show form to add campground
router.get("/new", middleware.isLoggedIn, function(req,res){
  res.render("campgrounds/new");
});

//SHOW - shows more info about one campground
router.get("/:id", function(req, res){
  //find teh campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec( function(err,foundCampground){
    if(err || !foundCampground){
      req.flash("error", "Campground not found");
      res.redirect("back");
    } else {
      console.log(foundCampground);
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

// Edit Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
  // is user logged in
  Campground.findById(req.params.id, function(err, foundCampground){
    res.render("campgrounds/edit", {campground: foundCampground});
  });
});
// Update Campground Route
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
  geocoder.geocode(req.body.campground.location, function(err, data){
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newData= {name: req.body.campground.name, image: req.body.campground.image, description: req.body.campground.description, price: req.body.campground.price, location: location, lat: lat, lng: lng};
    //find and update
    Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, campground){
      if(err){
        req.flash("error", err.message);
        res.redirect("/campgrounds");
      } else {
        req.flash("success", "Successfully Updated!");
        res.redirect("/campgrounds/" + campground._id);
      }
    });
  });
});

// Destroy Campground Route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});


module.exports = router;
