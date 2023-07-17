import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import FiltersClient from '../FiltersClient/FiltersClient';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import ChecklistIcon from '@mui/icons-material/Checklist';



const apiKey = 'https://api-farmacia-higia-java-d263a377630d.herokuapp.com/customers/all';

const getClients = async () => {
    const response = await axios.get(apiKey);
    return response.data;
};

const ResultClients = () => {

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

    // const handleFilter = () => {

    //     const filteredClients = data.filter(client => {
    //         const nameMatch = client.firstName.toLowerCase().includes(nameFilter.toLowerCase());
    //         const emailMatch = client.email.toLowerCase().includes(emailFilter.toLowerCase());
    //         const cpfMatch = client.cpf.includes(cpfFilter);
    //         const birthDateMatch = formattedBirthDate.includes(birthDateFilter);
    //         console.log(birthDateMatch);

    //         return nameMatch && emailMatch && cpfMatch && birthDateMatch
    //     });
    //     setFilteredData(filteredClients);

    // };

    return (
        <div className="filtros-pesquisa p-3 mb-5 bg-body-tertiary rounded">
            <FiltersClient />

            <div className="table-result shadow px-2 py-3 mt-4 rounded">

                <div className="result-filter d-flex align-content-center gap-2">
                    <ChecklistIcon />
                    <h6>Resultado pesquisa</h6>
                </div>
                <hr />

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
                                    <td>{clients.cpf}</td>
                                    <td>{clients.firstName} {clients.lastName}</td>
                                    <td>{clients.email}</td>
                                    <td>{clients.phone}</td>
                                    <td>{dateFormatter(clients.birthDate)}</td>
                                    <td className="text-center">
                                        <div className='d-flex gap-1'>
                                            <Link to={`/client/viewClient/1`}>
                                                <button type="button" className="btn btn-primary">
                                                    <VisibilityIcon
                                                    />
                                                </button>
                                            </Link>
                                            <Link to={`/client/editClient/1`}>
                                                <button type="button" className="btn btn-danger">
                                                    <EditIcon />
                                                </button>
                                            </Link>
                                        </div>
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




// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from 'axios';
// import FiltersClient from "../FiltersClient/FiltersClient";
// import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";


// const apiKey = 'https://api-farmacia-higia-java-d263a377630d.herokuapp.com/customers/all';

// const getClients = async () => {
//     const response = await axios.get(apiKey);
//     return response.data;
// };

// const ResultClients = () => {


//     const { data, isLoading } = useQuery({
//         queryKey: ['clients'],
//         queryFn: getClients
//     })

//     return (
//         <div className="filtros-pesquisa shadow-sm p-3 mb-5 bg-body-tertiary rounded">

//             <FiltersClient data={data}/>

//             <div className="table-result">

//                 <h1 className="mb-5">Resultado da pesquisa</h1>

//                 <table className="table table-hover align-middle">
//                     <thead className="table">
//                         <tr>
//                             <th>CPF</th>
//                             <th>Nome</th>
//                             <th>Email</th>
//                             <th>Telefone</th>
//                             <th>Endereço</th>
//                             <th className="text-center">Ações</th>
//                         </tr>
//                     </thead>
//                     <tbody id="listagem-clientes">
//                         {isLoading ? (
//                             <LoadingSpinner/>
//                         ) : (
//                             data?.map((clients) => (
//                                 <tr key={clients.cpf}>
//                                     <td>{clients.cpf}</td>
//                                     <td>{clients.firstName} {clients.lastName}</td>
//                                     <td>{clients.email}</td>
//                                     <td>{clients.phone}</td>
//                                     <td>{clients.birthDate}</td>
//                                     <td className="text-center">...</td>
//                                 </tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default ResultClients;

