import React from 'react';
import axios from 'axios';

const Teste = () => {
//   const data = {
//     type: "genericos",
//     description: "Dipirona 18mg",
//     ean: "61651611551",
//     value: 18.90,
//     saleFee: 0,
//   };

  const data = {
    cpf: "72241465011",
    password: "12qwaszx12qwaszx",
    email: "teste1@gmail.com",
    firstName: "Teste",
    lastName: "Segunda",
    phone: "27999775509",
    birthDate: "2023-07-31T19:47:18.789Z"
  }

  const apiKey = 'https://api-farmacia-higia-java-d263a377630d.herokuapp.com/customers/';

  const postProducts = async () => {
    try {
      const response = await axios.post(apiKey, data);
      console.log('Resposta:', response.data);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <div>
      <button onClick={postProducts}>Enviar</button>
    </div>
  );
};

export default Teste;
