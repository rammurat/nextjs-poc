import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import { Provider } from 'next-auth/client'

import Header from '../components/header'
import Footer from '../components/footer'
import Nav from '../components/nav'

export default function App ({ Component, pageProps }) {
  return (
    <Provider 
      // Provider options are not required but can be useful in situations where
      // you have a short session maxAge time. Shown here with default values.
      options={{
        // Client Max Age controls how often the useSession in the client should
        // contact the server to sync the session state. Value in seconds.
        // e.g.
        // * 0  - Disabled (always use cache value)
        // * 60 - Sync session state with server if it's older than 60 seconds
        clientMaxAge: 0,
        // Keep Alive tells windows / tabs that are signed in to keep sending
        // a keep alive request (which extends the current session expiry) to
        // prevent sessions in open windows from expiring. Value in seconds.
        //
        // Note: If a session has expired when keep alive is triggered, all open
        // windows / tabs will be updated to reflect the user is signed out.
        keepAlive: 0
      }}
      session={pageProps.session}
    >
      <Header />

      <Nav />
     
      {/* <ul className="nav">
        <li><a href="#">About</a></li>
        <li><a href="#">Portfolio</a>
          <ul>
            <li><a href="#">item</a></li>
            <li><a href="#">item</a></li>
            <li><a href="#">item</a></li>
            <li><a href="#">item</a></li>
          </ul>
        </li>
        <li><a href="#">Resume</a>
          <ul>
            <li><a href="#">item a lonng submenu</a></li>
            <li><a href="#">item</a>
              <ul>
                <li><a href="#">Ray</a></li>
                <li><a href="#">Veronica</a></li>
                <li><a href="#">Bushy</a></li>
                <li><a href="#">Havoc</a></li>
              </ul>
            </li>
            <li><a href="#">item</a></li>
            <li><a href="#">item</a></li>
          </ul>
        </li>
        <li><a href="#">Download</a></li>
        <li><a href="#">Rants</a>
          <ul>
            <li><a href="#">item</a></li>
            <li><a href="#">item</a></li>
            <li><a href="#">item</a></li>
            <li><a href="#">item</a></li>
          </ul>
        </li>
        <li><a href="#">Contact</a></li>
      </ul> */}
     

      <Component {...pageProps} />

      <Footer />

    </Provider>
  )
}