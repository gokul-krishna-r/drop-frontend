import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom" 
import { Link } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_PUBLIC_API_URL;
// let navigate=useNavigate()

const Register = () => {


  const [formData, setFormData] = useState({

    fname: "",
    lname: "",
    email_id: "",
    password: "",
  });



  // a funciton to check the alternate and primary phone number and email are different
  const check = () => {
    if (
      formData.fname === "" ||
      formData.lname === "" ||
      formData.email_id === "" ||
      formData.password === ""
    ) {
      alert("please fill all the fields");
      return false;
    }
    return true;
  }


  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));


  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (check() === false) {
        return;
      }
      const res = await fetch(apiUrl + "register/", {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
     
      // if data responseresult is User already exists then alert the user
      if(data.msg==="User successfully Created"){
        window.location.href = '/login';

      }


    } catch (error) {
      console.log(error)

    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="fname"
          required
          type="text"
          placeholder="Enter your First Name"
          value={formData.fname}
          onChange={handleChange} />

        <input
          required
          name="lname"
          value={formData.lname}
          onChange={handleChange}
          type="text"
          placeholder="Enter your Last Name"
        />
        <input
          required
          name="email_id"
          value={formData.email_id}
          onChange={handleChange}
          type="email"
          placeholder="Enter your email id"
        />

        <input
          required

          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          placeholder="Enter your Password" 
        />

        <input type="submit" value={"Register"}
        />
        
      </form >
  <div>
    Already have an account? {/* Link to login page */}
    <Link to={"/login"}>
      <div>Login</div>
    </Link>
  </div>
    </div >
  );
};
export default Register;
