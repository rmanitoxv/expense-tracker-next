import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"
import { HiDotsHorizontal } from "react-icons/hi"
import EditProfile from "./EditProfile"
import ChangePassword from "./ChangePassword"
import { getUser } from "@/utils/apiHandler"

interface ExtendedUser {
  fname: string
  lname: string
}

const Header = () => {
  const { data: session } = useSession()
  const [name, setName] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)
  const DropDownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getUser().then((res) => setName(res.data?.fname + " " + res.data?.lname))
  }, [session])
  return (
    <div className="flex items-center justify-between text-xl py-8 px-48 bg-slate-900">
      <Link href={"/"} className="text-3xl">
        EXPENSE TRACKER
      </Link>
      {session ? (
        <div
          className="relative select-none"
          ref={DropDownRef}
          tabIndex={2}
          onBlur={(e) => {
            const currentTarget = e.currentTarget
            requestAnimationFrame(() => {
              if (!currentTarget.contains(document.activeElement)) {
                setIsDropdownOpen(false)
              }
            })
          }}
        >
          <div
            className="flex gap-2 items-center cursor-pointer hover:bg-slate-800 rounded-full px-8 py-4"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div>{name}</div>
            <HiDotsHorizontal />
          </div>
          {isDropdownOpen && (
            <div className="flex flex-col bg-slate-900 absolute top-full px-4 py-2 rounded-lg w-max left-1/2 -translate-x-1/2">
              <button
                className="hover:bg-slate-800 px-4 py-1 cursor-pointer rounded-lg"
                onClick={() => setIsEditProfileOpen(true)}
              >
                Edit Profile
              </button>
              <button
                className="hover:bg-slate-800 px-4 py-1 cursor-pointer rounded-lg"
                onClick={() => setIsChangePasswordOpen(true)}
              >
                Change Password
              </button>
              <button
                className="hover:bg-slate-800 px-4 py-1 cursor-pointer rounded-lg"
                onClick={() => signOut()}
              >
                Log-out
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-4">
          <Link href="/login">Login</Link>
          <div>|</div>
          <Link href="/register">Register</Link>
        </div>
      )}
      <div
        className={`fixed left-0 backdrop-brightness-75 backdrop-blur-sm h-screen w-screen transition-all top-0 ${
          isEditProfileOpen ? "z-20" : "-z-10 opacity-0"
        }`}
      >
        <EditProfile
          isEditProfileOpen={isEditProfileOpen}
          setIsEditProfileOpen={setIsEditProfileOpen}
        />
      </div>
      <div
        className={`fixed left-0 backdrop-brightness-75 backdrop-blur-sm h-screen w-screen transition-all top-0 ${
          isChangePasswordOpen ? "z-20" : "-z-10 opacity-0"
        }`}
      >
        <ChangePassword
          isChangePasswordOpen={isChangePasswordOpen}
          setIsChangePasswordOpen={setIsChangePasswordOpen}
        />
      </div>
    </div>
  )
}

export default Header
