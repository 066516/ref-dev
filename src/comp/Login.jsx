// Login.jsx
import axios from "axios";

const Login = () => {
  const handleLogin = async () => {
    try {
      // const response = await axios.get("http://localhost:3001/auth/github", {
      //   withCredentials: true,
      // });
      // console.log("yes from client");

      window.location.href = `https://github.com/login/oauth/authorize?client_id=582888e01e3b5a1a3657&scope=user`;
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      <h1>Login with GitHub</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
