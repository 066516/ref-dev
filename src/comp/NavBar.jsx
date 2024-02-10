import React from "react";
import img from "../assets/logo.png";
import { FaGithub } from "react-icons/fa6";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="w-full flex justify-center mt-4">
      <div className="w-[90%] px-5 py-2 capitalize flex justify-between items-center">
        <img src={img} className="w-17 h-12" />
        <div className="w-1/3 flex justify-between">
          <Link to="/" className="cursor-pointer hover:text-blue-300">home</Link>
          <h1 className="cursor-pointer hover:text-blue-300">latest</h1>
          <Link to="/projects" className="cursor-pointer hover:text-blue-300">
            projects
          </Link>
        </div>
        <div className="flex items-center gap-2 bg-white text-black h-fit py-1 px-2 rounded-lg cursor-pointer  ">
          Sing in <FaGithub />{" "}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
