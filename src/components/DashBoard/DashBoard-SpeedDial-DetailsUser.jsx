import React, { useState } from 'react';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import LockIcon from '@material-ui/icons/Lock';
import axios from 'axios';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { typesDetailsProfileDashboard } from '../../types/types';


export default function DashBoardSpeedDialDetailsUser(props) {

  //props 

  const { setNewPass } = props

  //let & const 

  //useState



  //useContext

  //useEffect

  //functions

  const [open, setOpen] = React.useState(false);


  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  ///actions buttons 




  //vars and const
  const actions = [
    { icon: <SaveIcon />, name: 'Guardar Cambios', function: props.saveUser },
    { icon: <DeleteForeverIcon />, name: 'Eliminar Usuario', function: props.deleteUser },
    { icon: <LockIcon />, name: 'Cambiar Contraseña', function: props.changePass },
    { icon: <PrintIcon />, name: 'Imprimir', function: props.printUserDetails },
  ];

  return (
    <SpeedDial
      ariaLabel="DashBoardSpeedDial"
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      direction="left"
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.function}
        />
      ))}
    </SpeedDial>
  );
}
