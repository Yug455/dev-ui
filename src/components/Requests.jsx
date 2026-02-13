import axios from "axios"
import Base_url from "../utils/BaseUrl"
import { useDispatch } from "react-redux"
import { addRequest } from "../utils/Requestconnections"
import { removerequest } from "../utils/Requestconnections"
import { useEffect } from "react"
import { useSelector } from "react-redux"
const Requests = ()=>{
    const dispatch = useDispatch()
    const requestdata = useSelector((store)=>{
       return store.request
    })
    
            const reviewrequest= async(status , _id)=>{
               try{
        const respo= await axios.post(Base_url+"/request/review/" + status + "/"+ _id,{},
        {withCredentials:true}
    
    )
    dispatch(removerequest(_id))
}catch(err){
    console.log(err?.response?.data)
}
    }

    

    const getRequests= async()=>{
        try {
            const res =await axios.get(Base_url+"/user/request/recieved",{
                withCredentials:true
            })
            dispatch(addRequest(res.data.pendingrequest))
        }catch(err){
            console.log(err?.response?.data)
        }
    }
    useEffect(()=>{
        getRequests()
    },[])
   if(!requestdata){
        return null
    }
    if (requestdata.length=== 0 ){
        return <div>No Connections found</div>
    }

   return(
    <div>
   <div className="flex flex-col h-screen items-center mx-20 ">
     <div>{requestdata.map((req)=>{
           return (<div className=" my-7  w-[220px] h-[200px]">
            <div>Request</div>
           <div className="border border-black my-7 rounded-2xl">{req.fromuserId.FirstName + " "+ req.fromuserId.LastName}</div>
                <div className="border border-black rounded-2xl">{req.fromuserId.Age && req.fromuserId.Gender && (<span>{req.fromuserId.Age} {req.fromuserId.Gender}</span>)}</div>
                <button className="btn btn-active btn-primary mx-2" onClick={()=>{reviewrequest("rejected",req._id)}}>rejected</button>
                <button className="btn btn-active btn-secondary" onClick={()=>{reviewrequest("accepted",req._id)}}>accepted</button>
                </div>
       
            
           )


        })}</div>
   </div>
    </div>
   )}
export default Requests