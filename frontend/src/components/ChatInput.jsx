function ChatInput({
  question,
  setQuestion,
  askQuestion,
  loading

}) {
  return (
    <div className="flex gap-2 py-5">
     
        
      {/* <h2>Chat with PDF</h2> */}
      
      <input
        className="
        bg-gray-400  
        rounded-3xl
        px-6
        py-3
        flex-1
        border
        "
        type="text"
        value={question}
        placeholder="Ask a question..."
        onChange={(e) =>
          setQuestion(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            askQuestion();
          }
        }}
        />

      <button
        onClick={askQuestion}
        disabled={loading}
        className="
        bg-blue-600
        text-white
        px-4
        py-2
        rounded-xl
        hover:bg-blue-800
        "
        >
        {loading ? "Thinking..." : "ASK"}
      </button>
          
  

    </div>
  );
}

export default ChatInput;