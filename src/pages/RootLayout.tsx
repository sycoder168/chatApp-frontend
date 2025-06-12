import { Outlet, redirect } from "react-router";
import { getTokenFromLocalStorage, isTokenExpired } from "@/utils/utils.ts";

export default function RootLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

export function loader() {
  const token = getTokenFromLocalStorage();
  if (token && !isTokenExpired(token)) {
    return redirect("/home");
  }
  return null;
}
