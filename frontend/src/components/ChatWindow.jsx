import { useRef, useEffect } from "react";


function ChatWindow({ chatHistory, clearChat }) {
  
    const bottomRef = useRef(null);
  
    useEffect(() => {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth"
      });
    }, [chatHistory]);

    
  if (chatHistory.length === 0) {
    return (
      <p className="text-gray-500">
        Upload PDFs and start asking questions.
      </p>
    );
  }
  return (
    <div> 


        <div className="flex justify-between items-center mb-4">

          <h2 className="font-semibold text-2xl">
            Chat with PDFs 📑
          </h2>
          {
            chatHistory.length > 0 && (
              <button
              className="
              text-lg
              text-red-500
              hover:text-red-700
              "
              onClick={clearChat}
              >
                Clear Chat
              </button>
            )
          }
          </div>
     <div className="h-[550px] overflow-y-auto space-y-4 mb-7">



      {
        chatHistory.map(
          (msg, index) => (
            <div key={index}
            className={
              msg.role === "user"
                ? "bg-blue-100 p-3 rounded mb-2 ml-auto max-w-[70%] shadow-lg "
                : "bg-gray-100 p-3 rounded-lg mb-2 max-w-[70%] shadow-lg"
              }>

              <strong>
                {
                  msg.role === "user"
                  ? "You"
                  : "Assistant"
                }
              </strong>

              <p>{msg.content}</p>

              {/* {msg.role === "assistant" &&
       msg.sources && (
        <ul>
        {msg.sources.map(
          (source, i) => (
            <li key={i}  
            className="text-sm text-gray-500">
            {source.source.split("/").pop()}
                {" "}
                (Page {source.page + 1})
                </li>
                )
                )}
                </ul>
                )} */}

            </div>
          )
        )
      }


      <div ref={bottomRef} />
    </div>
      </div>
  );
}

export default ChatWindow;
