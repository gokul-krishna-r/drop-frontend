import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom" 
import { Link } from 'react-router-dom';
import styles from './createproj.module.css';
import ChipGroup from "../chipGroup";



const apiUrl = process.env.REACT_APP_PUBLIC_API_URL;



const CreateProject = () => {


  const [token, setToken] = useState("");
  const [envContent, setEnvContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [catArr,setCatArr]=useState(["All"])
  const [selectedChip, setSelectedChip] = useState('');
  
  const isValidGithubUrl = (url) => {
    const githubUrlRegex = /github\.com/;
    return githubUrlRegex.test(url);
  };

  const isValidEnvContent = (content) => {
    const envLineRegex = /^[a-zA-Z_][a-zA-Z0-9_]*=[^\r\n]*$/;
  
    // Split the content into lines
    const lines = content.split(/\r?\n/);
  
    for (const line of lines) {
      if (!envLineRegex.test(line)) {
        return false;
      }
    }
  
    return true;
  };
  const handleChipSelection = (chip) => {
    setSelectedChip(chip)
    formData.category=chip;
  };

    useEffect(() => {
        const token = localStorage.getItem("tokenid");
        setToken(token);
        
      
      }, [token]);
      
      useEffect(() => { document.body.style.backgroundImage = 'none' }, [])
    
  useEffect(() => {

    const fetchCategories= async () => {
      try {
      const token = localStorage.getItem("tokenid");
          setToken(token);
        const res = await fetch(apiUrl + "get_categories/", {
          headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
          },
        });
        if(res.status=="200"){
          const data = await res.json();
          setCatArr(data.categories)
          console.log(data.categories)

        }else if(res.status=="405"){
          setCatArr("No Categories");
        }
      } catch (error) {
        alert(error.message)
      }
    };

    fetchCategories();
    
    if(isLoading){
      setTimeout(()=>{window.location.href="/dashboard"},10000)
    }

    // Cleanup function to stop the loading process if the component is unmounted
    // return () => setIsLoading(false);
  }, [isLoading]);

  const [formData, setFormData] = useState({
    id:"",
    pname: "",
    domain: "",
    build_cmd: "",
    start_cmd:"",
    category:"",
    url: "",
  });

  // a function to check the alternate and primary phone number and email are different
  const check = () => {
    if (
      formData.pname === "" ||
      formData.domain === "" ||
      formData.url ===""||
      formData.category === "" 
    ) {
      alert("please fill all the fields");
      return false;
    }

    if (!isValidGithubUrl(formData.url)) {
      alert("Please enter a valid github url");
      return false;
    }

    if(!isValidEnvContent(envContent)){
      alert("Please enter a valid env file content");
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
    formData.build_cmd="npm run build"
    formData.start_cmd="npm run start"
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
        body: JSON.stringify({envText:envContent,
          projects:formData}),
      });
      const data = await res.json();
      // if data responseresult is User already exists then alert the user
      if(res.status===200){
        setIsLoading(true);
        // window.location.href = '/dashboard';
      }else{
        alert(data.detail)
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className={styles.container}>
     { isLoading?<div>Setting Up Project</div>:
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
          type="url"
          placeholder="Enter your Github Link"
        />
    
       
        <br></br>
        <input
          required

          name="category"
          value={formData.category}
          onChange={handleChange}
          type="text"
          placeholder="Enter Product Category" 
        />
        <ChipGroup categories={catArr} onChipSelection={handleChipSelection} /><br></br>

        <br></br>
        <textarea
          required  
          name="env"
          value={envContent}
          onChange={(e) => setEnvContent(e.target.value)}
          placeholder="Paste .env file content here..."
          rows={10}
        >Hello</textarea>
        <br></br>

        <input type="submit" value={"CREATE"}
        />
      </form >
      }
    </div >
  );
};

export default CreateProject;
