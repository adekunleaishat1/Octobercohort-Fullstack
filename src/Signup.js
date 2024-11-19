import React, { useState } from 'react'
import axios from 'axios'
import { Link , useNavigate} from 'react-router-dom'

const Signup = () => {
  const [isPending, setisPending] = useState(false)
  const [formDetail, setFormDetail] = useState(
    {
      firstname:"",
      lastname:"",
      email: "",
      password: "",
    },
  );
  const navigate = useNavigate();
  const  handleSignup =()=> {
    setisPending(true)
    axios.post("http://localhost:5002/user/signup",formDetail)
    .then((res)=>{
        console.log(res);
        navigate("/login")
    }).catch((err)=>{
      console.log(err);
        console.log(err?.response?.data?.message);
        
    })
    setisPending(false)
  }
  return (
    <div>
        <div className="border-secondary container d-flex align-items-center flex-column justify-content-center gap-3 col-6 vh-100">
      <div  className="w-100">
        <input
          className="form-control my-2"
          onChange={(e) =>
            setFormDetail({ ...formDetail, firstname: e.target.value })
          }
          placeholder="Firstname"
          type="text"
          value={formDetail.firstname}
        />
        <input
          className="form-control my-2"
          onChange={(e) =>
            setFormDetail({ ...formDetail, lastname: e.target.value })
          }
          placeholder="Lastname"
          type="text"
          value={formDetail.lastname}
        />
        <input
          className="form-control my-2"
          onChange={(e) =>
            setFormDetail({ ...formDetail, email: e.target.value })
          }
          placeholder="Email"
          type="email"
          value={formDetail.email}
        />
        <input
          className="form-control my-2"
          onChange={(e) =>
            setFormDetail({ ...formDetail, password: e.target.value })
          }
          placeholder="Password"
          type="password"
          value={formDetail.password}
        />
        <button
        onClick={handleSignup}
          className="btn btn-primary w-100 mt-3"
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Sign up"}
        </button>
      </div>
      <div>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
    </div>
  )
}

export default Signup