import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 flex items-center justify-between w-[98.5vw] h-[10vh]">
      <div className=" w-full px-6 flex items-center justify-between">
        <div className="logo font-bold text-white text-2xl w-12">
          <span className="text-green-700">&lt;</span>
          <span>Pass</span>
          <span className="text-green-700">OP/&gt;</span>
        </div>

        <ul className="flex gap-3 text-white ">
          <li>
            <a className="hover:font-bold w-8" href="#">
              Home
            </a>{" "}
          </li>
          <li>
            <a className="hover:font-bold w-8" href="#">
              About
            </a>{" "}
          </li>
          <li>
            <a className="hover:font-bold w-8" href="#">
              Contact
            </a>{" "}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
