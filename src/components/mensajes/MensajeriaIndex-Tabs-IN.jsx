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


const MensajeriaIndexTabsIN = (props) => {

    //usestyles

    const classes = useStyles();

    //useContext 
    const { messagesHTMLIN, setMessagesHTMLIN } = useContext(MensajeriaContext)



    return (
        <CardContent className="p-0">
            <List className={classes.root} >
                {messagesHTMLIN}
            </List>
        </CardContent>
    )
}

export default MensajeriaIndexTabsIN
