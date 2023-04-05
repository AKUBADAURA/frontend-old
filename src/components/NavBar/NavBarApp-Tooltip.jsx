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

const NavBarAppToolTip = (props) => {
    const { children, text } = props;

    return (
        <HtmlTooltip
            // placement='top'
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
    )
}

export default NavBarAppToolTip