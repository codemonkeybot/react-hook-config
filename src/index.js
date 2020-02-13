import React from "react";
import ReactDOM from "react-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Input,
  Button,
  Box,
  Grid
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import ConfigTabs from "./configTabs.js";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper
  },
  paper: {
    color: theme.palette.text.secondary
  },
  mainUrl: {},
  urlBox: {
    padding: theme.spacing(2)
  },
  loadButton: {}
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Configurator
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box className={classes.urlBox}>
            <Input
              required
              name="slave.adfMasterUrl"
              placeholder="ADF Master Url"
              className={classes.mainUrl}
            />
            <Button
              className={classes.loadButton}
              variant="contained"
              color="primary"
            >
              Load
            </Button>
          </Box>
          <ConfigTabs />
        </Grid>
      </Grid>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
