import ProjectList from "../../components/ProjectList"
import ProjectFilter from "./ProjectFilter"
import { useCollection } from "../../hooks/useCollection"
import { useState } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"

//styles and images
import "./Dashboard.css"

//components

const Dashboard = () => {
  const { documents, error } = useCollection("projects")
  const { user } = useAuthContext()
  const [currentFilter, setCurrentFilter] = useState("all")

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter)
  }

  const filteredProjects = documents
    ? documents.filter((document) => {
        switch (currentFilter) {
          case "all":
            return true
          case "mine":
            let assignedToMe = false
            document.assignedUsersList.forEach((mine) => {
              if (user.uid === mine.id) {
                assignedToMe = true
              }
            })
            return assignedToMe

          case "development":
          case "design":
          case "sales":
          case "marketing":
            return document.category === currentFilter

          default:
            return true
        }
      })
    : null

  return (
    <div className="Dashboard">
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} />}
      {filteredProjects && <ProjectList projects={filteredProjects} />}
    </div>
  )
}

export default Dashboard
