import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUsers } from '@fortawesome/free-solid-svg-icons';
import '../../css/home.css';


import {PeopleAlt, Visibility, LocationSearching, MenuBook, List, LiveHelp } from '@material-ui/icons';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';



const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
    })((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
        }}
        transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function MenuSomos(props) {
    //usecontext
    //usestate
    const [anchorEl, setAnchorEl] = React.useState(null);
    //useEffect
    //functions

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div onClick={handleClick} className="itemsNav nav-link nav-item" role="button"> 
                <FontAwesomeIcon icon={faUsers} />
                <span className="titleNavBar"> NOSOTROS</span>
            </div>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Link to='/somos'>
                    <StyledMenuItem>
                            <ListItemIcon>
                                <PeopleAlt fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Somos" />
                    </StyledMenuItem>
                </Link>
                <Link to="/vision">
                    <StyledMenuItem>
                        <ListItemIcon>
                            <Visibility fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Visión" />
                    </StyledMenuItem>
                </Link>
                <Link to="/mision">
                    <StyledMenuItem>
                        <ListItemIcon>
                            <LocationSearching fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Misión" />
                    </StyledMenuItem>
                </Link>
                <Link to="/historia">
                    <StyledMenuItem>
                        <ListItemIcon>
                            <MenuBook fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Historia" />
                    </StyledMenuItem>
                </Link>
                <Link to="/principios">
                    <StyledMenuItem>
                        <ListItemIcon>
                            <List fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Principios" />
                    </StyledMenuItem>
                </Link>
                <Link to="/preguntas-frecuentes">
                    <StyledMenuItem>
                        <ListItemIcon>
                            <LiveHelp fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Preguntas Frecuentes" />
                    </StyledMenuItem>
                </Link>
            </StyledMenu>
        </>
    );
}
