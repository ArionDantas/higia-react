import React from 'react'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import viewClientImage from '../../img/viewClient.svg';
import LoadingClient from '../LoadingClient/LoadingClient';
import ErrorSearch from '../ErrorSearch/ErrorSearch';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SaveIcon from '@mui/icons-material/Save';
import Navbar from '../Navbar';


const NewProduct = () => {

    const handleSubmit = () => {

    }

    return (
        <div className='section-container'>
            <div className='content'>
                <Navbar />
                <div className="row">
                    <div className="col">
                        <div className='content-view-client shadow rounded p-5'>
                            <h1 className='mb-4'>Cadastrar Produto</h1>
                            <div className='card-view-produto'>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group mb-3">
                                            <label htmlFor="eanProdutoView">Código de barras:</label>
                                            <input
                                                id="eanProdutoView"
                                                className="form-control"
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group mb-3">
                                            <label htmlFor="nomeProdutoView">Nome:</label>
                                            <input
                                                id="nomeProdutoView"
                                                className="form-control"
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-4">
                                        <div className="form-group mb-3">
                                            <label htmlFor="tipoProdutoView">Tipo:</label>
                                            <input
                                                id="tipoProdutoView"
                                                className="form-control"
                                                type="text"
                                            />
                                        </div>
                                    </div>



                                    <div className="col">
                                        <div className="form-group mb-3">
                                            <label htmlFor="descricaoProdutoView">Descrição:</label>
                                            <input
                                                id="descricaoProdutoView"
                                                className="form-control"
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <div className="form-group mb-3">
                                            <label htmlFor="valorProdutoView">Valor:</label>
                                            <input
                                                id="valorProdutoView"
                                                className="form-control"
                                                type="text"
                                            />
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-group mb-3">
                                            <label htmlFor="descontoProdutoView">Desconto:</label>
                                            <input
                                                id="descontoProdutoView"
                                                className="form-control"
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex align-content-center gap-2'>
                                    <Link to={'/product'}>
                                        <button type="button" className="btn btn-danger px-4 py-2   ">
                                            <KeyboardReturnIcon className='pe-1' />
                                            Retornar
                                        </button>
                                    </Link>
                                    <button type="button" className="btn btn-success d-flex gap-1 px-4 py-2" onClick={handleSubmit}>
                                        <SaveIcon />
                                        Salvar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <img src={viewClientImage} alt="svg" width={600} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewProduct