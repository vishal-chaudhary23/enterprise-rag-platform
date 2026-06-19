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
        border
        rounded-lg
        px-4
        py-3
        flex-1
        "
        type="text"
        value={question}
        placeholder="Ask a question..."
        onChange={(e) =>
          setQuestion(e.target.value)
        }
        />

      <button
        onClick={askQuestion}
        disabled={loading}
        className="
        bg-blue-600
        text-white
        px-4
        py-2
        rounded-lg
        hover:bg-blue-800
        "
        >
        {loading ? "Thinking..." : "ASK"}
      </button>
          
  

    </div>
  );
}

export default ChatInput;