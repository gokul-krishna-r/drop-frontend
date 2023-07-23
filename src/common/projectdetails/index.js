import React from "react";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import styles from './projectdetails.module.css'
import Header from "../header";
import tut_1 from "../../images/tutorial_1.png"
import tut_2 from "../../images/tutorial_2.png"
import tut_3 from "../../images/tutorial_3.png"
import tut_4 from "../../images/tutorial_4.png"
import tut_5 from "../../images/tutorial_5.png"
import tut_6 from "../../images/tutorial_6.png"

const ProjectDetails = () => {
    const [token, setToken] = useState("");
    const [projectId,setProjectId]=useState("")
    const [projArr,setProjArr]=useState(null)
    const apiUrl = process.env.REACT_APP_PUBLIC_API_URL;


    useEffect(() => {
        const token = localStorage.getItem("tokenid");
        const projectid=localStorage.getItem("projectid");
        console.log(projectid)
        setToken(token);
        setProjectId(projectid);
      
      }, [token]);
      
      useEffect(() => { document.body.style.backgroundImage = 'none' }, [])
    

    useEffect(() => {
      const fetchProjects = async () => {
        
        try {
          const res = await fetch(apiUrl + `get_project/?project_id=${projectId}`, {
            method: "GET",
            headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
            },
          });
          if(res.status=="200"){
            const data = await res.json();
            
            setProjArr(data)
            console.log(data)

          }else{
            setProjArr("No Details Found");
          }
        } catch (error) {
        }
      };
     
      fetchProjects();
    }, [projArr]);
  

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
        window.location.href="/dashboard"
      console.log(data)
  
    }else if(res.status=="405"){
    }
  }
  

  async function suspendProj(proj_id) {
    console.log(proj_id)
    const res = await fetch(apiUrl+ `suspend_project/${proj_id}`, {
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
    <div >
          {projArr==null ? (<p>Loading...</p>):(
      <div className={styles.detailsWrapper}>
      <Header/>

      <Link to={"/dashboard"}><p>Back</p></Link>
     
        <div className={styles.detailsContainer}>
      <h1>{projArr.pname}</h1>
      <a href={'http://'+projArr.domain} target="_blank">{projArr.domain}</a>
      <p><b>Project Id:</b> {projArr.id}</p>
      <p><b>Category:</b> {projArr.category}</p>
      <p><b>Github Url: </b><a href={projArr.url} target="_blank">{projArr.url}</a></p>
   
      <p><b>Port:</b> {projArr.port}</p>
            {projArr.build_status==0 || projArr.build_status==2 ? (<p><b>Status:</b> Running</p>):(<p><b>Status:</b> Suspended</p>)}
        <h3  className={styles.copyPasteBar} onClick={(e)=>{
        try {
            navigator.clipboard.writeText(e.target.innerText);
            console.log('Copied to clipboard:', e.target.innerText);
          } catch (error) {
            console.log('Error copying to clipboard:', e.target.innerText);
          }
      }}>
              <p>Click to copy paste this link to your github webhook </p>
{apiUrl+`git_pull/${projArr.id}/`}</h3>
            <div>
              {projArr.build_status==0 || projArr.build_status==2 ? 
              (<button   onClick={()=>{suspendProj(projArr.id)}}>Suspend</button>):
              (<button   onClick={()=>{resumeProj(projArr.id)}}>Resume</button>)
                } 
              <button   onClick={()=>{deleteProj(projArr.id,projArr.domain)}}>Delete</button>
            </div>
</div>
     
    <div className={styles.TutorialContainer} >  
    <h1>How to add github webhook</h1>
        <ol>
        <li> Go to the repository <a href={projArr.url} target="_blank">{projArr.url}</a></li>
        <li> Click on the Settings button <br></br> <br></br><img src={tut_1} alt="tut_1" /></li>
        <li> Navigate to webhooks<br></br> <br></br><img src={tut_2} alt="tut_2" /></li>
        <li> Click on add webhook<br></br> <br></br><img src={tut_3} alt="tut_3" /></li>
        <li>  <p   onClick={(e)=>{
        try {
            navigator.clipboard.writeText(e.target.innerText);
            console.log('Copied to clipboard:', e.target.innerText);
          } catch (error) {
            console.log('Error copying to clipboard:', e.target.innerText);
          }
      }}>
             Click to copy paste this link to Payload URL Field<br></br><br></br>
            <h3 className={styles.copyPasteBar}>
{apiUrl+`git_pull/${projArr.id}/`}</h3><br></br>
<img src={tut_4}/></p></li>  

        <li> Click on add webhook<br></br> <br></br><img src={tut_5} alt="tut_5" /></li>
        <li>The webhook has now been added. Now any commits you make into this repository will be automatically updated in our servers<br></br><br></br>
        <img src={tut_6}/></li>
        </ol>
    </div>
    
    </div>
     )}
    </div>
  );
};


export default ProjectDetails;
