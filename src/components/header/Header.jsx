import React from 'react'

const Header = () => {
    return (
        <div className="col-12 p-0">
            <div id="header" className="d-flex justify-content-between align-items-center px-4 my-2">
                <a href="https://akubadaura.org" target="_blank" rel="noreferrer" className="p-0 col-xs-5 col-3 col-lg-2 w-100">
                    <img src={process.env.PUBLIC_URL + '/img/logo.png'} alt="" id="logo" className="w-100"/>
                </a>
                <div className="col-5 col-md-6 col-lg-5 text-right" id="title">SISTEMA NACIONAL DE INFORMACIÓN EN CONSULTA PREVIA, LIBRE E INFORMADA (SNICPLI)</div>
            </div>
        </div>
    )
}

export default Header
