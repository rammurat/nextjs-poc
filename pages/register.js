import Head from 'next/head';
import { useRef } from 'react';
import axios from 'redaxios';
import {useState} from 'react'

export default function Register() {
  const [message, setMessage] = useState('');

  const emailRef = useRef();
  const passRef = useRef();
  const nameRef = useRef();


  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();

    const data = {
      email: emailRef.current.value,
      password: passRef.current.value,
      name: nameRef.current.value
    };

    const result = await axios.post('/api/register', data);
    console.log(result);

    // reset form if user added 
    if(result.data.user._id) {
      setMessage(result.data.message)
    }
  };

  return (
    <div className="">
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-2">
        <h1 className="font-bold">Register!</h1>
        {message && 
          <div className="alert alert-success" role="alert">
            {message}
          </div>
        }
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" placeholder="name" ref={nameRef} />
          </div>
          <div>
            <input type="text" placeholder="email" ref={emailRef} />
          </div>
          <div>
            <input type="password" placeholder="Password" ref={passRef} />
          </div>

          <input type="submit" value="Register" />
        </form>
      </main>
    </div>
  );
}