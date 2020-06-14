export const TOKEN_KEY = "@SecretToken"
export const USER_DATA_KEY = "@UserData"

export const isAuthenticated = () => {
  // TODO: improve authentication validation
  return sessionStorage.getItem(TOKEN_KEY) !== null

}

export const getToken = () => {
  return sessionStorage.getItem(TOKEN_KEY)
}

export const login = ({ accessToken, user }) => {
  sessionStorage.setItem(TOKEN_KEY, accessToken)
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(user, null, 2));
}

export const logout = () => {
  sessionStorage.removeItem(TOKEN_KEY)
  localStorage.clear();
}
