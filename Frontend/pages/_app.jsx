import "@/styles/globals.css";
import Header from "@/components/Header";

export default function App({ Component, pageProps }) {
  return (
    <>
      <main id="site-wrapper">
        <Component {...pageProps} />
      </main>
    </>
  );
}
