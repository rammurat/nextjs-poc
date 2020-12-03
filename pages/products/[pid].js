import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
function PDP({data}) {
  return (
    <div className="container-fluid">
        <div className="row flex-xl-nowrap">
            <main role="main" className="psp-main-content col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-2">
                            <ul className="pdp-thumbs">
                                {data.images.thumbs.map((s, i) => (
                                <li key={i}><img src={s} class="img-thumbnail"/></li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-md-5">
                        <img class="img-thumbnail" src={data.images.url} alt="my image" />
                        </div>
                        <div className="col-md-5">
                            <h3>{data.name}</h3>
                            <p>Now £{data.price[0].gbp}</p>
                            <p>Sizes <select>
                                {data.sizes.map((s, i) => (
                                <option key={i}>{s}</option>
                                ))}
                            </select>
                            </p>
                            <p>
                                <button type="button" class ="btn btn-success">Add to bag</button>
                            </p>
                           
                        </div>
                    </div>
                    <hr/>

                    <p>
                        Shop more... {data.tags.map((s, i) => (
                            <span key={i} class="badge badge-info">{s.name}</span>
                        ))}
                    </p>
                    <p>{data.description}</p>
                    <hr/>

                    <h2>Delivery options</h2>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                
                                <div class="media">
                                <svg class="bi bi-chevron-right" width="32" height="32" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6.646 3.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L12.293 10 6.646 4.354a.5.5 0 010-.708z"/></svg>
                                    <div class="media-body">
                                        <h5 class="mt-0">{data.delivery_options[0].standard.name}</h5>
                                        <p>{data.delivery_options[0].standard.options.map((s, i) => (
                                            <div><span key={i}>{s.name}</span>
                                            <span key={i}>{s.price}</span></div>
                                        ))}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr/>
                    </div>
                </div>
            </main>
        </div>
    </div>
  )
}

PDP.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/products')
  const json = await res.json()
  return { data: json }
}

export default PDP