const router = require("express").Router();
// const express = require("express");
const Blog = require("../models/Blog");

// Your routing code goes here

//Fetch blogs with pagination and search

// router.get("/blog", async (req, res) => {
//   // res.json({ok:'blog'})
//   const page = parseInt(req.query.page) || 1;
//   const search = req.query.search || "";

//   const perPage = 5;
//   const skip = (page - 1) * perPage;

//   const query = search ? { topic: { $regex: search, $options: "i" } } : {};

//   try {
//     const blogs = await Blog.find(query)
//       .skip(skip)
//       .limit(perPage)
//       .sort({ posted_at: -1 });

//     res.json({ status: "success", result: blogs });
//   } catch (error) {
//     res.status(500).json({ status: "error", error: error.message });
//   }
// });
router.get('/blog', async (req, res) => {
  const page = parseInt(req.query.page) || 1;

  const perPage = 5;
  const skip = (page - 1) * perPage;

  const query = {
    deleted: { $ne: true } 
  };

  try {
    const blogs = await Blog.find(query)
      .skip(skip)
      .limit(perPage)
      .sort({ posted_at: -1 });

    res.json({ status: 'success', result: blogs });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// Create a new blog
router.post("/blog", async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();
    res.json({ status: "success", result: newBlog });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
});

// Update a blog by ID
router.put("/blog/:id", async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ status: "success", result: updatedBlog });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
});

//Delete a blog by ID

// router.delete("/blog/:id", async (req, res) => {
//   try {
//     const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
//     res.json({ status: "success", result: deletedBlog });
//   } catch (error) {
//     res.status(400).json({ status: "error", error: error.message });
//   }
// });

router.delete('/blog/:id', async (req, res) => {
  try {
    const deletedBlog = await Blog.findOneAndDelete({
      _id: req.params.id,
      'user._id': req.user._id // Match user's ID
    });

    if (!deletedBlog) {
      return res.status(404).json({ status: 'error', message: 'Blog not found or unauthorized' });
    }

    res.json({ status: 'success', result: deletedBlog });
  } catch (error) {
    res.status(400).json({ status: 'error', error: error.message });
  }
});

module.exports = router;
