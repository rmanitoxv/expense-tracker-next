import { createExpense } from "@/utils/apiHandler"
import React, { Dispatch, FormEvent, useEffect, useRef } from "react"

interface loginModalProps {
  isNewExpenseOpen: boolean
  setIsNewExpenseOpen: Dispatch<React.SetStateAction<boolean>>
  fetchExpense: () => Promise<void>
}

const NewExpense = ({
  isNewExpenseOpen,
  setIsNewExpenseOpen,
  fetchExpense,
}: loginModalProps) => {
  const NewExpenseRef = useRef<HTMLDivElement>(null)
  const FormRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (isNewExpenseOpen && NewExpenseRef.current) NewExpenseRef.current.focus()
  }, [isNewExpenseOpen])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const response = await createExpense(formData)
    if (response.data) {
      fetchExpense()
      setIsNewExpenseOpen(false)
    }
  }
  return (
    <div
      ref={NewExpenseRef}
      tabIndex={1}
      onBlur={(e) => {
        const currentTarget = e.currentTarget
        requestAnimationFrame(() => {
          if (!currentTarget.contains(document.activeElement)) {
            FormRef.current?.reset()
            setIsNewExpenseOpen(false)
          }
        })
      }}
      className={`fixed z-10 top-[10%] left-1/2 -translate-x-1/2 rounded-xl bg-slate-900 px-6 transition-all overflow-hidden select-none ${
        isNewExpenseOpen ? "w-[35rem] h-80" : "w-0 h-0"
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-4 h-full">
        <h1 className="font-bold text-xl">NEW EXPENSE</h1>
        <form
          ref={FormRef}
          className="px-10 flex flex-col items-center w-full gap-4"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex gap-2 items-center">
            <div className="w-1/4">Name:</div>
            <input
              type="text"
              placeholder="Name"
              name="title"
              className="flex-grow py-2 px-4 rounded-lg"
              required
            />
          </div>
          <div className="w-full flex gap-2 items-center">
            <div className="w-1/4">Description:</div>
            <input
              type="text"
              placeholder="Description"
              name="description"
              className="flex-grow py-2 px-4 rounded-lg"
            />
          </div>
          <div className="w-full flex gap-2 items-center">
            <div className="w-1/4">Amount:</div>
            <input
              type="number"
              placeholder="Amount"
              name="amount"
              className="flex-grow py-2 px-4 rounded-lg"
              required
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

export default NewExpense
