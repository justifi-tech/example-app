import configJson from "./config.json";
interface Config {
  [key: string]: string;
}

const config: Config = configJson as Config;

export function getConfig() {
  return {
    clientId: config.clientId,
    audience: config.audience,
    apiOrigin: config.apiOrigin,
    environment: process.env.REACT_APP_ENVIRONMENT,
    featureUrl: config.featureUrl,
    sellerAccountId: config.sellerAccountId,
  };
}
