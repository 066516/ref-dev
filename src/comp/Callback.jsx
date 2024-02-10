// Callback.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const code = new URLSearchParams(window.location.search).get("code");

      if (!code) {
        console.error("Missing authorization code");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:3001/auth/callback",
          {
            code,
          }
        );

        const accessToken = response.data.accessToken;
        console.log(accessToken);
        await localStorage.setItem("accessToken", accessToken);
        const token = Cookies.get("accessToken");
        console.log(token);
        // navigate("/user");
      } catch (error) {
        console.error("Error during GitHub OAuth:", error);
      }
    };

    handleCallback();
  }, [navigate]);

  return <div>Processing...</div>;
};

export default Callback;
