import { useReducer, useEffect, useState } from "react"
import { projectDb, timestamp } from "../firebase/config"

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, success: false, error: null }
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      }
    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        document: null,
        success: true,
        error: null,
      }
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(reducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  //collection
  const ref = projectDb.collection(collection)

  //only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  //add a document
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDGING" })
    try {
      const createdAt = timestamp.fromDate(new Date())
      const addDocument = await ref.add({ ...doc, createdAt })
      dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addDocument })
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", pyload: err.message })
    }
  }

  //delete document
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" })

    try {
      const deletedDocument = await ref.doc(id).delete()
      dispatchIfNotCancelled({
        type: "DELETED_DOCUMENT",
        payload: deletedDocument,
      })
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message })
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, response }
}
