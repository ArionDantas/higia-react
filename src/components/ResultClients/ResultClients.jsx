import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import FiltersClient from '../FiltersClient/FiltersClient';
import ModalExclusaoUsuario from '../ModalExclusao/ModalExclusao';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';

const imgURL = new URL('/src/img/logo-higia-bgremove.png', import.meta.url).href;



const apiKey = 'https://api-farmacia-higia-java-d263a377630d.herokuapp.com/customers/all';

const getClients = async () => {
    const response = await axios.get(apiKey);
    return response.data;
};

const ResultClients = () => {

    const [showModal, setShowModal] = useState(false);

    function dateFormatter(data) {
        const dataObject = new Date(data);
        const dia = dataObject.getDate();
        const mes = dataObject.getMonth() + 1;
        const ano = dataObject.getFullYear();
        const dataFormatted = `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${ano}`
        return dataFormatted
    }

    const { data: initialData, isLoading } = useQuery({
        queryKey: ['clients'],
        queryFn: getClients
    });

    const [data, setData] = useState([]);

    useEffect(() => {
        setData(initialData);
    }, [initialData]);

    const handleExcluirUsuario = () => {
        console.log('Usuário excluído com sucesso!');
        setShowModal(false);
    }

    const style = {
        width: '100px',
    }


    return (
        <div className="filtros-pesquisa p-3 mb-5 bg-body-tertiary rounded">
            <div className='shadow-sm px-2 py-3 mb-5 rounded d-flex align-items-center gap-3'>
                <img src={imgURL} alt="Logo da Higia" style={style} />
                <h3>Clientes</h3>
            </div>

            <FiltersClient />

            <div className="table-result shadow px-2 py-3 rounded">
                {/* 
                <div className="result-filter d-flex align-content-center gap-2">
                    <ChecklistIcon />
                    <h6>Resultado pesquisa</h6>
                 </div> */}
                <hr style={{ zIndex: -1, position: 'relative' }} />

                <table className="table table-hover align-middle">
                    <thead className='table'>
                        <tr>
                            <th>CPF</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Data de aniversário</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="listagem-clientes">
                        {isLoading ? (
                            <>
                                <LoadingSpinner />
                            </>
                        ) : (
                            data?.map(clients => (
                                <tr key={clients.cpf}>
                                    <td className='client-cpf'>{clients.cpf}</td>
                                    <td className='client-firstName'>{clients.firstName} {clients.lastName}</td>
                                    <td className='client-email'>{clients.email}</td>
                                    <td className='client-phone'>{clients.phone}</td>
                                    <td className='client-birthDate'>{dateFormatter(clients.birthDate)}</td>
                                    <td className="text-center d-flex gap-1">
                                        <Link to={`/client/viewClient/${clients.id}`}>
                                            <button type="button" className="btn btn-primary">
                                                <VisibilityIcon
                                                />
                                            </button>
                                        </Link>
                                        <Link to={`/client/editClient/${clients.id}`}>
                                            <button type="button" className="btn btn-warning">
                                                <EditIcon />
                                            </button>
                                        </Link>
                                        <button className="btn btn-danger" onClick={() => setShowModal(true)}>
                                            <ClearIcon />
                                        </button>

                                        <ModalExclusaoUsuario
                                            who={'cliente'}
                                            text={'Deseja realmente excluir cliente?'}
                                            show={showModal}
                                            onClose={() => setShowModal(false)}
                                            onConfirm={handleExcluirUsuario}
                                        />

                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default ResultClients;

