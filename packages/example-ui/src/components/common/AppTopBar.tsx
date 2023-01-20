import {
  Box,
  AppBar,
  FormControl,
  Select,
  SelectChangeEvent,
  MenuItem,
  Toolbar,
  Typography,
  Link
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as Tree } from "../../assets/tree-logo-2-color.svg";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import JustiFiPalette from "./JustiFiPallete";

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
  toggleDrawer?: () => void;
}

const AppTopBar = (props: AppTopBarProps) => {
  const [url, setUrl] = useState("/");
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const url = event.target.value;
    setUrl(url);
    navigate(url);
  };

  useEffect(() => {
    if (location.pathname.search('onboarding') !== -1) {
      setUrl('/onboarding');
      return;
    }
    if (location.pathname.search('hosted-checkout/success') !== -1) {
      setUrl('/hosted-checkout');
      return;
    }
    setUrl(location.pathname);
  }, [location]);

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link underline="none" href="/" sx={{
          '&:hover': {
            textDecoration: 'none'
          }
        }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
              <SvgIcon className={classes.appBarLogo}>
                <Tree />
              </SvgIcon>
              <Typography
                component="h1"
                sx={{
                  textDecoration: 'none',
                  color: JustiFiPalette.grey[900],
                  marginLeft: "1em",
                  fontSize: "20px",
                  fontWeight: 700,
                  lineHeight: "24px"
                }}
              >
                Landscaping Platform
              </Typography>
          </Box>
        </Link>
        <Box>
          <FormControl fullWidth>
            <Select
              labelId="component-select-label"
              id="demo-simple-select"
              name="demo-simple-select"
              value={url}
              onChange={handleSelectChange}
              sx={{ bordercolor: "white" }}
            >
              <MenuItem value={"/"}>Create or Select Seller</MenuItem>
              <MenuItem value={"/payments"}>Payments</MenuItem>
              <MenuItem value={"/checkout"}>Card Form Component</MenuItem>
              <MenuItem value={"/bank-checkout"}>Bank Checkout</MenuItem>
              <MenuItem value={"/hosted-checkout"}>Hosted Checkout</MenuItem>
              <MenuItem value={"/onboarding"} disabled>Onboarding</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppTopBar;
