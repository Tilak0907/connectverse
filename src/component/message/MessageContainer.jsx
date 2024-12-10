import Message from "./Message";
import MessageInput from "./MessageInput";
//import { TiMessages} from "react-icons/ti";


const MessageContainer = () => {
    const noChatSelected=false;


    return (
      <div className="d-flex flex-column" style={{ minWidth: '450px' }}>
        {noChatSelected ?(
            <NoChatSelected />
        ):(
        <>
          {/* Header */}
          <div className="bg-secondary text-white px-4 py-2 mb-2">
            <span className="form-label">To: </span>
            <span className="text-dark fw-bold">John Doe</span>
          </div>
          <Message />
          {/* <MessageInput /> */}
          <MessageInput />
        </>
        )}
      </div>
    );
  };
export default MessageContainer;

const NoChatSelected = () => {
  return (
    <div className="d-flex align-items-center justify-content-center w-100 h-100">
      <div className="px-4 text-center text-muted font-weight-semibold d-flex flex-column align-items-center gap-2">
        <p>Welcome John Doe #</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="display-3" />
      </div>
    </div>
  );
};

  
