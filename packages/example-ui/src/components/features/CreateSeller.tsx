import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Grid, Skeleton } from "@mui/material";
import MainLayout from "../common/MainLayout";
import PageLayout from "../common/PageLayout";
import CreateSellerForm from "./CreateSellerForm";
import SelectSeller from './SelectSeller';
import { createSeller, CreateSellerPayload, ISeller } from "../../api/Seller";
import { IApiResponse, IErrorObject, IServerError } from "../../api/Base";

const CreateSellerError = (props: { error: IErrorObject | IServerError }) => {
  const { error } = props;
  let errorMessage: string;

  if (typeof error === "string") {
    errorMessage = error;
  } else if (typeof error === "object") {
    errorMessage = error.message;
  } else {
    errorMessage = "";
  }

  return (
    <Grid item xs={12}>
      <Alert aria-label="refund error" severity="error">
        {errorMessage}
      </Alert>
    </Grid>
  );
};

const CreateSeller = () => {
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<
    IErrorObject | IServerError | undefined
  >();
  const navigate = useNavigate();

  useEffect(() => {
    if (url.length > 0) {
      navigate(url);
    }
  }, [navigate, url]);

  const doCreateSeller = async (payload: CreateSellerPayload) => {
    const { data, error }: IApiResponse<ISeller> = await createSeller(payload);
    console.log(data, error);
    if (error) {
      setServerError(error);
    } else {
      setLoading(false);
      setServerError(undefined);
      const to = `/onboarding/${data.id}`;
      setUrl(to);
    }
  };

  return (
    <MainLayout>
      <PageLayout
        header="Hosted Onboarding"
        subheader="This is an example of the platform utilizing hosted onboarding to collect the required information from their sellers via an iframe. To load hosted onboarding, the platform creates a seller first, then feeds that seller’s account id into the iframe URL."
      >
        <Grid container sx={{ justifyContent: "center" }}>
          {loading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            <>
              <CreateSellerForm submitHandler={doCreateSeller} />
              <SelectSeller submitHandler={() => {}}/>
            </>
          )}
          {serverError && <CreateSellerError error={serverError} />}
        </Grid>
      </PageLayout>
    </MainLayout>
  );
};

export default CreateSeller;
