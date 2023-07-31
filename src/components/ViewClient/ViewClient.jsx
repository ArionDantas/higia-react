import React from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './ViewClient.css'
import viewClientImage from '../../img/viewClient.svg';
import LoadingClient from '../LoadingClient/LoadingClient';
import ErrorSearch from '../ErrorSearch/ErrorSearch';
import Navbar from '../Navbar';


const ViewClient = () => {

    const { id } = useParams();

    // const location = useLocation();
    // const id = location.state.id.value;

    console.log(id);

    const apiKey = `https://api-farmacia-higia-java-d263a377630d.herokuapp.com/customers/${id}`;

    const getClient = async () => {
        const response = await axios.get(apiKey);
        return response.data;
    };

    const { data: client, isLoading, isError } = useQuery({
        queryKey: ['client'],
        queryFn: getClient
    });

    function dateFormatter(data) {
        const dataObject = new Date(data);
        const dia = dataObject.getDate();
        const mes = dataObject.getMonth() + 1;
        const ano = dataObject.getFullYear();
        const dataFormatted = `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${ano}`
        return dataFormatted
    }

    function formatPhoneNumber(phoneNumber) {
        // Remova todos os caracteres não numéricos do número de telefone
        const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
      
        // Verifique se o número de telefone tem o comprimento correto
        if (cleanedPhoneNumber.length !== 11) {
          throw new Error('O número de telefone deve conter 11 dígitos (incluindo DDD).');
        }

        // Formate o número no formato (XX) XXXX-XXXX
        const ddd = cleanedPhoneNumber.substring(0, 2);
        const firstPart = cleanedPhoneNumber.substring(2, 6);
        const secondPart = cleanedPhoneNumber.substring(6, 10);
      
        return `(${ddd}) ${firstPart}-${secondPart}`;
      }

    return (

        <div className="section-container">
            <div className='content'>
                <Navbar />
                <div className="row">
                    <div className="col">
                        <div className='content-view-client shadow rounded p-5'>
                            <h1 className='mb-4'>Visualizar cliente</h1>

                            {
                                isLoading ? (
                                    <>
                                        <LoadingSpinner />
                                        <LoadingClient />
                                    </>
                                ) :

                                    isError ? (
                                        <>
                                            <ErrorSearch message={'Cliente nao foi encontrado!'} onCloseTo={'/client'} />
                                            <LoadingClient />
                                        </>
                                    ) :

                                        (
                                            <div className='card-view-client'>
                                                <div className="row">
                                                    <div className="col-4">
                                                        <div className="form-group mb-3">
                                                            <label htmlFor="firstName">Nome:</label>
                                                            <input
                                                                id="firstName"
                                                                className="form-control"
                                                                type="text"
                                                                disabled
                                                                value={client.content.firstName == null ? '' : client.content.firstName}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col">
                                                        <div className="form-group mb-3">
                                                            <label htmlFor="lastName">Last Name:</label>
                                                            <input
                                                                id="lastName"
                                                                className="form-control"
                                                                type="text"
                                                                disabled
                                                                value={client.content.lastName == null ? '' : client.content.lastName}
                                                            />
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="row">

                                                    <div className="col">
                                                        <div className="form-group mb-3">
                                                            <label htmlFor="email">Email:</label>
                                                            <input
                                                                id="email"
                                                                className="form-control"
                                                                type="email"
                                                                disabled
                                                                value={client.content.email == null ? '' : client.content.email}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col">
                                                        <div className="form-group mb-3">
                                                            <label htmlFor="cpf">CPF:</label>
                                                            <input
                                                                id="cpf"
                                                                className="form-control"
                                                                type="text"
                                                                disabled
                                                                value={client.content.cpf == null ? '' : client.content.cpf}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col">
                                                        <div className="form-group mb-3">
                                                            <label htmlFor="password">Password:</label>
                                                            <input
                                                                id="password"
                                                                className="form-control"
                                                                type="text"
                                                                disabled
                                                                value={client.content.password == null ? '' : client.content.password}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col">
                                                        <div className="form-group mb-3">
                                                            <label htmlFor="phone">Celular:</label>
                                                            <input
                                                                id="phone"
                                                                className="form-control"
                                                                type="text"
                                                                disabled
                                                                value={client.content.phone == null ? '' : formatPhoneNumber(client.content.phone)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col">
                                                        <div className="form-group mb-3">
                                                            <label htmlFor="birthDate">Data de aniversário:</label>
                                                            <input
                                                                id="birthDate"
                                                                className="form-control"
                                                                type="text"
                                                                disabled
                                                                value={client.content.birthDate == null ? '' : dateFormatter(client.content.birthDate)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">

                                                    <div className="col-md-6">
                                                        <div className="form-group mb-3">
                                                            <label htmlFor="isActive">Is Active:</label>
                                                            <input
                                                                id="isActive"
                                                                className="form-control"
                                                                type="text"
                                                                disabled
                                                                value={client.content.isActive ? 'Ativo' : 'Desativado'}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        )}


                            <Link to={'/client'}>
                                <button type="button" className="btn btn-danger px-4 py-2   ">
                                    <KeyboardReturnIcon className='pe-1' />
                                    Retornar
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="col">
                        <img src={viewClientImage} alt="svg" width={600} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ViewClient;
