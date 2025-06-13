interface MessageBubbleProps {
  message: string;
  isOwnMessage: boolean;
}

export default function MessageBubble({
  message,
  isOwnMessage,
}: MessageBubbleProps) {
  return (
    <div
      className={`inline-block px-4 py-2 rounded-xl break-words ${
        isOwnMessage
          ? "ml-auto bg-primary text-white"
          : "mr-auto bg-muted text-white"
      }`}
      style={{
        maxWidth: "70%", // Fixed maximum width
        wordBreak: "break-word",
      }}
    >
      {message}
    </div>
  );
}
