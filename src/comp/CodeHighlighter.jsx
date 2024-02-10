import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeHighlighter = ({ code, language }) => {
  const customStyle = {
    'code[class*="language-"]': {
      background: "#000000", // Background color in code block
    },
    ".token": {
      color: "#f8f8f2", // Text color in code block
    },
    p: {
      innerWidth: "100%",
      color: "#000000", // Text color in paragraphs (outside code blocks)
    },
    comment: {
      color: "#6272a4", // Comment color
    },
    string: {
      color: "#50fa7b", // String color (green)
    },
    keyword: {
      color: "#ff5555", // Keyword color (red)
    },
  };

  return (
    <SyntaxHighlighter
      language={language}
      style={dark}
      customStyle={customStyle}
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeHighlighter;
