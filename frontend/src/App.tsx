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
import "react-toastify/dist/ReactToastify.css"

const App: FC = () => {
  return (
    <Router>
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
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
