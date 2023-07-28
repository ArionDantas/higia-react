import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
// import { useState } from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import $ from "jquery";

const FiltersClient = () => {

  const handleFilter = () => {

    $(document).ready(function () {
      $("#inputNomeProdutoPesquisa").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#listagem-produtos tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
  };

  return (
    <div className="filters px-2 py-3 rounded">
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
              id="inputNomeProdutoPesquisa"
              placeholder="Pesquisar..."
              onChange={handleFilter}
            />
          </div>
        </div>
        {/* <div className="col">
          <div className="mb-3">
            <label htmlFor="inputEanProductPesquisa" className="form-label">Código de barras</label>
            <input
              type="number"
              className="form-control"
              id="inputEanProductPesquisa"
              placeholder="Pesquisar código de barras"
              value={eanFilter}
              onChange={e => setEanFilter(e.target.value)}
            />
          </div>
        </div>
        <div className="col">
          <div className="mb-3">
            <label htmlFor="inputNomeProdutoPesquisa" className="form-label">Nome</label>
            <input
              type="text"
              className="form-control"
              id="inputNomeProdutoPesquisa"
              placeholder="Pesquisar nome"
              value={nameFilter}
              onChange={e => setNameFilter(e.target.value)}
            />
          </div>
        </div>
        <div className="col">
          <div className="mb-3">
            <label htmlFor="inputTipoProdutoPesquisa" className="form-label">Tipo</label>
            <input
              type="text"
              className="form-control"
              id="inputTipoProdutoPesquisa"
              placeholder="Pesquisar tipo"
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
            />
          </div>
        </div> */}
      </div>
      {/* <div className="row">
        <div className="col-3">
          <div className="mb-3">
            <label htmlFor="inputDescricaoProdutoPesquisa" className="form-label">Descrição</label>
            <input
              type="text"
              className="form-control"
              placeholder="Pesquisar descrição"
              id="inputDescricaoProdutoPesquisa"
              value={descriptionFilter}
              onChange={e => setTypeFilter(e.target.value)}
            />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default FiltersClient;
