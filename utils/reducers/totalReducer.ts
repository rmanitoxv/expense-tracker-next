import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"

interface TotalState {
  total: number
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

const initialState: TotalState = {
  total: 0,
}

const getTotal = (objects: expenseObject[]) => {
  const today = new Date()
  return objects.reduce((total, obj) => {
    const month = new Date(obj.createdAt).getMonth
    return today.getMonth === month ? total + obj.amount : total
  }, 0)
}

export const totalSlice = createSlice({
  name: "total",
  initialState,
  reducers: {
    setTotal: (state, action: PayloadAction<expenseObject[]>) => {
      state.total = getTotal(action.payload)
    },
  },
})

export const { setTotal } = totalSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectTotal = (state: RootState) => state.total

export default totalSlice.reducer
