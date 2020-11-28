import { signIn, signOut, useSession } from 'next-auth/client'

import styles from '../styles/Home.module.css'
import fetch from 'isomorphic-unfetch'

import Header from '../components/header'
import Footer from '../components/footer'
import Nav from '../components/nav'
import Home from './home'

function App({data}) {
  const [ session, loading ] = useSession()  
  return (
    <div className={styles.container}>

    {!session && <>
      Not signed in <br/>
      <button onClick={signIn}>Sign in</button>
    </>}

    {session && <>
      
      <Header />

      <Nav />

      <main role="main">

      Signed in as {JSON.stringify(session.user)} <br/>
      <button onClick={signOut}>Sign out</button>


        <Home />
      </main>

      <Footer />

    </>}


    </div>
  )
}

App.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/lingerie')
  const json = await res.json()
  return { data: json }
}

export default App