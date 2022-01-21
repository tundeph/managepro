import { NavLink, Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

//styles and images
import "./Navbar.css"
import Temple from "../assets/img/temple.svg"

const Navbar = () => {
  const { logout, isPending } = useLogout()
  const { user } = useAuthContext()

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <Link to="/">
            <img src={Temple} alt="MoneyPro Logo" />
            <span className="logotext">ManagePro</span>
          </Link>
        </li>
        {!user && (
          <>
            <li>
              <NavLink to="/login"> Login </NavLink>
            </li>
            <li>
              <NavLink to="/signup"> Signup </NavLink>
            </li>
          </>
        )}
        {user && (
          <li>
            {!isPending && (
              <button onClick={logout} className="btn">
                Logout
              </button>
            )}
            {isPending && (
              <button disabled className="btn">
                Logging out...
              </button>
            )}
          </li>
        )}
      </ul>
    </div>
  )
}

export default Navbar
