import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import Cookies from "js-cookie";
import { CiFileOn } from "react-icons/ci";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { darcula, dark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import CodeHighlighter from "./CodeHighlighter";
import { Link } from "react-router-dom";

function ProjectCommits({ files, setFiles }) {
  const repo = new URLSearchParams(window.location.search).get("repo");
  files = [
    {
      filename: "user.json",
      additions: 30,
      deletions: 5,
    },
    {
      filename: "user.json",
      additions: 30,
      deletions: 5,
    },
    {
      filename: "user.json",
      additions: 30,
      deletions: 5,
    },
  ];
  const [commits, setCommits] = useState([
    {
      message: "update login",
      date: "2023/01/01",
    },
    {
      message: "write readme file",
      date: "2023/01/01",
    },
    {
      message: "add author",
      date: "2023/01/01",
    },
    {
      message: " update author",
      date: "2023/01/01",
    },
    {
      message: "add user name",
      date: "2023/01/01",
    },
    {
      message: "add user name",
      date: "2023/01/01",
    },
    {
      message: "add user name",
      date: "2023/01/01",
    },
  ]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [selectedCommit, setSelectedCommit] = useState("gg");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const user = Cookies.get("login");
  //   console.log(user, repo);
  const handleRepoSelection = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${user}/${repo}/commits`
      );
      setCommits(response.data);
      //   setFileContent("");
      console.log(response.data);
      setSelectedRepo(repo);
    } catch (error) {
      console.error("Error fetching commits:", error);
    }
  };
  // const handleCommitSelection = async (commit) => {
  //   console.log(selectedRepo);
  //   setFileContent("");
  //   try {
  //     const response = await axios.get(
  //       `https://api.github.com/repos/${user}/${selectedRepo}/commits/${commit.sha}`
  //     );
  //     console.log(response.data.files);
  //     setFiles(response.data.files);
  //     setSelectedCommit(commit);
  //   } catch (error) {
  //     console.error("Error fetching commit files:", error);
  //   }
  // };
  const handleCommitSelection = async (commit) => {
    console.log(selectedRepo);
    setFileContent("");
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${user}/${selectedRepo}/commits/${commit.sha}`
      );

      // Filter files to include only non-image and non-video files
      const filteredFiles = response.data.files.filter((file) => {
        const fileType = file.filename.split(".").pop().toLowerCase();
        return !["jpg", "jpeg", "png", "gif", "mp4", "mov", "avi"].includes(
          fileType
        );
      });

      console.log(filteredFiles);
      setFiles(filteredFiles);
      setSelectedCommit(commit);
    } catch (error) {
      console.error("Error fetching commit files:", error);
    }
  };

  useEffect(() => {
    handleRepoSelection();
  }, []);
  const handleFileSelection = async (filePath) => {
    console.log(filePath);
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${user}/${selectedRepo}/contents/${filePath}?ref=${selectedCommit.sha}`,
        {
          headers: {
            Authorization: "Bearer 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", // Replace with your GitHub token
            Accept: "application/vnd.github.v3.raw", // Specify raw content
          },
        }
      );

      // Handle the response based on file type or content
      console.log(response.data);
      setFileContent(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Handle 404 error (file not found)
        console.error("File not found:", error);
      } else {
        // Handle other errors
        console.error("Error fetching file content:", error);
      }

      // Set default content or handle the error as needed
      setFileContent("Error fetching file content");
    }
  };
  function formatDate(dateString) {
    const dateObject = new Date(dateString);

    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObject.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  function getLastPartOfPath(path) {
    const parts = path.split("/");
    return parts[parts.length - 1];
  }
  return (
    <div className="w-screen h-screen overflow-hidden">
      <NavBar />
      <div className="mx-32 capitalize">
        <div className="w-full flex justify-between mt-10 border-b-[2px] pb-1">
          <h1>{repo} </h1>
          <h1>{user} </h1>
          <h1>2024/01/24</h1>
          <h1>{commits ? commits.length : 0} </h1>
        </div>
        <div className="w-full mt-10  flex ">
          <div className="w-1/3 text-center ">
            <h1 className="text-3xl py-2 font-semibold">Commits</h1>

            <div className="flex flex-col gap-2 overflow-y-scroll h-96 pb-3">
              {commits.map((ele) => {
                return (
                  <div
                    key={commits.sha}
                    className="bg-commitbg w-50 text-center py-2 cursor-pointer"
                    onClick={() => handleCommitSelection(ele)}
                  >
                    <h1>{ele.message} </h1>
                    <h1>{formatDate(ele.date)}</h1>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-2/3">
            <h1 className="text-3xl py-2 font-semibold text-center">files</h1>
            <div className="bg-grayTrans ml-10  pb-10 px-5 h-80 overflow-y-scroll">
              {fileContent === "" && (
                <div className=" capitalize grid grid-cols-4 text-center  px-2 ">
                  <h1>file</h1>
                  <h1>name</h1>
                  <h1>Added lines</h1>
                  <h1>Removed lines</h1>
                </div>
              )}
              {selectedCommit == null && fileContent === "" && (
                <h1 className="text-center">select a commit</h1>
              )}
              {selectedCommit && (
                <div className="flex flex-col gap-2 text-center ">
                  {files.map((file) => (
                    <div
                      key={file.path}
                      onClick={() => handleFileSelection(file.filename)}
                      className="w-full bg-filebg capitalize grid grid-cols-4 hover:bg-blue-600 cursor-pointer  text-center items-center px-2"
                    >
                      <h1>
                        <CiFileOn />
                      </h1>
                      <h1> {getLastPartOfPath(file.filename)}</h1>
                      <h1>{file.additions}</h1>
                      <h1>{file.deletions}</h1>
                    </div>
                  ))}
                </div>
              )}
              <div className="h-96 overflow-y-scroll">
                {/* <CodeHighlighter code={fileContent} language="javascript" /> */}

                {selectedCommit && fileContent != "" && (
                  <SyntaxHighlighter language="javascript" style={darcula}>
                    {fileContent}
                  </SyntaxHighlighter>
                )}
              </div>{" "}
            </div>
            <div className="flex justify-end mt-5">
              {selectedCommit ? (
                <Link
                  to={`/review?commit=${
                    selectedCommit ? "update user" : ""
                  }`}
                  className="bg-white text-black w-fit  flex items-end py-1 px-2 rounded-lg font-medium"
                >
                  Review commit
                </Link>
              ) : (
                <div
                  to={`/review?type=commit&commit=${selectedCommit}`}
                  className="bg-white text-black w-fit  flex items-end py-1 px-2 rounded-lg font-medium"
                >
                  Review commit
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCommits;
