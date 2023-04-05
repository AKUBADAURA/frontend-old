import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';

//config themes and another
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};




function getStyles(item, selectItems, theme) {
  return {
    fontWeight:
      selectItems.indexOf(item) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SelectMultipleFunction(props) {

  //useStyles & useTheme
  const classes = useStyles();
  const theme = useTheme();

  //lets & Const
  const url= process.env.REACT_APP_BACKEND_API_URL
  let config ={
    headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
  }
  let unmounted;
  let response;

  //useState
  const [loading, setLoading] = useState(true);
  const [selectItems, setSelectItems] = React.useState([]);
  const [items, setItems] = useState([]);

  //useEffect
  React.useEffect(() => {
    unmounted = false;
    getElements();
    return () => {
      unmounted = true;
    };
  }, []);


  //functions
  const getElements=async()=> {
    response = await axios.get(`${url}/${props.urlSelect}`, config)
    if (!unmounted) {
      setItems(
        response.data.map((item) => ({ label: item.name, value: {"id":item.id, "name":item.name} }))          
        );                
      setLoading(false);
    }
  }

  const handleChange = (event) => {
    setSelectItems(event.target.value);
    handleChangeSelect(event)
  };

  const handleChangeSelect=(e)=>{
    e.persist();
      props.setObject({            
        ...props.object,[props.nameSelect]:e.target.value
    }) 
  }

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSelectItems(value);
  };

  return (
    <div>
      <FormControl className={classes.formControl} className="w-100">
        <InputLabel htmlFor={props.nameSelect}>{props.nameShow}</InputLabel>
        <Select
          disabled={(props.disabled===true||loading===true)?true:false}
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={selectItems}
          onChange={(e)=>handleChange(e)}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {items.map((item) => (
            <MenuItem key={item.value.id} value={item.value.name} style={getStyles(item, selectItems, theme)}>
              {item.value.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

//IMPLEMENTATION
//Example
//<SelectMultipleFunction nameSelect="pine" nameShow= "" urlSelect="pine" controller="POA"/>