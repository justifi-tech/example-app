import * as React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { StylesProvider, jssPreset } from "@mui/styles";
import { CacheProvider } from "@emotion/react";
import reportWebVitals from "./reportWebVitals";
import { create } from "jss";
import createCache from "@emotion/cache";
import App from "./App";
import theme from "./theme";

const root = createRoot(document.getElementById("root") as HTMLElement);

const jss = create({ plugins: [...jssPreset().plugins] });
const emotion = createCache({
  key: "muistyles",
  prepend: true,
});

root.render(
  <React.StrictMode>
    <CacheProvider value={emotion}>
      <ThemeProvider theme={theme}>
        <StylesProvider jss={jss}>
          <App />
        </StylesProvider>
      </ThemeProvider>
    </CacheProvider>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
