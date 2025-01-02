import ReactMarkdown from "react-markdown";
import MarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Spinner from "./Spinner";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import axios from "axios";
import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { Trash2 } from "lucide-react";

export default function Blog({
  _id,
  title: exitingTitle,
  slug: exitingSlug,
  description: exitingDescription,
  image: exitingImage,
  category: exitingCategory,
  blogcontent: exitingBlogContent,
  tags: exitingTags,
  status: exitingStatus,
}) {
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState(exitingTitle || "");
  const [slug, setSlug] = useState(exitingSlug || "");
  const [description, setDescription] = useState(exitingDescription || "");
  const [image, setImage] = useState(exitingImage || []);
  const [category, setCategory] = useState(exitingCategory || []);
  const [blogcontent, setBlogContent] = useState(exitingBlogContent || "");
  const [tags, setTags] = useState(exitingTags || []);
  const [status, setStatus] = useState(exitingStatus || "draft");

  //for images upload
  const [isUploading, setIsUploading] = useState(false);
  // const upLoadImage = [];

  // create blog axios post request
  async function createBlog(e) {
    e.preventDefault();

    if (isUploading) {
      await Promise.all(upLoadImagesQueue);
    }

    setIsUploading(true);
    const data = {
      title,
      slug,
      description,
      image,
      category,
      blogcontent,
      tags,
      status,
    };

    try {
      let res;
      if (_id) {
        res = await axios.put(`/api/blogs`, { _id, ...data });
      } else {
        res = await axios.post("/api/blogs", data);
      }

      if (res.status === 201 || res.status === 200) {
        toast.success("Blog saved successfully");
      } else {
        toast.error("Something went wrong");
      }

      setIsUploading(false);
      setRedirect(true);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
      setIsUploading(false);
    }
  }
  async function uploadImages(event) {
    const files = event.target.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const upLoadImagesQueue = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append("image", file);
        try {
          // Use the axios.post method and push the promise to the queue
          upLoadImagesQueue.push(
            axios.post("/api/upload", formData).then((res) => {
              if (Array.isArray(res.data.links)) {
                setImage((oldImages) => [...oldImages, ...res.data.links]);
              } else {
                console.error("Unexpected response format:", res.data);
                toast.error("An error occurred while uploading images");
              }
            })
          );
        } catch (error) {
          console.error(error);
          toast.error("An error occurred while uploading images");
        }
      }

      try {
        // Wait for all promises to resolve
        await Promise.all(upLoadImagesQueue);
        toast.success("All images uploaded successfully");
      } catch (error) {
        console.error("Error uploading images:", error);
        toast.error("An error occurred while uploading images");
      } finally {
        setIsUploading(false);
      }
    } else {
      toast.error("No image selected");
    }
  }

  if (redirect) {
    router.push("/blogs");
    return null;
  }

  function updateImageOrder(images) {
    setImage(images);
  }

  function handlDeleteImage(index) {
    const updateImages = [...image];
    updateImages.splice(index, 1);
    setImage(updateImages);
    toast.success("Image deleted successfully");
  }
  //for slug url
  const handleSludChange = (ev) => {
    const inputValue = ev.target.value;
    const slug = inputValue.toLowerCase().replace(/\s/g, "-");
    setSlug(slug);
  };

  return (
    <>
      <form action="" className="addWebsiteform" onSubmit={createBlog}>
        {/*blog title*/}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="Title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter small title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {/*blog description*/}
        <div className="description w-100 flex flex-col flex-left mb-2">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {/*blog slug Url*/}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="slug">Slug (seo friendly url)</label>
          <input
            type="text"
            id="slug"
            placeholder="Enter slug url"
            value={slug}
            onChange={handleSludChange}
          />
        </div>
        {/*blog category*/}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="category">
            Select Category (for multi select press ctrl + mouse left key)
          </label>
          <select
            name="category"
            id="category"
            multiple
            onChange={(e) =>
              setCategory(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            value={category}
          >
            <option value="JavaScript">JavaScript</option>
            <option value="Node JS">Node Js</option>
            <option value="React Js">React Js</option>
            <option value="Next Js">Next Js</option>
            <option value="Express Js">Express Js</option>
            <option value="MongoDB">MongoDB</option>
            <option value="Flutter">Flutter</option>
            <option value="Dart">Dart</option>
            <option value="Python">Python</option>
            <option value="Database">Database</option>
            <option value="Web Development">Web Development</option>
            <option value="Web Design">Web Design</option>
            <option value="UI/UX">UI/UX</option>
            <option value="Others">Others</option>
          </select>
        </div>
        {/* Blog Image */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <div className="w-100">
            <label htmlFor="images">Upload Image</label>
            <input
              type="file"
              className="mt-1"
              accept="images/*"
              multiple
              id="image"
              onChange={uploadImages}
            />
          </div>
          <div className="w-100 flex  flex-left mt-1">
            {isUploading && <Spinner />}
          </div>
        </div>
        {/* image preview  imagen sortable with delete image */}
        {!isUploading && Array.isArray(image) && image.length > 0 && (
          <div className="flex">
            <ReactSortable
              list={image}
              setList={updateImageOrder}
              animation={200}
              className="flex gap-1"
            >
              {image.map((img, index) => (
                <div key={img} className="uploadedimg">
                  <img
                    src={img}
                    alt={`bryandejesusrt.dev ${index + 1}`}
                    className="object-cover"
                  />
                  <div className="deleteimg">
                    <button onClick={() => handlDeleteImage(index)}>
                      <Trash2 />
                    </button>
                  </div>
                </div>
              ))}
            </ReactSortable>
          </div>
        )}

        {/* Blog Content markdown */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="blogcontent">Blog content</label>
          <MarkdownEditor
            id="blogcontent"
            value={typeof blogcontent === "string" ? blogcontent : ""}
            onChange={(ev) => setBlogContent(ev.text)}
            style={{ height: "500px", width: "100%" }}
            renderHTML={(text) => (
              //text is the markdown content
              <ReactMarkdown
                components={{
                  code: ({ node, inline, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || "");
                    if (inline) {
                      return <code>{children}</code>;
                    } else if (match) {
                      return (
                        // style code with button to copy code
                        <div style={{ position: "relative" }}>
                          <pre
                            style={{
                              padding: "0",
                              borderRadius: "5px",
                              overflow: "auto",
                              whiteSpace: "pre-wrap",
                            }}
                            {...props}
                          >
                            <code>{children}</code>
                          </pre>

                          <button
                            style={{
                              position: "absolute",
                              right: "0",
                              top: "0",
                              zIndex: "1",
                            }}
                            onClick={() => {
                              navigator.clipboard.writeText(children);
                            }}
                          >
                            Copy code
                          </button>
                        </div>
                      );
                    } else {
                      return <code>{children}</code>;
                    }
                  },
                }}
              >
                {text}
              </ReactMarkdown>
            )}
          />
        </div>
        {/* Blog Tags */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="tags">Tags</label>
          <select
            name="tags"
            id="tags"
            multiple
            onChange={(e) =>
              setTags(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            value={tags}
          >
            <option value="JavaScript">JavaScript</option>
            <option value="Node JS">Node Js</option>
            <option value="React Js">React Js</option>
            <option value="Next Js">Next Js</option>
            <option value="Express Js">Express Js</option>
            <option value="MongoDB">MongoDB</option>
            <option value="Flutter">Flutter</option>
            <option value="Dart">Dart</option>
            <option value="Python">Python</option>
            <option value="Database">Database</option>
            <option value="Web Development">Web Development</option>
            <option value="Web Design">Web Design</option>
            <option value="UI/UX">UI/UX</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="status">Status</label>
          <select
            name="status"
            id="status"
            onChange={(ev) => setStatus(ev.target.value)}
            value={status}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div className="w-100 mb-2 mt-1">
          <button type="submit" className="w-100 addbebbtn flex-center">
            Save Blog
          </button>
        </div>
      </form>
    </>
  );
}

{
  /* Blog Meta Description */
}
{
  /* <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="metaDescription">Meta Description</label>
          <input
            type="text"
            id="metaDescription"
            placeholder="Enter meta description"
          />
        </div> */
}
{
  /* Blog Meta Keywords */
}
{
  /* <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="metaKeywords">Meta Keywords</label>
          <input
            type="text"
            id="metaKeywords"
            placeholder="Enter meta keywords"
          />
        </div> */
}
{
  /* Blog Meta Author */
}
{
  /* <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="metaAuthor">Meta Author</label>
          <input type="text" id="metaAuthor" placeholder="Enter meta author" />
        </div> */
}
{
  /* status blog */
}
