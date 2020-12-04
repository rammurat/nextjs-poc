import fetch from 'isomorphic-unfetch'

function PSP({data}) {
  return (
    <div className="container-fluid">
      <div className="row flex-xl-nowrap">
        <main role="main" className="psp-main-content col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content">
          <h1 >
            Products
          </h1>

          <div className="card-deck">      
            {data.map((item, i) => (
                <a href={`/products/${item.id}`}>
                  <div className="card" key={i}>
                    <img src={item.images.url} className="card-img-top" alt="..."/>
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p>Sizes <select>
                        {item.sizes.map((s, i) => (
                          <option key={i}>{s}</option>
                        ))}
                      </select>
                      </p>
                      <p className="card-text"><small className="text-muted">Now £{item.price[0].gbp}</small></p>
                    </div>
                </div>
              </a>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/lingerie`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

export default PSP