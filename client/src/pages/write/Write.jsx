import { useContext, useState } from "react";
import "./write.css";
import axios from 'axios'
import {Context} from '../../context/Context'
import FileBase64  from 'react-file-base64'
import { Link, useLocation } from "react-router-dom";




export default function Write() {
 const [title , setTitle] = useState("");
 const [description , setdesc] = useState("");
 const [photo , setphoto] = useState(null);
 const {user} = useContext(Context)
 const location =  useLocation();
 const handelSubmit = async()=>{
  
  const newPost = {
    title ,
    description ,
   username :  user.username, 
   photo }
  
   try{
     await axios.post("/posts/", newPost);
  
   window.location.replace("/");
  
  }catch(err){

   }

 }
  
  return (
    <div className="write">
      <form className="writeForm" onSubmit={handelSubmit} >
        <div className="writeFormGroup">
          
          <FileBase64 
type = "file"

multiple={false}

onDone={({base64})=>{ setphoto(base64)}}/>
<br/>
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={e=>{setTitle(e.target.value)}}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={e=>{setdesc(e.target.value)}}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
