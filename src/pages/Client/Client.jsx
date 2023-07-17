import { Link } from "react-router-dom"
// import NavbarClient from "../../components/NavbarClient/NavbarClient"
import ResultClients from "../../components/ResultClients/ResultClients"
import Navbar from "../../components/Navbar"

const Client = () => {


  return (
    <div className="section-container">
      <div className="content">
        <Navbar />
        <ResultClients />
      </div>
    </div>
  )
}

export default Client