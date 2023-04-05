import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@material-ui/core'
import { IndexContext } from '../../context/IndexContext';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function ModalIndex(props) {
  //vars and const
  const itemsModal = [
    {
      name: "slide 0",
      src: '/img/Frame0a.png'
    },
    {
      name: "slide 1",
      src: '/img/Frame1a.png'
    },
    {
      name: "slide 2",
      src: '/img/Frame2a.png'
    },
    {
      name: "slide 3",
      src: '/img/Frame3a.png'
    },
    {
      name: "slide 4",
      src: '/img/Frame4a.png'
    },
    {
      name: "slide 5",
      src: '/img/Frame5a.png'
    },
    {
      name: "slide 6",
      src: '/img/Frame6a.png'
    },
    {
      name: "slide 7",
      src: '/img/Frame7a.png'
    },
    {
      name: "slide 8",
      src: '/img/Frame8a.png'
    }

  ]
  //usestyle
  const classes = useStyles();
  //usecontext
  const { openModalIndex, setOpenModalIndex } = useContext(IndexContext)
  //usestate
  const [state, setState] = useState({
    autoPlay: true,
    animation: "fade",
    indicators: true,
    timeout: 800,
    navButtonsAlwaysVisible: false,
    navButtonsAlwaysInvisible: false,
    stopAutoPlayOnHover: true,
    interval: 4000
  })
  //useEffect
  useEffect(() => {

    if (props.origin) {
      if (props.origin.from === "emailVerified") {
        setOpenModalIndex(false)
      }
    }
    else {
      setOpenModalIndex(true) 
    }
  }, [])
  //functions
  const handleClose = () => {
    setOpenModalIndex(false);
  };
  //components
  function Items(props) {
    return (
      <Paper
        className="item p-0"
        style={{
          backgroundColor: "primary"
        }}
        elevation={10}
      >
        <img className="w-100" src={`${process.env.PUBLIC_URL}${props.item.src}`} alt={props.item.name ? props.item.name : 'presentation'} />
      </Paper>
    )
  }

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModalIndex}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModalIndex}>
          <div >
            <Carousel
              className="SecondExample"
              autoPlay={state.autoPlay}
              animation={state.animation}
              indicators={state.indicators}
              timeout={state.timeout}
              navButtonsAlwaysVisible={state.navButtonsAlwaysVisible}
              navButtonsAlwaysInvisible={state.navButtonsAlwaysInvisible}
            >
              {
                itemsModal.map((item, index) => {
                  return <Items item={item} key={index} />
                })
              }
            </Carousel>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
