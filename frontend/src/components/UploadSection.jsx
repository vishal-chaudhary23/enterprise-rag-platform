function UploadSection({
  uploadFile,
  setFile,
  message
}) {
  return (
    <div>
      <h2>Upload PDF</h2>

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

export default UploadSection;