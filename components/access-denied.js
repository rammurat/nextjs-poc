import { signIn } from 'next-auth/client'
import Layout from '../components/layout'

export default function AccessDenied ({nav}) {
  return (
    <Layout {...nav}>
        <div className="card text-center m-5">
          <h5 className="card-header">Access Denied!</h5>
          <div className="alert alert-danger" role="alert">
            <a href="/api/auth/signin"
              onClick={(e) => {
              e.preventDefault()
              signIn()
            }}>You must be signed in to view this page</a>
          </div>
        </div>
      </Layout>
  )
}