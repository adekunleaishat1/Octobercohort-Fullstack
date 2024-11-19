import React ,{useState}from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isPending, setisPending] = useState(false)
  const navigate = useNavigate();
    const [formDetail, setFormDetail] = useState(
        {
          email: "",
          password: "",
        },
      );
    
      const  handleLogin =()=> {
        setisPending(true)
        axios.post("http://localhost:5002/user/login",formDetail)
        .then((res)=>{
            console.log(res);
            localStorage.setItem("token", res.data.token)
            navigate("/dashboard")
        }).catch((err)=>{
            console.log(err);
            
        })
        setisPending(false)
      }
    
  return (
    <>
        <div className="container col-5 d-flex flex-column gap-3 justify-content-center align-items-center vh-100">
      
      <div
        
        className="w-100 d-flex flex-column gap-3 align-items-center"
      >
        <input
          type="email"
          className="form-control"
          onChange={(e) =>
            setFormDetail({ ...formDetail, email: e.target.value })
          }
          placeholder="email"
        />
        <input
          type="password"
          className="form-control"
          onChange={(e) =>
            setFormDetail({ ...formDetail, password: e.target.value })
          }
          placeholder="password"
        />
        <button onClick={handleLogin} className="btn btn-primary" disabled={isPending}>
          {isPending ? "Loading..." : "Login"}
        </button>
      </div>
    </div>
    </>
  )
}

export default Login