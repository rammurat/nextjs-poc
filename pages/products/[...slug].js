
import fetch from 'isomorphic-unfetch'
import Image from 'next/image'

import {getNavMenuData} from '../../services/apis'
import Layout from '../../components/layout'

function PDP({data, nav}) {
  return (
    <Layout {...nav}>
        <div className="row flex-xl-nowrap">
            <main role="main" className="psp-main-content col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content">
                {data && data.name ?
                <div className="container"> 
                    <div className="row">
                        <div className="col-md-2">
                            <ul className="pdp-thumbs">
                                {data.images.thumbs.map((s, i) => (
                                <li key={i}><img src={s} className="img-thumbnail"/></li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-md-5">
                        <img className="img-thumbnail" src={data.images.url} alt="my image" />
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
                            <span key={i} className="badge badge-info">{s.name}</span>
                        ))}
                    </p>
                    <p>{data.description}</p>
                    <hr/>

                    <h3>Delivery options</h3>
                    <br/>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="media">
                                    <div className="media-body">
                                        <h6 className="mt-0">{data.delivery_options[0].standard.name}</h6>
                                        <div>{data.delivery_options[0].standard.options.map((s, i) => (
                                            <div key={s.name}>
                                                <span className="delivery-option-icon"><Image src="/icon-tick.svg" alt="me" width="16" height="16" /></span>
                                                <span className="delivery-option-name" >{s.name}</span>
                                                <span className="delivery-option-price">£{s.price}</span>
                                            </div>
                                        ))}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="media">
                                    <div className="media-body">
                                        <h6 className="mt-0">{data.delivery_options[1].click_collect.name}</h6>
                                        <div>{data.delivery_options[1].click_collect.options.map((s, i) => (
                                            <div key={s.name}>
                                                <span className="delivery-option-icon"><Image src="/icon-tick.svg" alt="me" width="16" height="16" /></span>
                                                <span  className="delivery-option-name" >{s.name}</span>
                                                <span className="delivery-option-price" >{s.price}</span>
                                            </div>
                                        ))}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="media">
                                    <div className="media-body">
                                        <h6 className="mt-0">{data.delivery_options[2].international.name}</h6>
                                        <div>{data.delivery_options[2].international.options.map((s, i) => (
                                            <div  key={s.name}>
                                                <span className="delivery-option-icon"><Image src="/icon-cross.svg" alt="me" width="16" height="16" /></span>
                                                <span  className="delivery-option-name" >{s.name}</span>
                                                <span  className="delivery-option-price">{s.price}</span>
                                            </div>
                                        ))}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr/>
                    </div>
                </div>
                : <div className="alert alert-info text-center" role="alert">No product</div> }
            </main>
        </div>
    </Layout>
  )
}

// This gets called on every request
export async function getServerSideProps(context) {
    const { query: { slug }} = context
    // const params = `sub_cat=${slug[0]}&pid=${slug[1]}`
    
    // Fetch data from external API
    const res = await fetch(`http://localhost:3000/api/products/${slug[0]}/${slug[1]}`)
    const data = await res.json()
    const nav = await getNavMenuData()
  
    // Pass data to the page via props
    return { props: { data, nav } }
}

export default PDP