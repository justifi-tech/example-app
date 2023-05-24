import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Grid, Skeleton, Typography } from "@mui/material";
import MainLayout from "../../common/MainLayout";
import PageLayout from "../../common/PageLayout";
import CreateSellerForm from "./CreateSellerForm";
import { Sellers, CreateSellerPayload, ISeller } from "../../../api/Seller";
import { IApiResponse, IErrorObject, IServerError } from "../../../api/Api";
import SelectSeller from "../SelectSeller";

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
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [serverError, setServerError] = useState<
    IErrorObject | IServerError | undefined
  >();
  const navigate = useNavigate();
  const sellers = Sellers();

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (url.length > 0) {
      navigate(url);
    }
  }, [navigate, url]);

  const doCreateSeller = async (payload: CreateSellerPayload) => {
    const { data, error }: IApiResponse<ISeller> = await sellers.createSeller(payload)
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
            <CreateSellerForm submitHandler={doCreateSeller} />
          )}
          {serverError && <CreateSellerError error={serverError} />}
        </Grid>
        <Typography
          sx={{
            textAlign: 'center',
            margin: '15px 0'
          }}
        variant="body1">OR</Typography>
        <SelectSeller
          actions={{
            'element': <Button
              type="submit"
              variant="contained"
              fullWidth
            >
              Continue with selected seller
            </Button>
        }} />
      </PageLayout>
    </MainLayout>
  );
};

export default CreateSeller;
