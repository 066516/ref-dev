import React from "react";
import NavBar from "./NavBar";
import MarkdownRenderer from "./MarkdownRenderer";

function ResultReview({ data }) {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <NavBar />
      <div className=" w-full h-full  px-20 mt-10 pb-20 ">
        <div className="bg-greybg w-full h-[80%] overflow-y-scroll px-20">
          <h1 className="text-bluecolor text-center text-3xl mt-3 flex flex-col">
            Here’s your Code Report !
          </h1>
          <div className="text-black flex flex-col justify-enter pb-5">
            <div className="text-enter  mt-5">
              <p className="">
                <MarkdownRenderer markdownText={data} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultReview;
