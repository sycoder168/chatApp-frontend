export function saveTokenToLocalStorage(token: string) {
  localStorage.setItem("token", token);
}

export function getTokenFromLocalStorage() {
  return localStorage.getItem("token");
}

export function isTokenExpired(token: string) {
  try {
    const [, payload] = token.split(".");
    const decoded = JSON.parse(atob(payload));
    const exp = decoded.exp;
    return Date.now() >= exp * 1000;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return true;
  }
}
