import React from "react";
import { useParams } from "react-router-dom";
import IFrame from "react-iframe";
import { Grid } from "@mui/material";
import MainLayout from "../common/MainLayout";
import PageLayout from "../common/PageLayout";

const Onboarding = () => {
  let { seller_account_id } = useParams();
  const url = `${process.env.REACT_APP_HOSTED_ONBOARDING_URL}/${seller_account_id}`;

  return (
    <MainLayout>
      <PageLayout
        header="Hosted Onboarding"
        subheader="This is an example of the platform utilizing hosted onboarding to collect the required information from their sellers via an iframe. To load hosted onboarding, the platform creates a seller first, then feeds that seller’s account id into the iframe URL."
      >
        <Grid container sx={{ justifyContent: "center" }}>
          <IFrame url={url} position="relative" width="1440" height="1087" />
        </Grid>
      </PageLayout>
    </MainLayout>
  );
};

export default Onboarding;
