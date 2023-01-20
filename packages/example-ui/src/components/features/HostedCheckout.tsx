import {
  Box,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import JustiFiPalette from "../common/JustiFiPallete";
import AppTopBar from "../common/AppTopBar";
import HostedCheckoutComponent from "./HostedCheckoutForm";

const HeaderText = styled("span")({
  display: "flex",
  alignItems: "center",
  "> span": { marginRight: "8px" },
});

const SubheaderText = styled(Typography)({
  alignItems: "center",
  color: JustiFiPalette.grey[700],
  display: "flex",
  flexWrap: "wrap",
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "1.5",
});

const HostedCheckout = () => {

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppTopBar toggleDrawer={() => {}} />
      <Box component="main">
        <Toolbar />
        <Grid container sx={{ padding: "32px" }}>
          <Grid>
            <Typography
              variant="h4"
              sx={{ fontSize: "34px", color: "#004C4D", fontWeight: 700 }}
            >
              <HeaderText>Card Form Component</HeaderText>
            </Typography>
            <SubheaderText variant="h5">
              This is an example of the platform using the JustiFi Hosted Checkout.
            </SubheaderText>
            <HostedCheckoutComponent />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HostedCheckout;
