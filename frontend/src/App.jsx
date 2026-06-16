import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

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
    } catch (error) {
      setMessage("Upload failed");
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
    </div>
  );
}

export default App;