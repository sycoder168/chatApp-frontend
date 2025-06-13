import { Button } from "@/components/ui/button.tsx";
import { Paperclip, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useActionState, useEffect, useRef, useState } from "react";
import { sendMessage, type SendingChatMessageType } from "@/lib/websocket";
import type { UserState } from "@/store/userSlice";
import { useSelector } from "react-redux";
import type { AllUsers } from "@/store/allUsersSlice";
import type { UserChats } from "@/store/userChatsSlice";

interface ChatWindowFooterProps {
  chatId: number | undefined;
  receiverId: number | undefined;
}

export default function ChatWindowFooter({
  chatId,
  receiverId,
}: ChatWindowFooterProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const user: UserState = useSelector(
    (state: { user: UserState; allUsers: AllUsers; userChats: UserChats }) =>
      state.user,
  );

  // Automatically resize the textarea to fit content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function sendMessageAction(_prevState: any, formData: FormData) {
    const message = formData.get("message") as string;
    if (chatId && receiverId) {
      const sendingMessage: SendingChatMessageType = {
        chatId: chatId,
        senderId: user.userId,
        receiverId: receiverId,
        message: message,
        timestamp: Date.now(),
      };
      console.log(sendingMessage);
      sendMessage(sendingMessage);
    }

    setValue("");
    return {
      content: "",
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_formState, formAction] = useActionState(sendMessageAction, {
    content: "",
  });

  return (
    <footer className="absolute bottom-5 left-0 right-0 w-full px-4">
      <form action={formAction}>
        <div className="flex items-end gap-2 w-full">
          <Button
            className="bg-secondary h-12 w-12 rounded-xl flex items-center justify-center"
            disabled
          >
            <Paperclip />
          </Button>

          <Textarea
            ref={textareaRef}
            value={value}
            name="message"
            onChange={handleChange}
            placeholder="Type a message..."
            rows={1}
            className="flex-grow resize-none overflow-hidden rounded-xl bg-background text-white border-2  px-4 py-2 min-h-[3rem] max-h-[10rem]"
          />

          <Button className="bg-secondary h-12 w-12 rounded-xl flex items-center justify-center">
            <Send />
          </Button>
        </div>
      </form>
    </footer>
  );
}
