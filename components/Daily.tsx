import React from "react"
import TransactionsCard from "@/components/TransactionsCard"

interface expenseObject {
  amount: number
  createdAt: string
  description: string
  id: string
  title: string
  updatededAt: string
  userId: string
}
interface objectProps {
  date: string
  objects: any
}

const Daily = ({ date, objects }: objectProps) => {
  const checkIfToday = (date: string) => {
    const givenDate = new Date(date)
    const today = new Date()
    return givenDate.toDateString() === today.toDateString()
  }
  return (
    <div className="w-full">
      <h1 className="uppercase tracking-widest text-2xl">
        {checkIfToday(date) ? "Today" : date}
      </h1>
      <div className="flex flex-col rounded-xl w-full bg-slate-800  shadow-[inset_10px_0px_20px_0px_#1a202c] ">
        {objects.map((expense: expenseObject) => (
          <TransactionsCard expense={expense} key={expense.id} />
        ))}
      </div>
    </div>
  )
}

export default Daily
