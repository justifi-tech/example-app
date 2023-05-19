# Example App

Example App Monorepo to showcase integration of our product into customers apps.

### Needed ENV Variables

All variables needed can be found in the `.env.template` file. You need to re-name it to simply `.env` and add the values to your config. Useful defaults are provided.

Restart the service if these are changed!

To run it locally

```.sh
  CLIENT_ID=<Your CLIENT_ID obtained from your dashboard in API KEYS section>
  CLIENT_SECRET=<Your CLIENT_SECRET obtained from your dashboard in API KEYS section>
  JUSTIFI_API_URL=<The URL of your running capital service, prod is https://justifi.ai>
  AUTH_DOMAIN=<Domain for authorization, we recommend auth0 for experimentation>
  AUTH_AUDIENCE=<API Audience for authorization, we recommend auth0 for experimentation>

  REACT_APP_HOSTED_ONBOARDING_URL=https://accounts.justifi.ai/onboarding
  REACT_APP_AUTH_DOMAIN=<same as AUTH_DOMAIN above>
  REACT_APP_AUTH_AUDIENCE=<same as AUTH_AUDIENCE above>
  REACT_APP_AUTH_CLIENT_ID=<client id for pkce auth, we recommend auth0>
  REACT_APP_API_URL=<api for your backend, http://localhost:8000 by default>
```

### Run the whole app

- example-app> yarn dev

### Adding dependencies

- example-app> npx lerna add lodash packages/example-ui

### Deploying (Heroku)
* Create (or login to) your heroku account, and install the heroku cli.
* Create a new node js project
* Set the following environment variables
 * CLIENT_ID="YOUR CLIENT ID"
 * CLIENT_SECRET="YOUR SECRET"
 * JUSTIFI_API_URL=https://justifi.ai
 * REACT_APP_API_URL="domain for your heroku app"
