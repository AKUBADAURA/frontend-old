import React, {  useEffect, useState } from "react";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

//useStyles

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectFunction(props) {
  //useStyles
  const classes = useStyles();

  //UseState
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
  // let responseDepartamento;
  //UseEffect
  React.useEffect(() => {
    console.log('oprops: ', props)
    unmounted = false;
    getCharacters();
    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    console.log('props: ', props)
  
    return () => {
      
    }
  }, [props])
  

  // useEffect(() => {
  //   unmounted = false;
  //   getCharacters();
  //   return () => {
  //     unmounted = true;
  //   }
  // }, [props.object.departamento])

  //functions
  const getCharacters=async()=> {

    //ordenar elementos alfabeticamente -excepcion al caso implementación antigua con selects Departamento y municipio 
    // if (props.urlSelect==="municipio" && props.object.departamento!=='' && props.object.departamento ) {
    //   responseDepartamento = await axios.get(`${url}/departamento?filter[where][name]=${props.object.departamento}`)  
    //   response = await axios.get(`${url}/departamentos/${responseDepartamento.data[0].id}/municipios?filter[order]=name%20ASC`)
    //   console.log('response: ', response)
    // }
    // else if (props.urlSelect==="municipio" && (!props.object.departamento || props.object.departamento==='')) {   
    //   console.log('dentro del else if') 
    //   response = await axios.get(`${url}/${props.urlSelect}?filter[order]=name%20ASC`)
    // }
    // else {
    //   console.log('dentro del else') 
    //   response = await axios.get(`${url}/${props.urlSelect}`, config)
    // }

    response = await axios.get(`${url}/${props.urlSelect}`, config)

    ////////////////////////////////////////////////////////////

    if (!unmounted) {
      setItems(
        response.data.map((item) => ({ label: item.name, value: {"id":item.id, "name":item.name} }))          
        );                
      setLoading(false);
    }
  }

  const handleChangeSelect=(e)=>{
    e.persist();
    props.setObject({            
      ...props.object,[props.nameSelect]:e.currentTarget.value
    })
  }

  const onChangeFunction =(e)=>{
    setValue(e.currentTarget.value)
    handleChangeSelect(e)
  }

  useEffect(() => {
    setValue(props.value)
  }, [props.value])



  //return

  return (
      <FormControl className="w-100 formControlSelect">
        <InputLabel htmlFor={props.nameSelect}>{props.nameShow}</InputLabel> 
        <Select
          disabled={(props.disabled===true||loading===true)?true:false}
          value={props.value}
          onChange={(e)=>onChangeFunction(e)}          
          inputProps={{
            name: props.nameSelect,
            id: props.nameSelect,
            className: "selectFunction"
          }}
                
        >
          <option key="default" value='' disabled>Selecciona una opción...</option>
          {items.map(({ label, value }) => (
            <option key={value.id} value={value.name} name={value.name}>
              {label}
            </option>
          ))} 
      </Select>
      </FormControl>    
  );
}
//IMPLEMENTATION
//Example
//<SelectFunction  
// nameShow="Nombre del sector" 
// nameSelect="sector" 
// urlSelect="sector" 
// value={newPOA.sector?newPOA.sector:''}
// setObject={setNewPOA}
// object={newPOA}
// />