import { signIn, signOut, useSession } from 'next-auth/client'

import styles from '../styles/Home.module.css'
import fetch from 'isomorphic-unfetch'

import Header from '../components/header'
import Footer from '../components/footer'
import Nav from '../components/nav'
import Home from './home'

function App() {
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


export default App