import React, { Dispatch, useEffect, useRef } from "react";

interface loginModalProps {
  isNewExpenseOpen: boolean;
  setIsNewExpenseOpen: Dispatch<React.SetStateAction<boolean>>;
}

const NewExpense = ({
  isNewExpenseOpen,
  setIsNewExpenseOpen,
}: loginModalProps) => {
  const NewExpenseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isNewExpenseOpen && NewExpenseRef.current)
      NewExpenseRef.current.focus();
  }, [isNewExpenseOpen]);
  return (
    <div
      ref={NewExpenseRef}
      tabIndex={3}
      onBlur={(e) => {
        const currentTarget = e.currentTarget;
        requestAnimationFrame(() => {
          if (!currentTarget.contains(document.activeElement)) {
            setIsNewExpenseOpen(false);
          }
        });
      }}
      className={`absolute top-[10%] left-1/2 -translate-x-1/2 rounded-xl bg-slate-900 px-6 transition-all overflow-hidden ${
        isNewExpenseOpen ? "w-[35rem] h-80" : "w-0 h-0"
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-4 h-full">
        <h1 className="font-bold text-xl">NEW EXPENSE</h1>
        <form className="px-10 flex flex-col items-center w-full gap-4">
          <div className="w-full flex gap-2 items-center">
            <div className="w-1/4">Name:</div>
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="flex-grow py-2 px-4 rounded-lg text-slate-900"
              required
            />
          </div>
          <div className="w-full flex gap-2 items-center">
            <div className="w-1/4">Description:</div>
            <input
              type="text"
              placeholder="Description"
              name="desc"
              className="flex-grow py-2 px-4 rounded-lg text-slate-900"
            />
          </div>
          <div className="w-full flex gap-2 items-center">
            <div className="w-1/4">Amount:</div>
            <input
              type="number"
              placeholder="Amount"
              name="amount"
              className="flex-grow py-2 px-4 rounded-lg text-slate-900"
            />
          </div>
          <button className="border-2 border-white rounded-lg px-4 py-2 hover:text-slate-900 hover:bg-white">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewExpense;
