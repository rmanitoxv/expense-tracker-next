import prisma from "@/libs/prismadb"
import { NextApiRequest, NextApiResponse } from "next"
import {} from "next-auth/react"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "PATCH") {
      const { id } = req.query
      const { title, description, amount } = req.body
      console.log(id)
      const expense = await prisma.expense.update({
        where: {
          id: id as string,
        },
        data: {
          title: title,
          description: description,
          amount: amount,
        },
      })
      return res.status(201).json(expense)
    } else if (req.method === "DELETE") {
      const { id } = req.query
      const expense = await prisma.expense.delete({
        where: {
          id: id as string,
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
