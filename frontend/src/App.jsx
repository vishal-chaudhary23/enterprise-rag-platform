import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const [question, setQuestion] = useState("");
  // const [answer, setAnswer] = useState("");

  const [chatHistory, setChatHistory] = useState([]);
  const [documents, setDocuments] = useState([]);

  const uploadFile = async () => {
    if (!file) {
      setMessage("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      setMessage(
        `Uploaded: ${data.filename}`
      );
      setDocuments(prev => [
        ...prev,
        data.filename
      ]);

    } catch (error) {
      setMessage("Upload failed");
    }
  };

  const askQuestion = async () => {
    if (!question) return;

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: question,
          }),
        }
      );

      const data = await response.json();

      // setAnswer(data.answer);
      setChatHistory(prev => [
        ...prev,
        {
          role: "user",
          content: question
        },
        {
          role: "assistant",
          content: data.answer
          // content: data.sources
        }
      ]);
    } catch (error) {
      setAnswer("Failed to get response");
    }
  };

  return (
    <div>
      <h1>Enterprise RAG Platform</h1>

      <input
        type="file"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <button onClick={uploadFile}>
        Upload
      </button>

      <p>{message}</p>

      <h2>Documents</h2>

      <ul>
        {documents.map((doc, index) => (
          <li key={index}>
            {doc}
          </li>
        ))}
      </ul>


            <hr />

      <h2>Chat with PDF</h2>

      <input
        type="text"
        value={question}
        placeholder="Ask a question..."
        onChange={(e) =>
          setQuestion(e.target.value)
        }
      />

      <button onClick={askQuestion}>
        Ask
      </button>

    <div>
      {chatHistory.map((msg, index) => (
        <div key={index}>
          <strong> {msg.role === "user"
          ? "You"
          : "Assistant"}</strong>
          <p>{msg.content}</p>
        </div>
      ))}
    </div>

      </div>
  );
}

export default App;