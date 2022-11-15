import React from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Grid, Skeleton } from "@mui/material";
import MainLayout from "../common/MainLayout";
import PageLayout from "../common/PageLayout";
import CreateSellerForm from "./CreateSellerForm";
import { ISeller } from "../../api/Seller";
import { getConfig } from "../../config";

export interface IPagination {
  has_previous: boolean;
  has_next: boolean;
  start_cursor: string;
  end_cursor: string;
}

export interface IApiResponse<T> {
  data: T;
  error?: IErrorObject | IServerError;
  page_info?: IPagination;
  errors?: string[];
  id: number;
  type: string;
}

export type IServerError = string;

export interface IErrorObject {
  message: string;
  code: string;
  param?: string;
}

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
  const [url, setUrl] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [serverError, setServerError] = React.useState<
    IErrorObject | IServerError | undefined
  >();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (url.length > 0) {
      navigate(url);
    }
  }, [navigate, url]);

  const doCreateSeller = async (createSellerData: IApiResponse<ISeller>) => {
    const { apiOrigin } = getConfig();
    const headers = {
      Authorization: `Bearer ${process.env.REACT_APP_JWT_TOKEN}`,
      "Content-Type": "application/json",
    };

    setLoading(true);
    const response = await fetch(`${apiOrigin}/v1/seller_accounts`, {
      method: "POST",
      body: JSON.stringify(createSellerData),
      headers,
    });

    const { data, error }: IApiResponse<ISeller> = await response.json();
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
      </PageLayout>
    </MainLayout>
  );
};

export default CreateSeller;
