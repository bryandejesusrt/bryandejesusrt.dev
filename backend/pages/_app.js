import "@/styles/globals.css";
import ParentComponent from "@/components/ParentComponent";
import { useState } from "react";
import Loading from "@/components/Loading";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const [asideOpen, setAsideOpen] = useState(false);
  const router =  useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleEnd = () => setLoading(false);

    //verify if the route is already completed
    if (router.isReady) {
      setLoading(false);
    }

    //add event listener to the route
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleEnd);
    router.events.on("routeChangeError", handleEnd);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleEnd);
      router.events.off("routeChangeError", handleEnd);
    };
  }, [router]);

  const AsideClickOpen = () => {
    setAsideOpen(!asideOpen);
  };

  return (
    <>
      {loading ? (
        <div className="flex flex-col flex-center wh_100">
          <Loading />
          <h1 className="mt-10 text-center">Loading...</h1>
        </div>
      ) : (
        <>
          <ParentComponent aapOpen={asideOpen} appAsideOpen={AsideClickOpen} />
          <main>
            <div className={asideOpen ? "container" : "container active"}>
              <Component {...pageProps} />
            </div>
          </main>
        </>
      )}
    </>
  );
}
