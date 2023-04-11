import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [token, setToken] = useState("");
    const [projArr,setProjArr]=useState([])
    const apiUrl = process.env.REACT_APP_PUBLIC_API_URL;

    useEffect(() => {
        const token = localStorage.getItem("tokenid");
        setToken(token);
      }, [token]);

    useEffect(() => {
      const fetchProjects = async () => {
        try {
        const token = localStorage.getItem("tokenid");
            setToken(token);
          const res = await fetch(apiUrl + "list_projects/", {
            headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`
            },
          });
          const data = await res.json();
          setProjArr(data);
          console.log(data)
        } catch (error) {
        }
      };
  
      fetchProjects();
    }, [apiUrl]);
  

  // const router = useRouter();



  return (
    < >
       {projArr.map((item)=>(
        <div key={item.id}>
            <h2>{item.pname}</h2>
            <p>{item.domain}</p>
           </div>
       ))}
    </>
  );
};
export default Dashboard;
