import React from "react";
import { render, screen } from "@testing-library/react";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import App from "./App";

function MockTheme({ children }: any) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

test("renders default path", () => {
  render(
    <MockTheme>
      <App />
    </MockTheme>
  );

  const createElement = screen.getByText(/Create a Seller/i);
  expect(createElement).toBeInTheDocument();
});
