

import styles from '../styles/Home.module.css'

import Header from '../components/header'
import Footer from '../components/footer'
import Nav from '../components/nav'
import Home from './home'

function App() {

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


export default App