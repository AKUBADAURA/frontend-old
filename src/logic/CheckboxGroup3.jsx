import React, { useEffect, useState } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { FormLabel } from '@material-ui/core';



export default function CheckBoxGroup(props) {
/*   const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  }); */
  const [checkboxs, setCheckboxs] = useState()


  useEffect(() => {
      setCheckboxs(props.options.map(function(option,i){
          return    <FormControlLabel 
                        key={i}
                        control={
                            <Checkbox 
                                checked={true} 
                                onChange={props.handleChange} 
                                name= {props.name+[i]}
                            />} 
                        label={option} 
                    />
      }))

  }, [])

  return (
    <FormGroup row>
        <FormLabel component="legend">{props.label}</FormLabel>
        {checkboxs}
    </FormGroup>
  );
}
/*
<CheckBoxGroup className='col-12' label="checkbox group label" name="s4entesControl" options={optionsCheckbox} handleChange={handleChangeNewSeguimientoCasos} />
*/