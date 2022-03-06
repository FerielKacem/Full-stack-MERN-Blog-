import { useContext , useRef } from "react";
import { Context } from '../../context/Context'
import "./login.css";
import axios from 'axios'

export default function Login() {
  const userRef  = useRef();
  const passwordRef = useRef();
  const { user ,dispatch , isFetching} = useContext(Context)

 const handelSubmit = async(e)=>{
e.preventDefault();
dispatch({type : "LOGIN_START"})
try{
const res =  await axios.post("/auth/login",
{
  username : userRef.current.value  ,
  password : passwordRef.current.value
} );
dispatch({type: "LOGIN_SUCCES", payload: res.data});


}catch(err){
  dispatch({type: "LOGIN_FAILURE", payload: err});
}

console.log(user
   )

}






  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handelSubmit}>
        <label>username</label>
        <input className="loginInput" type="text" placeholder="Enter your Username..."  ref={userRef}/>
        <label>Password</label>
        <input className="loginInput" type="password" placeholder="Enter your password..." ref={passwordRef} />
        <button className="loginButton" type="submit" disabled={isFetching}> {isFetching? "loading" :  "Login"}</button>
      </form>
        <button className="loginRegisterButton">Register</button>
    </div>
  );
}
