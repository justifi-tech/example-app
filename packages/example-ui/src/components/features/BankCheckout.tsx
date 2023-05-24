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
        <Grid container sx={{ padding: "32px" }}>
          <Grid>
            <Typography
              variant="h4"
              sx={{ fontSize: "34px", color: "#004C4D", fontWeight: 700 }}
            >
              <HeaderText>Bank Account Component</HeaderText>
            </Typography>
            <SubheaderText variant="h5" margin="15px 0">
              This is an example of the usage of the Bank Account Web Component. The platform can use
              their own fields to collect any additional info that's relevant to
              them, while the iframed bank account form will send the payment method
              info to JustiFi, keeping the platform free of PCI scope.
            </SubheaderText>
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
