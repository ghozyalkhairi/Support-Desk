import { FC } from "react"
import { Link } from "react-router-dom"
import { FaArrowCircleLeft } from "react-icons/fa"

interface Props {
  url: string
}

const BackButton: FC<Props> = ({ url }) => {
  return (
    <Link to={url} className="btn btn-reverse btn-back">
      <FaArrowCircleLeft /> Back
    </Link>
  )
}

export default BackButton
