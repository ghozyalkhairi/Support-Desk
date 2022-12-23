import {
  FC,
  useState,
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
} from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { FaUser } from "react-icons/fa"
import { useAppDispatch, useAppSelector } from "../app/hook"
import { selectAuth, reset } from "../features/auth/authSlice"
import { register } from "../features/auth/authThunks"
import Spinner from "../components/Spinner"

const Register: FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  })
  const { name, email, password, passwordConfirm } = formData
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user, isLoading, isSuccess, isError, message } =
    useAppSelector(selectAuth)
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (password !== passwordConfirm)
      return toast.error("Passwords don't match", { position: "top-center" })
    const userData = {
      name,
      email,
      password,
    }
    dispatch(register(userData))
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
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={onChange}
              required
            />
          </div>
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
            <input
              type="password"
              className="form-control"
              id="passwordConfirm"
              name="passwordConfirm"
              placeholder="Confirm your password"
              value={passwordConfirm}
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

export default Register
