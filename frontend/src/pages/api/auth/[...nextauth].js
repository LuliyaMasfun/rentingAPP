import NextAuth from "next-auth/next";
import AuthService from "../../../services/auth-service";

import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      // // The name to display on the sign in form (e.g. "Sign in with...")
      // name: "Credentials",

      // credentials: {
      //   email: { label: "email", type: "text", placeholder: "name" },
      //   password: { label: "Password", type: "password" },
      // },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const { email, password } = credentials;

        const res = AuthService.login(email, password);

        console.log(res);

        const user = await res.json();

        if (res.ok && user) {
          return user;
        } else return null;

        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

        // if (user) {
        //   // Any object returned will be saved in `user` property of the JWT
        //   return user;
        // } else {
        //   // If you return null then an error will be displayed advising the user to check their details.
        //   return null;

        //   // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        // }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token;

      return session;
    },
  },
};

export default NextAuth(authOptions);
