import React from 'react'

const LoadingClient = () => {
    return (
        <div className='card-view-client'>
            <div className="row">
                <div className="col-4">
                    <div className="form-group mb-3">
                        <label htmlFor="firstName">Nome:</label>
                        <input
                            id="firstName"
                            className="form-control"
                            type="text"
                            disabled
                            value={''}
                        />
                    </div>
                </div>

                <div className="col">
                    <div className="form-group mb-3">
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            id="lastName"
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
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            className="form-control"
                            type="email"
                            disabled
                            value={''}
                        />
                    </div>
                </div>

                <div className="col">
                    <div className="form-group mb-3">
                        <label htmlFor="cpf">CPF:</label>
                        <input
                            id="cpf"
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
                        <label htmlFor="password">Password:</label>
                        <input
                            id="password"
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
                        <label htmlFor="phone">Phone:</label>
                        <input
                            id="phone"
                            className="form-control"
                            type="text"
                            disabled
                            value={''}
                        />
                    </div>
                </div>

                <div className="col">
                    <div className="form-group mb-3">
                        <label htmlFor="birthDate">Birth Date:</label>
                        <input
                            id="birthDate"
                            className="form-control"
                            type="text"
                            disabled
                            value={''}
                        />
                    </div>
                </div>
            </div>

            <div className="row">

                <div className="col-md-6">
                    <div className="form-group mb-3">
                        <label htmlFor="isActive">Is Active:</label>
                        <input
                            id="isActive"
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

export default LoadingClient