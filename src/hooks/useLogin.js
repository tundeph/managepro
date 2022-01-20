import { useState, useEffect } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setError(null)
    setIsPending(true)

    //sign in the user
    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password)

      if (!res) {
        throw new Error("Error from firebase")
      }
      //dispatch login action
      dispatch({ type: "LOGIN", payload: res.user })

      if (!isCancelled) {
        setError(null)
        setIsPending(false)
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  //clean up function
  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])
  return { login, error, isPending }
}
