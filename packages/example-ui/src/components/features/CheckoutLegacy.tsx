import React from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  Grid,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import JustiFiPalette from "../common/JustiFiPallete";
import AppTopBar from "../common/AppTopBar";
import CreatePaymentForm from "../common/Checkout/CreatePaymentForm";
import CardFormComponent from "../common/CheckoutLegacy/JustifiJSLegacy";

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

const CheckoutLegacy = () => {
  const [params, setParams] = React.useState<any>({});

  // This should be nore specifically typed
  const onCreatePayment = (data: Object, extras?: Object) => {
    setParams({...data, ...extras});
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppTopBar toggleDrawer={() => {}} />
      <Drawer
        variant="permanent"
        sx={{
          width: 390,
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <CreatePaymentForm disabled={false} width="390px" submitHandler={onCreatePayment} />
        </Box>
      </Drawer>
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
              Legacy example
            </SubheaderText>
            <CardFormComponent params={params} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CheckoutLegacy;
