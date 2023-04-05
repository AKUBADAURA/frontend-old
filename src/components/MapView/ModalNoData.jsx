import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    //minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
}));

export default function ModalNoData() {
  //usestyle
  const classes = useStyles();
  //usecontext
  //usestate
  const [openModalNoData, setOpenModalNoData] = useState(true)
  //useEffect
  useEffect(() => {
    setOpenModalNoData(true)
  }, [])
  //functions
  const handleClose = () => {
    setOpenModalNoData(false);
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModalNoData}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModalNoData}>
          <Paper elevation={3}>
            <Card className={classes.root}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Sin Datos
                </Typography>
              </CardContent>
            </Card>
          </Paper>
        </Fade>
      </Modal>
    </>
  );
}
