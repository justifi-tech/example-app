# Example App

Example App Monorepo to showcase integration of our product into customers apps.

### Needed ENV Variables

All variables needed can be found in the `.env.template` file. You need to re-name it to simply `.env` and add the values to your config. Useful defaults are provided.

Restart the service if these are changed!

For staging
```.sh
  CLIENT_ID=<Your CLIENT_ID obtained from the staging dashboard in API KEYS section>
  CLIENT_SECRET=<Your CLIENT_SECRET obtained from the staging dashboard in API KEYS section>
  JUSTIFI_API_URL=<staging URL>
  REACT_APP_HOSTED_ONBOARDING_URL=<staging URL>
```

To run it locally

```.sh
  CLIENT_ID=<Your CLIENT_ID obtained from your local dashboard in API KEYS section>
  CLIENT_SECRET=<Your CLIENT_SECRET obtained from your local dashboard in API KEYS section>
  JUSTIFI_API_URL=<The URL of your running capital service, default is http://localhost:3000>
  REACT_APP_HOSTED_ONBOARDING_URL=<The URL of your running account_settings service, default is http://localhost:3004/onboarding>
```
### Run the whole app

- example-app> yarn start

### Adding dependencies

- example-app> npx lerna add lodash packages/example-ui

