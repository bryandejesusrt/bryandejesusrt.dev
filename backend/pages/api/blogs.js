import Blog from "@/models/Blog";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
  await mongooseConnect();

  const { method } = req;
  if (req.method === "POST") {
    const {
      title,
      slug,
      description,
      image,
      category,
      blogcontent,
      tags,
      status,
      comments,
      author,
    } = req.query;
    const blogDoc = await Blog.create({
      title,
      slug,
      description,
      image,
      category,
      blogcontent,
      tags,
      status,
      comments,
      author,
    });
    res.status(201).json({ success: true, data: blogDoc });
  }
  if (req.method === "GET") {
    if (req.query?.id) {
      res.json(await Blog.findById(req.query.id));
    } else {
      res.json((await Blog.find()).reverse());
    }
  }
  if (req.method === "PUT") {
    const {
      _id,
      title,
      slug,
      description,
      image,
      category,
      blogcontent,
      tags,
      status,
      comments,
      author,
    } = req.body;
    await Blog.updateOne(
      { _id },
      {
        title,
        slug,
        description,
        image,
        category,
        blogcontent,
        tags,
        status,
        comments,
        author,
      }
    );
    res.status(200).json({ success: true });
  }
  if (req.method === "DELETE") {
    if (req.query?.id) {
      await Blog.deleteOne({ _id: req.query.id });
      res.status(200).json({ success: true });
    }
  }
}
