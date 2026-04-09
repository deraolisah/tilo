import { MessageCircleMore, X } from "lucide-react";
import { useState } from "react";

const ChatIcon = ({ toggleMessage }) => (
  <div
    className="fixed z-20 bottom-8 md:bottom-11 right-4 md:right-6 bg-white rounded-full p-2 pr-4 shadow border border-gray-200 cursor-pointer flex items-center gap-1 font-medium"
    onClick={toggleMessage}
  >
    <MessageCircleMore size={28} strokeWidth={1.5} />
    <span> Chat </span>
  </div>
);

const Chatbox = () => {
  const [messageOpen, setMessageOpen] = useState(false);

  const toggleMessage = () => {
    setMessageOpen(prev => !prev);
    console.log("Message icon Clicked!");
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full p-4 md:p-6 md:pb-10 flex items-end justify-end">
      {!messageOpen ? (
        <ChatIcon toggleMessage={toggleMessage} />
      ) : (
        <div className="">
          <div className="bg-white w-full max-w-sm overflow-y-auto rounded-2xl p-4 z-50 relative">
            <button
              type="button"
              aria-label="Close chatbox"
              className="w-8 h-8 p-2 rounded-full bg-gray-300 cursor-pointer flex items-center justify-center"
              onClick={toggleMessage}
            >
              <X size={20} />
            </button>

            <br />
            Y'ello 👋🏾!
            <br />
            <br />
            I'm Zigi, your MTN online assistant 👩🏾‍💻. What can I help you with today?
            <br />
            I'm here and happy to assist 😀.
            <form className="flex mt-2">
                <input type="text" className="bg-gray-100 border border-gray-200 py-2 p-4 w-full rounded-lg" />
            </form>
          </div>
          <div className="fixed w-full h-full bg-black/60 z-30 inset-0" onClick={toggleMessage} />
        </div>
      )}
    </div>
  );
};

export default Chatbox;