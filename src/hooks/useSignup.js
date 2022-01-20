import { useState, useEffect } from "react"
import { projectAuth, projectStorage, projectDb } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null)
    setIsPending(true)

    try {
      //signup user
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      )

      if (!res) {
        throw new Error("Could not create new user")
      }

      //upload uer thumnail
      const thumbnailName = thumbnail.name.toLowerCase().replaceAll(" ", "-")
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnailName}`
      const uploadedImg = await projectStorage.ref(uploadPath).put(thumbnail)
      const uploadedImgURL = await uploadedImg.ref.getDownloadURL()

      //add displayName to user
      await res.user.updateProfile({ displayName, photoURL: uploadedImgURL })

      //create a user document
      await projectDb.collection("users").doc(res.user.uid).set({
        online: true,
        displayName,
        photoURL: uploadedImgURL,
      })

      //dispatch login action
      dispatch({ type: "LOGIN", payload: res.user })

      //update state
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message)
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { error, isPending, signup }
}
