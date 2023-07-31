import ClearIcon from '@mui/icons-material/Clear';
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
      </div>
    </div>
  );
};

export default FiltersClient;
