// app/page.jsx

import Head from 'next/head'
import React from 'react'
import Header from './components/Header'
import Section from './components/SectionComponent'
import Footer from './components/Footer'
import LoginPage from './(auth)/login/page'

function page() {
  return (
    <div  >
      <Header />
      <Section/>
      <Footer/>

      {/* <LoginPage/> */}
    </div>
  )
}

export default page
