import React, { Component } from "react";
import HelpIcon from '@material-ui/icons/Help';
import { IconButton } from "@material-ui/core";
import '../../css/pulse.css'
const PreguntasFrecuentes = () => {
  return (
    <div className="pulse">
    <IconButton
      color="primary"
      aria-label="preguntas frencuentes"
      size="medium"
    >
      <HelpIcon fontSize="large" className="iconEnlace" />
    </IconButton>
  </div>
  );
};

export default PreguntasFrecuentes;
