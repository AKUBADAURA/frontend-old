import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function NativeSelects(props) {
   //useStyles
   const classes = useStyles();

   //UseState
   const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });
  
   //console.log(props)
   const [loading, setLoading] = useState(true);
   const [items, setItems] = useState([]);
   const [value, setValue] = useState({});
 
   //Const & lets
   const url= process.env.REACT_APP_BACKEND_API_URL
   let config ={
     headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
   }
   let unmounted;
   let response;
   //UseEffect
    useEffect(() => {
        unmounted = false;
        getCharacters();
        return () => {
        unmounted = true;
        };
    }, []);

    useEffect(() => {
        setValue(props.value)
    }, [props.value])
 
   //functions
    const getCharacters=async()=> {
        //ordenar elementos alfabeticamente -excepcion al caso
        if (props.urlSelect==="municipio") {
        response = await axios.get(`${url}/${props.urlSelect}?filter[order]=name%20ASC`, config)
        }
        else {
        response = await axios.get(`${url}/${props.urlSelect}`, config)
        }
        ////////////////////////////////////////////////////////////

        if (!unmounted) {
        setItems(
            response.data.map((item) => ({ label: item.name, value: {"id":item.id, "name":item.name} }))          
            );                
        setLoading(false);
        }
    }

    const handleChange = (e) => {
        e.persist();
        setValue(e.currentTarget.value)
        props.setObject({            
          ...props.object,[props.nameSelect]:e.currentTarget.value
        })

        // const name = event.target.name;
        // setState({
        // ...state,
        // [name]: event.target.value,
        // });
    };


  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor={props.nameSelect}>{props.nameShow}</InputLabel> 
        <NativeSelect
            disabled={(props.disabled===true||loading===true)?true:false}
            value={props.value}
            onChange={handleChange}
            inputProps={{
                name: props.nameSelect,
                id: props.nameSelect,
                className: "selectFunction"
            }}
        >
          <option aria-label="None" value="" />
          {items.map(({ label, value }) => (
            <option key={value.id} value={value.name} name={value.name}>
              {label}
            </option>
          ))} 
        </NativeSelect>
        <FormHelperText>{props.helperText?props.helperText:''}</FormHelperText>
      </FormControl>
    </div>
  );
}
