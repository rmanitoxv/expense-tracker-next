import prisma from "@/libs/prismadb"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import {} from "next-auth/react"
import { authOptions } from "./auth/[...nextauth]"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { title, description, amount } = req.body
      const session = await getServerSession(req, res, authOptions)
      const userId = session.user.id
      const expense = await prisma.expense.create({
        data: {
          userId,
          title,
          description,
          amount,
        },
      })
      return res.status(201).json(expense)
    } else if (req.method === "GET") {
      const session = await getServerSession(req, res, authOptions)
      const userId = session.user.id
      const expense = await prisma.expense.findMany({
        where: {
          userId: userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
      return res.status(201).json(expense)
    } else {
      return res.status(405).json({ error: "Method not allowed" })
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json(err)
  }
}

export default handler
