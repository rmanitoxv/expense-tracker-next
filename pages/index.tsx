import Daily from "@/components/Daily";
import NewExpense from "@/components/NewExpense";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const Index = () => {
  const [isNewExpenseOpen, setIsNewExpenseOpen] = useState(false);
  return (
    <main className="flex flex-col items-center py-20 px-48">
      <div
        className={`fixed backdrop-brightness-75 backdrop-blur-sm h-screen w-full transition-all top-0 ${
          isNewExpenseOpen ? "z-10" : "-z-10 opacity-0"
        }`}
      >
        <NewExpense
          isNewExpenseOpen={isNewExpenseOpen}
          setIsNewExpenseOpen={setIsNewExpenseOpen}
        />
      </div>
      <div className="border-white border-2 py-8 px-16 rounded-xl text-7xl">
        <p className="text-lg">Total Monthly Expense:</p>P1000.00
      </div>
      <div className="w-full flex justify-end px-20">
        <button
          className="border-2 flex gap-2 items-center border-white rounded-lg px-4 py-2 hover:text-slate-900 hover:bg-white"
          onClick={() => setIsNewExpenseOpen(true)}
        >
          <FaPlus />
          Add New Expense
        </button>
      </div>
      <div className="mt-20 flex flex-col items-start w-full gap-10 ">
        <Daily />
        <Daily />
        <Daily />
      </div>
    </main>
  );
};

export default Index;
