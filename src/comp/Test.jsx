import React from "react";
import MarkdownRenderer from "./MarkdownRenderer";

const YourComponent = () => {
  const markdownText = `
  # Code Review - Projects.js

  The code provided in the \`Projects.js\` file looks well-written. However, there are a few issues and potential improvements that can be made.
  
  ## 1. Unused Imports
  The following imports are not used in the code and can be safely removed:
  \`\`\`javascript
  import NavBar from "../comp/NavBar";
  import Cookies from "js-cookie";
  \`\`\`
  
  ## 2. Authentication Token Exposure
  The authentication token is exposed in the code. It is not recommended to include any sensitive information, such as credentials or tokens, directly in the code. It would be better to store the token securely, such as in a server environment variable, and fetch it when needed.
  
  ## 3. Missing Dependency Array in useEffect Hook
  In the \`useEffect\` hook, it is recommended to provide a dependency array as the second argument to avoid unnecessary re-renders. In this case, you can add \`\[user\]\` as a dependency to the first \`useEffect\` and \`\[user\]\` and \`\[repos\]\` as dependencies to the second \`useEffect\` to make them run only when the dependencies change.
  `;

  return (
    <div>
      <MarkdownRenderer markdownText={markdownText} />
    </div>
  );
};

export default YourComponent;
