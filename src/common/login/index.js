import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [token, setToken] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  // const router = useRouter();

  const apiUrl = process.env.REACT_APP_PUBLIC_API_URL;
// use effect
  useEffect(() => {
    if (token) {
      if (typeof window !== "undefined"){
      localStorage.setItem("tokenid", token);
      }
    }
  }, [token]);

  const handleSubmit = async (event) => {


    event.preventDefault();
    try {
      const params = new URLSearchParams();
      params.append("username", formData.username);
      params.append("password", formData.password);
      const response = await fetch(apiUrl+ "login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          accept: "application/json",
        },
        body: params.toString(),
      });

      const responseData = await response.json();
      setToken(responseData.access_token)
      console.log(responseData);
      if (responseData.access_token) {
        window.location.href='/dashboard'
      } else {

        alert("username or password is incorrect");
      }
    } catch (error) {

      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div >
        <form onSubmit={handleSubmit}>
          <p>{apiUrl}</p>
            <input type="email" placeholder="Enter your email" name="username" onChange={handleChange}/><br></br>
            <input type="password"  onChange={handleChange} name="password" placeholder="Enter your password"/><br></br>
            <input type="submit" value={"Login"}/>
        </form>
        <div>
          New Here<Link to="/register">Register</Link>
        </div>
    </div>
  );
};
export default Login;
