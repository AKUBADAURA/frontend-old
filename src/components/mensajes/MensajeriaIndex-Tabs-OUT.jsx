import { CardContent, Divider, List, makeStyles, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { MensajeriaContext } from '../../context/MensajeriaContext';



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    }
}));


const MensajeriaIndexTabsOUT = (props) => {

    //usestyles

    const classes = useStyles();

    //useContext 
    const { messagesHTMLOUT, setMessagesHTMLOUT } = useContext(MensajeriaContext)



    return (
        <CardContent className="p-0">
            <List className={classes.root} >
                {messagesHTMLOUT}
            </List>
        </CardContent>
    )
}

export default MensajeriaIndexTabsOUT
