import { signIn, signOut, useSession } from 'next-auth/client'
import fetch from 'isomorphic-unfetch'
import { useRouter } from 'next/router'
import { useRef } from 'react';
import '../styles/Nav.module.css'

function Nav({data}) {
  const [ session, loading ] = useSession()
  const textRef = useRef();
  const router = useRouter()
  
  function handleSubmit(e) {
    e.preventDefault();
    const text = textRef.current.value
    return router.push(`/search/${text}`)
  }

  return (<div>
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <a className="navbar-brand" href="/">Debs</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">          
          <li className="nav-item">
            <a className="nav-link" href="/static/about">About us</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/static/contact">Contact us</a>
          </li>

          {session ?
          <li className="nav-item">
            <a className="nav-link" href="/my-account">My account</a>
          </li> : <li className="nav-item">
            <a className="nav-link" href="/register">Register</a>
          </li>
          }

          <li className="nav-item dropdown">
            {!session ?
              <a className="nav-link" href={`/api/auth/signin`}  onClick={(e) => {
                    e.preventDefault()
                    signIn()
                  }}>Sign in</a>
            :
              <a className="nav-link"  href={`/api/auth/signout`} onClick={(e) => {
                    e.preventDefault()
                    signOut()
                  }}><span>{session.user.name}</span> (Sign out)</a>
            }
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
          <input ref={textRef}  className="form-control mr-sm-2" name="text" type="text" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success my-2 my-sm-0 mx-md-2" type="submit">Search</button>
        </form>

        <button type="button" className="btn btn-outline-primary mx-md-2">Saved items</button>
        <button type="button" className="btn btn-outline-danger mx-md-2">Cart</button>
      </div>
    </nav>

    {!session ?
    <nav className="container-fluid">
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <a className="nav-link" href="/products">All Products <span className="sr-only">(current)</span></a>
        </li>
        {data && data.map((item, i) => (
          <li key={i} className="nav-item dropdown">
            <button className="nav-link dropdown-toggle" data-toggle="dropdown"  role="button" aria-haspopup="true" aria-expanded="false">{item.name}</button>
            <div className="dropdown-menu">
              {item.sub_cats.map((row, j) => (
                <a  key={j} className="dropdown-item" href={`/products/${row.name.toLowerCase()}`}>{row.name}</a>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </nav> : false
    }
  </div>)
}

  
export default Nav