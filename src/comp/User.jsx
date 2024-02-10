// User.jsx
import  { useState, useEffect } from "react";
import axios from "axios";
import RepoSelector from "./selector";

const User = () => {
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
        console.log(response.data);
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <div className="text-red-600">
      {user ? (
        <div>
          <h1>Welcome, {user.login}!</h1>
          <div></div>
          <RepoSelector user={user} />
          {/* <button onClick={handleLogout}>Logout</button> */}
        </div>
      ) : (
        <div>
          <h1>User not authenticated</h1>
        </div>
      )}
    </div>
  );
};

export default User;
