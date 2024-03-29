import React, { useState } from "react";
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
import CardFormComponent from "../common/Checkout/CardFormComponent";
import { SpinningLoader, TitleText } from "../common/atoms";

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

const Checkout = () => {
  const [params, setParams] = React.useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  // This should be nore specifically typed
  const onCreatePayment = (data: Object, extras?: Object) => {
    setParams({...data, ...extras});
  };

  return (
    <Box sx={{ display: "flex" }}>
      {loading && (
        <SpinningLoader />
      )}
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
            <TitleText>
              <HeaderText>Card Form Component</HeaderText>
            </TitleText>
            <SubheaderText variant="h5">
              This is an example of the platform using the JustiFi Card Form
              component inside of their checkout page. The platform can use
              their own fields to collect any additional info that’s relevant to
              them, while the iframed card form will send the payment method
              info to JustiFi, keeping the platform free of PCI scope.
            </SubheaderText>
            <CardFormComponent setLoading={setLoading} params={params} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Checkout;
