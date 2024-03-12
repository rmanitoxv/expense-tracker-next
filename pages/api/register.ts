import { hash } from "bcrypt"
import prisma from "@/libs/prismadb"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    if (request.method !== "POST")
      return response.status(405).json({ message: "Method Not Allowed" })
    let { fname, lname, email, password } = request.body

    password = await hash(password, 10)

    const user = await prisma.user.create({
      data: {
        fname,
        lname,
        email,
        password,
      },
    })
    return response.status(201).json(user)
  } catch (err) {
    console.error(err)
    return response.status(500).json(err)
  }
}
