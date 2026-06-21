function DocumentList({
  documents,
  selectedDocs,
  toggleDocument,
  deleteSelected
}) {
  return (
    // <div>
    <div className="mt-4">

      <h2 className="font-bold">Documents</h2>

      {
        documents.map((doc, index) => (
          <div key={index}
           className="
            flex
            items-center
            gap-2
            py-2
            rounded
            hover:bg-gray-200
          "
          >

            <input
              type="checkbox"
              checked={
                selectedDocs.includes(doc)
              }
              onChange={() =>
                toggleDocument(doc)
              }
            />

              📄{doc}

          </div>
        ))
      }

      <button
        onClick={deleteSelected}
        className="
          bg-red-600
          text-white
          px-3
          py-2
          rounded
          mt-3
          hover:bg-red-800
        "
      >
        Delete Selected
      </button>

    </div>
  );
}

export default DocumentList;