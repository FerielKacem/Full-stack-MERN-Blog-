import { useEffect, useState } from "react";
import "./register.css"
import axios from 'axios'
export default function Register() {
 const [username , setuser] = useState("");
 const [email , setEmail] = useState("");
 const[password , setPassword]=useState("");
const [error , setError] = useState(false)

const handlSubmit = async(e) =>{
e.preventDefault();
setError(false);
try{ const post =  await axios.post("/auth/register" , {
  username,
  email,
  password,
});
post.data && window.location.replace("/login")
}catch{ setError(true)}}
 


    return (
        <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handlSubmit}>
        <label>Username</label>
        <input className="registerInput" type="text" placeholder="Enter your username..." onChange={(event)=>{setuser(event.target.value)}} />
        <label>Email</label>
        <input className="registerInput" type="text" placeholder="Enter your email..."  onChange={(event)=>{setEmail(event.target.value)}}/>
        <label>Password</label>
        <input className="registerInput" type="password" placeholder="Enter your password..." onChange={(event)=>{setPassword(event.target.value)}}/>
        <button className="registerButton">Register</button>
      </form>
        <button  type= "submit" >Login</button>
        {error && <span style={{color:"red" , marginTop: "10px"}}> something went wrong</span>}
    </div>
    )
}
