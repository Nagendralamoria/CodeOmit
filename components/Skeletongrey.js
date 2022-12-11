import Head from 'next/head'
import React from 'react'
import skelcss from '../styles/Skeletongrey.module.css'
function Skeletongrey() {
  return (
 <>
 <Head>
        <title>Codeomit</title>
            <meta name="description" content="All the components code you need to create a amazing website at one place. It contains well written, well optimize code in different languages  like React JS, HTML5, Angular....  "  />
            <meta name="keywords" content="Data Structures,Algorithms,UI,UI Design,UX/UI,Figma,Python,Java,C,C++,JavaScript,Android Development,SQL,Data Science,Machine Learning,PHP,Web Development,System Design,Tutorial,Technical Blogs,Interview Experience,Interview Preparation,Programming,Competitive Programming,SDE Sheet,Job-a-thon,Coding Contests,GATE CSE,HTML,CSS,React,NodeJS,Placement,Aptitude,Quiz,Computer Science,Programming Examples,GeeksforGeeks Courses,Puzzles"></meta>
            <meta property="og:title" content="Codeomit" />
            <meta property="og:description" content="All the components code you need to create a amazing website at one place. It contains well written, well optimize code in different languages  like React JS, HTML5, Angular....  " />
            <meta property="og:url" content="https://codeomit.com/" />
            <meta property="og:type" content="website" />
        
        <link rel="icon" href="./images/logo.png" />
      </Head>

    <div className={skelcss.cardani}>
   {/* <p>Loading....</p>  */}
    </div>
    </>
     )
}

export default Skeletongrey