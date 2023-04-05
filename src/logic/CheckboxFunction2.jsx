import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function CheckboxFunction2() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    unacosa: {},
    otracosa: 'pelotero',
    eldato:{    
      gilad: true,
      jason: false,
      antoine: false}
  });

  const handleChange = (event) => {

    let options = state.eldato

    state.eldato.map((item)=>{
      if (item===event.target.name){
        let newOptions= {...options, [event.target.name]: event.target.checked }
        return (newOptions)
      }
      
    })


    setState({ 
      ...state,
      eldato:{        
       [event.target.name]: event.target.checked }
      });
  };

  React.useEffect(() => {
    console.log(state)
  }, [state])

  const { gilad, jason, antoine } = state.eldato;

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Assign responsibility</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={gilad} onChange={handleChange} name="gilad" />}
            label="Gilad Gray"
          />
          <FormControlLabel
            control={<Checkbox checked={jason} onChange={handleChange} name="jason" />}
            label="Jason Killian"
          />
          <FormControlLabel
            control={<Checkbox checked={antoine} onChange={handleChange} name="antoine" />}
            label="Antoine Llorca"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
}
