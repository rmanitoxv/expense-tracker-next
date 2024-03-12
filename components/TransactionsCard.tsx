import { editExpense } from "@/utils/apiHandler"
import { FormEvent, useRef, useState } from "react"
import { IoMdCheckmark } from "react-icons/io"
import { MdDelete, MdEdit } from "react-icons/md"
import { RxCross1 } from "react-icons/rx"
import DeleteModal from "./DeleteModal"

interface expenseObject {
  amount: number
  createdAt: string
  description: string
  id: string
  title: string
  updatededAt: string
  userId: string
}

interface expenseInterface {
  expense: expenseObject
}
const TransactionsCard = ({ expense }: expenseInterface) => {
  const initialFormState = {
    title: expense.title,
    description: expense.description,
    amount: expense.amount,
  }

  const [onEdit, setOnEdit] = useState(false)
  const [rowWidth, setRowWidth] = useState(97)
  const [idOnEdit, setIdOnEdit] = useState("")
  const [formData, setFormData] = useState(initialFormState)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    editExpense(formData, idOnEdit).finally(() => setOnEdit(false))
  }

  return (
    <>
      {onEdit ? (
        <form
          className="relative flex items-center py-5 border-b border-slate-700 last:border-b-0"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col justify-between text-xl pl-12 gap-4 ">
            <button className="text-green-500 pointer-cursor">
              <IoMdCheckmark />
            </button>
            <button
              type="button"
              className="text-red-500"
              onClick={() => {
                setFormData(initialFormState)
                setOnEdit(false)
              }}
            >
              <RxCross1 />
            </button>
          </div>
          <div
            className={`absolute bottom-0 right-0 flex justify-between items-center bg-slate-900 h-full px-20 transition-all rounded-l-2xl`}
            style={{ width: `${rowWidth}%` }}
          >
            <div className="flex gap-10">
              <div className="flex flex-col">
                <input
                  type="text"
                  className="font-bold text-xl outline-none bg-transparent border-b-2 border-slate-950"
                  value={formData.title}
                  name="title"
                  required
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className="outline-none bg-transparent border-b-2 border-slate-950"
                  value={formData.description}
                  name="description"
                  required
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <input
              type="number"
              className="outline-none bg-transparent border-b-2 border-slate-950 w-min text-end"
              value={formData.amount}
              name="amount"
              required
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amount: parseFloat(e.target.value),
                })
              }
            />
          </div>
        </form>
      ) : (
        <>
          <div
            className={`fixed left-0 backdrop-brightness-75 backdrop-blur-sm h-screen w-screen transition-all top-0 ${
              isDeleteModalOpen ? "z-20" : "-z-10 opacity-0"
            }`}
          >
            <DeleteModal
              id={expense.id}
              isDeleteModalOpen={isDeleteModalOpen}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
            />
          </div>
          <div className="relative flex items-center py-5 border-b border-slate-700 last:border-b-0">
            <div
              className="flex flex-col justify-between text-xl pl-12 gap-4 "
              onMouseEnter={() => setRowWidth(90)}
              onMouseLeave={() => {
                if (!onEdit) setRowWidth(97)
              }}
            >
              <button
                type="button"
                className="text-green-500 pointer-cursor"
                onClick={() => {
                  setOnEdit(true), setIdOnEdit(expense.id)
                }}
              >
                <MdEdit />
              </button>
              <button
                type="button"
                className="text-red-500"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                <MdDelete />
              </button>
            </div>
            <div
              className={`absolute bottom-0 z-10 right-0 flex justify-between items-center bg-slate-900 h-full px-20 transition-all rounded-l-2xl`}
              style={{ width: `${rowWidth}%` }}
            >
              <div className="flex gap-10">
                <div>
                  <h2 className="font-bold text-xl">{formData.title}</h2>
                  <h3>{formData.description}</h3>
                </div>
              </div>
              <h1>P{formData.amount.toFixed(2)}</h1>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default TransactionsCard
