import React from "react";
import { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import Header  from "../header/index.js";

const Dashboard = () => {
    const [token, setToken] = useState("");
    const [projArr,setProjArr]=useState([])
    const apiUrl = process.env.REACT_APP_PUBLIC_API_URL;

    useEffect(() => {
        const token = localStorage.getItem("tokenid");
        setToken(token);
      
      }, [token]);
      
      useEffect(() => { document.body.style.backgroundImage = 'none' }, [])
    

    useEffect(() => {
      const fetchProjects = async () => {
        try {
        const token = localStorage.getItem("tokenid");
            setToken(token);
          const res = await fetch(apiUrl + "list_projects/", {
            headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
            },
          });
          if(res.status=="200"){
            const data = await res.json();
            setProjArr(data)
            console.log(data)

          }else if(res.status=="405"){
            setProjArr("No Projects");
          }
        } catch (error) {
        }
      };
  
      fetchProjects();
    }, [apiUrl]);
  

  // const router = useRouter();

  async function deleteProj(proj_name,domain) {
    const res = await fetch(apiUrl+ "delete_project/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
        mode:"cors"
      },
      body:JSON.stringify({
        project_domain:domain,
        project_name:proj_name
       }),
    });
    if(res.status=="200"){
      const data = await res.json();
      setProjArr(data)
      console.log(data)
  
    }else if(res.status=="405"){
    }
  }

  return (
    < >
      <div className={styles.createProject}>
      <Header/>
      <br></br>
      <input type="submit" value="CREATE PROJECT" onClick={()=>{window.location.href="/createproject"}}></input>
      </div>
      <div className={styles.projectItemWrapper}>
        <h1>Projects</h1>
       {typeof projArr=="string" ? (<p>No Projects Till Now</p>)
       :(projArr.map((item)=>(
        <div className={styles.projectItem} key={item.id}>
            <h2>{item.pname}</h2>
            
            <a href={'http://'+item.domain} target="_blank">{item.domain}</a>
            <button   onClick={()=>{deleteProj(item.pname,item.domain)}}>Delete</button>
           </div>

       )))}
       </div>
    </>
  );
};


export default Dashboard;
