import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import axios from 'axios';
import { POAContext } from '../../../context/POAContext';


const useStyles = makeStyles((theme) => ({
  formControl: {
    //margin: theme.spacing(1),
    minWidth: 120,
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function POAIndexSelectFilter(props) {

  //useContext
  const {
    POA, setPOA,
    POAS, setPOAS,
    POASCount, setPOASCount,
    POASTable, setPOASTable,
    POASFilterWord, setPOASFilterWord,
  } = useContext(POAContext)

  //useStyles
  const classes = useStyles();

  //console.log(props)
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  //const [value, setValue] = useState({});

  //Const & lets
  const url = process.env.REACT_APP_BACKEND_API_URL
  let config = {
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

  // useEffect(() => {
  //   handleChange()
  // }, [])


  //functions
  const getCharacters = async () => {
    response = await axios.get(`${url}/${props.urlSelect}?filter[order]=name%20ASC`, config)
    if (!unmounted) {
      setItems(
        response.data.map((item) => ({ label: item.name, value: { "id": item.id, "name": item.name } }))
      );
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    console.log('hay handle change en los select de server')
    //props.setLoadingMap(true)
    e.persist();
    // console.log('name: ', e.currentTarget.name)
    // console.log('value: ', e.currentTarget.value)

    setPOASFilterWord({
      ...POASFilterWord,
      [e.currentTarget.name]:e.currentTarget.value
    })
    // props.setValue(e.currentTarget.value)
    // console.log('cambio de value en la function')

    // if (e.currentTarget.value === '') {
    //   props.setObjectOut(
    //     props.objectIn
    //   )
    //   console.log('e.currentTarget.value: ', e.currentTarget.value)
    //   console.log('filtro vacio')
    // }

    // if (props.urlSelect === "sector") {
    //   let filterList
    //   if (e.currentTarget.value !== '') {
    //     filterList = props.objectIn.filter(
    //       //(item) => item.sector.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) > -1,
    //       (item) => item.sector.indexOf(e.currentTarget.value) > -1,
    //     )
    //   }
    //   else {
    //     filterList = props.objectIn
    //   }
    //   props.setObjectOut(
    //     filterList
    //   )
    //   console.log('e.currentTarget.value: ', e.currentTarget.value)
    //   console.log('FilterList 1:', filterList)
    // }
    // if (props.urlSelect === "tipo-comunidad") {
    //   let filterList
    //   if (e.currentTarget.value !== '') {
    //     filterList = props.objectIn.filter(
    //       //(item) => item.sector.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) > -1,
    //       (item) => item.tipoComunidad.indexOf(e.currentTarget.value) > -1,
    //     )
    //   }
    //   else {
    //     filterList = props.objectIn
    //   }
    //   props.setObjectOut(
    //     filterList
    //   )
    //   console.log('e.currentTarget.value: ', e.currentTarget.value)
    //   console.log('FilterList 2:', filterList)
    // }
    // if (props.urlSelect === "estado") {
    //   let filterList = props.objectIn.filter(
    //     //(item) => item.sector.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) > -1,
    //     (item) => item.estado.indexOf(e.currentTarget.value) > -1,
    //   )
    //   props.setObjectOut(
    //     filterList
    //   )

    //   console.log('e.currentTarget.value: ', e.currentTarget.value)
    //   console.log('filterList 3: ', filterList)
    // }
    // if (props.urlSelect === "etapa") {
    //   console.log('e.currentTarget.value problem: ', e.currentTarget.value)
    //   console.log('props.objectIn: ', props.objectIn)
    //   let filterList
    //   if (e.currentTarget.value !== '') {
    //     filterList = props.objectIn.filter(
    //       //(item) => item.sector.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) > -1,
    //       //(item) => item.etapa.indexOf(e.currentTarget.value) > -1,
    //       (item) => item.etapa === e.currentTarget.value
    //     )
    //   }
    //   else {
    //     filterList = props.objectIn
    //   }
    //   props.setObjectOut(
    //     filterList
    //   )
    //   console.log('e.currentTarget.value: ', e.currentTarget.value)
    //   console.log('filterList 4: ', filterList)
    // }


    // const name = event.target.name;
    // setState({
    // ...state,
    // [name]: event.target.value,
    // });
  };


  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor={props.nameFilter}>{props.nameShow}</InputLabel>
        <NativeSelect
          disabled={(props.disabled === true || loading === true) ? true : false}
          value={props.value}
          onChange={handleChange}
          inputProps={{
            name: props.nameFilter,
            id: props.nameFilter,
            className: "selectFunction"
          }}
        >
          <option aria-label="None" value='' />
          {items.map(({ label, value }) => (
            <option key={value.id} value={value.name} name={value.name}>
              {label}
            </option>
          ))}
        </NativeSelect>
        <FormHelperText>{props.helperText ? props.helperText : ''}</FormHelperText>
      </FormControl>
    </>
  );
}
