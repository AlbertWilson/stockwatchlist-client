import * as React from 'react';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


export default function StockWatchlistToolBar(props:{theme:any, logOut:any}) {

    interface AppBarProps extends MuiAppBarProps {
        open?: boolean;
    }
        
    const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
    })<AppBarProps>(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    })
    }));

    return (
        <AppBar position="absolute">
            <Toolbar>
                <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
                >
                Stock Watchlist
                </Typography>
                <Grid>
                <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column'}}>
                    <Button onClick={props.logOut}>Log Out</Button>
                </Paper>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}