export function isAuthenticated() {
  return window.USER !== 0;
}

export function getUserId() {
  return window.USER;
}
