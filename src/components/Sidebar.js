import { NavLink } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

//styles and images
import "./Sidebar.css"
import DashboardIcon from "../assets/img/dashboard_icon.svg"
import CreateIcon from "../assets/img/add_icon.svg"
import Avatar from "./Avatar"

const Sidebar = () => {
  const { user } = useAuthContext()

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          {/* avatar and username */}
          <Avatar src={user && user.photoURL} />
          <p> Hey, {user && user.displayName} </p>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink to="/">
                <img src={DashboardIcon} alt="Dashboard Icon" />
                <span>Dashboard </span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/create">
                <img src={CreateIcon} alt="Create project Icon" />
                <span>New Project </span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
