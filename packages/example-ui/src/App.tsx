import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateSeller from "./components/features/CreateSeller";
import Onboarding from "./components/features/Onboarding";
import Payments from "./components/features/Payments";
import Events from "./components/features/Events";
import Checkout from "./components/features/Checkout";
import { CssBaseline } from "@mui/material";
import BankCheckout from "./components/features/BankCheckout";
import HostedCheckout from "./components/features/HostedCheckout";
import CheckoutSuccess from "./components/features/HostedCheckoutForm/CheckoutSuccess";
import CheckoutLegacy from './components/features/CheckoutLegacy';

export default function App() {
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
          <Route path="/checkout-legacy" element={<CheckoutLegacy />} />
          <Route path="/bank-checkout" element={<BankCheckout />} />
          <Route path="/hosted-checkout" element={<HostedCheckout />} />
          <Route path="/hosted-checkout/success" element={<CheckoutSuccess />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}
