function ChatInput({
  question,
  setQuestion,
  askQuestion,
  loading

}) {
  return (
    <div>
        
      
      <input
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
        >
        {loading ? "Thinking..." : "Ask"}
      </button>
          <h2>Chat with PDF</h2>

    </div>
  );
}

export default ChatInput;