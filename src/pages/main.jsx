import { Link } from "react-router-dom";
import img from "../assets/logo.png";
import img2 from "../assets/logo2.png";
function Main() {
  return (
    <div className="w-screen h-screen flex ">
      <div className="w-full">
        <div className="w-full flex justify-between ">
          <img src={img} className="relative top-10 left-10 w-29 h-40" />
          <img
            src={img2}
            className=" md:flex hidden relative top-10 right-10 w-120 h-80"
          />
        </div>

        <div className="relative left-10">
          <h2 className=" text-wlColor text-5xl font-semibold capitalize font-inter ">
            welcome to
          </h2>
          <h1 className="  text-8xl font-bold  w-fit">Rev Dev </h1>
          <div className="  mt-0">
            <p className="w-[60%] mt-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Lordolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore .
            </p>
          </div>
          <div className="w-1/4">
            <Link
              to="/reviewInputs"
              className="  bg-bgBlue py-1 px-7 mt- font-semibold text-2xl  rounded-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
