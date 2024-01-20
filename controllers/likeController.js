const Like = require("../models/likeModel");
const Blog = require("../models/blogModel");
const { response } = require("express");

exports.likeBlog = async(req,res) => {
    try{
        const {blog,user}= req.body;
        const like= new Like({
            blog,user,
        });
        const savedLike = await like.save();

        const updatedBlog = await  Blog.findByIdAndUpdate(blog,
            {$push: {likes:savedLike._id}},
            {new: true}
            )

        //send a json response with a success flag
        res.json(
            {
                blog: updatedBlog,
            }
        );
    }
    catch(err) {
        console.error(err);
        console.log(err);
        res.status(500).json(
            {
            success:false,
            data:"error while liking blog",
            message:err.message,
        }
        );
    }
};

exports.unlikeBlog = async(req,res) => {
    try{
        //send a json response with a success flag
        const {blog,like} = req.body;

        //find and delete from the collection
        const deletedLike = await Like.findOneAndDelete({blog: blog, _id: like}); 

        const updatedBlog = await Blog.findByIdAndUpdate(
            blog,
            {$pull: {likes: deletedLike._id}},
            {new: true}
        );

        //update collection
        res.json(
            {
                blog:updatedBlog,
            }
        );
    }
    catch(err) {
        console.error(err);
        console.log(err);
        res.status(500).json(
            {
            success:false,
            data:"error while unliking blog",
            message:err.message,
        }
        );
    }
};