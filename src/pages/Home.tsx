import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import store from "@/store";
import { fetchUserChats } from "@/store/userChatsActions";
import { Outlet } from "react-router";

export default function Home() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}

export async function loader() {
  await store.dispatch(fetchUserChats());
  // return redirect("/home");
}
