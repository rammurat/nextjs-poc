import Head from 'next/head';
import { useRef } from 'react';
import axios from 'redaxios';
import {useState} from 'react'
import style from '../styles/Login.module.css'
import { csrfToken } from 'next-auth/client';
import Layout from '../components/layout'
export default function Register() {
  const [message, setMessage] = useState('');

  const emailRef = useRef();
  const passRef = useRef();
  const nameRef = useRef();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passRef.current.value
    };

    const result = await axios.post('/api/register', data);

    // reset form if user added 
    if(result.data.user._id) {
      setMessage(result.data.message)
      e.target.reset();
    }
  };

  return (
    <Layout>

      <main className="p-2 text-center">
        <form onSubmit={handleSubmit} className={style.formSignin} >
          {message && 
            <div className="alert alert-success" role="alert">
              {message}
            </div>
          }
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <h1 className="h3 mb-3 font-weight-normal">Register!</h1>

          <label htmlFor="inputName" className="sr-only">Name</label>
          <input  ref={nameRef} type="name" name="name" id="inputName" className="form-control" placeholder="Full name" required autoFocus/>

          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input  ref={emailRef} type="email" name="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus/>
          
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input  ref={passRef}  type="password" name="password" id="inputPassword" className="form-control" placeholder="Password" required/>
          
          <br/>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
        </form>
      </main>
    </Layout>
  );
}

Register.getInitialProps = async (context) => {
  return {
    query: context.query,
    csrfToken: await csrfToken(context),
  };
};