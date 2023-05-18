import configJson from "./config.json";
interface Config {
  environment: 'local' | 'staging' | 'production';
  [key: string]: string;
}

const config: Config = configJson as Config;

export function getConfig() {
  return {
    clientId: config.clientId,
    apiOrigin: config.apiOrigin,
    paymentsUrl: config.paymentsUrl,
    exampleAppUrl: `http://localhost:${process.env.UI_PORT}`,
    localHostedCheckoutUrl: config.localHostedCheckoutUrl,
    environment: config.environment,
    sellerAccountId: config.sellerAccountId,
  };
}
