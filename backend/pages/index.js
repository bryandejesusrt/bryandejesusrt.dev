import Head from "next/head";
import { Bar } from "react-chartjs-2";
import Loading from "@/components/Loading";
import { HomeIcon } from "lucide-react";
import { useState, useEffect } from "react";

import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { set } from "mongoose";

export default function Home() {
  Chartjs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const [blogsData, setBlogsData] = useState([]);
  // const [projectsData, setProjectsData] = useState([]);
  // const [productsData, setProductsData] = useState([]);
  // const [shopData, setShopData] = useState([]);
  const [loading, setLoading] = useState(true);

  // define option withing the component scope
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Blogs Created Monthly by Year",
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        setBlogsData(data);

        // const res2 = await fetch("/api/projects");
        // const data2 = await res2.json();
        // setProjectsData(data2);

        // const res3 = await fetch("/api/products");
        // const data3 = await res3.json();
        // setProductsData(data3);

        // const res4 = await fetch("/api/shop");
        // const data4 = await res4.json();
        // setShopData(data4);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // add data vy year and month
  const monthlyData = blogsData
    .filter((dat) => dat.status === "published")
    .reduce((acc, blog) => {
      const year = new Date(blog.createdAt).getFullYear();
      const month = new Date(blog.createdAt).getMonth();
      acc[year] = acc[year] || Array(12).fill(0);
      acc[year][month]++;
      return acc;
    }, {});

  const currentYear = new Date().getFullYear();
  const years = Object.keys(monthlyData);
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const datasets = years.map((year) => ({
    label: `${year}`,
    data: monthlyData[year] || Array(12).fill(0),
    backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)}, 0.2)`,
  }));

  const data = {
    labels,
    datasets, // Changed from dataSets to datasets
  };

  return (
    <>
      <Head>
        <title>Portfolio bryandejesusrt.dev Backend</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="dashboard">
        <div className="titledashboard flex flex-sb">
          <div className="">
            <h2>
              Admin<span> Dashboad</span>
            </h2>
            <h3>Admin Panel</h3>
          </div>
          <div className="breadcrumb">
            <HomeIcon /> <span>/</span>
            <span>Home</span>
          </div>
        </div>
        {/* dashboard four cards */}
        <div className="topfourcards flex flex-sb">
          <div className="four_card">
            <h2>Total Blogs</h2>
            <span>
              {blogsData.filter((dat) => dat.status === "published").length}
            </span>
          </div>
          <div className="four_card">
            <h2>Total Projects</h2>
            <span>100</span>
          </div>
          <div className="four_card">
            <h2>Total Products</h2>
            <span>100</span>
          </div>
          <div className="four_card">
            <h2>Gallery Photos</h2>
            <span>100</span>
          </div>
        </div>

        {/* Year overview */}
        <div className="year_overview flex flex-sb">
          <div className="leftyearoverview">
            <div className="flex flex-sb">
              <h3>Year Overview</h3>
              <ul className="creative-dots">
                <li className="big-dot"></li>
                <li className="semi-big-dot"></li>
                <li className="medium-dot"></li>
                <li className="semi-medium-dot"></li>
                <li className="semi-small-dot"></li>
                <li className="small-dot"></li>
              </ul>
              <h3 className="text-right">
                {blogsData.filter((dat) => dat.status === "published").length} /
                365
                <br />
                <span>Total Published </span>
              </h3>
            </div>
            <Bar data={data} options={options} />
          </div>
          <div className="right_salescont">
            <div>
              <h3>Blogs Category </h3>
              <ul className="creative-dots">
                <li className="big-dot"></li>
                <li className="semi-big-dot"></li>
                <li className="medium-dot"></li>
                <li className="semi-medium-dot"></li>
                <li className="semi-small-dot"></li>
                <li className="small-dot"></li>
              </ul>
            </div>
            <div className="blogscategory flex flex-center">
              <table>
                <thead>
                  <tr>
                    <td>Topic</td>
                    <td>Data</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Next JS</td>
                    <td> {blogsData.filter((dat) => dat.category[0] === "Python").length}</td>
                  </tr>
                  <tr>
                    <td>Next JS</td>
                    <td> {blogsData.filter((dat) => dat.category[0] === "Python").length}</td>
                  </tr>
                  <tr>
                    <td>Next JS</td>
                    <td> {blogsData.filter((dat) => dat.category[0] === "Python").length}</td>
                  </tr>
                  <tr>
                    <td>Next JS</td>
                    <td> {blogsData.filter((dat) => dat.category[0] === "Python").length}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
