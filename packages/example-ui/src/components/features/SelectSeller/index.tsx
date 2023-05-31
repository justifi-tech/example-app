import React, { FormEvent, ReactElement, useEffect, useState } from "react";
import { Alert, Box, Card, CardActions, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Skeleton, Typography } from "@mui/material";
import { Sellers, ISellerList } from "../../../api/Seller";
import { IApiResponse, IErrorObject, IServerError } from "../../../api/Api";
import { useNavigate } from "react-router";
import { TitleText } from "../../common/atoms";

const SelectSellerError = (props: { error: IErrorObject | IServerError }) => {
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

const SelectSeller = (
  { handleSubmit, maxWidth, actions, submitOnChange, noForm, height }: {
    handleSubmit?: Function, maxWidth?: string, actions?: { element: ReactElement },
    submitOnChange?: boolean, noForm?: boolean, height?: number | string
  }) => {
  const [url, setUrl] = useState<string>("");
  const [enabled, setEnabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [serverError, setServerError] = useState<
    IErrorObject | IServerError | undefined
  >();
  const sellersApi = Sellers();

  const navigate = useNavigate();
  useEffect(() => {
    if (url.length > 0) {
      navigate(url);
    }
  }, [navigate, url]);

  const [sellers, setSellers] = useState<ISellerList>();
  const [selectedSubAccountID, setSelectedSubAccountID] = useState<string>('');
  const [selectedSellerSafeName, setSelectedSellerSafeName] = useState<string>('');

  useEffect(() => {
    setEnabled(!!selectedSubAccountID);
  }, [selectedSubAccountID]);

  const fetchAndUpdateSellers = async () => {
    try {
      const { data, error }: IApiResponse<ISellerList> = await sellersApi.getSellers();
      if (error) {
        setServerError(error);
        return;
      }
      setSellers(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAndUpdateSellers();
  }, [])

  const submitHandler = (e: FormEvent<any> | SelectChangeEvent<any>, sellerID?: string, sellerSafeName?: string) => {
    e.preventDefault();
    if (handleSubmit) {
      handleSubmit(sellerID || selectedSubAccountID, sellerSafeName || selectedSellerSafeName, e);
      return;
    }
    
    setLoading(false);
    setServerError(undefined);
    const to = `/onboarding/${selectedSubAccountID}`;
    setUrl(to);
  }

  const FormWrap = ({ children, noForm }: { children: ReactElement, noForm?: boolean }) => 
    !noForm ? <form onSubmit={submitHandler}>{children}</form> : <Box>{children}</Box>

  return (
    <Grid container sx={{ justifyContent: "center" }}>
      <Box sx={{
        width: '100%',
        maxWidth: maxWidth || '600px'
      }}>
        {loading ? (
        <Skeleton variant="rectangular" height={height || (actions ? 235 : 173)}/>
        ) : (
          <Card
            variant={!noForm ? "outlined" : undefined}
            sx={{
              width: '100%',
              padding: `${!noForm ? "32px" : "0"}`,
              margin: `${!noForm ? "unset" : "0"}`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <FormWrap noForm={noForm}>
              <CardContent sx={{ padding: "0 !important" }}>
                {!noForm && 
                  <TitleText>
                    Select a Sub Account
                  </TitleText>
                }
                <FormControl fullWidth>
                  <InputLabel variant="filled" id="subaccount-selector">Select a Sub Account</InputLabel>
                  <Select
                    variant="filled"
                    name="subaccount-selector"
                    value={selectedSubAccountID}
                    native={false}
                    onChange={(e, child: any) => {
                      setSelectedSubAccountID(e.target.value);
                      setSelectedSellerSafeName(child?.props['data-seller-name']);
                      if (submitOnChange) {
                        submitHandler(e, e.target.value, child?.props['data-seller-name']);
                      }
                    }}
                  >
                    {/* Need a case for when there's no sellers in the account */}
                    {
                      sellers?.length 
                      ? sellers.map(seller => <MenuItem key={seller.id} data-seller-name={seller.name} value={seller.id}>{seller.name}</MenuItem>)
                      : null
                    }
                  </Select>
                </FormControl>
                {actions && 
                  <CardActions
                    sx={{ padding: "0", marginTop: "30px" }}
                  >
                    {React.cloneElement(actions.element, { disabled: !enabled })}
                  </CardActions>
                }
              </CardContent>
            </FormWrap>
          </Card>
        )}
      </Box>
      {serverError && <SelectSellerError error={serverError} />}
    </Grid>
  );
};

export default SelectSeller;
