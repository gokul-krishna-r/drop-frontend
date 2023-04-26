import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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



  return (
    < >
      <div className={styles.createProject}>
      <Header/>
      <input type="submit" value="CREATE PROJECT"></input>
      </div>
      <div className={styles.projectItemWrapper}>
        <h1>Projects</h1>
       {typeof projArr=="string" ? (<p>No Projects Till Now</p>)
       :(projArr.map((item)=>(
        <div className={styles.projectItem} key={item.id}>
            <h2>{item.pname}</h2>
            <br></br>
            <p>{item.domain}</p>
           </div>

       )))}
       </div>
    </>
  );
};
export default Dashboard;
