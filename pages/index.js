import styles from '../styles/Home.module.css'
import Layout from '../components/layout'

import {getNavMenuData} from '../services/apis'

function Home({nav, data}) {
  return (
    <Layout {...nav}>
      <main role="main">
        <div className="container home-page">
            <div className="card-group">
            {data && data.length ? data.map((row, i) => (
              <a key={i} href={`/products/${row.name}`}>
                <div className="card">
                  <img src={row.image} className="card-img-top" alt="..."/>
                  <div className="card-body">
                    <h5 className="card-title">{row.name}</h5>
                  </div>
                </div>
              </a>
              )) : 
              <div className="alert alert-info text-center" role="alert">No products</div>}
            </div>
          </div>
      </main>
    </Layout>
  )
}

// // This gets called on every request
export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/home`)
  const data = await res.json()
  const nav = await getNavMenuData()

  // Pass data to the page via props
  return { props: { data, nav } }
}

export default Home