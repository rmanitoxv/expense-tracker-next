import { editUser } from "@/utils/apiHandler"
import React, { Dispatch, FormEvent, useEffect, useRef, useState } from "react"

interface ChangePasswordProps {
  isChangePasswordOpen: boolean
  setIsChangePasswordOpen: Dispatch<React.SetStateAction<boolean>>
}

const ChangePassword = ({
  isChangePasswordOpen,
  setIsChangePasswordOpen,
}: ChangePasswordProps) => {
  const ChangePasswordRef = useRef<HTMLDivElement>(null)

  const [error, setError] = useState("")

  useEffect(() => {
    if (isChangePasswordOpen && ChangePasswordRef.current)
      ChangePasswordRef.current.focus()
  }, [isChangePasswordOpen])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    const formData = new FormData(e.currentTarget)
    if (formData.get("password") === formData.get("cpassword")) {
      return editUser(formData)
        .then(() => {
          e.currentTarget.reset()
          setIsChangePasswordOpen(false)
        })
        .catch((error) => setError(error?.response?.data?.error))
    }
    setError("Password and Confirm Password is not the same.")
  }

  return (
    <div
      ref={ChangePasswordRef}
      tabIndex={1}
      onBlur={(e) => {
        const currentTarget = e.currentTarget
        requestAnimationFrame(() => {
          if (!currentTarget.contains(document.activeElement)) {
            setIsChangePasswordOpen(false)
          }
        })
      }}
      className={`fixed z-10 top-[10%] left-1/2 -translate-x-1/2 rounded-xl bg-slate-900 px-6 transition-all overflow-hidden select-none ${
        isChangePasswordOpen ? "w-[39rem] h-96" : "w-0 h-0"
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-4 h-full">
        <h1>Change Password</h1>
        <form
          className="px-10 flex flex-col items-center w-full gap-4"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex gap-2 items-center">
            <div className="w-2/5">Old Password:</div>
            <input
              type="password"
              placeholder="Old Password"
              name="opassword"
              className="flex-grow py-2 px-4 rounded-lg"
              required
            />
          </div>
          <div className="w-full flex gap-2 items-center">
            <div className="w-2/5">New Password:</div>
            <input
              type="password"
              placeholder="New Password"
              name="password"
              className="flex-grow py-2 px-4 rounded-lg"
              required
            />
          </div>
          <div className="w-full flex gap-2 items-center">
            <div className="w-2/5">Confirm Password:</div>
            <input
              type="password"
              placeholder="Confirm Password"
              name="cpassword"
              className="flex-grow py-2 px-4 rounded-lg"
              required
            />
          </div>
          <button className="border-2 border-white rounded-lg px-4 py-2 hover:text-slate-900 hover:bg-white">
            Submit
          </button>
        </form>
        <h1 className="text-red-500 font-bold"> {error}</h1>
      </div>
    </div>
  )
}

export default ChangePassword
