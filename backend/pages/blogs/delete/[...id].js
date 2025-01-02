import Blog from "@/components/Blog";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IdCard, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Head } from "next/document";

export default function DeleteBlogs() {
  const router = useRouter();
  const { id } = router.query;
  const [blogInfo, setblogInfo] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios
        .get("/api/blogs?id=" + id)
        .then((res) => {
          setblogInfo(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  async function goBack() {
    router.push("/blogs");
  }

  async function deleteBlog() {
    await axios.delete("/api/blogs?id=" + id);
    toast.success("Blog deleted successfully");
    goBack();
  }

  return (
    <>
      {/* <Head>Delete Blog</Head> */}
      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>Update {blogInfo ? blogInfo.title : "Loading..."}</h2>
            <h3>ADMIN PANEL</h3>
          </div>

          <div className="breadcrumb">
            <IdCard /> <span>/</span>
            <span>Update Blog</span>
          </div>
        </div>
        <div className="deletesec flex flex-center wh_100">
          <div className="deletecard">
            <Trash2 size={50} color="#c72323" />
            <h2 className="cookieHeading">Are you sure?</h2>
            <p className="cookieDescription">
              If you delete this website content it will be permenent delete
              your content.
            </p>
            <div className="buttonContainer">
              <button onClick={deleteBlog} className="acceptButton">
                Delete
              </button>
              <button onClick={goBack} className="declineButton">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
