import { verify } from 'argon2';
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
// import middleware from '../../../middleware/database';
// import nextConnect from 'next-connect';

// const handler = nextConnect();
// handler.use(middleware);

const options = {
  pages: {
    signIn: '/login',
    signOut: '/register',
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, email, password, 2FA token, etc.
      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: {  label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        console.log('=================>>>>>>>>>>>>>>', credentials)
        // Add logic here to look up the user from the credentials supplied
        // const user = await credentials.db.collection('user').findOne({email: credentials.email})
        const user = {email: 'rammurat', password: 'idea123', name: 'Ram Murat Sharma'}
        
        if (user && user.password === 'idea123') {
          // Any object returned will be saved in `user` property of the JWT
          return Promise.resolve(user)
        } else {
          return null
        }
      }
    })
    // ...add more providers here
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
}

export default (req, res) => NextAuth(req, res, options)