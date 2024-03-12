import { editUser, getUser } from "@/utils/apiHandler"
import { AxiosResponse } from "axios"
import { useSession } from "next-auth/react"
import React, {
  Dispatch,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"

interface EditProfileProps {
  isEditProfileOpen: boolean
  setIsEditProfileOpen: Dispatch<React.SetStateAction<boolean>>
}

interface ProfileInterface {
  fname: string
  lname: string
  email: string
}

const initiialProfile: ProfileInterface = {
  fname: "",
  lname: "",
  email: "",
}

const EditProfile = ({
  isEditProfileOpen,
  setIsEditProfileOpen,
}: EditProfileProps) => {
  const EditProfileRef = useRef<HTMLDivElement>(null)
  const [profile, setProfile] = useState<ProfileInterface>(initiialProfile)
  const { update } = useSession()

  useEffect(() => {
    if (isEditProfileOpen && EditProfileRef.current)
      EditProfileRef.current.focus()
  }, [isEditProfileOpen])

  const fetchUser = useCallback(() => {
    getUser().then((res: AxiosResponse<any, any>) => {
      updateProfile({ fname: res?.data?.fname })
      updateProfile({ lname: res?.data?.lname })
      updateProfile({ email: res?.data?.email })
    })
  }, [])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const updateProfile = (newState: object) => {
    setProfile((prevState) => ({
      ...prevState,
      ...newState,
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    editUser(formData).then(() => {
      update()
      setIsEditProfileOpen(false)
    })
  }

  return (
    <div
      ref={EditProfileRef}
      tabIndex={1}
      onBlur={(e) => {
        const currentTarget = e.currentTarget
        requestAnimationFrame(() => {
          if (!currentTarget.contains(document.activeElement)) {
            fetchUser()
            setIsEditProfileOpen(false)
          }
        })
      }}
      className={`fixed z-10 top-[10%] left-1/2 -translate-x-1/2 rounded-xl bg-slate-900 px-6 transition-all overflow-hidden select-none ${
        isEditProfileOpen ? "w-[35rem] h-80" : "w-0 h-0"
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-4 h-full">
        <h1>Edit Profile</h1>
        <form
          className="px-10 flex flex-col items-center w-full gap-4"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex gap-2 items-center">
            <div className="w-2/5">First Name:</div>
            <input
              type="text"
              placeholder="First Name"
              name="fname"
              className="flex-grow py-2 px-4 rounded-lg"
              required
              value={profile.fname}
              onChange={(e) => updateProfile({ fname: e.target.value })}
            />
          </div>
          <div className="w-full flex gap-2 items-center">
            <div className="w-2/5">Last Name:</div>
            <input
              type="text"
              placeholder="Last Name"
              name="lname"
              className="flex-grow py-2 px-4 rounded-lg"
              required
              value={profile.lname}
              onChange={(e) => updateProfile({ lname: e.target.value })}
            />
          </div>
          <div className="w-full flex gap-2 items-center">
            <div className="w-2/5">Email:</div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="flex-grow py-2 px-4 rounded-lg"
              required
              value={profile.email}
              onChange={(e) => updateProfile({ email: e.target.value })}
            />
          </div>
          <button className="border-2 border-white rounded-lg px-4 py-2 hover:text-slate-900 hover:bg-white">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
