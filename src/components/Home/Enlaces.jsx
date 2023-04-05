import React, { useEffect } from 'react'
import { IconButton } from '@material-ui/core'
import Twitter from '@material-ui/icons/Twitter';
import { Facebook, Instagram, Language, YouTube } from '@material-ui/icons';
import HelpIcon from '@material-ui/icons/Help';
import { Link } from 'react-router-dom';
import '../../css/pulse.css'
import GeneralTooltip from '../Tooltip';



const Enlaces = (props) => {
    return (
        <div id="enlaces">
            <a href="https://akubadaura.org" target="_blank" rel="noreferrer">
                <IconButton color="primary" aria-label="Website" size="medium" >
                    <Language fontSize="large" className="iconEnlace" />
                </IconButton>
            </a>
            {/* <a href="https://twitter.com/CJAkubadaura" target="_blank" rel="noreferrer"> */}
            <GeneralTooltip
                placement='top'
                children={
                    <a>
                        <IconButton color="primary" aria-label="Twitter" size="medium" className="pulse" onClick={() => props.handleShowWidgetTwitter()}>
                            <Twitter fontSize="large" className="iconEnlace" />
                        </IconButton>
                    </a>
                }
                text={'De click sobre el ícono para mostrar/ocultar el widget de Twitter'}
            />
            <a href="https://www.facebook.com/CJAkubadaura" target="_blank" rel="noreferrer">
                <IconButton color="primary" aria-label="Facebook" size="medium" >
                    <Facebook fontSize="large" className="iconEnlace" />
                </IconButton>
            </a>
            <a href="https://www.youtube.com/channel/UCrNMzZDrsdJj3uN5YKSMvOA" target="_blank" rel="noreferrer">
                <IconButton color="primary" aria-label="Youtube" size="medium" >
                    <YouTube fontSize="large" className="iconEnlace" />
                </IconButton>
            </a>
            <a href="https://www.instagram.com/cjakubadaura" target="_blank" rel="noreferrer">
                <IconButton color="primary" aria-label="Instagram" size="medium" >
                    <Instagram fontSize="large" className="iconEnlace" />
                </IconButton>
            </a>
            <GeneralTooltip
                placement='top'
                children={
                    <Link to="/preguntas-frecuentes" >
                        <IconButton color="primary" aria-label="preguntas frencuentes" size="medium" className="pulse">
                            <HelpIcon fontSize="large" className="iconEnlace" />
                        </IconButton>
                    </Link>
                }
                text={'Preguntas frecuentes'}
            />

            {/* <PreguntasFrecuentes/> */}
        </div>
    )
}

export default Enlaces
