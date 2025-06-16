import { allUsersActions } from "@/store/allUsersSlice.ts";

export function fetchAllUsers() {
  // @ts-expect-error: unknown
  return async (dispatch) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    // const response = await fetch("http://localhost:8080/users/all");
    const response = await fetch(`${backendUrl}/users/all`);

    if (!response.ok) {
      return null;
    }

    const fetchAllUsersResponse = await response.json();
    const allUsers = fetchAllUsersResponse.allUsers;

    dispatch(allUsersActions.setUsers(allUsers));
  };
}
