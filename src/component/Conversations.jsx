
import useGetConversations from "../hooks/useGetConversations.js";


//import Conversation from "@/component/Conversation.jsx";


const Conversations = () => {
  const { loading, conversations } = useGetConversations();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : (
        conversations.map((conversation, idx) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            lastIdx={idx === conversations.length - 1}
          />
        ))
      )}
    </div>
  );
};

export default Conversations;
