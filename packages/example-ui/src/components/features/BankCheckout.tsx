import {
  Box,
  Grid,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import JustiFiPalette from "../common/JustiFiPallete";
import AppTopBar from "../common/AppTopBar";
import BankForm from "../common/BankCheckout/BankForm";
import SelectSeller from "./SelectSeller";
import { FormEvent, useState } from "react";
import { TitleText } from "../common/atoms";

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

const BankCheckout = () => {
  const [currentSeller, setCurrentSeller] = useState<{
    selectedSellerID: string,
    selectedSellerSafeName: string
  }>({
    selectedSellerID: '',
    selectedSellerSafeName: ''
  });

  return (
    <Box sx={{ display: "flex" }}>
      <AppTopBar />
      <Box component="main">
        <Toolbar />
        <Grid container columns={12} sx={{ padding: "32px" }}>
          <TitleText>
            <HeaderText>Bank Account Component</HeaderText>
          </TitleText>
          <SubheaderText variant="h5" margin="15px 0">
            This is an example of the usage of the Bank Account Web Component. The platform can use
            their own fields to collect any additional info that's relevant to
            them, while the iframed bank account form will send the payment method
            info to JustiFi, keeping the platform free of PCI scope.
          </SubheaderText>
          <Grid item xs={12} md={6}>
            <SelectSeller
              submitOnChange
              handleSubmit={
              (
                selectedSellerID: string,
                selectedSellerSafeName: string,
                e: FormEvent<HTMLFormElement>
              ) => {
                setCurrentSeller({selectedSellerID, selectedSellerSafeName});
              }
            }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <BankForm params={{
              amount: 1000,
              description: `test payment for: ${currentSeller.selectedSellerSafeName}`,
              sellerAccountId: currentSeller.selectedSellerID,
              sellerSafeName: currentSeller.selectedSellerSafeName
            }}/>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default BankCheckout;
