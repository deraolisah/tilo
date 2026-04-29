import { MessageCircleMore, X } from "lucide-react";
import { useState } from "react";
import logo from "../../assets/logo.png";

const ChatIcon = ({ toggleMessage }) => (
  <div
    className="fixed z-20 bottom-8 right-4 md:right-6 bg-white rounded-full p-2 pr-4 shadow border border-gray-200 cursor-pointer flex items-center gap-1 font-medium"
    onClick={toggleMessage}
    title="Chat With Tilo Assistant"
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

  // Suggested questions/prompts
  const suggestions = [
    "What services do you offer?",
    "How can I get started?",
    "Tell me about pricing",
    "What are your business hours?",
    "Do you offer support?",
    "Schedule a demo"
  ];

  const handleSend = (e, customMessage = null) => {
    if (e) e.preventDefault();
    const messageToSend = customMessage || input;
    if (!messageToSend.trim()) return;
    
    setMessages([...messages, { from: "user", text: messageToSend }]);
    setInput("");
    
    // Optional: Simulate bot response based on user input
    setTimeout(() => {
      let botResponse = "Thanks for your message! How else can I help you?";
      
      if (messageToSend.toLowerCase().includes("services")) {
        botResponse = "We offer AI-powered chat solutions, custom integrations, and 24/7 customer support. Would you like to learn more about any specific service?";
      } else if (messageToSend.toLowerCase().includes("started")) {
        botResponse = "Getting started is easy! Just let me know what you're looking for, and I'll guide you through the process. Would you like to schedule a quick call?";
      } else if (messageToSend.toLowerCase().includes("pricing")) {
        botResponse = "Our pricing starts at $29/month for basic plans. We also offer custom enterprise solutions. Would you like me to share our pricing sheet?";
      } else if (messageToSend.toLowerCase().includes("hours")) {
        botResponse = "We're available Monday-Friday, 9 AM to 6 PM EST. Our support team responds within 2 hours on weekends!";
      } else if (messageToSend.toLowerCase().includes("support")) {
        botResponse = "Yes! We offer 24/7 technical support via chat and email. Premium support is also available for enterprise clients.";
      } else if (messageToSend.toLowerCase().includes("demo")) {
        botResponse = "I'd love to show you a demo! When would be a good time for a 15-minute walkthrough?";
      }
      
      setMessages(prev => [...prev, { from: "bot", text: botResponse }]);
    }, 500);
  };

  const handleSuggestionClick = (suggestion) => {
    handleSend(null, suggestion);
  };

  const toggleMessage = () => {
    setMessageOpen(prev => !prev);
    console.log("Message icon Clicked!");
    document.body.style.overflow = !messageOpen ? "hidden" : "auto";
  };

  return (
    <div className="">
      {!messageOpen && (
        <ChatIcon toggleMessage={toggleMessage} />
      )}
      <div className={`fixed z-40 top-0 left-0 w-full h-full p-0 md:p-6 md:pb-8 flex items-end justify-end transition-all duration-300 pointer-events-none ${messageOpen ? "translate-y-0" : "translate-y-full"}`}>
        <div className="bg-white flex flex-col justify-between w-full h-full md:h-fit md:max-w-sm overflow-y-auto md:rounded-2xl pt-0 p-4 z-50 relative pointer-events-auto">
          {/* Header */}
          <div className="sticky top-0 md:relative flex items-center justify-between gap-4 bg-white border-b border-gray-200 py-4">
            <div className="w-10 h-10 rounded-full bg-gray-950 flex items-center justify-center">
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
          <div className="pt-2 flex-1 md:flex-none h-full md:h-64 overflow-y-auto" aria-live="polite">
            {messages.map((msg, i) => (
              <div key={i} className={`flex items-center gap-2 ${msg.from === "user" ? "justify-end" : ""}`}>
                {msg.from === "bot" && (
                  <div className="min-w-8 min-h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <MessageCircleMore size={14} className="text-black" />
                  </div>
                )}
                <div className={`p-3 py-2 rounded-lg ${msg.from === "user" ? "ml-10 my-1.5 bg-gray-900 text-white" : "mr-10 bg-gray-200"}`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
                {msg.from === "user" && (
                  <div className="min-w-8 min-h-8 rounded-full bg-gray-900 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">U</span>
                  </div>
                )}
              </div>
            ))}
            
            {/* Suggestions Chips - Only show when there are few messages */}
            {messages.length <= 2 && (
              <div className="mt-4">
                <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-2.5 py-1 rounded-full transition-colors duration-200 border border-gray-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="flex flex-col mt-2 gap-2">
            {messages.length > 2 && (
              <div className="overflow-x-auto scrollbar-hidden flex gap-2 relative">
                <span className="absolute -top-2 z-2 bg-linear-to-r from-transparent to-red-500 w-10 right-0"></span>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs text-nowrap px-2.5 py-1 rounded-full transition-colors duration-200 border border-gray-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-gray-100 border border-gray-200 py-2 px-4 w-full rounded-lg focus:outline-none focus:border-gray-400"
                placeholder="Type your message..."
                />
              <button type="submit" className="bg-gray-950 text-white px-4 rounded-lg hover:bg-gray-800 transition-colors">
                Send
              </button>
              </div>
          </form>
        </div>
      </div>
      {messageOpen && (
        <div className="fixed w-full h-full bg-black/60 z-30 inset-0 cursor-pointer" onClick={toggleMessage} />
      )}
    </div>
  );
};

export default Chatbox;