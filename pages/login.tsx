import React from "react";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-grow gap-8">
      <h1 className="text-3xl font-bold">LOGIN</h1>
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
          <div className="w-1/4">Password:</div>
          <input
            type="password"
            placeholder="Password"
            name="password"
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

export default Login;
