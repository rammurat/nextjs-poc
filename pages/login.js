import { csrfToken } from 'next-auth/client';
import Head from 'next/head';
import style from '../styles/Login.module.css'
import Layout from '../components/layout'

export default function Login({ query, csrfToken }) {
  const error = query.error === 'CredentialsSignin' || false
  return (
    <Layout>

      <main className="p-2 text-center">
        <form className={style.formSignin} method="post" action="/api/auth/callback/credentials">
          {error && 
          <div className="alert alert-danger" role="alert">
            Invalid user or password
          </div> }
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input type="email" name="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus/>
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" name="password" id="inputPassword" className="form-control" placeholder="Password" required/>
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me"/> Remember me
            </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
      </main>
      </Layout>
  );
}

Login.getInitialProps = async (context) => {
  return {
    query: context.query,
    csrfToken: await csrfToken(context),
  };
};