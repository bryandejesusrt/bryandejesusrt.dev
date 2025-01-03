import Head from "next/head";

export default function Home() {



  // services data
  const services = [
    {
      title: "Web Development",
      description: "I am very good in web development offering services, I offer reliable web development services to generate the most remarkable results which your business need."
    },
    {
      title: "Mobile Development",
      description: "Experienced mobile developer offering innovative solutions. Proficient in creating high-performance, user-centric mobile apps. Expertise in iOS, Android, and cross-platform development."
    },
    {
      title: "Digital Marketing(SEO)",
      description: "My digital marketing services will take your business to the next level, we offer remarkable digital marketing strategies that drives traffic to your website, your business, and improves your brand awareness to potential customers."
    },
    {
      title: "Content Creator",
      description: "Passionate photographer and videographer capturing moments with creativity. Transforming visions into visual stories. Expert in visual storytelling, skilled in both photography and videography to deliver captivating content."
    }
  ];


  

  return (
    <>
      <Head>
        <title>vbmcoder - Personal Portfolio</title>
        <meta name="description" content="vbmcoder - Personal Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
      </Head>

      {/* hero section */}
      <section className="hero">
      
      </section>

      {/* Services */}
      <section className="services">
        
      </section>

      {/* Projects */}
      <section className="projects">
       
      </section>

      {/* Experience study */}
      <section className="exstudy">

      </section>

      {/* My Skills */}
      <section className="myskills">
      
      </section>

      {/* Recent Blogs */}
      <section className="recentblogs">
       
      </section>

    </>
  );
}
