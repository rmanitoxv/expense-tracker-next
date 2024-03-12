import NextAuth, { SessionStrategy } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/libs/prismadb"
import bcrypt from "bcrypt"

interface ExtendedUser {
  id?: string
  fname?: string | null | unknown
  lname?: string | null | unknown
  email?: string | null | unknown
}
interface ExtendedAdapterUser {
  id?: string
  email?: string | null
  fname?: string
  lname?: string
}
const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password)
          throw new Error("Invalid email or password")

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        })

        if (!user || !user?.password)
          throw new Error("Invalid email or password")

        const isCorrectPassword = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isCorrectPassword) throw new Error("Invalid email or password")

        return user
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      const user = session.user as ExtendedUser
      if (user) {
        user.id = token.sub
        user.fname = token.fname
        user.lname = token.lname
      }
      return session
    },
    async jwt({ token, user }: { token: any; user: any }) {
      const profile = user as ExtendedAdapterUser
      if (profile) {
        token.fname = profile.fname
        token.lname = profile.lname
      }
      return token
    },
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  secret: process.env.AUTH_SECRET,
}

export default NextAuth(authOptions)
export { authOptions }
