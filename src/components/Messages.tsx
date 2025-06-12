interface Messages {
  messages: string[];
}

export default function Messages({ messages }: Messages) {
  return (
    <ul style={{ listStyle: "none" }}>
      {messages.map((message, index) => {
        return <li key={index}>{message}</li>;
      })}
    </ul>
  );
}
