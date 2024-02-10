import NavBar from "./NavBar";
import img from "../assets/inputs.png";
import { IoSend } from "react-icons/io5";
import { GoPlusCircle } from "react-icons/go";
import { Link } from "react-router-dom";

function ReviewInputs({ setTextareaValue, setFile, textareaValue, file }) {
  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSend = () => {
    // Handle sending the textareaValue and the single file
    console.log("Sending textarea value:");
    console.log("Sending file:");
  };

  return (
    <div className="h-screen w-screen">
      <NavBar />
      <div className="w-full flex items-center justify-center mt-10">
        <img src={img} className="h-60" alt="Preview" />
      </div>
      <div className="h-40 w-[700px] bg-bgblackone rounded-md mx-auto my-5 p-5 relative">
        {!file && (
          <textarea
            placeholder="Insert your code here..."
            className="text-white text-sm font-bold bg-bgblacktwo w-full h-full pl-10"
            value={textareaValue}
            onChange={handleTextareaChange}
          ></textarea>
        )}
        {file && <h1>{file.name} </h1>}
        <Link to={`/review?type=${file ? "file" : "text"}`}>
          <IoSend className="absolute bottom-7 right-8 cursor-pointer" />
        </Link>
        <label htmlFor="fileInput">
          <GoPlusCircle
            className="absolute top-7 left-8 cursor-pointer"
            title="add a file"
          />
        </label>
        <input
          type="file"
          id="fileInput"
          accept="*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
      <h1 className="text-center text-inputscolor">
        Coding is the art of transforming imagination into reality!
      </h1>
    </div>
  );
}

export default ReviewInputs;
