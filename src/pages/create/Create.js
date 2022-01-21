import { useState, useEffect } from "react"
import Select from "react-select"
import { useCollection } from "../../hooks/useCollection"

//styles
import "./Create.css"

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
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName }
      })

      setUsers(options)
    }
  }, [documents])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name, details, dueDate, category.value, assignedUsers)
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

        <button className="btn">Add Project </button>
      </form>
    </div>
  )
}

export default Create
