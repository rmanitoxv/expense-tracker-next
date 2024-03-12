import React, { FormEvent, useEffect, useState } from "react"
import { registerHandler } from "./utils/apiHandler"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

const Register = () => {
  const router = useRouter()
  const { status } = useSession()
  const [error, setError] = useState("")

  useEffect(() => {
    if (status === "authenticated") router.push("/")
  }, [status, router])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    if (formData.get("password") !== formData.get("cpassword"))
      return setError("Password and Confirm Password are not the same.")
    const response = await registerHandler(formData)
    if (response.ok) router.push("")
    else return setError("Email is already taken.")
  }
  return (
    <div className="flex-grow flex flex-col items-center justify-center gap-8">
      <form
        className="px-10 flex flex-col items-center gap-4 w-1/3 bg-slate-900 py-10 rounded-xl"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold">REGISTER</h1>
        <div className="w-full flex gap-2 items-center">
          <div className="w-1/4">Email:</div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="flex-grow py-2 px-4 rounded-lg"
            required
          />
        </div>
        <div className="w-full flex gap-2 items-center">
          <div className="w-1/4">First Name:</div>
          <input
            type="text"
            placeholder="First Name"
            name="fname"
            className="flex-grow py-2 px-4 rounded-lg"
            required
          />
        </div>
        <div className="w-full flex gap-2 items-center">
          <div className="w-1/4">Last Name:</div>
          <input
            type="text"
            placeholder="Last Name"
            name="lname"
            className="flex-grow py-2 px-4 rounded-lg"
            required
          />
        </div>
        <div className="w-full flex gap-2 items-center">
          <div className="w-1/4">Password:</div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="flex-grow py-2 px-4 rounded-lg"
            minLength={6}
            required
          />
        </div>
        <div className="w-full flex gap-2 items-center">
          <div className="w-1/4">Confirm Password:</div>
          <input
            type="password"
            placeholder="Confirm Password"
            name="cpassword"
            className="flex-grow py-2 px-4 rounded-lg"
            minLength={6}
            required
          />
        </div>
        <button className="border-2 mt-4 border-white rounded-lg px-4 py-2 hover:text-slate-900 hover:bg-white">
          Submit
        </button>
      </form>
      <div className="text-red-500 text-lg">{error}</div>
    </div>
  )
}

export default Register
