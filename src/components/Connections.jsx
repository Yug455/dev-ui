import axios from "axios"
import Base_url from "../utils/BaseUrl"
import { useDispatch } from "react-redux"
import { addconnection } from "../utils/connectionSlice"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

const Connections = ()=>{
    const dispatch = useDispatch()
     const connections = useSelector((store)=>store.connection)
     
    const getConnections = async()=>{
        try{
             const res = await axios.get(Base_url+"/user/connections",{
             withCredentials:true
        })
        dispatch(addconnection(res?.data?.data))
        }catch(err){
            console.log(err)
        }
       
    }
    
 
 useEffect(()=>{
    getConnections()
 },[])
    
    if(!connections){
        return
    }
    if (connections.length=== 0 ){
        return <div>No Connections found</div>
    }

    return(<div className="flex flex-col h-screen items-center mx-20 ">
        <div>Connections</div>
        <div>{connections.map((conn)=>{
            const {_id} = conn
           return (
           <div key={conn._id}>
           <div  className="border border-amber-400 my-7  w-[500%]">
            <div className="flex flex-col">
           <div className="border border-black my-7 rounded-2xl">{conn.FirstName + " "+ conn.LastName}</div>
                <div className="border border-black rounded-2xl">{conn.age && conn.Gender && (<span>{conn.age} {conn.Gender}</span>)}</div>
                </div>
              <Link to={"/chat/"+ _id} >
               <button className="bg-green-800 cursor-pointer">chat</button>
              </Link>
           
            </div>
            </div>
           )


        })}</div>
    </div>
       
        
    )
}
export default Connections