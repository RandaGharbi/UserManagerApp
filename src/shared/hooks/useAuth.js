import { useState } from 'react';

const useAuth = () => {
  const [state, setState] = useState({
    isAuthenticated: true
  })

  return {
    authenticationData: state,
    login: setState,
  }
}

export default useAuth;