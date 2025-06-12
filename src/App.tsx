import { useEffect, useRef, useState } from "react";
import Input from "./components/Input.tsx";
import Messages from "./components/Messages.tsx";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const roomId = "general";

function App() {
  const [chatMessages, setChatMessages] = useState<string[]>([
    "hello",
    "type your message",
  ]);

  const stompClientRef = useRef<Client | null>(null);

  // Create and connect STOMP client on mount
  useEffect(() => {
    const stompClient = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      reconnectDelay: 2000,
      debug: (str) => console.log("[STOMP DEBUG]", str),

      onConnect: () => {
        console.log("✅ Connected to WebSocket");

        stompClient.subscribe(`/topic/chat/${roomId}`, (message) => {
          const payload = JSON.parse(message.body);
          setChatMessages((prev) => [...prev, payload.message]);
        });

        stompClientRef.current = stompClient;
      },

      onStompError: (frame) => {
        console.error("❌ STOMP error", frame);
      },
    });

    stompClient.activate();

    // Clean up on unmount
    return () => {
      stompClient.deactivate();
    };
  }, []);

  const sendMessage = (message: string) => {
    if (stompClientRef.current?.connected) {
      stompClientRef.current.publish({
        destination: `/app/chat/${roomId}`,
        body: JSON.stringify({ message }),
        headers: { "Content-Type": "application/json" },
      });
    } else {
      console.warn("⚠️ STOMP client not connected");
    }
  };

  const handleSend = (message: string) => {
    sendMessage(message);
    // Do NOT add it locally; it will be added via server broadcast
  };

  return (
    <>
      <Input onSend={handleSend} />
      <Messages messages={chatMessages} />
    </>
  );
}

export default App;
