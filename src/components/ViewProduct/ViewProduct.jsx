import React from 'react';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
// import { useQueryClient } from '../../services/queryCliente';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
const viewClientImage = new URL('/src/img/viewClient.svg', import.meta.url).href;

import LoadingProduct from '../LoadingProduct/LoadingProduct';
import ErrorSearch from '../ErrorSearch/ErrorSearch';
import Navbar from '../Navbar';


const ViewClient = () => {

    const navigate = useNavigate()
    const { id } = useParams();

    // const location = useLocation();
    // const id = location.state.id.value;

    console.log(id);

    const apiKey = `https://api-farmacia-higia-java-d263a377630d.herokuapp.com/products/${id}`;

    const getProduct = async () => {
        const response = await axios.get(apiKey);
        return response.data;
    };

    const { data: product, isLoading, isError, isSuccess } = useQuery(['product', id], getProduct);

    // const { data: product, isLoading, isError } = useQuery({
    //     queryKey: ['product'],
    //     queryFn: getProduct
    // });

    // const backPage = () => {
    //     navigate('/product')
    //     window. window.location.reload(true);
    // }


    return (

        <div className="section-container">
            <div className='content'>
                <Navbar />
                <div className="row">
                    <div className="col">
                        <div className='content-view-client shadow rounded p-5'>
                            <h1 className='mb-4'>Visualizar Produto</h1>

                            {/* Verifique o estado da requisição antes de renderizar os dados */}
                            {isLoading && (
                                <>
                                    <LoadingSpinner />
                                    <LoadingProduct />
                                </>
                            )}
                            {isError && (
                                <>
                                    <ErrorSearch message={'Produto não foi encontrado!'} onCloseTo={'/product'} />
                                    <LoadingProduct />
                                </>
                            )}
                            {isSuccess && (
                                <div className='card-view-produto'>
                                    <div className="row">
                                        <div className="col d-flex flex-column">
                                        <label htmlFor="idProductView">Imagem:</label>
                                            <img src={product.content.imgUrl} alt={product.content.title}  className='border rounded py-1 my-3' width={200} height={200} />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-4">
                                            <div className="form-group mb-3">
                                                <label htmlFor="idProductView">ID:</label>
                                                <input
                                                    id="idProductView"
                                                    className="form-control"
                                                    type="text"
                                                    disabled
                                                    value={product.content.id == null ? '' : product.content.id}
                                                />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group mb-3">
                                                <label htmlFor="eanProdutoView">Código de barras:</label>
                                                <input
                                                    id="eanProdutoView"
                                                    className="form-control"
                                                    type="text"
                                                    disabled
                                                    value={product.content.ean == null ? '' : product.content.ean}
                                                />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group mb-3">
                                                <label htmlFor="descricaoProdutoView">Descrição:</label>
                                                <input
                                                    id="descricaoProdutoView"
                                                    className="form-control"
                                                    type="text"
                                                    disabled
                                                    value={product.content.description == null ? '' : product.content.description}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-4">
                                            <div className="form-group mb-3">
                                                <label htmlFor="tipoProdutoView">Tipo:</label>
                                                <input
                                                    id="tipoProdutoView"
                                                    className="form-control"
                                                    type="text"
                                                    disabled
                                                    value={product.content.type == null ? '' : product.content.type}
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
                                                    disabled
                                                    value={`R$` + product.content.value == null ? '' : product.content.value}
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
                                                    disabled
                                                    value={product.content.saleFree == null ? '' : product.content.saleFree}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="row">

                                                    <div className="col-md-6">
                                                        <div className="form-group mb-3">
                                                            <label htmlFor="isActive">Is Active:</label>
                                                            <input
                                                                id="isActive"
                                                                className="form-control"
                                                                type="text"
                                                                disabled
                                                                value={product.content.isActive ? 'Ativo' : 'Desativado'}
                                                            />
                                                        </div>
                                                    </div>
                                                </div> */}
                                </div>

                            )}


                            <Link to={'/product'}>
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
        </div >
    );
};

export default ViewClient;
