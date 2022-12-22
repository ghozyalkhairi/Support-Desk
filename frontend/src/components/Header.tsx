import { FC, MouseEventHandler } from "react"
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { useNavigate, Link } from "react-router-dom"
import { selectAuth } from "../features/auth/authSlice"
import { logout } from "../features/auth/authThunks"
import { useAppSelector, useAppDispatch } from "../app/hook"

interface Props {}

const Header: FC<Props> = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(selectAuth)
  const onLogout: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(logout())
    navigate("/login")
  }
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Support Desk</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt />
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt />
                Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser />
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header
