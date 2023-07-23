import React from "react";
import { useEffect, useState } from "react";
import styles from "./documentation.module.css";
import tut_1 from "../../images/tutorial_1.png"
import tut_2 from "../../images/tutorial_2.png"
import tut_3 from "../../images/tutorial_3.png"
import tut_4 from "../../images/tutorial_4.png"
import tut_5 from "../../images/tutorial_5.png"
import tut_6 from "../../images/tutorial_6.png"
import del_1 from "../../images/del_proj_1.png"
import del_2 from "../../images/del_proj_2.png"
import del_3 from "../../images/del_proj_3.png"
import create_1 from "../../images/create_proj_1.png"
import create_2 from "../../images/create_proj_2.png"
import create_3 from "../../images/create_proj_3.png"
import create_4 from "../../images/create_proj_4.png"
import create_5 from "../../images/create_proj_5.png"
import { Link } from "react-router-dom";

const Documentation = () => {
   
  return (
    < >
        <div className={styles.TutorialContainer} >  
        <Link to={"/dashboard"} className={styles.backButton}>Back</Link>
        <h1>How to Create a Project</h1>
        <ol>
        <li> Go to Github repository of the required project and copy the link</li>
        <li> Login to Drop<br></br><br></br><img src={create_1} alt="create_1" /></li>
        <li> On Successful Login, Click of create project cta in Dashboard <br></br><br></br><img src={create_2} alt="create_2" /></li>
        <li> Enter project name, domain, github url( copied from githun), category and environment variables list if any<br></br><br></br><img src={create_3} alt="create_3" /></li>
        <li> Wait for the project to be setup</li>
        <li> Once the project is ready it will be indicated by the status "running" <br></br><br></br><img src={create_4} alt="create_4" /></li>
        <li> Click on the domain link to access your hosted project <br></br><br></br><img src={create_5} alt="create_5" /></li>
        </ol>
        <br></br>
        <h1>How to Delete a Project</h1>
        <ol>
        <li> Go to Dashboard<br></br><br></br><img src={del_1} alt="del_1" /></li>
        <li> Click on delete project cta of the required project<br></br><br></br><img src={del_2} alt="del_2" /></li>
        <li> On Successful delete the project will be removed from the dashboard <br></br><br></br><img src={del_3} alt="del_3" /></li>
        </ol>
        <br></br>
        <h1>How to add github webhook</h1>
        <ol>
        <li> Go to dashboard</li>
        <li> Click the more cta of the required project</li>
        <li> Copy the link in the webhook section</li>
        <li> Go to the github repository link of the project</li>
        <li> Click on the Settings button <br></br> <br></br><img src={tut_1} alt="tut_1" /></li>
        <li> Navigate to webhooks<br></br> <br></br><img src={tut_2} alt="tut_2" /></li>
        <li> Click on add webhook<br></br> <br></br><img src={tut_3} alt="tut_3" /></li>
        <li> Paste the link copied from project details page </li>
        <li> Click on add webhook<br></br> <br></br><img src={tut_5} alt="tut_5" /></li>
        <li>The webhook has now been added. Now any commits you make into this repository will be automatically updated in our servers<br></br><br></br>
        <img src={tut_6}/></li>
        </ol>
    </div>
    </>
  );
};
export default Documentation;
