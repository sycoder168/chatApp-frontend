import { Button } from "@/components/ui/button.tsx";
import { Paperclip, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useEffect, useRef, useState } from "react";

export default function ChatWindowFooter() {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  return (
    <footer className="absolute bottom-5 left-0 right-0 w-full px-4">
      <div className="flex items-end gap-2 w-full">
        <Button className="bg-secondary h-12 w-12 rounded-xl flex items-center justify-center">
          <Paperclip />
        </Button>

        <Textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          placeholder="Type a message..."
          rows={1}
          className="flex-grow resize-none overflow-hidden rounded-xl bg-background text-white border-2  px-4 py-2 min-h-[3rem] max-h-[10rem]"
        />

        <Button className="bg-secondary h-12 w-12 rounded-xl flex items-center justify-center">
          <Send />
        </Button>
      </div>
    </footer>
  );
}
