import {CredentialsSignin, type NextAuthConfig} from 'next-auth'
import google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'

class InvalidLoginError extends CredentialsSignin {
  code = 'Invalid identifier or password'
}

const authConfig: NextAuthConfig = {
  providers: [
    google({
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Heslo', type: 'password' },
      },
      async authorize(credentials) {
          throw new InvalidLoginError()
      }
    })
  ],
}

export default authConfig
