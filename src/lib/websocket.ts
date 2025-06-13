// websocket.ts
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import type { Message } from "@/store/userChatsSlice";

let stompClient: Client | null = null;

export function connectWebSocket(
  userId: number,
  onMessage: (msg: Message) => void,
) {
  if (stompClient && stompClient.connected) return;

  stompClient = new Client({
    webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
    reconnectDelay: 2000,

    debug: (str) => console.log("[STOMP DEBUG]", str),

    onConnect: (frame) => {
      console.log("Connection Successful!", frame);

      stompClient?.subscribe(`/user/${userId}/queue/messages`, (message) => {
        const payload = JSON.parse(message.body);
        onMessage(payload);
      });
    },
  });

  stompClient.activate();
}

export interface SendingChatMessageType {
  chatId: number;
  senderId: number;
  receiverId: number;
  message: string;
  timestamp: number;
}

export function sendMessage(message: SendingChatMessageType) {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: "/app/chat",
      body: JSON.stringify(message),
      headers: { "Content-Type": "application/json" },
    });
  } else {
    console.warn("WebSocket not connected");
  }
}

export function disconnectWebSocket() {
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
  }
}
