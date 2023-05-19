import configJson from "./config.json";
interface Config {
  [key: string]: string;
}

const config: Config = configJson as Config;

export function getConfig() {
  return {
    authClientId: config.authClientId,
    authAudience: config.authAudience,
    apiUrl: config.apiUrl,
    authDomain: config.authDomain,
    clientId: config.clientId,
    environment: process.env.REACT_APP_ENVIRONMENT
  };
}
