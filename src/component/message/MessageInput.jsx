//import { BsSend } from "react-icons/bs";

const MessageInput = () => {
  return (
    <form className="px-4 my-3 position-relative" >
      <div className="w-100 position-relative">
        <input
          type="text"
          className="form-control text-white bg-dark border-secondary rounded"
          placeholder="Send a message"
        />
        <button
          type="submit"
          className="btn btn-primary position-absolute top-50 translate-middle-y end-0 pe-3"
        >button
          {/* This is a single-line comment  <BsSend />*/}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
