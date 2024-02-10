import React, { useEffect, useState } from "react";
import NavBar from "../comp/NavBar";
import img from "../assets/logo.png";
import img2 from "../assets/Vector.png";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function Projects() {
  const [repos, setRepos] = useState([
    {
      name: "todo list",
      created_at: "2022/05/13",
    },
    {
      name: "store application",
      created_at: "2022/05/13",
    },
    {
      name: "task list",
      created_at: "2022/05/13",
    },
    {
      name: "todo list",
      created_at: "2022/05/13",
    },
    {
      name:"todo list",
      created_at:"2022/05/13"
    },{
      name:"todo list",
      created_at:"2022/05/13"
    },
  ]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get("https://api.github.com/user", {
          headers: {
            Authorization: `Bearer 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`,
          },
        });
        setUser(response.data);
        Cookies.set("login", response.data.login);
        console.log(response.data);
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuthentication();
  }, []);
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${user.login}/repos`,
          {
            headers: {
              Authorization: `bearer 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`,
            },
          }
        );
        setRepos(response.data);
      } catch (error) {
        console.error("Error fetching repos:", error);
      }
    };
    console.log(repos);
    if (user) fetchRepos();
  }, []);
  return (
    <div className="w-screen h-screen  overflow-hidden ">
      <NavBar />
      <div className="w-full flex flex-col justify-center items-center my-5">
        <img src={img} className="w-20 h-20" />
        <h1 className="text-5xl text-gray-300 my-5">My Projects</h1>
      </div>
      <div className="w-full flex justify-end pr-20  pb-5">
        <div className="w-fit bg-bluecolor px-3 py-1 rounded-lg">
          add project
        </div>
      </div>
      <div className="grid grid-cols-4 items-center mx-32 bg-gradient-to-r from-gray via-transparent to-transparent pb-4 mb-4 bg-grayTrans  text-center py-3">
        <h1 className="flex justify-center items-center">project icon</h1>
        <h1>project name </h1>
        <h1>created_at</h1>
        <h1>commits</h1>
      </div>
      <div className="bg-gradient-to-r from-gray via-transparent to-transparent pb-4 mb-4 bg-grayTrans mx-32 justify-evenly overflow-y-scroll h-72">
        {repos.map((repo) => {
          return (
            <Link
              key={repo.name}
              to={`/project_commits?repo=${repo.name}`}
              className="grid grid-cols-4 items-center hover:bg-slate-600 cursor-pointer  text-center py-3"
            >
              <h1 className="flex justify-center items-center">
                <img src={img2} />{" "}
              </h1>
              <h1>{repo.name} </h1>
              <h1>{repo.created_at} </h1>
              <h1>30</h1>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Projects;
