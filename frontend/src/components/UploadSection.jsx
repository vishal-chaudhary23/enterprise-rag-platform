function UploadSection({
  uploadFile,
  setFile,
  message
}) {
  return (
    // <div>
    <div className="space-y-4">
      <h2 className="font-bold">Upload PDF Here</h2>

      <input

        className="
        
        bg-gray-300
          rounded-lg
          px-3
          py-2
          hover:bg-gray-400"

        type="file"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <button onClick={uploadFile}
       className="
      bg-blue-600
      text-white
      px-4
      py-1
      rounded
    ">
        Upload
      </button>

      <p className="mb-3 p-2">{message}</p>
    </div>
  );
}

export default UploadSection;