import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import SelectFunction from "../../logic/SelectFunction";
import Header from "../header/Header";
import NavbarApp from "../NavBar/NavbarApp";

import { Send } from "@material-ui/icons";
import { Button, TextField, Typography } from "@material-ui/core";
import { typesContacto } from "../../types/types";
import './../../css/contacto.css'
const Contact = () => {
  //vars & const
  const url = process.env.REACT_APP_BACKEND_API_URL;
  let config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("JWT")}` },
  };

  //useStyles

  //useState
  const [redirect, setRedirect] = useState(false);
  const [contacto, setContacto] = useState(typesContacto);

  //useContext

  //useEffect
  useEffect(() => {
    console.log('contacto:', contacto);
    return () => {
    }
  }, [contacto])

  useEffect(() => {
    console.log('inicio')
    return () => {
    }
  }, [])



  //functions
  const saveNewContact = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${url}/contacto`, contacto, config);
      setRedirect(true);
      alert("Registro de formulario de contacto hecho con éxito");
    } catch (error) {
      alert('Error al generar el registro de contacto, verifique su conexión a internet e inténtelo de nuevo.')
      console.log('error: ', error)
      console.log("An error occurred:", error.response);
    }
  };

  const handleChangeNewContacto = (e) => {
    e.persist();
    setContacto({
      ...contacto,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="row m-0">
      <Header />
      <NavbarApp />
      {redirect === true ? <Redirect to="/home" /> : ""}
      <div id="contactoCreate" className="col-12 ">
        <form className="row card-body" id="formContactoCreate">
          <div className="row d-flex justify-content-between">
            <div className="col-12 d-flex justify-content-between mt-2 align-items-center">
              {/* <h3 className="m-0"></h3> */}
              <Typography
                // className="col-12 my-4 h6"
                align="justify"
                variant="body2"
                color="textSecondary"
                component="p"
              >
                Cuéntenos su caso sobre consulta previa, consultenos, comparta o solicite información.
                <br />
                Pronto estaremos en contacto.
              </Typography>
              <Button
                variant="contained"
                color="default"
                startIcon={<Send />}
                onClick={saveNewContact}
              >
                Enviar formulario
              </Button>
            </div>
            <hr className="d-flex justify-content-between mt-5 align-items-center divisor"></hr>

            <div className="col-12 d-flex justify-content-between">
              <div className="col-8">
                <div className="row d-flex justify-content-between">
                  <div className="col-12 form-group ">
                    <TextField
                      className="w-100"
                      id="outlined-textarea"
                      label="Nombre Completo"
                      onChange={handleChangeNewContacto}
                      name="nombres"
                      value={contacto.nombres ? contacto.nombres : ""}
                      multiline
                      variant="outlined"
                    />
                  </div>
                  <div className="col-12 form-group ">
                    <TextField
                      className="w-100"
                      id="outlined-textarea"
                      label="Email"
                      onChange={handleChangeNewContacto}
                      name="email"
                      value={contacto.email ? contacto.email : ""}
                      multiline
                      variant="outlined"
                    />
                  </div>
                  <div className="col-12 form-group  ">
                    <SelectFunction
                      nameShow="Tipo de Identificación"
                      nameSelect="tipoIdentificacion"
                      urlSelect="tipo-documento"
                      value={contacto.tipoIdentificacion}
                      setObject={setContacto}
                      object={contacto}
                    />
                  </div>
                  <div className="col-12 form-group ">
                    <TextField
                      className="w-100"
                      id="outlined-textarea"
                      label="Número de Identificación"
                      onChange={handleChangeNewContacto}
                      name="numeroIdentificacion"
                      value={
                        contacto.numeroIdentificacion
                          ? contacto.numeroIdentificacion
                          : ""
                      }
                      multiline
                      variant="outlined"
                    />
                  </div>
                  <div className="col-12 form-group ">
                    <TextField
                      className="w-100"
                      id="outlined-textarea"
                      label="Organización o Entidad"
                      onChange={handleChangeNewContacto}
                      name="organizacion"
                      value={contacto.organizacion ? contacto.organizacion : ""}
                      multiline
                      variant="outlined"
                    />
                  </div>
                  <div className="col-12 form-group ">
                    <TextField
                      className="w-100"
                      id="outlined-textarea"
                      label="Cargo"
                      onChange={handleChangeNewContacto}
                      name="cargo"
                      value={contacto.cargo ? contacto.cargo : ""}
                      multiline
                      variant="outlined"
                    />
                  </div>
                  <div className="col-12 form-group ">
                    <TextField
                      className="w-100"
                      id="outlined-textarea"
                      label="Pueblo Étnico (opcional)"
                      onChange={handleChangeNewContacto}
                      name="puebloEtnico"
                      value={contacto.puebloEtnico ? contacto.puebloEtnico : ""}
                      multiline
                      variant="outlined"
                    />
                  </div>
                  <div className="col-12 form-group  ">
                    <SelectFunction
                      nameShow="Departamento"
                      nameSelect="departamento"
                      urlSelect="departamento"
                      value={contacto.departamento}
                      setObject={setContacto}
                      object={contacto}
                    />
                  </div>
                  <div className="col-12 form-group  ">
                    <SelectFunction
                      nameShow="Municipio"
                      nameSelect="municipio"
                      urlSelect="municipio"
                      value={contacto.municipio}
                      setObject={setContacto}
                      object={contacto}
                    />
                  </div>
                  <div className="col-12 form-group ">
                    <TextField
                      className="w-100"
                      id="outlined-textarea"
                      label="Telefono (opcional)"
                      onChange={handleChangeNewContacto}
                      name="telefono"
                      value={contacto.telefono ? contacto.telefono : ""}
                      multiline
                      variant="outlined"
                    />
                  </div>
                  <div className="col-12 form-group ">
                    <TextField
                      className="w-100"
                      id="outlined-textarea"
                      label="Barrio o Vereda"
                      onChange={handleChangeNewContacto}
                      name="barrio"
                      value={contacto.barrio ? contacto.barrio : ""}
                      multiline
                      variant="outlined"
                    />
                  </div>
                  <div className="col-12 form-group  ">
                    <SelectFunction
                      nameShow="Asunto"
                      nameSelect="categoria"
                      urlSelect="categoria-contacto"
                      value={contacto.categoria}
                      setObject={setContacto}
                      object={contacto}
                    />
                  </div>
                  <div className="col-12 form-group ">
                    <TextField
                      className="w-100"
                      id="outlined-textarea"
                      label="Mensaje"
                      onChange={handleChangeNewContacto}
                      name="mensaje"
                      value={contacto.mensaje ? contacto.mensaje : ""}
                      multiline
                      variant="outlined"
                    />
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="row d-flex justify-content-between containerContactoSiteB">

                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
