import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../../firebase.config";


export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null)
   const [loading, setLoading] = useState(true)

   const auth = getAuth(app)

   const createUser = (email, password) =>{
      setLoading(true)
      return createUserWithEmailAndPassword(auth, email, password)
   }
   const loginUser = (email, password) =>{
      setLoading(true)
      return signInWithEmailAndPassword(auth, email, password)
   }
   const logOut = () =>{
      setLoading(true)
      return signOut(auth)
   }

   const updateUserProfile = (name, photo) =>{
      return updateProfile(auth.currentUser, {
         displayName : name,
         photoURL: photo
      })
   }

   useEffect(() =>{
      const unsubscribe = onAuthStateChanged(auth, currentUser =>{
         console.log('current user -->',currentUser);
         setUser(currentUser)
         setLoading(false)
      })
      return () =>{
         return unsubscribe()
      }

   }, [auth])




   const authInfo = {
      user,
      loading,
      createUser,
      loginUser,
      logOut,
      updateUserProfile,
      setUser
   }
   return (
      <AuthContext.Provider value={authInfo}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthProvider;