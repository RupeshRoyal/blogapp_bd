const Comment = require("../models/commentModel");
const Blog = require("../models/blogModel");

exports.createComment = async(req,res) => {
    try{

        //fetch data from req body
        const {blog,user,body}= req.body;

        const comment = new Comment({
            blog,user,body,
        });

        const savedComment = await comment.save();

        const updatedBlog = await Blog.findByIdAndUpdate(blog,
            {$push:{comments: savedComment._id}},
            {new:true})
            // .populate("comments")//populate the comments array with comment documents
            // .exec();

        //send a json response with a success flag
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
            data:"internal server error",
            message:err.message,
        }
        );
    }
};