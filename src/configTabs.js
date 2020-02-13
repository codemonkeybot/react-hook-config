import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";

import {
  AppBar,
  Tabs,
  Tab,
  Grid,
  Typography,
  Input,
  TextField,
  Button,
  Box
} from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`config-tabpanel-${index}`}
      aria-labelledby={`config-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `config-tab-${index}`,
    "aria-controls": `config-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

const defaultValues = {
  master: {
    labName: "",
    clientsPerInstance: 1,
    totalAgents: 1,
    clusterIP: "127.0.0.1",
    activateSpan: 300,
    startInteractionInterval: 450,
    endInteractionDelay: 420,
    ringSeconds: 5,
    currentStartVal: 1,
    currentEndVal: 1,
    tenantID: "NA",
    sdkVersion: "3.7.0.0",
    jksPassword: "",
    authUrl: "https://127.0.0.1:9443/services/AuthorizationService/token",
    keyStorePath: "/clientkeystore.jks",
    trustStorePath: "/clienttruststore.jks",
    clientID: "",
    keyAlias: "clientcert",
    emailMessageDelay: 60,
    chatMessageDelay: 15,
    chatMessageByeToken: "###BYE###",
    smsMessageDelay: 15,
    smsMessageByeToken: "###BYE###"
  },
  dashIO: {
    dashConfig: {
      proxyUrl: "http://127.0.0.1:8050",
      apiUrl: "http://127.0.0.1:3000",
      relayUrl: "ws://127.0.0.1:8060",
      tokenUrl: "http://127.0.0.1:9000/token",
      registerUrl: "http://127.0.0.1:3000/groups",
      groupsNamesUrl: "http://127.0.0.1:3000/groups/names"
    },
    dashPlatform: {
      name: "nodejs",
      description: "DashIO Node js Client",
      version: "1.0.0"
    },
    dashMonitor: {
      automation: true,
      monitorServicePort: 3000,
      proxyServicePort: 8050,
      relayServicePort: 8060,
      tokenServicePort: 9000
    },
    metadata: {
      description: "Experimental DashIO Nodejs Client",
      team: "SIL",
      tags: "nodejs,loadtest,experimental"
    }
  },
  slave: {
    adfMasterUrl: "http://127.0.0.1:9090/cycle",
    tokenUrl: "http://127.0.0.1:9100/token/jwt",
    usernamePrefix: "ocagent",
    usernameZeroPadLen: 3,
    usernameDomain: "aoc.avaya.com",
    usernamePassword: "",
    usernameContainsDomain: true,
    config: {
      id: "testapp",
      apiUrl: "https://127.0.0.1/services/UnifiedAgentController/UACAPI",
      broadcastUrl:
        "https://127.0.0.1/services/Broadcast-UnifiedAgentController/broadcast"
    }
  }
};

export default function ConfigTabs() {
  const { reset, register, control, handleSubmit } = useForm({
    defaultValues
  });
  const classes = useStyles();

  useEffect(() => {
    register({ name: "slave.adfMasterUrl" });
  }, [register]);

  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabIndexChange = (event, tabIndex) => {
    setTabIndex(tabIndex);
  };

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AppBar position="static">
          <Tabs value={tabIndex} onChange={handleTabIndexChange}>
            <Tab name="tabMaster" label="Master" {...a11yProps(0)} />
            <Tab name="tabDashIO" label="DashIO" {...a11yProps(1)} />
            <Tab name="tabUsername" label="Username" {...a11yProps(2)} />
            <Tab name="tabConfig" label="CONFIG" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabPanel name="tabPanelConfig" value={tabIndex} index={0}>
          <Controller
            as={<TextField />}
            name="master.labName"
            className={classes.mainUrl}
            placeholder="Lab Name "
            control={control}
            required
          />
          <Input
            name="master.clientsPerInstance"
            placeholder="Clients Per Instance "
            required
            type="number"
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          Content 2
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          Content 3
        </TabPanel>
        <TabPanel value={tabIndex} index={3}>
          Content 4
        </TabPanel>

        <Grid item xs={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => reset({ defaultValues })}
          >
            Reset
          </Button>
          <Input type="submit" />
        </Grid>
      </form>
    </div>
  );
}
