// const mongooose = require('mongoose');

// const blogSchema = new mongooose.Schema({
//     // Your code goes here
//     topic: String,
//     description: String,
//     posted_at: Date,
//     posted_by: String
// })

// const Blog = mongooose.model('blogs', blogSchema);

// module.exports = Blog;

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String
});

const blogSchema = new mongoose.Schema({
  topic: String,
  description: String,
  posted_at: Date,
  user: userSchema // Nesting the user schema
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;