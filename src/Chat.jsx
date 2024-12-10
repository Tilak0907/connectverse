import Sidebar from './component/Sidebar.jsx';
import MessageContainer from './component/message/MessageContainer.jsx';



const Chat = () => {
    return (
      <div className="d-flex justify-content-center align-items-center h-10 rounded-lg overflow-hidden bg-gray-400 bg-opacity-0 border border-white mt-5" style={{ maxWidth: '600px', width: 'auto' }}>
        <Sidebar />
        {/* <MessageContainer /> */}
        <MessageContainer />
        <p>loading</p>

        
      </div>
    );
  };
  
  export default Chat;
  