const router = require("express").Router();

 const User = require ('../models/Users');
 const Post = require ('../models/posts');
 const bcrypt = require('bcrypt');
const { findByIdAndUpdate } = require("../models/Users");
// Create Post
 router.post("/", async (req,res)=>{
    const newPost = new Post(req.body);
  try{  
    
const SavePost =  await newPost.save();
res.status(200).json(SavePost);
  }catch(err){
      res.status(500).json(err)

  }

 })

 //delete post

router.delete("/:id", async (req , res) =>{
 try{
     const post =  await Post.findById(req.params.id);
      const username = req.body.username
      if (post.username === username){
        try{
          await post.delete();
          res.status(200).json("Post has been deleted")
        }catch(err){
            res.status(400).json(err)
        }}else{
        res.status(401).json("you can delete only your post ")
        }

    }catch(err){
        res.status(500).json(err)
    }})





   
    
// update post
router.put("/:id", async (req , res) =>{
  try{
      const post =  await Post.findById(req.params.id);
       if (post.username === req.body.username){
         try{
           const updatedPost = await Post.findByIdAndUpdate(
               req.params.id,
             req.body)
            
             
           res.status(200).json(updatedPost);
         }catch(err){
             res.status(400).json(err)
         }}else{
         res.status(402).json("you can update only your post ")
         }
 
     }catch(err){
         res.status(500).json(err)
     }})

     
 // get Post
 router.get("/:id",async  (req , res)=>{
   
        try {
            const post = await Post.findById(req.params.id);
           
            res.status(200).json(post)
         }catch (err){
          res.status(500).json(err)
         }
         
 } )

// get all posts 
router.get("/",async  (req , res)=>{
   const username = req.query.user;
   const catName = req.query.cat;
  try {
    let posts;
    if(username){
      posts = await  Post.find({username})
    }else if (catName){
      posts = await  Post.find({categories :{$in : [catName]}})
    }else{
      posts = await  Post.find();
    }
    res.status(200).json(posts)
   }catch (err){
    res.status(500).json(err)
   }
   
} )


module.exports = router;
  
