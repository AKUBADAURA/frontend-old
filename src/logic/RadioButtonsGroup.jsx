import React, { useState, useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioButtonsGroup(props) {

    useEffect(() => {
        setState(props.options.map(function (option) {
            return <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
            />
        }))
    }, [])

    const [state, setState] = useState()


    return (
        <FormControl className="col-12 px-1 mt-2" component="fieldset">
            <FormLabel component="legend">{props.label}</FormLabel>
            <RadioGroup row aria-label="gender" name={props.name} value={props.value} onChange={props.handleChange}>
                {state}
            </RadioGroup>
        </FormControl>
    );
}

/*IMPLEMENTATION

    let options= [
        {value:'amarillo', label:'Color Amarillo' },
        {value:'azul', label:'Color Azul' }
    ]

    <RadioButtonsGroup
        label="pruebas"
        name="pruebas"
        options={options}
        value={newSeguimientoCasos.pruebas?newSeguimientoCasos.pruebas:''}
        handleChange={handleChangeNewSeguimientoCasos}
    />
*/



