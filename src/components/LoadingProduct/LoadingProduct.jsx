import React from 'react'

const LoadingProduct = () => {
    return (
        <div className='card-view-produto'>

            <div className="row">
                <div className="col-4">
                    <div className="form-group mb-3">
                        <label htmlFor="idProductView">ID:</label>
                        <input
                            id="idProductView"
                            className="form-control"
                            type="text"
                            disabled
                            value={''}
                        />
                    </div>
                </div>
                <div className="col">
                    <div className="form-group mb-3">
                        <label htmlFor="eanProdutoView">Código de barras:</label>
                        <input
                            id="eanProdutoView"
                            className="form-control"
                            type="text"
                            disabled
                            value={''}
                        />
                    </div>
                </div>
            </div>


            <div className="row">

                <div className="col">
                    <div className="form-group mb-3">
                        <label htmlFor="nomeProdutoView">Nome:</label>
                        <input
                            id="nomeProdutoView"
                            className="form-control"
                            type="text"
                            disabled
                            value={''}
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
                            disabled
                            value={''}
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
                            disabled
                            value={''}
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
                            disabled
                            value={''}
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
                            disabled
                            value={''}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoadingProduct