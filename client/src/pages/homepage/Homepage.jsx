import { useEffect , useState } from "react";
import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";

import "./homepage.css";
import axios from 'axios';
export default function Homepage() {

const {search} = useLocation()

console.log(search)
const [posts , setposts ] = useState([]);

useEffect(()=>{
  const getPost = async ()=>{
    const res = await axios.get("/posts"+ search);
    console.log("this is res", res)
   setposts(res.data)
   console.log( "this our Posts" ,posts)

  } 
  
  getPost();
},[search])



  
  return (
    <>
      <Header />
      <div className="home">
        <Posts  posts={posts} />
    
      </div>
    </>
  );
}
