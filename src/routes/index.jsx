import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup/";
import Client from "../pages/Client/Client";
import Product from "../pages/Product/Product";
import EditClient from '../components/EditClient/EditClient'
import ViewClient from '../components/ViewClient/ViewClient'
import ViewProduct from '../components/ViewProduct/ViewProduct'
import EditProduct from '../components/EditProduct/EditProduct'
import NewProduct from '../components/NewProduct/NewProduct'
import DashBoard from '../pages/Dashboard'
import Teste from "../components/teste";

const Private = ({ Item }) => {
  const { signed } = useAuth();

  return signed > 0 ? <Item /> : <Signin />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route exact path="/home" element={<Private Item={Home} />} />
          <Route exact path="/client" element={<Private Item={Client} />} />
          <Route exact path="/client/editClient/:id" element={<Private Item={EditClient} />} />
          <Route exact path="/client/viewClient/:id" element={<Private Item={ViewClient} />} />
          <Route exact path="/product" element={<Private Item={Product} />} />
          <Route exact path="/product/viewProduct/:id" element={<Private Item={ViewProduct} />} />
          <Route exact path="/product/editProduct/:id" element={<Private Item={EditProduct} />} />
          <Route exact path="/product/newProduct" element={<Private Item={NewProduct} />} />
          <Route exact path="/dashboard" element={<Private Item={DashBoard} />} />
          <Route path="/" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="*" element={<Signin />} />
          <Route path="/teste" element={<Teste />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
