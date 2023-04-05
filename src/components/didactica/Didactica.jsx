import React, { useState } from "react";
import Header from "../header/Header";
import NavbarApp from "../NavBar/NavbarApp";
import "../../css/didactica.css";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Paper from "@material-ui/core/Paper";
import { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import SlideshowIcon from "@material-ui/icons/Slideshow";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import PermMediaIcon from "@material-ui/icons/PermMedia";
import Item from "./item";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    width: "100%",
    fontSize: "large",
  },
  rootPaper: {
    flexGrow: 1,
    maxWidth: "100%",
  },
});

const Didactica = () => {
  //usestyles
  const classes = useStyles();
  //vars and const
  const url = process.env.REACT_APP_BACKEND_API_URL;
  //usecontext
  
  //useState
  const [value, setValue] = React.useState("todo");

  const [items, setItems] = useState([]);

  //useEffect
  // useEffect(() => {
  //   getDidacticas('todo');
  //   return () => { };
  // }, []);

  useEffect(() => {
    getDidacticas(value)
    return () => {
    }
  }, [value])
  


  //functions
  const handleChange =  (event, newValue) => {
    console.log('change tab ', newValue)
    setValue(newValue);
  };
  const getDidacticas = async (tabValue) => {
    try {
      if (tabValue === 'todo') {
        const response = await axios.get(
          `${url}/didacticas?filter[order]=publishedAt%20DESC`
        );
        setItems(response.data);
      }
      if (tabValue === 'videoLibreria') {
        console.log('in video')
        const responseA = await axios.get(
          `${url}/didacticas?filter[where][type]=youtube&filter[order]=publishedAt%20DESC`
        );
        const responseB = await axios.get(
          `${url}/didacticas?filter[where][type]=video&filter[order]=publishedAt%20DESC`
        );
        const response = responseA.data.concat(responseB.data)
        console.log('response: ', response )

        setItems(response);
      }
      if (tabValue === 'publicaciones') {
        const responseA = await axios.get(
          `${url}/didacticas?filter[where][type]=doc&filter[order]=publishedAt%20DESC`
        );
        const responseB = await axios.get(
          `${url}/didacticas?filter[where][type]=PDF&filter[order]=publishedAt%20DESC`
        );
        const response = responseA.data.concat(responseB.data)
        console.log('response: ', response )
        setItems(response);
      }
      if (tabValue === 'materialDidactico') {
        const responseA = await axios.get(
          `${url}/didacticas?filter[where][type]=audio&filter[order]=publishedAt%20DESC`
        );
        const responseB = await axios.get(
          `${url}/didacticas?filter[where][type]=image&filter[order]=publishedAt%20DESC`
        );
        const response = responseA.data.concat(responseB.data)
        console.log('response: ', response )
        setItems(response);
      }
    } catch (e) {
      alert(`${e.message}`);
    }
  };

  return (
    <div className="row m-0">
      <Header />
      <NavbarApp />
      <div className="col-12 mt-1">
        <div className="row">
          <div className="col-12 d-flex justify-content-between mt-1 align-items-center">
            <h3 className="m-0">Didáctica</h3>
          </div>
          <hr className="d-flex justify-content-between mt-1 align-items-center divisor"></hr>
          <div className="col-12">
            <img
              className="w-100"
              src="img/backgroundDidactica.png"
              alt="background secion didactica"
            />
          </div>
          <Typography
            className="col-12 my-4 h6"
            align="justify"
            variant="body2"
            color="textSecondary"
            component="p"
          >
            Encuentre videos, publicaciones y material didáctico sobre la
            consulta previa.
            <br />
            Navegue a través de las diferentes categorías para ir conociendo el
            material en orden cronológico.
          </Typography>

          <div className="col-12">
            <Paper square className={classes.rootPaper + " row"}>
              <BottomNavigation
                value={value}
                onChange={handleChange}
                className={classes.root}
              >
                <BottomNavigationAction
                  fontSize="large"
                  label="Todo el contenido"
                  value="todo"
                  icon={<DoneAllIcon />}
                />
                <BottomNavigationAction
                  fontSize="large"
                  label="Videolibrería"
                  value="videoLibreria"
                  icon={<VideoLibraryIcon />}
                />
                <BottomNavigationAction
                  fontSize="large"
                  label="Publicaciones"
                  value="publicaciones"
                  icon={<SlideshowIcon />}
                />
                <BottomNavigationAction
                  fontSize="large"
                  label="Más Material Didáctico"
                  value="materialDidactico"
                  icon={<PermMediaIcon />}
                />
              </BottomNavigation>
              {items.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="containerItem col-6 mb-2 justify-content-center"
                  >
                    <Item item={item} />
                  </div>
                );
              })}
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Didactica;
