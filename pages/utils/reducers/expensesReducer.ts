import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"

interface ExpensesState {
  expenses: object
}

interface expenseObject {
  amount: number
  createdAt: string
  description: string
  id: string
  title: string
  updatededAt: string
  userId: string
}

const initialState: ExpensesState = {
  expenses: {},
}

const groupObjectsByDate = (objects: expenseObject[]) => {
  return objects.reduce((acc, obj) => {
    const key = parseDate(obj.createdAt)
    ;(acc[key] = acc[key] || []).push(obj)
    return acc
  }, {} as { [date: string]: expenseObject[] })
}

const parseDate = (dateString: string) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const date = new Date(dateString)
  const monthIndex = date.getMonth()
  const day = date.getDate()
  const year = date.getFullYear()

  const monthName = months[monthIndex]
  const formattedDay = day < 10 ? "0" + day : day
  return `${monthName} ${formattedDay}, ${year}`
}

export const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setExpenses: (state, action: PayloadAction<expenseObject[]>) => {
      state.expenses = groupObjectsByDate(action.payload)
    },
  },
})

export const { setExpenses } = expensesSlice.actions

export const selectExpenses = (state: RootState) => state.expenses

export default expensesSlice.reducer
