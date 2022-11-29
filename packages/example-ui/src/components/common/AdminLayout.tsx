import * as React from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import PeopleIcon from "@mui/icons-material/People";
import PaymentsIcon from "@mui/icons-material/Payments";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import EventIcon from "@mui/icons-material/Event";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AppTopBar from "./AppTopBar";
import { ReactComponent as Camera } from "../../assets/camera-cattails-logo.svg";
import SvgIcon from "@mui/material/SvgIcon";
import { makeStyles } from "@mui/styles";
import { Webhook } from "@mui/icons-material";

const drawerWidth = 256;

interface AdminLayoutProps {
  children: JSX.Element | JSX.Element[];
}

const useStyles = makeStyles(
  (theme: any) => ({
    appCameraLogo: {
      height: "93px",
      width: "auto",
    },
    layout: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      maxHeight: "100%",
      overflowY: "scroll",
    },
  }),
  { index: 1 }
);

const AdminLayout = (props: AdminLayoutProps) => {
  const { children } = props;

  const classes = useStyles();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppTopBar toggleDrawer={() => { }} />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "auto",
            height: 180,
            backgroundColor: "#F0F5F0",
            flexDirection: "column",
          }}
        >
          <SvgIcon className={classes.appCameraLogo}>
            <Camera />
          </SvgIcon>
          <Typography
            component="h5"
            sx={{
              marginLeft: "1em",
              fontSize: "16px",
              fontWeight: 700,
              lineHeight: "24px",
              padding: "8px",
            }}
          >
            Pleasant View Garden
          </Typography>
        </Box>
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem key="Clients" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Clients" />
              </ListItemButton>
            </ListItem>
            <ListItem key="Appoinments" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <EventIcon />
                </ListItemIcon>
                <ListItemText primary="Appoinments" />
              </ListItemButton>
            </ListItem>
            <ListItem key="Vendors" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Vendors" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem key="Payments" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PaymentsIcon />
                </ListItemIcon>
                <ListItemText primary="Payments" />
              </ListItemButton>
            </ListItem>
            <ListItem key="Payouts" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AccountBalanceIcon />
                </ListItemIcon>
                <ListItemText primary="Payouts" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem key="Events" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Webhook />
                </ListItemIcon>
                <ListItemText primary="Received Events" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main">
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
