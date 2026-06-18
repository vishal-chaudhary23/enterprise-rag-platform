function DocumentList({
  documents,
  selectedDocs,
  toggleDocument,
  deleteSelected
}) {
  return (
    <div>

      <h2>Documents</h2>

      {
        documents.map((doc, index) => (
          <div key={index}>

            <input
              type="checkbox"
              checked={
                selectedDocs.includes(doc)
              }
              onChange={() =>
                toggleDocument(doc)
              }
            />

            {doc}

          </div>
        ))
      }

      <button
        onClick={deleteSelected}
      >
        Delete Selected
      </button>

    </div>
  );
}

export default DocumentList;