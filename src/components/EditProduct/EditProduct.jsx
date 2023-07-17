import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import viewEditUser from '../../img/editUser.svg';
import SaveIcon from '@mui/icons-material/Save';
import LoadingClient from '../LoadingClient/LoadingClient';
import ErrorSearch from '../ErrorSearch/ErrorSearch';
import Navbar from '../Navbar';

const EditProduct = () => {
  const { cpf } = useParams();

  const apiKey = `https://api-farmacia-higia-java-d263a377630d.herokuapp.com/customers/${cpf}`;

  const getProduct = async () => {
    const response = await axios.get(apiKey);
    return response.data;
  };

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product'],
    queryFn: getProduct
  });

  const [editedProduct, setEditedProduct] = useState({});

  useEffect(() => {
    if (product) {
      setEditedProduct(product);
    }
  }, [product]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      content: {
        ...prevProduct.content,
        [name]: value
      }
    }));
  };

  const handleSubmit = async () => {
    const { cpf, email, password, firstName, lastName, birthDate, phone, isActive } = editedProduct.content;

    try {
      const response = await axios.post(
        'https://api-farmacia-higia-java-d263a377630d.herokuapp.com/customers/',
        {
          cpf: cpf,
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          birthDate: '2023-07-04T00:00:00.000+00:00',
          isActive: isActive
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="section-container">
      <div className="content">
        <Navbar />
        <div className="row">
          <div className="col">
            <div className="content-view-client shadow rounded p-5">
              <h1 className="mb-4">Editar Produto</h1>

              {isLoading ? (
                <>
                  <LoadingSpinner />
                  <LoadingClient />
                </>
              ) : isError ? (
                <>
                  <ErrorSearch message={'Produto não foi encontrado!'} onCloseTo={'/product'} />
                  <LoadingClient />
                </>
              ) : (
                <div className="card-view-produto">
                  <div className="row">
                    <div className="col">
                      <div className="form-group mb-3">
                        <label htmlFor="cpf">CPF:</label>
                        <input
                          id="cpf"
                          className="form-control"
                          type="text"
                          name="cpf"
                          value={editedProduct.content?.cpf || ''}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group mb-3">
                        <label htmlFor="firstName">Nome:</label>
                        <input
                          id="firstName"
                          className="form-control"
                          type="text"
                          name="firstName"
                          value={editedProduct.content?.firstName || ''}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-4">
                      <div className="form-group mb-3">
                        <label htmlFor="type">Tipo:</label>
                        <input
                          id="type"
                          className="form-control"
                          type="text"
                          name="type"
                          value={editedProduct.content?.type || ''}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-group mb-3">
                        <label htmlFor="description">Descrição:</label>
                        <input
                          id="description"
                          className="form-control"
                          type="text"
                          name="description"
                          value={editedProduct.content?.description || ''}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <div className="form-group mb-3">
                        <label htmlFor="value">Valor:</label>
                        <input
                          id="value"
                          className="form-control"
                          type="text"
                          name="value"
                          value={editedProduct.content?.value || ''}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-group mb-3">
                        <label htmlFor="saleFree">Desconto:</label>
                        <input
                          id="saleFree"
                          className="form-control"
                          type="text"
                          name="saleFree"
                          value={editedProduct.content?.saleFree || ''}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <Link to={'/product'}>
                      <button type="button" className="btn btn-danger px-4 py-2">
                        <KeyboardReturnIcon className="pe-1" />
                        Retornar
                      </button>
                    </Link>

                    <button type="button" className="btn btn-success d-flex gap-1 px-4 py-2" onClick={handleSubmit}>
                      <SaveIcon />
                      Salvar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="col">
            <img src={viewEditUser} alt="svg" width={600} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
