import prisma from "@/libs/prismadb"
import { hash, compare } from "bcrypt"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import {} from "next-auth/react"
import { authOptions } from "./auth/[...nextauth]"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      const session = await getServerSession(req, res, authOptions)
      const id = session.user.id
      const user = await prisma.user.findFirstOrThrow({
        where: {
          id: id,
        },
      })
      return res.status(201).json(user)
    } else if (req.method === "PATCH") {
      const session = await getServerSession(req, res, authOptions)
      const id = session.user.id
      let { fname, lname, email, password, opassword } = req.body

      let user
      if (password) {
        const result = await prisma.user.findFirstOrThrow({
          where: {
            id: id,
          },
        })
        if (!(await compare(opassword, result.password || "")))
          return res.status(401).json({ error: "Old password is incorrect." })

        password = await hash(password, 10)
        user = await prisma.user.update({
          where: {
            id: id as string,
          },
          data: {
            password: password,
          },
        })
      } else {
        user = await prisma.user.update({
          where: {
            id: id as string,
          },
          data: {
            fname: fname,
            lname: lname,
            email: email,
          },
        })
      }
      return res.status(201).json(user)
    } else {
      return res.status(405).json({ error: "Method not allowed" })
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json(err)
  }
}

export default handler
