import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom" 
import { Link } from 'react-router-dom';
import styles from './createproj.module.css';


const apiUrl = process.env.REACT_APP_PUBLIC_API_URL;



const CreateProject = () => {


  const [token, setToken] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("tokenid");
        setToken(token);
      
      }, [token]);
      
      useEffect(() => { document.body.style.backgroundImage = 'none' }, [])
    
  const [formData, setFormData] = useState({
    id:"12992992",
    pname: "",
    domain: "",
    build_cmd: "",
    start_cmd:"",
    url: "",
  });

  // a funciton to check the alternate and primary phone number and email are different
  const check = () => {
    if (
      formData.pname === "" ||
      formData.domain === "" ||
      formData.url ===""||
      formData.build_cmd === "" ||
      formData.start_cmd === ""
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
      console.log(JSON.stringify(formData))
      const res = await fetch(apiUrl + "create_project/", {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
     
      // if data responseresult is User already exists then alert the user
      if(res.status===200){
        window.location.href = '/dashboard';

      }else{
        alert("Some Error occuured")
      }


    } catch (error) {
      console.log(error)

    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
            <Link to={"/dashboard"}><p>Back</p></Link>
            <h1>Create Project</h1>
            <br></br>
        <input
          name="pname"
          required
          type="text"
          placeholder="Enter your Project Name"
          value={formData.pname}
          onChange={handleChange} />
        <br></br>
        <input
          required
          name="domain"
          value={formData.domain}
          onChange={handleChange}
          type="text"
          placeholder="Enter your Domain Name"
        />
        <br></br>
        <input
          required
          name="url"
          value={formData.url}
          onChange={handleChange}
          type="text"
          placeholder="Enter your Github Link"
        />
        <br></br>
        <input
          required
          name="build_cmd"
          value={formData.build_cmd}
          onChange={handleChange}
          type="text"
          placeholder="Enter your Build Command"
        />
        <br></br>
        <input
          required

          name="start_cmd"
          value={formData.start_cmd}
          onChange={handleChange}
          type="text"
          placeholder="Enter your Start Command" 
        />
        <br></br>
        <input type="submit" value={"CREATE"}
        />
      </form >
 
    </div >
  );
};
export default CreateProject;
