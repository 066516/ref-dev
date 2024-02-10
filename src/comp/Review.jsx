import { useState } from "react";
import NavBar from "./NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import critique from "../data/critique";
import { GiSandsOfTime } from "react-icons/gi";
import { FaLaptopCode, FaPlus } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";

function Review({ textareaValue, file, setData, files }) {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  console.log(textareaValue);
  const commit = queryParams.get("commit");
  var type = queryParams.get("type");
  if (commit) {
    type = "commit";
  }
  //   const type = commit ? "commit" : null;
  const [inputValue, setInputValue] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCheckboxChange = (critiqueId) => {
    const isSelected = selectedFeatures.includes(critiqueId);

    if (isSelected) {
      setSelectedFeatures((prevSelected) =>
        prevSelected.filter((id) => id !== critiqueId)
      );
    } else {
      setSelectedFeatures((prevSelected) => [...prevSelected, critiqueId]);
    }
  };
  console.log(selectedFeatures);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  console.log(commit);
  const navigate = useNavigate();

  const back = () => {
    navigate(-1); // Navigate back by one step in the history
  };
  const [loading, setLoading] = useState(false);
  const formData = new FormData();

  formData.append("files", file);

  const submit = () => {
    setData("");
    if (type === "file") {
      const fetchRepos = async () => {
        try {
          const response = await fetch(
            "http://localhost:3000/api/v1/upload/stream",
            {
              method: "POST",

              body: formData,
            }
          );
          console.log(response);
          if (!response.ok || !response.body) {
            throw response.statusText;
          }
          const reader = response.body.getReader();
          const decoder = new TextDecoder("utf-8");

          const readChunk = () => {
            reader
              .read()
              .then(({ value, done }) => {
                if (done) {
                  console.log("Stream finished");
                  return;
                }

                const chunkString = decoder.decode(value);
                setData((prevMessages) => prevMessages + chunkString);
                readChunk();
              })
              .catch((error) => {
                console.error(error);
              });
          };

          readChunk();
        } catch (error) {
          console.error("Error fetching repos:", error);
        }
      };
      fetchRepos();
    }
    if (type === "text") {
      const requestBody = {
        code: textareaValue,
        criterias: [selectedFeatures[0]],
      };
      console.log(requestBody);
      const fetchRepos = async () => {
        try {
          const response = await fetch(
            "http://localhost:3000/api/v1/codeReview/stream",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json", // Include any necessary authorization headers
              },
              body: JSON.stringify(requestBody),
            }
          );
          console.log(response);
          if (!response.ok || !response.body) {
            throw response.statusText;
          }
          const reader = response.body.getReader();
          const decoder = new TextDecoder("utf-8");

          const readChunk = () => {
            reader
              .read()
              .then(({ value, done }) => {
                if (done) {
                  console.log("Stream finished");
                  return;
                }

                const chunkString = decoder.decode(value);
                setData((prevMessages) => prevMessages + chunkString);
                readChunk();
              })
              .catch((error) => {
                console.error(error);
              });
          };

          readChunk();
        } catch (error) {
          console.error("Error fetching repos:", error);
        }
      };
      fetchRepos();
    }
    if (type === "commit") {
      const formData2 = new FormData();
      console.log(files);
      files.forEach((file) => {
        formData2.append("files", file);
      });
      const fetchRepos = async () => {
        try {
          const response = await fetch(
            "http://localhost:3000/api/v1/upload/stream",
            {
              method: "POST",

              body: formData2,
            }
          );
          console.log(response);
          if (!response.ok || !response.body) {
            throw response.statusText;
          }
          const reader = response.body.getReader();
          const decoder = new TextDecoder("utf-8");

          const readChunk = () => {
            reader
              .read()
              .then(({ value, done }) => {
                if (done) {
                  console.log("Stream finished");
                  return;
                }

                const chunkString = decoder.decode(value);
                setData((prevMessages) => prevMessages + chunkString);
                readChunk();
              })
              .catch((error) => {
                console.error(error);
              });
          };

          readChunk();
        } catch (error) {
          console.error("Error fetching repos:", error);
        }
      };
      fetchRepos();
    }

    navigate("/result");
  };
  return (
    <div className="w-screen h-screen">
      <NavBar />
      <div className="mx-32 flex items-center justify-evenly">
        <div className="">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl capitalize font-semibold my-5">
              your code
            </h1>
            {type === "commit" && (
              <div className="h-72 w-64 bg-commitbg text-center flex flex-col items-center justify-center capitalize font-semibold rounded-lg">
                <h2>review commit</h2> <h1 className="text-xl">{commit}</h1>
              </div>
            )}
            {type === "file" && (
              <div className=" w-64 bg-commitbg text-center flex flex-col items-center  justify-center capitalize font-semibold rounded-lg">
                <h2>review file </h2> <h1 className="text-xl">{file.name}</h1>
              </div>
            )}
            {type === "text" && (
              <div className="h-[400px] w-[600px] bg-commitbg  flex flex-col   capitalize font-semibold rounded-lg">
                <SyntaxHighlighter
                  wrapLines
                  language="javascript"
                  style={darcula}
                  customStyle={{ width: "100%", fontSize: "12px" }} // Set the width dynamically
                >
                  {textareaValue}
                </SyntaxHighlighter>
              </div>
            )}
          </div>
          <div className="flex justify-between mt-2">
            <div
              className="bg-white text-black cursor-pointer rounded-lg px-3 py-1 flex gap-1 items-center justify-center"
              onClick={back}
            >
              <MdOutlineSettingsBackupRestore />
              back
            </div>
            <div
              className="text-white bg-green-600 cursor-pointer rounded-lg px-3 flex items-center justify-center gap-1"
              onClick={submit}
            >
              <IoIosSend />
              submit
            </div>
          </div>
        </div>
        <div className="flex flex-col capitalize gap-2">
          <h1 className="text-2xl capitalize font-semibold  my-5">
            Select the features
          </h1>
          {critique.map((crit) => {
            return (
              <div
                key={crit.id}
                className={`${
                  selectedFeatures.includes(crit.title)
                    ? "bg-green-500"
                    : "bg-bgcririque"
                } flex justify-between gap-2 px-3 py-2 rounded-lg`}
              >
                <input
                  type="checkbox"
                  checked={selectedFeatures.includes(crit.title)}
                  onChange={() => handleCheckboxChange(crit.title)}
                />
                <h1>{crit.title} </h1>
                <FaLaptopCode fontSize="22px" />
              </div>
            );
          })}
          {!selectedFile && (
            <label
              className="flex pl-5 items-center capitalize justify-between px-2 mt-2 bg-bgcririque py-2 rounded-lg cursor-pointer"
              htmlFor="fileInput"
            >
              drop guide line <FaPlus />
              <input
                type="file"
                id="fileInput"
                accept=".txt" // specify accepted file types
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </label>
          )}

          <div className="flex items-center justify-between px-2 mt-2 bg-bgcririque py-2 rounded-lg">
            <input
              type="text"
              placeholder="write special criteria"
              className="text-black mr-2 p-2"
              value={inputValue}
              onChange={handleInputChange}
            />
            <IoSend />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
