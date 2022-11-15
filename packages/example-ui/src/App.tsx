import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateSeller from "./components/features/CreateSeller";
import Onboarding from "./components/features/Onboarding";

export default function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateSeller />} />
          <Route
            path="/onboarding/:seller_account_id"
            element={<Onboarding />}
          />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}
