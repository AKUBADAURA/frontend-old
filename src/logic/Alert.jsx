import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import { Alert as AlertMU } from '@material-ui/lab';


function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function Alert(props) {


  const [state, setState] = React.useState({
    open: true,
    Transition: Fade,
  });

  const handleClick = (Transition) => () => {
    setState({
      open: true,
      Transition,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };



  return (
    <div>
      {/* <Button onClick={handleClick(SlideTransition)}>Slide Transition</Button> */}
      <Snackbar  open={props.state || false} /* open={state.open} */ TransitionComponent={state.Transition}   key={state.Transition.name} autoHideDuration={props.time?props.time:5000} onClose={handleClose}  >
        <AlertMU /* onClose={handleClose}  */severity={props.severity || "info"}>
          {props.message}
          </AlertMU>
      </Snackbar>
    </div>
  );
}

//implementation



