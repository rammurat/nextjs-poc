import { signIn } from 'next-auth/client'

export default function AccessDenied () {
  return (
    <div className="container-fluid">
      <h1 className="text-center">Access Denied</h1>
      <div className="alert alert-danger" role="alert">
        <a href="/api/auth/signin"
           onClick={(e) => {
           e.preventDefault()
           signIn()
        }}>You must be signed in to view this page</a>
      </div>
    </div>
  )
}