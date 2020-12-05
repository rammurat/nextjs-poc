import styles from '../styles/Home.module.css'
import Header from '../components/header'
import Footer from '../components/footer'
import Nav from '../components/nav'

function Layout({children, data}) {
  
  return (
    <div className="container-fluid">
      <Header/>

      <Nav data={data}/>

      {children}

      <Footer/>
    </div>
  )
}

export default Layout