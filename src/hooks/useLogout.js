import { useState, useEffect } from "react"
import { projectAuth, projectDb } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch, user } = useAuthContext()

  const logout = async () => {
    setError(null)
    setIsPending(true)

    //sign the user out
    try {
      //update online status to false
      const { uid } = user
      await projectDb.collection("users").doc(uid).update({
        online: false,
      })

      await projectAuth.signOut()

      //dispatch log out action
      dispatch({ type: "LOGOUT" })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }

    console.log("cancel: ", isCancelled)
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { logout, error, isPending }
}
