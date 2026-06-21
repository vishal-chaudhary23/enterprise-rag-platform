// import { useState } from "react";
import { useState, useEffect } from "react";
import UploadSection from "./components/UploadSection";
import ChatInput from "./components/ChatInput";
import ChatWindow from "./components/ChatWindow";
import DocumentList from "./components/DocumentList";
import { API_URL } from "./config";

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const [question, setQuestion] = useState("");
  // const [answer, setAnswer] = useState("");

  const [chatHistory, setChatHistory] = useState([]);
  const [documents, setDocuments] = useState([]);

  const [selectedDocs, setSelectedDocs] = useState([]);

  const [loading, setLoading] = useState(false);

  const [uploading, setUploading] = useState(false);

  const uploadFile = async () => {
    if (!file) {
      setMessage("Please select a file");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `${API_URL}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      setMessage(
        `Uploaded: ${data.filename}`
      );

      setDocuments(prev => {

        if (prev.includes(data.filename)) {
          return prev;
        }

        return [
          ...prev,
          data.filename
        ];

      });

    } catch (error) {
      setMessage("Upload failed");
    }finally {
      setUploading(false);
    }
  };

  const askQuestion = async () => {
    if (!question) return;

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: question,
            history: chatHistory
            // history: chatHistory.slice(-10)
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
    } finally {
      setLoading(false);
    }
  };

  const toggleDocument = (doc) => {

      if (selectedDocs.includes(doc)) {

        setSelectedDocs(prev =>
          prev.filter(
            d => d !== doc
          )
        );

      } else {

        setSelectedDocs(prev => [
          ...prev,
          doc
        ]);

      }
    };
const deleteSelected = async () => {

  try {

    for (const doc of selectedDocs) {

      await fetch(
        `${API_URL}/documents/${doc}`,
        {
          method: "DELETE"
        }
      );

    }

    setDocuments(prev =>
      prev.filter(
        doc => !selectedDocs.includes(doc)
      )
    );

    setSelectedDocs([]);

  } catch (error) {
    console.log(error);
  }

};

useEffect(() => {

  const loadDocuments = async () => {

    try {

      const response = await fetch(
        `${API_URL}/documents`
      );

      const data = await response.json();

      setDocuments(data.documents);

    } catch (error) {

      console.log(error);

    }

  };

  loadDocuments();

}, []);


  const clearChat = () => {
      setChatHistory([]);
    };

    return (
      <div className="min-h-screen bg-slate-400">

        <div className="max-w-7xl mx-auto p-6">

            <h1 className="text-5xl font-bold mb-6 text-center">
              Enterprise RAG Platform
            </h1>

            {/* <hr /> */}

            <div className="grid grid-cols-3 gap-6">


              <div className="bg-white rounded-lg shadow p-4">

                <UploadSection
                  uploadFile={uploadFile}
                  setFile={setFile}
                  message={message}
                  uploading={uploading}
                />
                
                <hr  className="border-2 border-gray-600 rounded"/>

                <DocumentList
                  documents={documents}
                  selectedDocs={selectedDocs}
                  toggleDocument={toggleDocument}
                  deleteSelected={deleteSelected}
                />

              </div>

                {/* <hr /> */}
              <div className="col-span-2 bg-white rounded-lg shadow p-4">
                <ChatWindow
                  chatHistory={chatHistory}
                  clearChat={clearChat}
                />
                <ChatInput
                  question={question}
                  setQuestion={setQuestion}
                  askQuestion={askQuestion}
                  loading={loading}
                  />
              </div>

                {/* <hr /> */}

            </div>
        </div>
      </div>
    );

//   return (
//     <div>
//       <h1>Enterprise RAG Platform</h1>

//       <input
//         type="file"
//         onChange={(e) =>
//           setFile(e.target.files[0])
//         }
//       />

//       <button onClick={uploadFile}>
//         Upload
//       </button>

//       <p>{message}</p>

//       <h2>Documents</h2>

//       <ul>
//         {documents.map((doc, index) => (
//           <li key={index}>
//             <input
//               type="checkbox"
//               checked={selectedDocs.includes(doc)}
//               onChange={() => toggleDocument(doc)}
//             />

//             {doc}
//           </li>
//         ))}
//       </ul>
//         <button
//           onClick={deleteSelected}
//         >
//           Delete Selected
//         </button>


//             <hr />

//       <h2>Chat with PDF</h2>

//       <input
//         type="text"
//         value={question}
//         placeholder="Ask a question..."
//         onChange={(e) =>
//           setQuestion(e.target.value)
//         }
//       />

//       <button onClick={askQuestion}>
//         Ask
//       </button>

//     <div>
//   {chatHistory.map((msg, index) => (
//     <div key={index}>

//       <strong>
//         {msg.role === "user"
//           ? "You"
//           : "Assistant"}
//       </strong>

//       <p>{msg.content}</p>

//       {msg.role === "assistant" &&
//        msg.sources && (
//         <ul>
//           {msg.sources.map(
//             (source, i) => (
//               <li key={i}>
//                 {source.source.split("/").pop()}
//                 {" "}
//                 (Page {source.page + 1})
//               </li>
//             )
//           )}
//         </ul>
//       )}

//     </div>
//   ))}
// </div>

//       </div>
//   );
}

export default App;