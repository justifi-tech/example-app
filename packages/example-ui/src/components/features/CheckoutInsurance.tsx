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
import { MultiMedSaverComponent } from "../common/VerticalInsureComps";
import { State } from "@vertical-insure/web-components";

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

const CheckoutInsurance = () => {
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
              This is an example of the platform using the JustiFi Card Form with the Vertical Insure
              insurance component.
            </SubheaderText>
            <CardFormComponent setLoading={setLoading} params={params}>
              <MultiMedSaverComponent
                client-id="test_RGMDV4FV4BNK4TSPT7DOQVC3P9HKEXTQ"
                customer={{"first_name": "Marty", "last_name": "John", "email_address": "john@example.com", "street": "123 Main St.", "postal_code": "94105", 'state': State.MN}}
                covered-persons='[{"first_name": "Marty", "last_name": "Byrde", "street": "123 Main St", "state": "MN", "country": "US", "birth_date": "1960-01-01"}]'
                coverage-start-date={new Date(new Date().getTime() + 86400000).toISOString().substring(0, 10)}
                coverage-end-date={new Date(new Date().getTime() + 86400000).toISOString().substring(0, 10)}
                coverage-types={JSON.stringify([{
                  program_type: "SOCCER",
                  program_name: "Soccer"
                }, {
                  program_type: "BASKETBALL",
                  program_name: "Basketball"
                }])}
                insurable-amount="50000"
              />
            </CardFormComponent>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CheckoutInsurance;
