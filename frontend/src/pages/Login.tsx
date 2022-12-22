import {
  FC,
  useState,
  useEffect,
  ChangeEventHandler,
  FormEventHandler,
} from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hook"
import { selectAuth, reset } from "../features/auth/authSlice"
import { login } from "../features/auth/authThunks"
import { toast } from "react-toastify"
import { FaSignInAlt } from "react-icons/fa"
import Spinner from "../components/Spinnter"

const Login: FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const { email, password } = formData
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user, isLoading, isSuccess, message, isError } =
    useAppSelector(selectAuth)
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const userData = {
      email,
      password,
    }
    dispatch(login(userData))
  }
  useEffect(() => {
    if (isError) {
      toast.error(message, { position: "top-center" })
      dispatch(reset())
    }

    if (isSuccess || user) {
      toast.success("Success", { position: "top-center" })
      dispatch(reset())
      navigate("/")
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, user])
  if (isLoading) return <Spinner />
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please login</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
