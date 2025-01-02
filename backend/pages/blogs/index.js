// import { loadBindings } from "next/dist/build/swc";
import Dataloading from "@/components/Dataloading";
import userFetchData from "@/hooks/useFetchData";
import { SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SiBloglovin } from "react-icons/si";

export default function Blogs() {
  // pagination
  const [currentPage, setCurrentPage] = useState(1); // for page 1
  const [perPage] = useState(7);

  // search
  const [searchQuery, setSearchQuery] = useState("");

  // fetch data
  const { alldata, loading } = userFetchData("/api/blogs");

  // funtion to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // total number of blogs
  const allblogs = alldata.length;

  // filter all data base on search query
  const filteredBlogs =
    searchQuery.trim() === ""
      ? alldata
      : alldata.filter((blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  // calculate index of the first blog
  const indexOfFirstBlog = (currentPage - 1) * perPage;
  const indexOfLastBlog = currentPage * perPage;

  //Get current page`s blogs

  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const publishedblogs = currentBlogs.filter((ab) => ab.status === "published");

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allblogs / perPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div className="">
            <h2>
              All Published<span> / </span>
              <span>Blogs</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <SiBloglovin /> <span>/</span>
            <span>allBlogs</span>
          </div>
        </div>
        <div className="blogstable">
          <div className="flex gap-2 mb-1">
            <h2>Search Blogs</h2>
            <input
              value={searchQuery}
              onChange={(ev) => setSearchQuery(ev.target.value)}
              type="text"
              placeholder="Serarch by title..."
            />
          </div>
          <table className="table table-styling">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Title</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td>
                    <Dataloading />
                  </td>
                </tr>
              ) : (
                publishedblogs.map((blog, index) => (
                  <tr key={blog._id}>
                    <td>{indexOfFirstBlog + index + 1}</td>
                    <td>
                      <img
                        src={blog.image[0]}
                        width="100px"
                        alt="image baout"
                      />
                    </td>
                    <td>{blog.title}</td>
                    <td>
                      <div className="flex gap-2 flex-center">
                        <Link href={"/blogs/delete/" + blog._id}>
                          <button>
                            <Trash2 />
                          </button>
                        </Link>
                        <Link href={"/blogs/edit/" + blog._id}>
                          <button>
                            <SquarePen />
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
