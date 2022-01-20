import { NavLink, Link } from "react-router-dom"

//styles and images
import "./Navbar.css"
import Temple from "../assets/img/temple.svg"

const Navbar = () => {
  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <Link to="/">
            <img src={Temple} alt="MoneyPro Logo" />
            <span className="logotext">ManagePro</span>
          </Link>
        </li>

        <li>
          <NavLink to="/login"> Login </NavLink>
        </li>
        <li>
          <NavLink to="/signup"> Signup </NavLink>
        </li>
        <li>
          <button className="btn">Logout</button>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
