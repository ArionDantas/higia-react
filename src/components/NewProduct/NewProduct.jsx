import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import viewClientImage from '../../img/viewClient.svg';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SaveIcon from '@mui/icons-material/Save';
import Navbar from '../Navbar';

const NewProduct = () => {

    const [formState, setFormState] = useState({
        ean: '',
        type: '',
        description: '',
        value: '',
        saleFree: '',
    });

    const apiKey = 'https://api-farmacia-higia-java-d263a377630d.herokuapp.com/products/';

    const addProduct = async (newProductData) => {
        try {
            const response = await axios.post(apiKey, newProductData);
            return response.data;
        } catch (error) {
            throw new Error('Erro ao adicionar o produto');
        }
    };

    const mutation = useMutation(addProduct);

    const handleSubmit = () => {
        const formData = {
          ean: formState.ean,
          type: formState.type,
          description: formState.description,
          value: formState.value,
          saleFree: formState.saleFre,
        };
    
        mutation.mutate(formData);
      };
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
    
      const isFormValid = () => {
        const values = Object.values(formState);
        return values.every((value) => value.trim() !== '');
      };

    return (
        <div className='section-container'>
            <div className='content'>
                {mutation.isLoading ? <LoadingSpinner /> : ('')}
                <Navbar />
                <div className='row'>
                    <div className='col'>
                        <div className='content-view-client shadow rounded p-5'>
                            <h1 className='mb-4'>Cadastrar Produto</h1>
                            <div className='card-view-produto'>
                                <form action="post">
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group mb-3">
                                                <label htmlFor="eanProdutoView">Código de barras:</label>
                                                <input
                                                    id="eanProdutoView"
                                                    className="form-control"
                                                    type="text"
                                                    name='ean'
                                                    value={formState.ean}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        {/* <div className="col">
                                            <div className="form-group mb-3">
                                                <label htmlFor="nomeProdutoView">Nome:</label>
                                                <input
                                                    id="nomeProdutoView"
                                                    className="form-control"
                                                    type="text"
                                                />
                                            </div>
                                        </div> */}
                                    </div>

                                    <div className="row">
                                        <div className="col-4">
                                            <div className="form-group mb-3">
                                                <label htmlFor="tipoProdutoView">Tipo:</label>
                                                <input
                                                    id="tipoProdutoView"
                                                    className="form-control"
                                                    type="text"
                                                    name='type'
                                                    value={formState.type}
                                                    onChange={handleInputChange}
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
                                                    name='description'
                                                    value={formState.description}
                                                    onChange={handleInputChange}
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
                                                    name='value'
                                                    value={formState.value}
                                                    onChange={handleInputChange}
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
                                                    name='saleFree'
                                                    value={formState.saleFree}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>

                                <div className='d-flex align-content-center gap-2'>
                                    <Link to={'/product'}>
                                        <button type='button' className='btn btn-danger px-4 py-2'>
                                            <KeyboardReturnIcon className='pe-1' />
                                            Retornar
                                        </button>
                                    </Link>
                                    <button
                                        type='button'
                                        className='btn btn-success d-flex gap-1 px-4 py-2'
                                        onClick={handleSubmit}
                                        disabled={mutation.isLoading || !isFormValid()}
                                    >
                                        <SaveIcon />
                                        Salvar
                                    </button>
                                </div>
                                {/* Exibir mensagem de erro */}
                                {mutation.isError && (
                                    <div className='alert alert-danger mt-3' role='alert'>
                                        Ocorreu um erro ao adicionar o produto: {mutation.error.message}
                                    </div>
                                )}
                                {/* Exibir mensagem de sucesso, se a mutação foi bem-sucedida */}
                                {mutation.isSuccess && (
                                    <div className='alert alert-success mt-3' role='alert'>
                                        Produto adicionado com sucesso!
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        <img src={viewClientImage} alt='svg' width={600} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewProduct;
