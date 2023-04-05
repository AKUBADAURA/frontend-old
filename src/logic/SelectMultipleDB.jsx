import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';


const SelectMultipleDB = (props) => {

    //Vars and const
    const url = process.env.REACT_APP_BACKEND_API_URL
    let config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('JWT')}` }
    }
    let response



    //props
    //useState
    const [state, setState] = useState({
        isLoading: false,
        options: [],
        value: undefined,
    })

    //useeffect
    useEffect(() => {
        setState({ ...state, isLoading: true })
        loadOptionsAndValues()
    }, [])
    //functions


    const loadOptionsAndValues = async () => {
        try {
            //loading options
            response = await axios.get(`${url}/${props.urlSelect}?filter[order]=name%20ASC`)
            let letOptions = []
            response.data.map((item) => {
                letOptions.push(createOption(item))
            })
            //loading default values in select
            let fixArrayLoadValues = []
            console.log('props.value: ', props.value)
            // if(props.value!==('' || undefined || null) ){
            if (props.value !== undefined ) {
                console.log('dentro del if')
                let arrayLoadValues = props.value.split(',')
                arrayLoadValues.map((item) => {
                    fixArrayLoadValues.push(createValue(item))
                })
            }
            setState({ ...state, options: letOptions, value: fixArrayLoadValues, isLoading: false })
        }
        catch (e) {
            alert('Problemas en la carga del listado de opciones del menú selector')
            //console.log(e)
        }
    }

    const createOption = (item) => ({
        label: item.name,
        value: item.name
    })

    const createOptionInside = (label) => ({
        label,
        value: label.toUpperCase()
    });

    // const createOption = (label) => ({
    //     label,
    //     value: label.toLowerCase().replace(/\W/g, ''),
    // });

    const createValue = (item) => ({
        label: item,
        value: item
    })


    const handleChange = (newValue, actionMeta) => {
        setState({ ...state, value: newValue });
        let arrayValues = []
        newValue.map((item) => {
            arrayValues.push(item.value)
        })
        //console.log('arrayValues: ', arrayValues)
        //console.log('arrayValues lenght: ', arrayValues.length)
        if (arrayValues.length === 0) {
            //console.log('dentro del if ')
            props.setObject({ ...props.object, [props.nameSelect]: undefined })

        }
        else {
            //console.log('dentro del else ')
            props.setObject({ ...props.object, [props.nameSelect]: arrayValues.toString() })
        }
    };

    const handleCreate = async (inputValue) => {
        if (window.confirm("¿Está Seguro de crear el nuevo registro?")) {

            setState({ ...state, isLoading: true });
            const newOption = createOptionInside(inputValue);
            let arrayOldValues = state.value

            //adding new item to array values to inside state && new options to inside state
            setState({
                isLoading: false,
                options: [...state.options, newOption],
                value: [...state.value, newOption],
            });

            // adding new item to string values from props 
            arrayOldValues.push(newOption)
            let arrayNewValues = []
            arrayOldValues.map((item) => {
                arrayNewValues.push(item.value)
            })
            props.setObject({ ...props.object, [props.nameSelect]: arrayNewValues })

            //adding new item to DB options 
            try {
                await axios.post(`${url}/${props.urlSelect}`, {
                    name: newOption.value
                }, config)
                alert('Registro hecho con éxito')
            }
            catch (e) {
                //console.log(e.response)
                alert('Error al almacenar los datos nuevos, verifique sus credenciales o inténtelo en otro momento')
            }
        }
    };


    return (
        <>
            <CreatableSelect
                isMulti
                isClearable
                isDisabled={state.isLoading}
                isLoading={state.isLoading}
                onChange={handleChange}
                onCreateOption={handleCreate}
                options={state.options}
                value={state.value}
                placeholder={props.label}
            />
        </>
    );

}

export default SelectMultipleDB


//implementation 

/* <SelectMultipleDB
urlSelect="comunidad"
nameSelect="comunidad"
value={POA.comunidad}
setObject={setPOA}
object={POA}
/>

//use
const [POA, setPOA] = useState({
    name: 'elemento',
    comunidad: 'ACHIOTE'
})

*/