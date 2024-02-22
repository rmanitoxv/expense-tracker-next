import React from "react";
import TransactionsCard from "./TransactionsCard";

const Daily = () => {
  return (
    <div className="w-full">
      <h1 className="uppercase tracking-widest text-2xl">TODAY</h1>
      <div className="flex flex-col gap-2 rounded-xl w-full shadow-xl">
        <TransactionsCard />
        <TransactionsCard />
        <TransactionsCard />
      </div>
    </div>
  );
};

export default Daily;
