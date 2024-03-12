import { deleteExpense, getExpense } from "@/pages/utils/apiHandler"
import { setExpenses } from "@/pages/utils/reducers/expensesReducer"
import { setTotal } from "@/pages/utils/reducers/totalReducer"
import React, { Dispatch, FormEvent, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"

interface deleteModalProps {
  id: string
  isDeleteModalOpen: boolean
  setIsDeleteModalOpen: Dispatch<React.SetStateAction<boolean>>
}

const DeleteModal = ({
  id,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
}: deleteModalProps) => {
  const DeleteModalRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isDeleteModalOpen && DeleteModalRef.current)
      DeleteModalRef.current.focus()
  }, [isDeleteModalOpen])

  const fetchExpense = async () => {
    const result = await getExpense()
    dispatch(setExpenses(result.data))
    dispatch(setTotal(result.data))
  }

  const handleDelete = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    deleteExpense(id).then(() => {
      fetchExpense()
      setIsDeleteModalOpen(false)
    })
  }

  return (
    <div
      ref={DeleteModalRef}
      tabIndex={1}
      onBlur={(e) => {
        const currentTarget = e.currentTarget
        requestAnimationFrame(() => {
          if (!currentTarget.contains(document.activeElement)) {
            setIsDeleteModalOpen(false)
          }
        })
      }}
      className={`fixed z-10 top-[10%] left-1/2 -translate-x-1/2 rounded-xl bg-slate-900 px-6 transition-all overflow-hidden select-none flex flex-col items-center py-10 gap-10 ${
        isDeleteModalOpen ? "w-[24rem] h-48" : "w-0 h-0"
      }`}
    >
      <h1>Are you sure you want to delete?</h1>
      <form className="flex justify-between w-2/3" onSubmit={handleDelete}>
        <button
          type="submit"
          className="bg-green-500 px-4 py-2 rounded-lg hover:bg-white hover:text-green-500 transition-all"
        >
          Yes
        </button>
        <button
          type="button"
          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-white hover:text-red-500 transition-all"
          onClick={() => setIsDeleteModalOpen(false)}
        >
          No
        </button>
      </form>
    </div>
  )
}

export default DeleteModal
