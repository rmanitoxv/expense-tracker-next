import { configureStore } from "@reduxjs/toolkit"
import expensesReducer from "./reducers/expensesReducer"
import totalReducer from "./reducers/totalReducer"
// ...

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    total: totalReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
