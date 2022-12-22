import { FC, useState, useEffect, FormEventHandler } from "react"
import { useAppSelector, useAppDispatch } from "../app/hook"
import { useNavigate } from "react-router-dom"
import { selectAuth } from "../features/auth/authSlice"
import { createTicket } from "../features/tickets/ticketThunks"
import { reset, selectTicket } from "../features/tickets/ticketSlice"
import { toast } from "react-toastify"
import Spinner from "../components/Spinnter"
import BackButton from "../components/BackButton"

const NewTicket: FC = () => {
  const { user } = useAppSelector(selectAuth)
  const { isLoading, isSuccess, isError, message } =
    useAppSelector(selectTicket)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [name] = useState(user?.name)
  const [email] = useState(user?.email)
  const [product, setProduct] = useState("iPhone")
  const [description, setDescription] = useState("")
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const newTicket = {
      product,
      description,
    }
    dispatch(createTicket(newTicket))
  }
  useEffect(() => {
    if (isSuccess) {
      toast.success("Success", { position: "top-center" })
      dispatch(reset())
    }
    if (isError) {
      toast.error(message, { position: "top-center" })
      dispatch(reset())
    }
  }, [isSuccess, isError])
  if (isLoading) return <Spinner />
  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>Create new ticket</h1>
        <p>Please fill out the form below</p>
      </section>
      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Costumer Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email">Costumer Email</label>
          <input type="text" className="form-control" value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>

            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="iPhone">iPhone</option>
              <option value="iPad">iPad</option>
              <option value="iMac">iMac</option>
              <option value="Macbook Pro">Macbook Pro</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of the issue</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTicket
