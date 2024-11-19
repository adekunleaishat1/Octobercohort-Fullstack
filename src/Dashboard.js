import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [image, setImage] = useState("")
    useEffect(() => {
        axios
          .get("http://localhost:5002/user/verify", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
            localStorage.removeItem("token");
            navigate("/login");
          });
      }, [])
    const handleChange = (e) => {
        const image = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
          setImage(reader.result);
        };
    }


    const handleUpload =  () => {
        try {
            axios.post("http://localhost:5002/user/upload",{image},
            {
              headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
              },
            }
           ).then((res)=>{
            console.log(res);
            
          }).catch((err)=>{
            console.log(err);
            
          })
        } catch (error) {
          console.log(error);
          
        }
      };
  return (
    <div>
         <input onChange={handleChange} type="file" />
         <button onClick={handleUpload}>Upload</button>
    </div>
  )
}

export default Dashboard