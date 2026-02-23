import io from "socket.io-client"
import Base_url from "./BaseUrl"

export const createsocketconnection =()=>{
    return io(Base_url);
}