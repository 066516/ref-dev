import React from "react";

function NotFound() {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <h1 className="text-8xl font-bold">404 </h1>
      <p className="mt-5 text-xl w-1/2 text-center">
        Sorry. the content you’re looking for doesn’t exist. Either it was
        removed, or you mistyped the link.
      </p>
      <div className="flex mt-10 ">
        <a href="/" className=" bg-bluecolor px-3 py-2 rounded-xl">
          Go back to home
        </a>
      </div>
    </div>
  );
}

export default NotFound;
