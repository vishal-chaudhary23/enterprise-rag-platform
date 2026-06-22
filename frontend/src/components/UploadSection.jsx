function UploadSection({
  uploadFile,
  setFile,
  message,
  file,
  uploading
}) {
  return (
    // <div>
    <div className="space-y-4">
      <h2 className="font-bold">Upload PDF Here</h2>

      <label
        className="
          flex items-center justify-center
          w-full h-20
          rounded-2xl
          border-2 border-dashed border-blue-300
          bg-blue-50
          hover:bg-blue-100
          transition
          cursor-pointer
        "
      >
        <input
          type="file"
          className="hidden"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
        />

       <span>
          {file
            ? `📄 ${file.name}`
            : "📤 Select PDF"}
        </span>
      </label>

      {/* <input

        className="
        
        bg-gray-300
        p-2
          rounded-lg
          hover:bg-gray-400"

        type="file"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      /> */}

      <button onClick={uploadFile}
        disabled={uploading}
       className="
          bg-blue-600
          text-white
          px-4
          py-1
          rounded
          hover:bg-blue-800
        ">
         {uploading
            ? "Uploading..."
            : "Upload"}
      </button>

      <p className="mb-3 p-2">{message}</p>
    </div>
  );
}

export default UploadSection;