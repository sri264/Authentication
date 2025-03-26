import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5005/users/login", {
        email,
        password,
      });
  
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userEmail", email); 
        alert("Login Successful!");
        navigate("/apppage");
      } else {
        alert("Token not received. Login failed.");
      }
    } catch (error) {
      alert("Invalid Email or Password!");
    }
  };
  

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}> 
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}  

export default Loginpage;