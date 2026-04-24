import { MessageCircleMore, X } from "lucide-react";
import { useState } from "react";
import logo from "../../assets/logo.png";

const ChatIcon = ({ toggleMessage }) => (
  <div
    className="fixed z-20 bottom-8 right-4 md:right-6 bg-white rounded-full p-2 pr-4 shadow border border-gray-200 cursor-pointer flex items-center gap-1 font-medium"
    onClick={toggleMessage}
  >
    <MessageCircleMore size={28} strokeWidth={1.5} />
    <span> Chat </span>
  </div>
);

const Chatbox = () => {
  const [messageOpen, setMessageOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I assist you today?" }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    setInput(""); 
  };

  const toggleMessage = () => {
    setMessageOpen(prev => !prev);
    console.log("Message icon Clicked!");

    document.body.style.overflow = !messageOpen ? "hidden" : "auto";
  };



  return (
    <div className="">
      {!messageOpen ? (
        <ChatIcon toggleMessage={toggleMessage} />
      ) : (
        <div className="fixed z-20 top-0 left-0 w-full h-full p-0 md:p-6 md:pb-8 flex items-end justify-end">
          <div className="bg-white flex flex-col justify-between w-full h-full md:h-fit md:max-w-sm overflow-y-auto md:rounded-2xl pt-0 p-4 z-50 relative">
            {/* Header */}
            <div className="sticky top-0 md:relative flex items-center justify-between gap-4 bg-white border-b border-gray-200 py-4">
              <div className="w-10 h-10 rounded-full bg-gray-950 flex items-center justify-center">
                {/* <MessageCircleMore size={20} className="text-white" /> */}
                <img src={logo} alt="" className="w-6 h-6 invert-100" />
              </div>
              <h3 className="text-base md:text-lg font-bold flex-1"> Tilo Assistant </h3>
              <button
                type="button"
                aria-label="Close chatbox"
                className="w-8 h-8 p-2 rounded-full bg-gray-200 cursor-pointer flex items-center justify-center"
                onClick={toggleMessage}
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="mt-4 flex-1 md:flex-none h-full md:h-64 overflow-y-auto" aria-live="polite">
              {messages.map((msg, i) => (
                <div key={i} className={`flex items-center gap-2.5 ${msg.from === "user" ? "justify-end" : ""}`}>
                  {msg.from === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                      <MessageCircleMore size={16} className="text-white" />
                    </div>
                  )}
                  <div className={`p-3 rounded-lg ${msg.from === "user" ? "mt-1.5 bg-blue-100" : "bg-gray-100"}`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} className="flex mt-2 gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-gray-100 border border-gray-200 py-2 px-4 w-full rounded-lg"
                placeholder="Type your message..."
              />
              <button type="submit" className="bg-gray-950 text-white px-4 rounded-lg">Send</button>
            </form>
          </div>
          <div className="fixed w-full h-full bg-black/60 z-30 inset-0" onClick={toggleMessage} />
        </div>
      )}
    </div>
  );
};

export default Chatbox;