import React from 'react';
import { Link } from 'react-router-dom';
import ErrorIcon from '@mui/icons-material/Error';

const ErrorSearch = ({ message, onCloseTo }) => {
    return (
        <>
            <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className='d-flex justify-content-center gap-1'>
                                <h3 className="">Error</h3>
                                <ErrorIcon  style={{ color: '#dc3545' }} fontSize="large" />
                            </div>
                        </div>
                        <div className="modal-body py-5">
                            <h5>{message}</h5>
                        </div>
                        <div className="modal-footer justify-content-center">
                            <Link to={onCloseTo}>
                                <button type="button" className="btn btn-danger">Fechar</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ErrorSearch;
