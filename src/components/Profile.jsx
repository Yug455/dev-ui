import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import  Usercard  from "./usercard";
import axios from "axios";
import Base_url from "../utils/BaseUrl";
import { Await, data } from "react-router-dom";
import { addUser } from "../utils/userSlice";
const Profile = ()=>{
    const user = useSelector((store)=>store.user)

    const [FirstName,setFirstName]= useState("")
    const [LastName,setLastName]= useState("")
    const [Age,setAge]= useState("")
    const [Gender,setGendre] =useState("")
    const [error,setError]=useState("")
    const [showToast,setShowToast]= useState(false)
    const dispatch = useDispatch()
    
    useEffect(()=>{
        const fetchprofile = async ()=>{
            try{ 
                const resp =await axios.get(Base_url+"/profile",
                {withCredentials:true}
             )
             dispatch(addUser(resp.data))
             
            }
             catch(err){
                console.log(err.response.data)
             }
            
        }
        fetchprofile()

    },[])

    useEffect(()=>{
    if(user){
        setFirstName(user.FirstName || "")
        setLastName(user.LastName || "")
        setAge(user.Age || "")
        setGendre(user.Gender || "")
    }
},[user])

    const Saveprofile=async()=>{
        try{
           const res=await axios.post(Base_url+"/updateuserinfo",{
                FirstName,
                LastName,
                Age,
                // Gender
            },
           { withCredentials : true},
         
        )
        dispatch(addUser(res.data.data))
        setShowToast(true)
             const i = setTimeout(() => {
                setShowToast(false)
             }, 3000);
        }catch(err){    
            setError(err?.response?.data)
        }
    }
    return (
       <div>
   {(user &&
    <div className="flex h-full w-full">
<div className="ml-[40%] mt-7"> 
<div><input type="text" placeholder="FirstName" className="input input-primary"
value={FirstName}
onChange={(e)=>setFirstName(e.target.value)}
/></div>
<div><input type="text" placeholder="LastName" className="input input-secondary" 
value={LastName}
onChange={(e)=>{setLastName(e.target.value)}}/></div>
<div><input type="text" placeholder="Age" className="input input-success" 
value={Age} 
onChange={(e)=>{setAge(e.target.value)}}/></div>
<div><input type="text" placeholder="Gender" className="input input-warning" 
value={Gender}
onChange={(e)=>{setGendre(e.target.value)}}/></div>
<button className="btn" onClick={Saveprofile} >Save</button>
</div>
<Usercard user={{FirstName,LastName,Age,Gender}}/>
</div>)} 


{(showToast && <div className="toast toast-top toast-start">
  <div className="alert alert-success">
    <span>profile updated succesfully</span>
  </div>
</div>)}
</div>
)


  
}
export default Profile;