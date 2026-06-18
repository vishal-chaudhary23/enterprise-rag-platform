import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const [question, setQuestion] = useState("");
  // const [answer, setAnswer] = useState("");

  const [chatHistory, setChatHistory] = useState([]);
  const [documents, setDocuments] = useState([]);

  const [selectedDocs, setSelectedDocs] = useState([]);

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
          content: data.answer,
          sources: data.sources
        }
      ]);
    } catch (error) {
      setMessage("Failed to get response");
    }
  };

  const toggleDocument = (doc) => {

      if (selectedDocs.includes(doc)) {

        setSelectedDocs(
          selectedDocs.filter(
            d => d !== doc
          )
        );

      } else {

        setSelectedDocs([
          ...selectedDocs,
          doc
        ]);

      }
    };
const deleteSelected = async () => {

  try {

    for (const doc of selectedDocs) {

      await fetch(
        `http://127.0.0.1:8000/documents/${doc}`,
        {
          method: "DELETE"
        }
      );

    }

    setDocuments(
      documents.filter(
        doc => !selectedDocs.includes(doc)
      )
    );

    setSelectedDocs([]);

  } catch (error) {
    console.log(error);
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
            <input
              type="checkbox"
              checked={selectedDocs.includes(doc)}
              onChange={() => toggleDocument(doc)}
            />

            {doc}
          </li>
        ))}
      </ul>
        <button
          onClick={deleteSelected}
        >
          Delete Selected
        </button>


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

      <strong>
        {msg.role === "user"
          ? "You"
          : "Assistant"}
      </strong>

      <p>{msg.content}</p>

      {msg.role === "assistant" &&
       msg.sources && (
        <ul>
          {msg.sources.map(
            (source, i) => (
              <li key={i}>
                {source.source.split("/").pop()}
                {" "}
                (Page {source.page + 1})
              </li>
            )
          )}
        </ul>
      )}

    </div>
  ))}
</div>

      </div>
  );
}

export default App;