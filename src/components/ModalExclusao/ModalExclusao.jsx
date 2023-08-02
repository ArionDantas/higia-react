import React from 'react';

const ModalExclusaoUsuario = ({who, text, show, onClose, id }) => {

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

  const deleteProduct = async (productId) => {
    console.log(productId);
    
    try {
        const url = `https://api-farmacia-higia-java-d263a377630d.herokuapp.com/products/${productId}`;

        const response = await axios.delete(url);

        if (response.status === 200) {
            console.log('Produto excluído com sucesso!');
        }
    } catch (error) {
        console.error('Erro ao excluir o produto:', error);
    }

    window.location.reload(true)

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
            <button type="button" className="btn btn-danger" onClick={deleteProduct(id)}>
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalExclusaoUsuario;
