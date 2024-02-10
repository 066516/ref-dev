// selector.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const RepoSelector = ({ user }) => {
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [commits, setCommits] = useState([]);
  const [selectedCommit, setSelectedCommit] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState("");

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${user.login}/repos`
        );
        setRepos(response.data);
      } catch (error) {
        console.error("Error fetching repos:", error);
      }
    };

    fetchRepos();
  }, [user.login]);

  const handleRepoSelection = async (repo) => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${user.login}/${repo.name}/commits`
      );
      setCommits(response.data);
      setSelectedRepo(repo);
    } catch (error) {
      console.error("Error fetching commits:", error);
    }
  };

  const handleCommitSelection = async (commit) => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${user.login}/${selectedRepo.name}/commits/${commit.sha}`
      );
      console.log(response.data.files);
      setFiles(response.data.files);
      setSelectedCommit(commit);
    } catch (error) {
      console.error("Error fetching commit files:", error);
    }
  };

  //   const handleFileSelection = async (file) => {
  //     if (file.type === "file") {
  //       try {
  //         const response = await axios.get(
  //           `https://api.github.com/repos/${user.login}/${selectedRepo.name}/contents/${file.path}?ref=${selectedCommit.sha}`
  //         );

  //         const isBase64 = response.data.encoding === "base64";
  //         const decodedContent = isBase64
  //           ? atob(response.data.content)
  //           : response.data.content;

  //         setFileContent(decodedContent);
  //         setSelectedFile(file);
  //       } catch (error) {
  //         console.error("Error fetching file content:", error);
  //       }
  //     } else if (file.type === "dir") {
  //       try {
  //         const response = await axios.get(
  //           `https://api.github.com/repos/${user.login}/${selectedRepo.name}/contents/${file.path}?ref=${selectedCommit.sha}`
  //         );

  //         // Filter out directories
  //         const filesInDir = response.data.filter((item) => item.type === "file");

  //         // Display files in the folder
  //         setFiles(filesInDir);
  //       } catch (error) {
  //         console.error("Error fetching directory contents:", error);
  //       }
  //     }
  //   };
  // Modify the handleFileSelection function
  const handleFileSelection = async (filePath) => {
    console.log(filePath);
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${user.login}/${selectedRepo.name}/contents/${filePath.filename}?ref=${selectedCommit.sha}`,
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

  // Modify the rendering of file items to include onClick handler
  {
    files.map((file) => (
      <li
        key={file.path}
        onClick={() => handleFileSelection(file.path)} // Pass file path to the function
        style={{ color: "white" }}
      >
        {file.name}
      </li>
    ));
  }

  return (
    <div>
      <h2>Select a Repository:</h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id} onClick={() => handleRepoSelection(repo)}>
            {repo.name}
          </li>
        ))}
      </ul>

      {selectedRepo && (
        <div>
          <h2>Select a Commit:</h2>
          <ul>
            {commits.map((commit) => (
              <li
                key={commit.sha}
                onClick={() => handleCommitSelection(commit)}
              >
                {commit.commit.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedCommit && (
        <div>
          <h2>Select a File or Folder:</h2>
          <ul>
            {files.map((file) => (
              <li
                key={file.path}
                onClick={() => handleFileSelection(file)}
                style={{ color: "white" }}
              >
                {file.filename}
              </li>
            ))}
          </ul>
        </div>
      )}

      {fileContent && (
        <div>
          <h2>File Content:</h2>
          <pre>{fileContent}</pre>
        </div>
      )}
    </div>
  );
};

export default RepoSelector;
