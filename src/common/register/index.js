import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom" 
import { Link } from 'react-router-dom';
import styles from './register.module.css'

const apiUrl = process.env.REACT_APP_PUBLIC_API_URL;
// let navigate=useNavigate()

const Register = () => {


  const [formData, setFormData] = useState({

    fname: "",
    lname: "",
    email_id: "",
    password: "",
  });

  useEffect(() => {
   
    document.body.classList.add(styles.body);
    return () => {
      document.body.classList.remove(styles.body);
    };

  },[]);


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

      }else if(data.status_code!=400){
        alert(data.detail)
      }


    } catch (error) {
      console.log(error)

    }
  };
  document.body.classList.add(styles.body);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
      <p>Hey There</p>
            <h1>Welcome Back</h1>
            <br></br>
        <input
          name="fname"
          required
          type="text"
          placeholder="Enter your First Name"
          value={formData.fname}
          onChange={handleChange} />
        <br></br>
        <input
          required
          name="lname"
          value={formData.lname}
          onChange={handleChange}
          type="text"
          placeholder="Enter your Last Name"
        />
        <br></br>
        <input
          required
          name="email_id"
          value={formData.email_id}
          onChange={handleChange}
          type="email"
          placeholder="Enter your email id"
        />
        <br></br>
        <input
          required

          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          placeholder="Enter your Password" 
        />
        <br></br>
        <input type="submit" value={"REGISTER"}
        />
         <div className={styles.link}>
    Already have an account? {/* Link to login page */}
    <Link to={"/login"}>
      <div>Login</div>
    </Link>
  </div>
      </form >
 
    </div >
  );
};
export default Register;
