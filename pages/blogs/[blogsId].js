import { doc, getDoc } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import { React, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { db } from "../../firebase";
import blogsindicss from "../../styles/Blogsindipage.module.css";
function BlogsId() {
  const router = useRouter();
  const itemId = router.query.blogsId;
  const [componentscode, setComponentcode] = useState([]);
  const componentsCollectionRef = doc(db, "blogs", `${itemId}`);

  useEffect(() => {
    const getComponents = async () => {
      const data = await getDoc(componentsCollectionRef);
      setComponentcode(data.data());
      // setLoadingPage(true);
    };
    getComponents();
  }, [itemId]);

  return (
    <>
      <Head>
        <title>{componentscode?.title} - Codeomit</title>
        <meta name="description" content={`${componentscode?.introduction}`} />
        <meta
          property="og:title"
          content={`${componentscode?.title} - Codeomit`}
        />
        <meta
          property="og:description"
          content={`${componentscode?.introduction}`}
        />
        <meta property="og:url" content={`https://codeomit/blogs/${itemId}`} />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className={blogsindicss.blog_indi_parent}>
        <h1>{componentscode?.title}</h1>
        <p>{componentscode?.introduction} </p>
        <img alt={`${componentscode.title}`} src={componentscode?.compimage} />
        <div className={blogsindicss.blog_indi_textarea}>
          <div className={blogsindicss.blog_indi_suggestedblogs}>
            <img
              alt="card"
              src="https://cdn.pixabay.com/photo/2023/01/05/22/35/flower-7700011_960_720.jpg"
            />
            <h4>Full Stack Developer</h4>
          </div>
          <div className={blogsindicss.blog_indi_textare_line}>
            <p></p>
          </div>
          <div className={blogsindicss.blogs_indi_textare_para}>
            <p>{componentscode?.codeinst}</p>{" "}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BlogsId;
