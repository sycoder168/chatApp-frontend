import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import store from "@/store";
import { fetchUserChats } from "@/store/userChatsActions";
import { Outlet, useLoaderData } from "react-router";

export default function Home() {
  const userChats = useLoaderData();

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      <AppSidebar userChats={userChats} />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}

export async function loader() {
  const userChats = await store.dispatch(fetchUserChats());
  return userChats;
  // return redirect("/home");
}
