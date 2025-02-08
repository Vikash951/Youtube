import { user_icon } from "../utils/constant";

const ChatMessage = ({name , message}) => {
    return (
        <div className="flex items-center m-2 gap-2 shadow-md p-2 rounded-md">
            
            <img className="h-8 rounded-lg" src= {user_icon} alt="" />
            <span className="font-bold">{name}</span>
            <span>{message}</span>
            
        </div>
    )
}

export default ChatMessage;