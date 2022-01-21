import { useState } from "react"
import Select from "react-select"

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

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name, details, dueDate, category.value)
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
          {/* Dropdown */}
        </label>

        <button className="btn">Add Project </button>
      </form>
    </div>
  )
}

export default Create
