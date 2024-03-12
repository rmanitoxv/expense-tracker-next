import axios from "axios"
import { signIn } from "next-auth/react"

export const registerHandler = async (formData: FormData) => {
  const data = {
    fname: formData.get("fname"),
    lname: formData.get("lname"),
    email: formData.get("email"),
    password: formData.get("password"),
  }
  return await axios
    .post("/api/register", data)
    .then(async (res) => {
      return await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      })
        .then((res) => res)
        .catch((err) => err)
    })

    .catch((err) => err)
}

export const loginHandler = async (formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  }
  return await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: false,
  })
    .then((res) => res)
    .catch((err) => err)
}

export const getUser = async () => {
  return await axios
    .get("/api/user")
    .then((res) => res)
    .catch((err) => err)
}

export const editUser = async (formData: FormData) => {
  const data = {
    fname: formData.get("fname"),
    lname: formData.get("lname"),
    email: formData.get("email"),
    password: formData.get("password"),
    opassword: formData.get("opassword"),
  }
  return await axios.patch("/api/user", data)
}

export const createExpense = async (formData: FormData) => {
  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
    amount: parseFloat(formData.get("amount") as string),
  }
  return await axios
    .post("/api/expense", data)
    .then((res) => res)
    .catch((err) => err)
}

export const getExpense = async () =>
  await axios
    .get("/api/expense")
    .then((res) => res)
    .catch((err) => err)

export const editExpense = async (formData: FormData, id: string) => {
  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
    amount: parseFloat(formData.get("amount") as string),
  }
  return await axios
    .patch(`/api/expense/${id}`, data)
    .then((res) => res)
    .catch((err) => err)
}

export const deleteExpense = async (id: string) => {
  return await axios
    .delete(`/api/expense/${id}`)
    .then((res) => res)
    .catch((err) => err)
}
