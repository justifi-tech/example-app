import * as React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { StylesProvider, jssPreset } from "@mui/styles";
import { CacheProvider } from "@emotion/react";
import reportWebVitals from "./reportWebVitals";
import { create } from "jss";
import createCache from "@emotion/cache";
import App from "./App";
import { getConfig } from "./config"
import "./App.css";
import theme from "./theme";
import { Auth0Provider } from "@auth0/auth0-react";

const root = createRoot(document.getElementById("root") as HTMLElement);
const jss = create({ plugins: [...jssPreset().plugins] });
const emotion = createCache({
  key: "muistyles",
  prepend: true,
});

const config = getConfig();

root.render(
  <React.StrictMode>
    <CacheProvider value={emotion}>
      <ThemeProvider theme={theme}>
        <StylesProvider jss={jss}>
        <Auth0Provider
          domain={process.env.REACT_APP_AUTH_DOMAIN || config.authDomain}
          clientId={process.env.REACT_APP_AUTH_CLIENT_ID || config.authClientId}
          authorizationParams={{
            redirect_uri: window.location.origin,
            audience: process.env.REACT_APP_AUTH_AUDIENCE || config.authAudience
          }}>
          <App />
        </Auth0Provider>
        </StylesProvider>
      </ThemeProvider>
    </CacheProvider>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
