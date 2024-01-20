const express = require("express");
const router = express.Router();

//import controllers
const {createBlog,getAllBlogs} = require("../controllers/blogController");
 const {likeBlog,unlikeBlog} = require("../controllers/likeController");
const {createComment} = require("../controllers/commentController");



//mapping create
router.post("/comments/create",createComment);
router.post("/blogs/create",createBlog);
router.get("/blogs",getAllBlogs);
router.post("/likes/like",likeBlog);
router.post("/likes/unlike",unlikeBlog);


//export controller
module.exports = router;