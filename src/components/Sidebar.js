import { NavLink } from "react-router-dom"

//styles and images
import "./Sidebar.css"
import DashboardIcon from "../assets/img/dashboard_icon.svg"
import CreateIcon from "../assets/img/add_icon.svg"

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          {/* avatar and username */}
          Hey, User
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
