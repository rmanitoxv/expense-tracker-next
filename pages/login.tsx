import React, { FormEvent, useEffect } from "react"
import { loginHandler } from "./utils/apiHandler"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

const Login = () => {
  const router = useRouter()
  const { status } = useSession()

  useEffect(() => {
    if (status === "authenticated") router.push("/")
  }, [status, router])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const response = await loginHandler(formData)
    if (response.ok) router.push("")
  }
  return (
    <div className="flex flex-col items-center justify-center flex-grow gap-8">
      <form
        className="px-10 flex flex-col items-center gap-4 w-1/3 bg-slate-900 py-10 rounded-xl"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold">LOGIN</h1>
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
          <div className="w-1/4">Password:</div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="flex-grow py-2 px-4 rounded-lg"
            required
          />
        </div>
        <button className="border-2 mt-4 border-white rounded-lg px-4 py-2 hover:text-slate-900 hover:bg-white">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Login
