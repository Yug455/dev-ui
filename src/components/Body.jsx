import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footet"
import Base_url from "../utils/BaseUrl"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useEffect } from "react"
import  axios  from "axios"
import { useSelector } from "react-redux"
import Login from "./Login"

const Body =()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state)=>state.user)
    const fetchUser =async()=>{
        try{
            const resp=await axios.get(Base_url+"/profile",{
            withCredentials: true,
   })
   dispatch(addUser(resp.data))
}
   catch(err){
    if (err.status === 401) {
      navigate("/Login")
}
    console.log(err)
   }
}
    useEffect(()=>{

            fetchUser()
        
    },[])

   
    return(
        <div>
         <Navbar/>
         <Outlet/>
         <Footer/>
        </div>
       
    )
         
    

}
export default Body;