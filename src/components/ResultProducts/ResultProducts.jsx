import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import FiltersProduct from '../FiltersProduct/FiltersProduct';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import ChecklistIcon from '@mui/icons-material/Checklist';
import AddIcon from '@mui/icons-material/Add';


const apiKey = 'https://api-farmacia-higia-java-d263a377630d.herokuapp.com/products/all';

const getProducts = async () => {
    const response = await axios.get(apiKey);
    return response.data.content;
};

const ResultProducts = () => {

    const { data: initialData, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts
    });

    const [data, setData] = useState([]);

    useEffect(() => {
        setData(initialData);
    }, [initialData]);

    const style = {
        width: '100px',
    }

    return (
        <div className="filtros-pesquisa p-3 mb-5 bg-body-tertiary rounded">
            <div className='shadow-sm px-2 py-3 mb-5 rounded d-flex align-items-center gap-3'>
                <img src="src/img/logo-higia-bgremove.png" alt="" srcset="" style={style} />
                <h3>Produtos</h3>
            </div>

            <FiltersProduct />

            <div className="table-result shadow px-2 py-3 rounded">

                <div className="result-filter d-flex align-content-center justify-align-content-between gap-2 w-100">
                    <div className=' d-flex align-content-center gap-2 w-100'>
                        <ChecklistIcon />
                        <h6 className='m-0'>Resultado pesquisa</h6>
                    </div>
                    <div>

                        <Link to={'/product/newProduct'}>
                            <button
                                type="button"
                                className="btn btn-primary d-flex align-items-center"
                            // onClick={''}
                            >
                                <AddIcon />
                                Novo
                            </button>
                        </Link>

                    </div>
                </div>
                <hr style={{zIndex: -1, position: 'relative' }}/>

                <table className="table table-hover align-middle">
                    <thead className='table'>
                        <tr>
                            <th>ID</th>
                            <th>Código de barras</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Tipo</th>
                            <th>Valor</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="listagem-produtos">
                        {isLoading ? (
                            <>
                                <LoadingSpinner />
                            </>
                        ) : (
                            data?.map(product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.ean}</td>
                                    <td>{product.firstName}</td>
                                    <td>{product.description}</td>
                                    <td>{product.type}</td>
                                    <td>{'R$' + `FAKE VALUE`}</td>
                                    {/* <td>{'R$' + product.value}</td> */}
                                    <td className="text-center">
                                        <div className='d-flex gap-1'>
                                            <Link to={`/product/viewProduct/${product.id}`}>
                                                <button type="button" className="btn btn-primary">
                                                    <VisibilityIcon
                                                    />
                                                </button>
                                            </Link>
                                            <Link to={`/product/editProduct/${product.id}`}>
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

export default ResultProducts;




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

