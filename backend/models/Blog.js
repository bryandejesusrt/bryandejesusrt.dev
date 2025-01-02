import mongoose from "mongoose";
const { Schema, models, model } = require("mongoose");

const BlogSchema = new Schema(
  {
    title: { type: String },
    slug: { type: String },
    description: { type: String },
    image: [{ type: String }],
    category: [{ type: String }],
    blogcontent: [{ type: String }],
    tags: [{ type: String }],
    status: { type: String },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);
const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
export default Blog;
