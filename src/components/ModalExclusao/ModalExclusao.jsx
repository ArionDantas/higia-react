import React from 'react';

const ModalExclusaoUsuario = ({who, text, show, onClose, onConfirm, id }) => {

  const modalStyle = {
    display: show ? 'block' : 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
  };

  return (
    <div className={`modal ${show ? 'show' : ''}`} style={modalStyle}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Excluir {who}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p className='text-start py-3'>{text}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Fechar
            </button>
            <button type="button" className="btn btn-danger" onClick={onConfirm}>
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalExclusaoUsuario;
