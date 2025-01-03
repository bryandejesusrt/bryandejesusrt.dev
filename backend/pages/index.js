import Head from "next/head";
import { Bar } from "react-chartjs-2";
import Loading from "@/components/Loading";

export default function Home() {
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
            <h2>Admin<span>Dashboad</span></h2>
            <h3>Admin Panel</h3>            
          </div>
          <div className="breadcrumb"></div>
        </div>
      </div>
    </>
  );
}
