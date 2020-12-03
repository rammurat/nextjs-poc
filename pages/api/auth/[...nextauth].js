import { verify } from 'argon2';
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import {middleware, db} from '../../../middleware/database';
import nextConnect from 'next-connect';

const handler = nextConnect();
handler.use(middleware);

const options = {
  pages: {
    signIn: '/login'
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
        // Add logic here to look up the user from the credentials supplied
        const user = await db.collection('users').findOne({email: credentials.email})
       
        if (user && await verify(user.password, credentials.password)) {
          // Any object returned will be saved in `user` property of the JWT
          return Promise.resolve(user)
        } else {
          return Promise.resolve(null)
        }
      }
    })
    // ...add more providers here
  ],
  callbacks: {
    /**
     * @param  {object} user     User object
     * @param  {object} account  Provider account
     * @param  {object} profile  Provider profile 
     * @return {boolean}         Return `true` (or a modified JWT) to allow sign in
     *                           Return `false` to deny access
     */
    signIn: async (user, account, profile) => {
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        return Promise.resolve(true)
      } else {
        // Return false to display a default error message
        return Promise.resolve(false)
        // You can also Reject this callback with an Error or with a URL:
        // return Promise.reject(new Error('error message')) // Redirect to error page
        // return Promise.reject('/path/to/redirect')        // Redirect to a URL
      }
    }
  },

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
}

// export default (req, res) => NextAuth(req, res, options)

handler.get(async (req, res) => NextAuth(req, res, options))
handler.post(async (req, res) => NextAuth(req, res, options))

export default handler