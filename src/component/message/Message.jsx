const Message = () => {
    return (
      <div className="d-flex justify-content-end align-items-start">
        {/* Avatar */}
        <div className="me-2">
          <img
            alt="User avatar"
            src="https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
            className="rounded-circle"
            style={{ width: "40px", height: "40px" }}
          />
        </div>
        {/* Chat Bubble */}
        <div>
          <div
            className="bg-primary text-white rounded p-2 mb-1"
            style={{ maxWidth: "300px", wordBreak: "break-word" }}
          >
            Hi! What is up?
          </div>
          {/* Footer */}
          <div
            className="text-muted small d-flex align-items-center gap-1"
            style={{ opacity: 0.5 }}
          >
            12:42
          </div>
        </div>
      </div>
    );
  };
  export default Message;
  