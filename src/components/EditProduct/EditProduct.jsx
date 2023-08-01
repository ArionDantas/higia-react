import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { storage } from "../../services/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useQuery, useMutation } from '@tanstack/react-query';
import UploadImg from '../../img/upload-img.svg'
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import viewClientImage from '../../img/viewClient.svg';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SaveIcon from '@mui/icons-material/Save';
import LoadingProduct from '../LoadingProduct/LoadingProduct';
import Navbar from '../Navbar';

const NewProduct = () => {

  const { id } = useParams();

  // Function to fetch product details from the API
  const getProduct = async () => {
    const response = await axios.get(`https://api-farmacia-higia-java-d263a377630d.herokuapp.com/products/${id}`);
    return response.data;
  };

  const { data: product, isLoading, isError, isSuccess } = useQuery(['product'], getProduct);


  const [progressPorcent, setPorgessPorcent] = useState(0);
  const navigate = useNavigate();
  const [imgURL, setImgURL] = useState(null);

  const [formState, setFormState] = useState({});

  useEffect(() => {
    if (isSuccess && product.content) {
      setFormState(product.content);
      setImgURL(product.content.imgUrl || UploadImg);
    }
  }, [isSuccess, product]);


  const handleSubmitImg = (event) => {
    event.preventDefault();
    const file = event.target[0]?.files[0];
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setPorgessPorcent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgURL(downloadURL); // Update the imgURL state with the new URL
        });
      }
    );
  };

  const addProduct = async (newProductData) => {
    try {
      const response = await axios.post(apiKey, newProductData);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao adicionar o produto');
    }
  };

  const mutation = useMutation(addProduct, {
    onSuccess: () => {
      navigate('/product');
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      id: formState.id,
      ean: formState.ean,
      type: formState.type,
      description: formState.description,
      value: formState.value,
      saleFree: formState.saleFree,
      imgUrl: imgURL,
    };

    console.log(formData);

    const apiKey = `https://api-farmacia-higia-java-d263a377630d.herokuapp.com/products/${formData.id}`;

    try {

      const response = await axios.put(apiKey, formData);
      return response.data;
    } catch (error) {
      console.error('Error while adding the product:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBack = () => {
    navigate('/product')
    window.location.reload(true)
  }

  return (
    <div className='section-container'>
      <div className='content'>
        {/* {mutation.isLoading ? <LoadingSpinner /> : ''}
        <Navbar /> */}
        <div className='row'>
          <div className='col'>
            <div className='content-view-client shadow rounded p-5'>
              <h1 className='mb-4'>Atualizar Produto</h1>
              <Navbar />

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
                  <div className="d-flex">

                    <form onSubmit={handleSubmitImg} className='d-flex flex-column gap-3'>
                      <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        style={{ display: 'none' }}
                      />
                      <label htmlFor="fileInput" className="btn btn-primary">Atualizar imagem</label>
                      <button className='btn btn-success'>Enviar</button>
                    </form>

                  </div>
                  <form onSubmit={handleSubmit} method='post'>
                    <div className="row d-flex align-items-center mb-3">
                      <div className="col d-flex flex-column gap-2 image-container mb-3">
                        {imgURL && imgURL !== UploadImg ? (
                          <img src={imgURL} alt="Imagem 1" className='border rounded p-1' />
                        ) : (
                          <img src={UploadImg} alt="Imagem Padrão" className='border rounded p-1' />
                        )}

                        <div>
                          {progressPorcent === 100 ? (
                            <>
                              <div className='progress'>
                                <div className="progress-bar bg-success" style={{ width: `${progressPorcent}%` }}>Sucesso!</div>
                              </div>
                            </>
                          )
                            : (
                              <>
                                <div className='progress'>
                                  <div className="progress-bar" style={{ width: `${progressPorcent}%` }}>{progressPorcent}%</div>
                                </div>
                              </>
                            )}
                        </div>
                      </div>
                      <div className="col">
                      </div>
                    </div>
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
                    </div>

                    <div className="row">
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


                    <div className='d-flex align-content-center gap-2'>
                      <Link to={'/product'}>
                        <button type='button' onClick={handleBack} className='btn btn-danger px-4 py-2'>
                          <KeyboardReturnIcon className='pe-1' />
                          Retornar
                        </button>
                      </Link>
                      <button
                        type='submit'
                        className='btn btn-success d-flex gap-1 px-4 py-2'
                        disabled={mutation.isLoading} /* || !isFormValid() */
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
                  </form>
                </div>
              )}
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



// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { storage } from "../../services/firebase";
// import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// import UploadImg from '../../img/upload-img.svg';
// import axios from 'axios';
// import { useMutation, useQuery } from 'react-query'; // Fix import statement
// import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
// import viewClientImage from '../../img/viewClient.svg';
// import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
// import SaveIcon from '@mui/icons-material/Save';
// import Navbar from '../Navbar';

// const NewProduct = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [imgURL, setImgURL] = useState('');
//   const [progressPorcent, setProgressPorcent] = useState(0);
//   // Remove console.log(product);

//   const apiProduct = `https://api-farmacia-higia-java-d263a377630d.herokuapp.com/products/${id}`;

//   const getProduct = async () => {
//     const response = await axios.get(apiProduct);
//     return response.data.content;
//   };

//   const { data: product, isLoading, isError, isSuccess } = useQuery(['product', id], getProduct);

//   useEffect(() => {
//     if (isSuccess && product) {
//       setFormState(product);
//     }
//   }, [isSuccess, product]);

//   const [formState, setFormState] = useState({
//     ean: '',
//     type: '',
//     description: '',
//     value: '',
//     saleFree: '',
//   });

//   const handleSubmitImg = (event) => {
//     event.preventDefault();
//     const file = event.target[0]?.files[0];
//     if (!file) return;

//     const storageRef = ref(storage, `images/${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//         setProgressPorcent(progress);
//       },
//       (error) => {
//         alert(error);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setImgURL(downloadURL);
//         });
//       }
//     );
//   };

//   const apiKey = `https://api-farmacia-higia-java-d263a377630d.herokuapp.com/products/${id}`;

//   const addProduct = async (newProductData) => {
//     try {
//       const response = await axios.post(apiKey, newProductData);
//       return response.data;
//     } catch (error) {
//       throw new Error('Erro ao adicionar o produto');
//     }
//   };

//   const mutation = useMutation(addProduct);

//   const handleSubmit = () => {
//     const formData = {
//       ean: formState.ean,
//       type: formState.type,
//       description: formState.description,
//       value: formState.value,
//       saleFree: formState.saleFree,
//       imgUrl: imgURL
//     };

//     mutation.mutate(formData);
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormState((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const isFormValid = () => {
//     const values = Object.values(formState);
//     return values.every((value) => typeof value === 'string' && value.trim() !== '');
//   };

//   return (
//     <div className='section-container'>
//       <div className='content'>
//         {mutation.isLoading ? <LoadingSpinner /> : ''}
//         <Navbar />
//         <div className='row'>
//           <div className='col'>
//             <div className='content-view-client shadow rounded p-5'>
//               <h1 className='mb-4'>Atualizar Produto</h1>
//               <div className='card-view-produto'>
//                 <div className="d-flex">
//                   <form onSubmit={handleSubmitImg} className='d-flex flex-column gap-3'>
//                     <input
//                       type="file"
//                       id="fileInput"
//                       accept="image/*"
//                       style={{ display: 'none' }}
//                       onChange={handleSubmitImg}
//                     />
//                     <label htmlFor="fileInput" className="btn btn-primary">Atualizar imagem</label>
//                     <button className='btn btn-success'>Enviar</button>
//                   </form>
//                 </div>
//                 <form onSubmit={handleSubmit} className='mb-3'>
//                   <div className="row d-flex align-items-center mb-3">
//                     <div className="col d-flex flex-column gap-2 image-container mb-3">
//                       {imgURL && imgURL !== UploadImg ? (
//                         <img src={imgURL} alt="Imagem 1" className='border rounded p-1' />
//                       ) : (
//                         <img src={UploadImg} alt="Imagem Padrão" className='border rounded p-1' />
//                       )}

//                       <div>
//                         {progressPorcent === 100 ? (
//                           <>
//                             <div className='progress'>
//                               <div className="progress-bar bg-success" style={{ width: `${progressPorcent}%` }}>Sucesso!</div>
//                             </div>
//                           </>
//                         )
//                           : (
//                             <>
//                               <div className='progress'>
//                                 <div className="progress-bar" style={{ width: `${progressPorcent}%` }}>{progressPorcent}%</div>
//                               </div>
//                             </>
//                           )
//                         }
//                       </div>
//                     </div>
//                     <div className="col">
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col">
//                       <div className="form-group mb-3">
//                         <label htmlFor="eanProdutoView">Código de barras:</label>
//                         <input
//                           id="eanProdutoView"
//                           className="form-control"
//                           type="text"
//                           name='ean'
//                           value={formState.ean || ''}
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="row">
//                     <div className="col-4">
//                       <div className="form-group mb-3">
//                         <label htmlFor="tipoProdutoView">Tipo:</label>
//                         <input
//                           id="tipoProdutoView"
//                           className="form-control"
//                           type="text"
//                           name='type'
//                           value={formState.type || ''}
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                     </div>

//                     <div className="col">
//                       <div className="form-group mb-3">
//                         <label htmlFor="descricaoProdutoView">Descrição:</label>
//                         <input
//                           id="descricaoProdutoView"
//                           className="form-control"
//                           type="text"
//                           name='description'
//                           value={formState.description || ''}
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="row">
//                     <div className="col">
//                       <div className="form-group mb-3">
//                         <label htmlFor="valorProdutoView">Valor:</label>
//                         <input
//                           id="valorProdutoView"
//                           className="form-control"
//                           type="text"
//                           name='value'
//                           value={formState.value || ''}
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                     </div>

//                     <div className="col">
//                       <div className="form-group mb-3">
//                         <label htmlFor="descontoProdutoView">Desconto:</label>
//                         <input
//                           id="descontoProdutoView"
//                           className="form-control"
//                           type="text"
//                           name='saleFree'
//                           value={formState.saleFree || ''}
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                     </div>

//                   </div>
//                   <div className='d-flex align-content-center gap-2'>
//                     <Link to={'/product'}>
//                       <button type='button' className='btn btn-danger px-4 py-2'>
//                         <KeyboardReturnIcon className='pe-1' />
//                         Retornar
//                       </button>
//                     </Link>
//                     <button
//                       type='button'
//                       className='btn btn-success d-flex gap-1 px-4 py-2'
//                       onClick={handleSubmit}
//                       disabled={mutation.isLoading || !isFormValid()}
//                     >
//                       <SaveIcon />
//                       Salvar
//                     </button>
//                   </div>
//                   {/* Exibir mensagem de erro */}
//                   {mutation.isError && (
//                     <div className='alert alert-danger mt-3' role='alert'>
//                       Ocorreu um erro ao adicionar o produto: {mutation.error.message}
//                     </div>
//                   )}
//                   {/* Exibir mensagem de sucesso, se a mutação foi bem-sucedida */}
//                   {mutation.isSuccess && (
//                     <div className='alert alert-success mt-3' role='alert'>
//                       Produto adicionado com sucesso!
//                     </div>
//                   )}
//                 </form>
//               </div>
//             </div>
//           </div>
//           <div className='col'>
//             <img src={viewClientImage} alt='svg' width={600} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewProduct;



// import React, { useState, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { storage } from "../../services/firebase";
// import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
// import axios from 'axios';
// import UploadImg from '../../img/upload-img.svg'
// import { useQuery } from '@tanstack/react-query';
// import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
// import viewEditUser from '../../img/editUser.svg';
// import SaveIcon from '@mui/icons-material/Save';
// import LoadingProduct from '../LoadingProduct/LoadingProduct';
// import ErrorSearch from '../ErrorSearch/ErrorSearch';
// import Navbar from '../Navbar';

// const EditProduct = () => {

//   const [imgURL, setImgURL] = useState(UploadImg);
//   const [progressPorcent, setPorgessPorcent] = useState(0);

//   console.log(imgURL);

//   const handleSubmitImg = (event) => {
//     event.preventDefault();
//     const file = event.target[0]?.files[0];
//     if (!file) return;

//     const storageRef = ref(storage, `images/${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress = Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );
//         setPorgessPorcent(progress);
//       },
//       (error) => {
//         alert(error);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setImgURL(downloadURL);
//         });
//       }
//     );
//   };

//   const { id } = useParams();

//   const apiKey = `https://api-farmacia-higia-java-d263a377630d.herokuapp.com/products/${id}`;

//   const getProduct = async () => {
//     const response = await axios.get(apiKey);
//     return response.data;
//   };

//   const { data: product, isLoading, isError, isSuccess } = useQuery({
//     queryKey: ['product', id],
//     queryFn: getProduct,
//   });

//   const [editedProduct, setEditedProduct] = useState({});

//   useEffect(() => {
//     if (product) {
//       setEditedProduct(product);
//     }
//   }, [product]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setEditedProduct((prevProduct) => ({
//       ...prevProduct,
//       content: {
//         ...prevProduct.content,
//         [name]: value
//       }
//     }));
//   };

//   const [formState, setFormState] = useState({
//     ean: '',
//     type: '',
//     description: '',
//     value: '',
//     saleFree: '',
//   });

//   const editProduct = async (productId, updatedProductData) => {
//     try {
//       const url = `${apiKey}/${productId}`;
//       const response = await axios.put(url, updatedProductData);
//       return response.data;
//     } catch (error) {
//       throw new Error('Erro ao editar o produto');
//     }
//   };

//   const editMutation = useMutation(editProduct);

//   const handleEdit = () => {
//     const updatedData = {
//       ean: formState.ean,
//       type: formState.type,
//       description: formState.description,
//       value: formState.value,
//       saleFree: formState.saleFree,
//       imgUrl: imgURL
//     };

//     editMutation.mutate(productId, updatedData);
//   };


//   const addProduct = async (newProductData) => {
//     try {
//       const response = await axios.post(apiKey, newProductData);
//       return response.data;
//     } catch (error) {
//       throw new Error('Erro ao adicionar o produto');
//     }
//   };

//   const mutation = useMutation(addProduct);

//   const handleSubmit = () => {



//     const formData = {
//       ean: formState.ean,
//       type: formState.type,
//       description: formState.description,
//       value: formState.value,
//       saleFree: formState.saleFre,
//       imgUrl: imgURL
//     };

//     mutation.mutate(formData);
//   };

//   const isFormValid = () => {
//     const values = Object.values(formState);
//     return values.every((value) => value.trim() !== '');
//   };
//   return (
//     <div className="section-container">
//       <div className="content">
//         <Navbar />
//         <div className="row">
//           <div className="col">
//             <div className="content-view-client shadow rounded p-5">
//               <h1 className="mb-4">Editar Produto</h1>

//               {isLoading && (
//                 <>
//                   <LoadingSpinner />
//                   <LoadingProduct />
//                 </>
//               )}
//               {isError && (
//                 <>
//                   <ErrorSearch message={'Produto não foi encontrado!'} onCloseTo={'/product'} />
//                   <LoadingProduct />
//                 </>
//               )}
//               {isSuccess && (
//                 <div className='card-view-produto'>

//                   <div className="row d-flex align-items-center mb-3">
//                     <label className='mb-3'>Imagem:</label>
//                     <div className="col d-flex flex-column gap-2 image-container mb-3">

//                       {imgURL && imgURL !== UploadImg ? (
//                         <img src={imgURL} alt="Imagem 1" className='border rounded p-1' />
//                       ) : (
//                         <img src={UploadImg} alt="Imagem Padrão" className='border rounded p-1' />
//                       )}

//                       <div>
//                         {progressPorcent === 100 ? (
//                           <>
//                             <div className='progress'>
//                               <div className="progress-bar bg-success" style={{ width: `${progressPorcent}%` }}>Sucesso!</div>
//                             </div>
//                           </>
//                         )
//                           : (
//                             <>
//                               <div className='progress'>
//                                 <div className="progress-bar" style={{ width: `${progressPorcent}%` }}>{progressPorcent}%</div>
//                               </div>
//                             </>
//                           )
//                         }
//                       </div>
//                     </div>
//                     <div className="col">
//                       <form onSubmit={handleSubmitImg} className='d-flex flex-column gap-3'>
//                         <input
//                           type="file"
//                           id="fileInput"
//                           accept="image/*"
//                           style={{ display: 'none' }}
//                         />
//                         <label htmlFor="fileInput" className="btn btn-primary">Atualizar imagem</label>
//                         <button className='btn btn-success'>Enviar</button>
//                       </form>
//                     </div>
//                   </div>

//                   <div className="row">
//                     <div className="col-4">
//                       <div className="form-group mb-3">
//                         <label htmlFor="idProductView">ID:</label>
//                         <input
//                           id="idProductView"
//                           className="form-control"
//                           type="text"
//                           disabled
//                           value={editedProduct.content?.id || ''}
//                         />
//                       </div>
//                     </div>
//                     <div className="col">
//                       <div className="form-group mb-3">
//                         <label htmlFor="eanProdutoView">Código de barras:</label>
//                         <input
//                           id="eanProdutoView"
//                           className="form-control"
//                           type="text"
//                           value={editedProduct.content?.ean || ''}
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                     </div>
//                   </div>


//                   <div className="row">

//                     <div className="col">
//                       <div className="form-group mb-3">
//                         <label htmlFor="nomeProdutoView">Nome:</label>
//                         <input
//                           id="nomeProdutoView"
//                           className="form-control"
//                           type="text"
//                           value={editedProduct.content?.name || ''}
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-4">
//                       <div className="form-group mb-3">
//                         <label htmlFor="tipoProdutoView">Tipo:</label>
//                         <input
//                           id="tipoProdutoView"
//                           className="form-control"
//                           type="text"
//                           value={editedProduct.content?.type || ''}
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="row">

//                     <div className="col">
//                       <div className="form-group mb-3">
//                         <label htmlFor="descricaoProdutoView">Descrição:</label>
//                         <input
//                           id="descricaoProdutoView"
//                           className="form-control"
//                           type="text"
//                           value={editedProduct.content?.description || ''}
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="row">
//                     <div className="col">
//                       <div className="form-group mb-3">
//                         <label htmlFor="valorProdutoView">Valor:</label>
//                         <input
//                           id="valorProdutoView"
//                           className="form-control"
//                           type="text"
//                           value={`R$ ${editedProduct.content?.value || ''}`}
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                     </div>

//                     <div className="col">
//                       <div className="form-group mb-3">
//                         <label htmlFor="descontoProdutoView">Desconto:</label>
//                         <input
//                           id="descontoProdutoView"
//                           className="form-control"
//                           type="text"
//                           value={editedProduct.content?.saleFree || ''}
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="d-flex gap-2">
//                     <Link to={'/product'}>
//                       <button type="button" className="btn btn-danger px-4 py-2">
//                         <KeyboardReturnIcon className="pe-1" />
//                         Retornar
//                       </button>
//                     </Link>

//                     <button type="button" className="btn btn-success d-flex gap-1 px-4 py-2" onClick={handleSubmit}>
//                       <SaveIcon />
//                       Salvar
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="col">
//             <img src={viewEditUser} alt="svg" width={600} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProduct;



