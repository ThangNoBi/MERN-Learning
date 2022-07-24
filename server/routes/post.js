const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth");

const Post = require("../models/Post");

// @route GET api/posts
// @desc GET  POST
// @access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate();
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// @route POST api/posts
// @desc CREATE POST
// @access Private
router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  // Simple validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });
  else if (!url)
    return res.status(400).json({ success: false, message: "Url is required" });

  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || "TO LEARN",
      user: req.userId,
    });

    await newPost.save();

    res.json({ success: true, message: "Happy learning !!", post: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// UPDATE POST
router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  // Simple validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });
  else if (!url)
    return res.status(400).json({ success: false, message: "Url is required" });

  try {
    let updatedPost = {
      title,
      description: description || "",
      url: (url.startsWith("https://") ? url : `https://${url}`) || "",
      status: status || "TO LEARN",
    };

    const postUpdateCondition = { _id: req.params.id, user: req.userId };
    updatedPost = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      { new: true }
    );

    // User not authorised to update post or post not found
    if (!updatedPost)
      return res
        .status(401)
        .json({ success: false, message: "Post not found" });

    res.json({
      success: true,
      message: "Excellent progress !!",
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
});

// DELETE POST
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const postDelCondition = { _id: req.params.id, user: req.userId };
    const deletedPost = await Post.findOneAndDelete(postDelCondition);

    // User not authorised or post not found
    if (!deletedPost)
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });

    res.json({ success: true, post: deletedPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
});

module.exports = router;
