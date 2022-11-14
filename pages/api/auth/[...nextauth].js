import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import connectMongo from "../../../database/conn";
import Users from "../../../model/Schema";
import { compare } from "bcryptjs";
export const authOptions = {
  // Configure one or more authentication providers
  session: {
    strategy: "jwt",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        connectMongo().catch((err) => {
          err: "Connection Failed...!";
        });

        //check user existance
        const result = await Users.findOne({ email: credentials.email });
        if (!result) {
          throw new Error("No User Found with this Email Please Sign Up...!");
        }

        //compare()

        const checkPassword = await compare(
          credentials.password,
          result.password
        );

        //incorrect password
        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("Email or Password doesn't match!");
        }

        return result;
      },
    }),
  ],
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  database: process.env.DATABASE_URL,
  adapter: MongoDBAdapter(clientPromise),
};

export default NextAuth(authOptions);
