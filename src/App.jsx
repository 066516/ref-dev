// App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Callback from "./comp/Callback";
import RepoSelector from "./comp/selector";
import User from "./comp/User";
import "./App.css";
import Main from "./pages/main";
import Projects from "./pages/Projects";
import ProjectCommits from "./comp/ProjectCommits";
import Review from "./comp/Review";
import ReviewInputs from "./comp/ReviewInputs";
import ResultReview from "./comp/ResultReview";
import NotFound from "./comp/NotFound";
import { useState } from "react";
const App = () => {
  const [textareaValue, setTextareaValue] = useState("");
  const [file, setFile] = useState(null);
  const [data, setData] = useState("");
  const [files, setFiles] = useState([]);

  return (
    <div className="text-wlColor font-inter  bg-mainbg bg-svg-pattern bg-cover overflow-hidden">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          {/* <Route path="/callback" element={<Callback />} /> */}
          {/* <Route path="/repos" element={<RepoSelector />} /> */}
          {/* <Route path="/user" element={<User />} /> */}
          <Route path="/projects" element={<Projects />} />
          <Route
            path="/project_commits"
            element={<ProjectCommits setFiles={setFiles} files={files} />}
          />
          <Route path="/result" element={<ResultReview data={data} />} />
          <Route
            path="/review"
            element={
              <Review
                textareaValue={textareaValue}
                file={file}
                setData={setData}
                data={data}
                files={files}
              />
            }
          />
          <Route
            path="/reviewInputs"
            element={
              <ReviewInputs
                setTextareaValue={setTextareaValue}
                file={file}
                setFile={setFile}
                textareaValue={textareaValue}
              />
            }
          />
          <Route element={<NotFound />} />

          {/* Other routes */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
