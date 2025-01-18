import Head from "next/head";
import { Bar } from "react-chartjs-2";
import Loading from "@/components/Loading";
import { HomeIcon } from "lucide-react";
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
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
            <span>100</span>
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
              <h3 className="text-right">10 / 365</h3>
              <br />
              <span> / </span>Total Published
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
