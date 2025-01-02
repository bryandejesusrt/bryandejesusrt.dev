import Blog from "@/components/Blog";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IdCard } from "lucide-react";
import Head from "next/head";

export default function EditProduct() {
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

  return (
    <>
      <Head>
        <title>Update Blog</title>
      </Head>
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
        <div className="mt-3">{blogInfo && <Blog {...blogInfo} />}</div>
      </div>
    </>
  );
}
