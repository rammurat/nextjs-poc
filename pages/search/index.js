import fetch from 'isomorphic-unfetch'
import Layout from '../../components/layout'

import {getNavMenuData} from '../../services/apis'

function PSP({data, nav}) {
  return (
    <Layout {...nav}>
      <div className="row flex-xl-nowrap">
        <main role="main" className="container psp-main-content">
          <div className="card-group"> 
            {data && data.length ? data.map((item, i) => (
                <a key={i} href={`/products/${item.sub_cat_name}/${item.id}`}>
                  <div className="card" key={i}>
                    <img src={item.images.url} className="card-img-top" alt="..."/>
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">Sizes <select>
                        {item.sizes.map((s, i) => (
                          <option key={i}>{s}</option>
                        ))}
                      </select>
                      </p>
                      <p className="card-text"><small className="text-muted">Now £{item.price[0].gbp}</small></p>
                    </div>
                </div>
              </a>
            )) : <div className="alert alert-info text-center" role="alert">No products</div>}
          </div>
        </main>
      </div>
    </Layout>
  )
}

// This gets called on every request
export async function getServerSideProps(context) {
   // Fetch data from external API
   const {
    query: { pid },
  } = context

  const res = await fetch(`http://localhost:3000/api/search?text=${pid || ''}`)
  const data = await res.json()
  const nav = await getNavMenuData()

  // Pass data to the page via props
  return { props: { data, nav } }
}

export default PSP