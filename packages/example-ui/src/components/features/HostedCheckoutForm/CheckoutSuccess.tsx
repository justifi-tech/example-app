import React from "react";
import {
  Box,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
  styled,
  Button,
} from "@mui/material";
import AppTopBar from "../../common/AppTopBar";
import JustiFiPalette from "../../common/JustiFiPallete";
import { Link } from "react-router-dom";

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

const CheckoutSuccess = () => {

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
              <HeaderText>Hosted Checkout Success</HeaderText>
            </Typography>
            <SubheaderText variant="h5">
              This is an example of a page to redirect to after payment success when using the Hosted Checkout.
              This can be configured through the 'after_payment_url' property when creating the Checkout Session.
            </SubheaderText>
            <Link to="/hosted-checkout">
              <Button variant="contained">Return to Hosted Checkout Flow</Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CheckoutSuccess;
