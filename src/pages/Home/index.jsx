import React from "react";
import { useNavigate } from "react-router-dom";
// import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";
// import * as C from "./styles";
import Navbar from '../../components/Navbar'


const Home = () => {
  // const { signout } = useAuth();
  const navigate = useNavigate();
  const emailUser = JSON.parse(localStorage.getItem('users_bd'))
  console.log(emailUser[0]['email']);
  
  return (
    <div className="section-container">
      <div className="content">
        <Navbar />
        <div className="d-flex flex-column justify-content-center align-items-center w-100 py-5">
          <h1>Seja bem-vindo administrador</h1>
          <img src="src/img/welcome.svg" alt="" width={450}/>
        </div>
        {/* <h1>Home</h1>
        <h1>Email do usuário</h1>
        <p>{emailUser[0]['email']}</p>
        <button type="button" onClick={() => [signout(), navigate("/")]}>Sair</button> */}
      </div>
    </div>
  );
};

export default Home;
