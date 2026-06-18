function ChatWindow({ chatHistory }) {
  return (
    <div>

      {
        chatHistory.map(
          (msg, index) => (
            <div key={index}>

              <strong>
                {
                  msg.role === "user"
                    ? "You"
                    : "Assistant"
                }
              </strong>

              <p>{msg.content}</p>

              {/* {msg.role === "assistant" &&
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
      )} */}

            </div>
          )
        )
      }

    </div>
  );
}

export default ChatWindow;
