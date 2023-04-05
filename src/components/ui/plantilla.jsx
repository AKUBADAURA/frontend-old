import React from 'react'
import Header from '../header/Header'
import NavbarApp from '../NavBar/NavbarApp'

const Plantilla = (props) => {
    return (
        <div className="row m-0">
            {props.header === false ? '' : <Header />}
            {props.navBar === false ? '' : <NavbarApp />}
            <div className="row w-100 m-0 p-0">
                {props.title
                    ? <>
                        <div className="col-12 d-flex justify-content-end mt-2  align-items-center">
                            <h3 className="m-0">{props.title}</h3>
                            {/* {props.buttonPDF} */}
                        </div>
                        <hr className="d-flex justify-content-between  align-items-center divisor"></hr>
                    </>
                    : ''}
                {props.children}
            </div>
        </div>
        // <div className="row m-0">
        //         {props.header === false ? '' : <Header />}
        //         {props.navBar === false ? '' : <NavbarApp />}
        //         <div className="row w-100 m-auto">
        //             <div className="col-12">
        //                 <div className="row">
        //                     {props.title
        //                         ? <>
        //                             <div className="col-12 d-flex justify-content-end mt-2  align-items-center">
        //                                 <h3 className="m-0">{props.title}</h3>
        //                                 {/* {props.buttonPDF} */}
        //                             </div>
        //                             <hr className="d-flex justify-content-between  align-items-center divisor"></hr>
        //                         </>
        //                         : ''}
        //                     {props.children}
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
    )
}

export default Plantilla
