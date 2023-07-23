import React from "react";
import { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import Header  from "../header/index.js";
import ChipGroup from "../chipGroup";

const Dashboard = () => {
    const [token, setToken] = useState("");
    const [projArr,setProjArr]=useState([])
    const [catArr,setCatArr]=useState(["All"])
    const apiUrl = process.env.REACT_APP_PUBLIC_API_URL;
    const [selectedChip, setSelectedChip] = useState('All');

    const handleChipSelection = (chip) => {
      setSelectedChip(chip);
    };

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
            data.categories.unshift("All");
            setCatArr(data.categories)
            console.log(data.categories)

          }else if(res.status=="405"){
            setCatArr("No Categories");
          }
        } catch (error) {
        }
      };
  
      fetchProjects();
      fetchCategories();
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
        project_id:proj_name
       }),
    });
    if(res.status=="200"){
      const data = await res.json();
      setProjArr(data)
      console.log(data)
  
    }else if(res.status=="405"){
    }
  }
  
  function projectDetails(proj_id){
    localStorage.setItem("projectid", proj_id);
    window.location.href = "/projectdetails";

  }
  async function suspendProj(proj_id) {
    console.log(proj_id)
    const res = await fetch(apiUrl+ `suspend_project/${proj_id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
        mode:"no-cors"
      },
    });
    if(res.status=="200"){
      const data = await res.json();
      setProjArr(data)
      console.log(data)
  
    }else if(res.status=="405"){
    }
  }

  async function resumeProj(proj_id) {
    const res = await fetch(apiUrl+ `resume_project/${proj_id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
        mode:"cors"
      },
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
      <ChipGroup categories={catArr} onChipSelection={handleChipSelection} /><br></br>
       {typeof projArr=="string" ? (<p>No Projects Till Now</p>)
       :
        (selectedChip=="All" ? 
       (projArr.map((item)=>(
        <div className={styles.projectItem} key={item.id} >
            <h2>{item.pname}</h2>
            {item.build_status==0 || item.build_status==2 ? (<p>Running</p>):(<p>Suspened</p>)}
            <a href={'http://'+item.domain} target="_blank">{item.domain}</a>
            <div>
            <button   onClick={()=>{projectDetails(item.id)}}>More</button>
              {item.build_status==0 || item.build_status==2 ? 
              (<button   onClick={()=>{suspendProj(item.id)}}>Suspend</button>):
              (<button   onClick={()=>{resumeProj(item.id)}}>Resume</button>)
                } 
              <button   onClick={()=>{deleteProj(item.id,item.domain)}}>Delete</button>
            </div>
           </div>

       ))):(projArr.filter(item => item.category === selectedChip).map((item)=>(
        <div className={styles.projectItem} key={item.id}  >
            <h2>{item.pname}</h2>
            {item.build_status==0 || item.build_status==2 ? (<p>Running</p>):(<p>Suspened</p>)}
            <a href={'http://'+item.domain} target="_blank">{item.domain}</a>
            <div> 
               <button   onClick={()=>{projectDetails(item.id)}}>More</button>
              {item.build_status==0 || item.build_status==2 ? 
              (<button   onClick={()=>{suspendProj(item.id)}}>Suspend</button>):
              (<button   onClick={()=>{resumeProj(item.id)}}>Resume</button>)
                } 
              <button   onClick={()=>{deleteProj(item.id,item.domain)}}>Delete</button>
            </div>
           </div>

       ))))
       }
       </div>
    </>
  );
};


export default Dashboard;
