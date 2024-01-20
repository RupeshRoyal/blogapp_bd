const Blog = require("../models/blogModel");
const comments= require("../models/commentModel");

exports.createBlog = async(req,res) => {
    try{
        const {title,body} = req.body;

        const blog =new Blog ({
            title,body,
        });

        const savedBlog = await blog.save();


        //send a json response with a success flag
        res.json(
            {
                blog:savedBlog,
            }
        );
    }
    catch(err) {
        console.error(err);
        console.log(err);
        res.status(500).json(
            {
            success:false,
            data:"error while creating post",
            message:err.message,
        }
        );
    }
};


exports.getAllBlogs = async(req,res) =>{

    try{
        const blogs = await Blog.find().populate("comments").exec();
        res.json({
            blogs,
        })
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json(
            {
            success:false,
            data:"error while getting all post",
            message:err.message,
        }
        );
    }

};