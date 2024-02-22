import React from "react";

const register = () => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center gap-8">
      <h1 className="text-3xl font-bold">REGISTER</h1>
      <form className="px-10 flex flex-col items-center gap-4 w-1/3">
        <div className="w-full flex gap-2 items-center">
          <div className="w-1/4">Email:</div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="flex-grow py-2 px-4 rounded-lg text-slate-900"
            required
          />
        </div>
        <div className="w-full flex gap-2 items-center">
          <div className="w-1/4">First Name:</div>
          <input
            type="text"
            placeholder="First Name"
            name="fname"
            className="flex-grow py-2 px-4 rounded-lg text-slate-900"
          />
        </div>
        <div className="w-full flex gap-2 items-center">
          <div className="w-1/4">Last Name:</div>
          <input
            type="text"
            placeholder="Last Name"
            name="lname"
            className="flex-grow py-2 px-4 rounded-lg text-slate-900"
          />
        </div>
        <div className="w-full flex gap-2 items-center">
          <div className="w-1/4">Password:</div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="flex-grow py-2 px-4 rounded-lg text-slate-900"
          />
        </div>
        <div className="w-full flex gap-2 items-center">
          <div className="w-1/4">Confirm Password:</div>
          <input
            type="password"
            placeholder="Confirm Password"
            name="cpassword"
            className="flex-grow py-2 px-4 rounded-lg text-slate-900"
          />
        </div>
        <button className="border-2 mt-4 border-white rounded-lg px-4 py-2 hover:text-slate-900 hover:bg-white">
          Submit
        </button>
      </form>
    </div>
  );
};

export default register;
