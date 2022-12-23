import { FC } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import Header from "./components/Header"
import PrivateRoute from "./components/PrivateRoute"
import NewTicket from "./pages/NewTicket"
import Tickets from "./pages/Tickets"
import Ticket from "./pages/Ticket"
import "react-toastify/dist/ReactToastify.css"

const App: FC = () => {
  return (
    <Router basename="https://support-desk-ghost.vercel.app">
      <ToastContainer />
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/new-ticket" element={<PrivateRoute />}>
            <Route path="/new-ticket" element={<NewTicket />} />
          </Route>
          <Route path="/tickets" element={<PrivateRoute />}>
            <Route path="/tickets" element={<Tickets />} />
          </Route>
          <Route path="/ticket/:ticketId" element={<PrivateRoute />}>
            <Route path="/ticket/:ticketId" element={<Ticket />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
