import React from "react";
import {
  Box,
  AppBar,
  FormControl,
  Select,
  SelectChangeEvent,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as Tree } from "../../assets/tree-logo-2-color.svg";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(
  (theme: any) => ({
    appBarLogo: {
      height: "36px",
      width: "auto",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }),
  { index: 1 }
);

interface AppTopBarProps {
  toggleDrawer: () => void;
}

const AppTopBar = (props: AppTopBarProps) => {
  const [url, setUrl] = React.useState("/");
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const url = event.target.value;
    setUrl(url);
    navigate(url);
  };

  React.useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SvgIcon className={classes.appBarLogo}>
            <Tree />
          </SvgIcon>
          <Typography
            component="h1"
            sx={{
              marginLeft: "1em",
              fontSize: "20px",
              fontWeight: 700,
              lineHeight: "24px",
            }}
          >
            Landscaping Platform
          </Typography>
        </Box>
        <Box>
          <FormControl>
            <Select
              labelId="component-select-label"
              id="demo-simple-select"
              value={url}
              label="Age"
              onChange={handleSelectChange}
              sx={{ bordercolor: "white" }}
            >
              <MenuItem value={"/"}>
                <Typography
                  sx={{ fontSize: "16px", fontWeight: 700, lineHeight: "24px" }}
                >
                  Create Seller
                </Typography>
              </MenuItem>
              <MenuItem value={"/payments"}>Payments</MenuItem>
              <MenuItem value={"/checkout"}>Card Form Component</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppTopBar;
