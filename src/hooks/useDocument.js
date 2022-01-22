import { useEffect, useState } from "react"
import { projectDb } from "../firebase/config"

import React from "react"

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)

  //realtime data for document
  useEffect(() => {
    const ref = projectDb.collection(collection).doc(id)

    const unsub = ref.onSnapshot(
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id })
          setError(null)
        } else {
          setError("Oops! Nothing exists there")
        }
      },
      (err) => {
        console.log(err.message)
        setError("failed to get document")
      }
    )

    return () => unsub()
  }, [collection, id])

  return { document, error }
}
