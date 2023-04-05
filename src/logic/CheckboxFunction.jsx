import {  FormControl,  FormGroup, FormLabel } from '@material-ui/core'
import React, { useState, useEffect } from 'react'

const  CheckboxFunction =(props)=> {

  //lets and const 
  let options, index
  
  //useContext

  //useState
  const [state, setState] = useState([])

  //useEffect 
  useEffect(() => {
    setState(props.selectOptions)
  }, []) 



  //useStyles

  //functions

  const onChange =(e)=> {
    // current array of options
    options = state
    // check if the check box is checked or unchecked
    if (e.target.checked) {
      // add the numerical value of the checkbox to options array
      options.push(e.target.value)
    } 
    else {
      // or remove the value from the unchecked checkbox from the array
      index = options.indexOf(e.target.value)
      options.splice(index, 1)
    }
    // update the state with the new array of options
    props.setObject({            
        ...props.object,[props.nameSelect]:options
    }) 
  } 
  return (
    <>
    <FormControl className="col-12 px-1 mt-2" component="fieldset">
      <FormLabel  component="legend">{props.label}</FormLabel>
      <FormGroup row>
        {props.listOptions.map((item)=>{
          return ( 
          <div  key={item} className="mr-3" > 
            <input type="checkbox" value={item} onChange={onChange} className="mr-2"/>
            <FormLabel  label={item} >{item}</FormLabel>
          </div>

          )             
        }
        )}        
      </FormGroup>
    </FormControl>

    </>
  )
}

export default CheckboxFunction

{/*    form  of the Component 

  <POAindexTrial 
listOptions={options} 
object= {newSeguimientoCasos} 
nameSelect= 's4participantesEntesControl'
selectOptions= {newSeguimientoCasos.s4participantesEntesControl} 
setObject={setNewSeguimientoCasos} 

/>



/*         <form>
        {props.listOptions.map((item,i)=>{
          state.forEach(itemState => {
            if(itemState===item){
              console.log(`el item  ${item} está incluido en el estado`)                
            }
            else {
              console.log(`el item  ${item} no  está incluido en el estado`) 
            }
          });
          return (         
            <div key={item} className="input-group">
              <label>{item}</label>
              <input type="checkbox" value={item} onChange={onChange} />
            </div>
            )             
          }
          )}
        </form> */

}



