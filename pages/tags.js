import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Navbar from '../components/Navbar'
import tagcss from '../styles/Tagspage.module.css'
function tags() {
  return (
    <>
      <Head>
    <link rel="icon" href="/favicon.ico" />
       
      </Head>
    <Navbar/>
    <div className={tagcss.tagsparent}>
      <h1>Popular Tags</h1>
      <div className={tagcss.alltags}>
          <Link href='/tags/navbar'>
            <button>Navbar</button>
          </Link>
          <Link href='/tags/card'>
          <button>Cards</button>
          </Link>
          <Link href='/tags/loginpage'>
          <button>Login Page</button>
          </Link>
          <Link href='/tags/footer'>
          <button>Footer</button>
          </Link>
      </div>
        {/* <h2>All Tags</h2>  
        <div className={tagcss.tag}>
            <h2>Navbar </h2>
            <h2>Cards</h2>
            <h2>Footer</h2>
            <h2>Ui</h2>
            <h2>Login Page</h2>
            <h2>Animation</h2>
            <h2>Loaders</h2>

        </div> */}
       
    </div>
    </>)
}

export default tags