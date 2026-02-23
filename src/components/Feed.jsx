import axios from "axios"
import Base_url from "../utils/BaseUrl"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedSlice"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Usercard from "./usercard"

const Feed = ()=>{
  const dispatch = useDispatch()
    console.log("Calling feed API");
 const feed = useSelector((state)=>state.feed)
const getfeed =async ()=>{
   // if (feed) return;
    try {
    const res =await axios.get(Base_url+"/feedapi",{
        withCredentials : true,
    })
    dispatch(addFeed(res.data))
    console.log(res.data)
}catch(err){
  console.log(err.data)
 }
}
useEffect(()=>
    {
        console.log("Feed component mounted");
        getfeed()
    },
[])
return(
    feed?.length>0 &&(<div><Usercard user={feed[0]}/></div>)
 )
}
export default Feed