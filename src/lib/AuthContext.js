import React, { createContext, useContext, useEffect, useState } from 'react'
import firebase from '../components/firebase'
import { navigateTo } from 'gatsby'
export const AuthContext = createContext()
export const useAuth = () => {
  const value = useContext(AuthContext)
  return value
}
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuth: false, name: '' })
  useEffect(() => {
    firebase
      .auth()
      .onAuthStateChanged(user => {
        if (user) {
          setAuth({
            isAuth: true,
            name: user.displayName || user.email
          })
        }
      })
  }, [])
  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        navigateTo('/')
      })
      .catch(function(error) {
        navigateTo('/')
      })
  }
  const authFB = () => {
    const provider = new firebase.auth.FacebookAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // const token = result.credential.accessToken;
        // const user = result.user;
      })
      .catch(function(error) {
        /*
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        */
      })

    }
  return (
    <AuthContext.Provider value={{...auth, authFB, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}