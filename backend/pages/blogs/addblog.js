import Blog from "@/components/Blog";
import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoginLayout from "@/components/LoginLayout";
import { SiBloglovin } from "react-icons/si";

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [blogInfo, setBlogInfo] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios
        .get(`/api/blogs?id=${id}`)
        .then((res) => {
          setBlogInfo(res.data.blog); // Asegúrate de acceder a la propiedad correcta
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>Add Blog</title>
      </Head>
      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div className="">
            <h2>
              All Draft<span> / </span>
              <span>Blogs</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <SiBloglovin /> <span>/</span>
            <span>Add Blog</span>
          </div>
        </div>
        <div className="blogsadd">
          <Blog />
        </div>
      </div>
    </>
  );
}
