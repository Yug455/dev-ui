import axios from "axios"
import Base_url from "../utils/BaseUrl"
import { useDispatch } from "react-redux"
import { addconnection } from "../utils/connection.Slice"
import { useEffect } from "react"
import { useSelector } from "react-redux"

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

    return(<div>
        <div>Connections</div>
        <div>{connections.map((conn)=>{
           return <div>{conn.FirstName}</div>
        })}</div>
    </div>
       
        
    )
}
export default Connections