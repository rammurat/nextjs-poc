import Head from 'next/head'
import styles from '../styles/Home.module.css'
import fetch from 'isomorphic-unfetch'

import Header from '../components/header'
import Footer from '../components/footer'
import Nav from '../components/nav'
import Home from './home'

function App({data}) {
  return (
    <div className={styles.container}>
      <Header />

      <Nav />

      <main role="main">
        <Home />
      </main>

      <Footer />
    </div>
  )
}

App.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/lingerie')
  const json = await res.json()
  return { data: json }
}

export default App