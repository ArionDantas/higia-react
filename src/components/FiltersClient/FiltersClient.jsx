import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import $ from "jquery";

const FiltersClient = ({ data, setFilteredData }) => {
  const [nameFilter, setNameFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [cpfFilter, setCpfFilter] = useState('');
  const [birthDateFilter, setBirthDateFilter] = useState('');

  function dateFormatter(data) {
    const dataObject = new Date(data);
    const dia = dataObject.getDate();
    const mes = dataObject.getMonth() + 1;
    const ano = dataObject.getFullYear();
    const dataFormatted = `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${ano}`
    return dataFormatted
  }

  const handleFilter = () => {

    $(document).ready(function () {
      $("#inputNomeClientePesquisa").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#listagem-clientes tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
  };

  return (
    <div className="filters px-2 rounded">
      <div className="header-filter d-flex align-content-center gap-2">
        <TuneIcon />
        <h6>Filtros de pesquisa</h6>
      </div>
      <hr style={{ zIndex: -1, position: 'relative' }} />
      <div className="row">
        <div className="col-4">
          <div className="mb-3">
            <label htmlFor="inputNomeClientePesquisa" className="form-label">Pesquisar cliente</label>
            <input
              type="text"
              className="form-control"
              id="inputNomeClientePesquisa"
              placeholder="Pesquisar..."
              onChange={handleFilter}
            />
          </div>
        </div>
        {/* <div className="col">
          <div className="mb-3">
            <label htmlFor="inputNomeClientePesquisa" className="form-label">Nome</label>
            <input
              type="text"
              className="form-control"
              id="inputNomeClientePesquisa"
              placeholder="Pesquisar nome"
              value={nameFilter}
              onChange={e => setNameFilter(e.target.value)}
            />
          </div>
        </div>
        <div className="col">
          <div className="mb-3">
            <label htmlFor="inputEmailClientePesquisa" className="form-label">E-mail</label>
            <input
              type="text"
              className="form-control"
              id="inputEmailClientePesquisa"
              placeholder="Selecionar email"
              value={emailFilter}
              onChange={e => setEmailFilter(e.target.value)}
            />
          </div>
        </div>
        <div className="col">
          <div className="mb-3">
            <label htmlFor="inputCpfClientePesquisa" className="form-label">CPF</label>
            <input
              type="text"
              className="form-control"
              id="inputCpfClientePesquisa"
              placeholder="Pesquisar CPF"
              value={cpfFilter}
              onChange={e => setCpfFilter(e.target.value)}
            />
          </div>
        </div> */}
      </div>
      {/* 
      <div className="buttons d-flex justify-content-end gap-1">
        <button
          type="button"
          className="btn btn-success d-flex align-items-center"
          onClick={handleFilter}
        >
          <SearchIcon />
          Buscar
        </button>
        <button
          type="button"
          className="btn btn-danger d-flex align-items-center"
          onClick={() => {
            setNameFilter('');
            setEmailFilter('');
            setCpfFilter('');
            setBirthDateFilter('')
            setFilteredData(data);
          }}
        >
          <ClearIcon />
          Limpar
        </button>
      </div> */}
    </div>
  );
};

export default FiltersClient;
