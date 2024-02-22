import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between text-xl py-12 px-48 shadow-md">
      <Link href={"/"} className="text-3xl">
        EXPENSE TRACKER
      </Link>
      <div className="flex gap-4">
        <Link href="/login">Login</Link>
        <div>|</div>
        <Link href="/register">Register</Link>
      </div>
    </div>
  );
};

export default Header;
