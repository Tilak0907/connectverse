const Conversation = ({ conversation, lastIdx }) => {
  return (
    <div className={`conversation-item ${lastIdx ? "last-item" : ""}`}>
      <h3>{conversation.title}</h3>
      <p>{conversation.lastMessage}</p>
    </div>
  );
};

export default Conversation;
