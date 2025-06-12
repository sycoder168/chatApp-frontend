import { allUsersActions } from "@/store/allUsersSlice.ts";

export function fetchAllUsers() {
  // @ts-expect-error: unknown
  return async (dispatch) => {
    const response = await fetch("http://localhost:8080/users/all");

    if (!response.ok) {
      return null;
    }

    const fetchAllUsersResponse = await response.json();
    const allUsers = fetchAllUsersResponse.allUsers;

    dispatch(allUsersActions.setUsers(allUsers));
  };
}
