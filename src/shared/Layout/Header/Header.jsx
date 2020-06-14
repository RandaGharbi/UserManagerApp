import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Grid } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  logo: {
    height: 50,
    width: 110,
    margin: 5,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));


export default () => {
  const classes = useStyles();
  return (
    <div className={classes.grow}>
      <AppBar position="static" color="inherit" className={classes.appBar}>
        <Grid container justify="center">
          <Grid item>
            <h1> Users Manager App</h1>
          </Grid>
        </Grid>
      </AppBar>
    </div>
  );
};
