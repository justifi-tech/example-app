import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateSeller from "./components/features/CreateSeller";
import Onboarding from "./components/features/Onboarding";
import Payments from "./components/features/Payments";
import Events from "./components/features/Events";
import Checkout from "./components/features/Checkout";
import { Box, CssBaseline, Skeleton, Typography } from "@mui/material";
import BankCheckout from "./components/features/BankCheckout";
import HostedCheckout from "./components/features/HostedCheckout";
import CheckoutSuccess from "./components/features/HostedCheckoutForm/CheckoutSuccess";
import PaymentFormCheckout from "./components/features/PaymentForm";
import { useAuth0 } from '@auth0/auth0-react';

export default function App() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  if(isLoading) {
    return(
      <Box sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '20px',
        color: 'rgba(0, 0, 0, 0.25)'
      }}>
        <Skeleton variant="circular" width={128} height={128}></Skeleton>
        <Typography variant="h4">Loading</Typography>
      </Box>
    );
  }

  if (isAuthenticated) {
    return (
      <React.StrictMode>
        <BrowserRouter>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<CreateSeller />} />
            <Route
              path="/onboarding/:seller_account_id"
              element={<Onboarding />}
            />
            <Route path="/payments" element={<Payments />} />
            <Route path="/events" element={<Events />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/bank-checkout" element={<BankCheckout />} />
            <Route path="/payment-form-checkout" element={<PaymentFormCheckout />} />
            <Route path="/hosted-checkout" element={<HostedCheckout />} />
            <Route path="/hosted-checkout/success" element={<CheckoutSuccess />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    );
  } else {
    (async (): Promise<void> => {
      await loginWithRedirect();
    })();
    return (<></>);
  }
}
