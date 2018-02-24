var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");

var data = [
  {
    name: "Cloud's Rest",
    image: "https://farm7.staticflickr.com/6105/6381606819_df560e1a51.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin finibus nisl et justo rutrum blandit. Fusce lectus neque, faucibus porta quam vel, ultrices rhoncus nisi. Morbi sit amet nunc eget odio aliquam fringilla ut vel tortor. Nam tellus elit, commodo sit amet sem et, ullamcorper tempus massa. Praesent turpis lacus, sodales vel neque iaculis, suscipit bibendum dolor. Duis accumsan nibh velit, quis tincidunt diam sollicitudin vitae. Donec ornare arcu lacinia dui gravida, a porta urna suscipit. Cras justo nibh, tristique sed malesuada vehicula, scelerisque a nisl. Integer sed tortor sed ligula ultricies volutpat sit amet eleifend elit. Mauris sagittis nisi et ex luctus, et feugiat arcu facilisis. Vestibulum vulputate tellus nisl, eget lacinia diam vehicula vitae. Fusce porttitor condimentum turpis a venenatis. Aenean ullamcorper bibendum tellus et egestas. Suspendisse tempor ullamcorper lorem et convallis."
  },
  {
    name: "Desert Mesa",
    image: "https://farm4.staticflickr.com/3487/3753652204_a752eb417d.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin finibus nisl et justo rutrum blandit. Fusce lectus neque, faucibus porta quam vel, ultrices rhoncus nisi. Morbi sit amet nunc eget odio aliquam fringilla ut vel tortor. Nam tellus elit, commodo sit amet sem et, ullamcorper tempus massa. Praesent turpis lacus, sodales vel neque iaculis, suscipit bibendum dolor. Duis accumsan nibh velit, quis tincidunt diam sollicitudin vitae. Donec ornare arcu lacinia dui gravida, a porta urna suscipit. Cras justo nibh, tristique sed malesuada vehicula, scelerisque a nisl. Integer sed tortor sed ligula ultricies volutpat sit amet eleifend elit. Mauris sagittis nisi et ex luctus, et feugiat arcu facilisis. Vestibulum vulputate tellus nisl, eget lacinia diam vehicula vitae. Fusce porttitor condimentum turpis a venenatis. Aenean ullamcorper bibendum tellus et egestas. Suspendisse tempor ullamcorper lorem et convallis."
  },
  {
    name: "Canyon Floor",
    image: "https://farm4.staticflickr.com/3290/3753652230_8139b7c717.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin finibus nisl et justo rutrum blandit. Fusce lectus neque, faucibus porta quam vel, ultrices rhoncus nisi. Morbi sit amet nunc eget odio aliquam fringilla ut vel tortor. Nam tellus elit, commodo sit amet sem et, ullamcorper tempus massa. Praesent turpis lacus, sodales vel neque iaculis, suscipit bibendum dolor. Duis accumsan nibh velit, quis tincidunt diam sollicitudin vitae. Donec ornare arcu lacinia dui gravida, a porta urna suscipit. Cras justo nibh, tristique sed malesuada vehicula, scelerisque a nisl. Integer sed tortor sed ligula ultricies volutpat sit amet eleifend elit. Mauris sagittis nisi et ex luctus, et feugiat arcu facilisis. Vestibulum vulputate tellus nisl, eget lacinia diam vehicula vitae. Fusce porttitor condimentum turpis a venenatis. Aenean ullamcorper bibendum tellus et egestas. Suspendisse tempor ullamcorper lorem et convallis."
  }
];

function seedDB(){
  // remove campgrounds
  Campground.remove({}, function(err){
    if(err){
      console.log(err);
    }
    console.log("removed campgrounds");

    // add a few campgrounds
    data.forEach(function(seed){
      Campground.create(seed, function(err,campground){
        if(err){
          console.log(err);
        } else {
          console.log("added a campground");
          // create a comment
          Comment.create(
            {
              text: "This place is great, but I wish there was internet!",
              author: "Homer"
            }, function(err, comment){
                if(err){
                  console.log(err);
                } else {
                  campground.comments.push(comment);
                  campground.save();
                  console.log("created new comment");
                }
            });
        }
      });
    });
  });

};

module.exports = seedDB;
