import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        // backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip);

const GeneralTooltip = (props) => {
    const { children, text, placement } = props;

    return (
        <HtmlTooltip
            placement={placement ? placement : 'top'}
            title={
                <React.Fragment>
                    <Typography color="inherit">{text}</Typography>
                    {/* <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
        {"It's very engaging. Right?"} */}
                </React.Fragment>
            }
        >
            {children}
        </HtmlTooltip>

        //     IMPLEMENTATION:
        // <GeneralTooltip
        //   placement='top'
        //   children={<div></div>}
        //   text={'Da click sobre el ícono para mostrar/ocultar el widget de Twitter'}
        // />

        
        //     TIPOS DE PLACEMENT:
        // 'bottom-end'
        // | 'bottom-start'
        // | 'bottom'
        // | 'left-end'
        // | 'left-start'
        // | 'left'
        // | 'right-end'
        // | 'right-start'
        // | 'right'
        // | 'top-end'
        // | 'top-start'
        // | 'top'
    )
}

export default GeneralTooltip