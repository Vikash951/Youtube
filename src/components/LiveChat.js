
import { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { useSelector } from "react-redux";
import { generateRandomMessage, generateRandomName } from "../utils/helper";



const LiveChat = () =>{

    const [liveMessage , setLiveMessage] = useState([]);

    const dispatch = useDispatch();
    const ChatMessages = useSelector(store => store.chat.messages);

    useEffect(()=>{
        const interval = setInterval(()=>{
            dispatch(addMessage({
                name: generateRandomName(),
                message: generateRandomMessage(20)
            }))
        } , 2000);

        return ()=> clearInterval(interval);
    } , [])

    return (
      <>
        <div className="w-full h-[500px] border border-black rounded-lg bg-gray-100 overflow-y-scroll flex flex-col-reverse">
            <div>
                {
                  ChatMessages.map((c , index) => (
                    <ChatMessage key={index} name = {c.name} message = {c.message} />
                  ))
                }
            </div> 
             
        </div>

         <form className="w-full border border-gray-400 my-2 rounded-lg" onSubmit={(e) => { e.preventDefault()
                                                                                               dispatch(addMessage({
                                                                                                    name: "Vikash",
                                                                                                    message: liveMessage,
                                                                                               }))
                                                                                               setLiveMessage("");
                                                                                             }}>
            <input className="border border-black my-2 p-2 rounded-lg ml-4 w-90" type="text" value = {liveMessage} onChange={(e) => {
                                                                                                                            setLiveMessage(e.target.value);
                                                                                                                            }} />
            <button className="ml-4 border border-black p-2 rounded-lg bg-gray-100 ">Send</button>
         </form>
       </>    
    )
}

export default LiveChat;