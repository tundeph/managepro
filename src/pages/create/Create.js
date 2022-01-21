import { useState, useEffect } from "react"
import Select from "react-select"
import { useNavigate } from "react-router-dom"
import { timestamp } from "../../firebase/config"
import { useCollection } from "../../hooks/useCollection"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore"

//styles
import "./Create.css"
import { Navigate } from "react-router-dom"

const categories = [
  { value: "developemnt", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
]

const Create = () => {
  //form field values
  const [name, setName] = useState("")
  const [details, setDetails] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [category, setCategory] = useState("")
  const [assignedUsers, setAssignedUsers] = useState([])

  const { documents } = useCollection("users")
  const { user } = useAuthContext()
  const [users, setUsers] = useState([])
  const [formError, setFormEror] = useState(null)
  const { addDocument, response } = useFirestore("projects")
  const navigate = useNavigate()

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName }
      })

      setUsers(options)
    }
  }, [documents])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormEror(null)

    if (!category) {
      setFormEror("Please select a project category")
      return
    }

    if (assignedUsers.length < 1) {
      setFormEror("Please assign project to at least one user")
      return
    }

    const assignedUsersList = assignedUsers.map((user) => ({
      displayName: user.value.displayName,
      photoURL: user.value.photoURL,
      id: user.value.id,
    }))

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy: { displayName: user.displayName, photoURL: user.photoURL, id: user.uid },
      assignedUsersList,
    }

    await addDocument(project)
    if (!response.error) {
      navigate("/")
    }
    //console.log(project)
  }

  return (
    <div className="create-form">
      <h2 className="page-title"> Create a New Project </h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name: </span>
          <input type="text" onChange={(e) => setName(e.target.value)} value={name} required />
          <span>Project details: </span>
          <textarea
            type="text"
            onChange={(e) => setDetails(e.target.value)}
            value={details}
            required
          ></textarea>
          <span>Set due date: </span>
          <input
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
            required
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select options={categories} onChange={(option) => setCategory(option)} />
        </label>
        <label>
          <span>Assigned to:</span>
          <Select options={users} onChange={(option) => setAssignedUsers(option)} isMulti />
        </label>
        {formError && <p className="error">{formError}</p>}
        <button className="btn">Add Project </button>
      </form>
    </div>
  )
}

export default Create
