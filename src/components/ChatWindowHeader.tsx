import { Avatar, AvatarFallback } from "@/components/ui/avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { PhoneCall, Video } from "lucide-react";
import type { UserChat } from "@/store/userChatsSlice";

interface ChatWindowHeaderProps {
  activeUserChat: UserChat | undefined;
}

export default function ChatWindowHeader({
  activeUserChat,
}: ChatWindowHeaderProps) {
  return (
    <>
      <header className="bg-secondary m-2 rounded-xl sticky top-0 flex shrink-0 items-center gap-2 border p-3 justify-between">
        <div className={"flex flex-row gap-2 items-center"}>
          <Avatar className="h-10 w-10 rounded-3xl">
            <AvatarFallback className="rounded-lg bg-sidebar-primary">
              {activeUserChat?.user?.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p className={""}>{activeUserChat?.user?.username}</p>
        </div>
        <div className={"flex flex-row gap-3 items-center"}>
          <Button className={"bg-black"}>
            <PhoneCall size={20} />
          </Button>
          <Button className={"bg-black"}>
            <Video size={20} />
          </Button>
        </div>
      </header>
    </>
  );
}
