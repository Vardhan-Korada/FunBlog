//CONFIGURING OUR APP
var express = require('express') , bodyParser = require('body-parser') , mongoose = require('mongoose'), app = express(), methodOverride = require('method-override');
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
//CONFIGURING OUR MONGOOSE
var blogSchema = new mongoose.Schema(
    {
        title:String,
        image:{type:String, default:"https://avatars2.githubusercontent.com/u/35238799?s=88&v=4"},
        body:String,
        created:{type:Date, default:Date.now}
    })
var Blog = mongoose.model("Blog",blogSchema);
//RESTFUL ROUTES
app.get("/",function(req,res)
{
    res.redirect("/blogs");
})
//INDEX ROUTE
app.get("/blogs",function(req,res)
{
    Blog.find({},function(err,blogs)
    {
      if(err)
      {
          console.log("Something went wrong!!");
      }
      else
      {
      res.render("index",{blogs:blogs});  
      }
    })
})
//NEW ROUTE
app.get("/blogs/new",function(req,res)
{
    res.render("new");
})
//CREATE ROUTE
app.post("/blogs",function(req,res)
{
    Blog.create(req.body.blog,function(err,newBlog)
    {
       if(err)
       {
           alert("Post adding is unsuccesful");
           res.redirect("/blogs/new");
       }
       else
       {
           res.redirect("/blogs");
       }
    })
})
//SHOW ROUTE
app.get("/blogs/:id",function(req,res)
{
   Blog.findById(req.params.id,function(err,foundBlog)
   {
       if(err)
       {
           console.log("Cannot find the blog. Something went wrong??");
           res.redirect("/blogs");
       }
       else
       {
          res.render("show",{blog:foundBlog});   
       }
   })
})
//EDIT ROUTE
app.get("/blogs/:id/edit",function(req,res)
{
    Blog.findById(req.params.id,function(err,foundBlog)
    {
        if(err)
        {
            console.log("Sorry!Can't find the blog!!Something went wrong!!");
        }
        else
        {
            res.render("edit",{blog:foundBlog});
        }
    })
    
})
//UPDATE ROUTE
app.put("/blogs/:id",function(req,res)
{
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog)
    {
        if(err)
        {
            console.log("Something went wrong!!Blog has not been updated!!");
            res.redirect("/blogs");
        }
        else
        {
            res.redirect("/blogs/"+req.params.id);
        }
    })
})
//DELETE ROUTE
app.delete("/blogs/:id",function(req,res)
{
    Blog.findByIdAndRemove(req.params.id,function(err)
    {
        if(err)
        {
            console.log("Something went wrong!! Not able to delete!!");
            res.redirect("/blogs");
        }
        else
        {
            res.redirect("/blogs");
        }
    })
})
//STARTING OUR SERVER
app.listen(process.env.PORT,process.env.IP,function(){console.log("APP IS RUNNING");})