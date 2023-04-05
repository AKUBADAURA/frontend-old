import { Button, Fade, Modal, TextField } from "@material-ui/core";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import axios from "axios";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import SelectFunction from "../../logic/SelectFunction";
import SaveIcon from "@material-ui/icons/Save";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@material-ui/lab";
import EditIcon from "@material-ui/icons/Edit";
import PostAddIcon from "@material-ui/icons/PostAdd";
import RadioButtonsGroup from "../../logic/RadioButtonsGroup";
import { Edit } from "@material-ui/icons";
import CustomGridPanel from "../../logic/CustomGridPanel";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import RolValidation from "../../logic/RolValidation";
import {
  columnsDidactica,
  typesRegistroDidactica,
  typesOptionsCategoriaDidactica,
} from "../../types/types";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 380,
    transform: "translateZ(0px)",
    flexGrow: 1,
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const DashboardDidactica = () => {
  //Vars and const
  const url = process.env.REACT_APP_BACKEND_API_URL;
  let config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("JWT")}`,
      'Access-Control-Allow-Origin': '*',
      'origin':'x-requested-with',
      'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
      'Content-Type': 'application/json',
    },
  };

  //useStyles

  const classes = useStyles();

  //usestate
  const [selectedFile, setSelectedFile] = useState();
  const [openSpeedDial, setOpenSpeedDial] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [registrosDidactica, setRegistrosDidactica] = useState([]);
  const [registroDidactica, setRegistroDidactica] = useState(
    typesRegistroDidactica
  );
  const [
    openModalDetailregistroDidactica,
    setOpenModalDetailregistroDidactica,
  ] = useState(false);
  const [typeRegistroDidactica, setTypeRegistroDidactica] = useState("new");
  //useeffect
  useEffect(() => {
    getRegistrosDidactica();
  }, []);

  useEffect(() => {
    console.log("registrosDidactica", registrosDidactica);
  }, [registrosDidactica]);

  useEffect(() => {
    console.log("registroDidactica: ", registroDidactica);
  }, [registroDidactica]);

  //functions
  const newRegister = () => {
    console.log("new register");
    setRegistroDidactica(typesRegistroDidactica);
    setTypeRegistroDidactica("new");
    handleOpenModalDetailregistroDidactica();
  };

  const handleVisibility = () => {
    setHidden((prevHidden) => !prevHidden);
  };

  const handleOpenSpeedDial = () => {
    setOpenSpeedDial(true);
  };

  const handleCloseSpeedDial = () => {
    setOpenSpeedDial(false);
  };

  const handleOpenModalDetailregistroDidactica = () => {
    setOpenModalDetailregistroDidactica(true);
  };
  const handleCloseModalDetailregistroDidactica = () => {
    setOpenModalDetailregistroDidactica(false);
  };

  const detailsregistroDidactica = (GridCellParams) => {
    setTypeRegistroDidactica("edit");
    setRegistroDidactica(GridCellParams.row);
    handleOpenModalDetailregistroDidactica();
  };
  const getRegistrosDidactica = async () => {
    try {
      const response = await axios.get(`${url}/didacticas`, config);
      //const response = await axios.get(`${url}/poa?filter=%7B%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22ownerId%22%3A%20%22${usuario.id}%22%0A%20%20%7D%0A%7D`,config)
      setRegistrosDidactica(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const saveNewRegistroDidactica = async (e) => {
    e.preventDefault();
    try {
      if (registroDidactica.type === "video" || registroDidactica.type === "image" || registroDidactica.type === "audio" || registroDidactica.type === "PDF" || registroDidactica.type === "doc") {
        const formData = new FormData(selectedFile.target.form);
        await axios.post(`${url}/files`, formData);
      }
      await axios.post(`${url}/didacticas`, registroDidactica, config);
      alert("Nuevo registro almacenado con éxito");
      await getRegistrosDidactica();
      handleCloseModalDetailregistroDidactica();
    } catch (error) {
      alert(`Error al guardar el registro, verifique los campos e inténtelo de nuevo.`)
    }
  };

  const deleteNewRegistroDidactica = async (e) => {
    e.preventDefault();
    try {
      if (window.confirm("¿Estás seguro de eliminar el registro?")) {
        await axios.delete(`${url}/didacticas/${registroDidactica.id}`, config);
        await getRegistrosDidactica();
        handleCloseModalDetailregistroDidactica();
        alert("Elemento eliminado con éxito");
      }
    } catch (error) {
      console.log("No pudo eliminarse el registro con éxito");
      console.log("An error occurred:", error.response);
    }
  };

  const saveEditRegistroDidactica = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `${url}/didacticas/${registroDidactica.id}`,
        registroDidactica,
        config
      );
      alert("Cambios almacenados con éxito");
      await getRegistrosDidactica();
      handleCloseModalDetailregistroDidactica();
    } catch (error) {
      console.log("An error occurred:", error.response);
    }
  };

  const seeRegisterIndex = () => {
    alert("De doble click sobre la fila del registro de interes");
  };

  const handleChangeEvent = (e) => {
    e.persist();
    setRegistroDidactica({
      ...registroDidactica,
      [e.target.name]: e.target.value,
    });
  };

  const settingFile = (e) => {
    setRegistroDidactica({
      ...registroDidactica,
      resource: `${url}/files/${e.target.files[0].name}`,
    });
    setSelectedFile(e); //almacena file en state de manera temporal
  };

  const actionsDidactica = [
    {
      icon: <PostAddIcon />,
      name: "Crear Registro Nuevo",
      function: newRegister,
    },
    {
      icon: <Edit />,
      name: "Ver detalles de un Registro",
      function: seeRegisterIndex,
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        className={classes.speedDial}
        hidden={hidden}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        onClose={handleCloseSpeedDial}
        onOpen={handleOpenSpeedDial}
        open={openSpeedDial}
      >
        {actionsDidactica.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.function}
          />
        ))}
      </SpeedDial>
      <DataGrid
        columns={columnsDidactica}
        rows={registrosDidactica}
        pageSize={10}
        onRowDoubleClick={(GridCellParams) =>
          detailsregistroDidactica(GridCellParams)
        }
        autoHeight={true}
        density={"compact"}
        components={{
          Toolbar: GridToolbar,
          Panel: CustomGridPanel,
        }}
      //autoPageSize={true}
      />
      {/* -------------------------------- MODAL DETAILS REGISTRO NOTICIAS CPLI INDEX -------------------------------- -------------------------------- */}
      <div id="modalDetailregistroDidactica">
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          //className={classes.modal}
          className="overflow-auto w-100 mx-auto"
          open={openModalDetailregistroDidactica}
          onClose={handleCloseModalDetailregistroDidactica}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModalDetailregistroDidactica}>
            <div className={classes.paper}>
              <div
                className="row d-flex- justify-content-between"
                id="modalDetailRegistroDidactica"
                data-spy="scroll"
              >
                <div className="col-12 d-flex justify-content-between mx-2 align-items-center">
                  {typeRegistroDidactica === "new" ? (
                    <h3 className="m-0 col-7">Nuevo registro</h3>
                  ) : (
                    <h3 className="m-0 col-7">Detalles del registro</h3>
                  )}
                  <div className="col-5">
                    {RolValidation([7, 8]) &&
                      typeRegistroDidactica !== "new" ? (
                      <Button
                        onClick={deleteNewRegistroDidactica}
                        variant="contained"
                        color="secondary"
                        size="small"
                        className={classes.button + " mr-2"}
                        startIcon={<DeleteForeverIcon />}
                      >
                        Eliminar
                      </Button>
                    ) : (
                      ""
                    )}
                    <Button
                      onClick={
                        typeRegistroDidactica === "new"
                          ? saveNewRegistroDidactica
                          : saveEditRegistroDidactica
                      }
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.button}
                      startIcon={<SaveIcon />}
                    >
                      Guardar cambios
                    </Button>
                  </div>
                </div>
                <hr className="d-flex justify-content-between align-items-center divisor"></hr>
                <div className="col-12">
                  <div className="row">
                    <div className="col-6 form-group ">
                      <label htmlFor="title">Título</label>
                      <TextField
                        className="w-100"
                        id="outlined-textarea"
                        label=""
                        name="title"
                        onChange={handleChangeEvent}
                        value={
                          registroDidactica.title ? registroDidactica.title : ""
                        }
                        multiline
                        variant="outlined"
                      />
                    </div>
                    <div className="col-6 form-group">
                      <label htmlFor="">Tipo</label>
                      <SelectFunction
                        nameShow=""
                        nameSelect="type"
                        urlSelect="tipo-didacticas"
                        //controller="POA"
                        value={
                          registroDidactica.type ? registroDidactica.type : ""
                        }
                        setObject={setRegistroDidactica}
                        object={registroDidactica}
                      />
                    </div>
                    <div className="col-6 form-group ">
                      <label htmlFor="description">Descripción</label>
                      <TextField
                        className="w-100"
                        id="outlined-textarea"
                        label=""
                        name="description"
                        onChange={handleChangeEvent}
                        value={
                          registroDidactica.description
                            ? registroDidactica.description
                            : ""
                        }
                        multiline
                        variant="outlined"
                      />
                    </div>
                    <div className="col-6 form-group ">
                      <label htmlFor="publishedAt">Fecha de Publicación</label>
                      <TextField
                        className="w-100"
                        id="date"
                        type="date"
                        label=""
                        name="publishedAt"
                        onChange={handleChangeEvent}
                        value={
                          registroDidactica.publishedAt
                            ? registroDidactica.publishedAt
                            : ""
                        }
                      />
                    </div>
                    <div className="col-6 form-group ">
                      <label htmlFor="author">Autor</label>
                      <TextField
                        className="w-100"
                        id="outlined-textarea"
                        label=""
                        name="author"
                        onChange={handleChangeEvent}
                        value={
                          registroDidactica.author
                            ? registroDidactica.author
                            : ""
                        }
                        multiline
                        variant="outlined"
                      />
                    </div>
                    {registroDidactica.type === "youtube" ? (
                      <div className="col-6 form-group ">
                        <label htmlFor="resource">Recurso</label>
                        <TextField
                          className="w-100"
                          id="outlined-textarea"
                          label=""
                          name="resource"
                          onChange={handleChangeEvent}
                          value={
                            registroDidactica.resource
                              ? registroDidactica.resource
                              : ""
                          }
                          multiline
                          variant="outlined"
                        />
                      </div>
                    ) : null}
                    {registroDidactica.type === "video" ||
                      registroDidactica.type === "image" ||
                      registroDidactica.type === "audio" ||
                      registroDidactica.type === "PDF" ||
                      registroDidactica.type === "doc" ? (
                      <form className="col-6 form-group">
                        <label htmlFor="resource">Selecciona el anexo: </label>
                        <br />
                        <input
                          id="resource"
                          name="resource"
                          type="file"
                          onChange={settingFile}
                        />
                      </form>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default DashboardDidactica;
