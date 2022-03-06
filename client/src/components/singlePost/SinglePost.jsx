import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./singlePost.css";
import axios from "axios";
import { Context } from "../../context/Context";
import FileBase64  from 'react-file-base64'
export default function SinglePost() {
const [title , setTitle]= useState("");
const [description , setdescription]= useState("");
const [photo , setphoto]= useState("");
const [update , setupdate]= useState(false);
const {user}=useContext(Context)
const {search} = useLocation()

const[single , setSingle]= useState([]);
const location =  useLocation();
console.log(location)
const path = location.pathname.split("/")[2]
console.log(path)
useEffect(()=>{
const getPost = async ()=>{
  const res = await axios.get("/posts/"+ path);
  console.log( "this is single post",res)
  setSingle(res.data)
  console.log("this is data ", single)
  setdescription(res.data.description)
  setTitle(res.data.title)
}
getPost();
},[path])


console.log("user",user.username, "username" , single.username)

 const handelDelete = async()=>{
try {
  await axios.delete("/posts/"+ path,{ data : { username : user.username}}

  );
  window.location.replace("/");
} catch (error) {
  console.log(error)
}

 }
 const handelUpdate = async()=>{

try {
 
  await axios.put("/posts/" + path , 
   {  username : user.username ,title, description })
  window.location.reload();
} catch (error) {console.log(error)}}

console.log( "comparison",single.username === user.username)




  return (

    <div className="singlePost">
      <div className="singlePostWrapper">
     <img
          className="singlePostImg"
          src={single.photo}
          alt=""
        />
       
        {update ? ( <input type="text"  value={title}className="singlePostTitleInput"onChange={(event )=>{setTitle(event.target.value)}} ></input>):<h1 className="singlePostTitle">
          {single.title}

          {single.username === user.username && (<div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit" onClick={()=>{setupdate(true)}} ></i>
            <i className="singlePostIcon far fa-trash-alt" type="Submit" onClick={handelDelete}></i>
          </div>)}
          
        </h1>}
        
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/?user=${single.username}`}>
               {single.username}
              </Link>
            </b>
          </span>
          <span>{new Date(single.createdAt).toDateString()}</span>
        </div>
        {update ? ( <input  value={description}type="text"  className="singlePostTitleInput" onChange={(event )=>{setdescription(event.target.value)}}></input>):( <p className="singlePostDesc">
          {single.description}
        </p>)}
     
      </div>
    {update ? (<button className="siglepostClasseName" onClick={handelUpdate}> Upadate</button>):(<div></div>)}  
    </div>
  );
}
