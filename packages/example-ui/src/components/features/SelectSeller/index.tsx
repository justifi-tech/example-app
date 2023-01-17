import { FormEvent, ReactElement, ReactNode, useEffect, useState } from "react";
import { Alert, Box, Button, Card, CardActions, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, Skeleton, Typography } from "@mui/material";
import { getSellers, ISellerList } from "../../../api/Seller";
import { IApiResponse, IErrorObject, IServerError } from "../../../api/Base";
import styled from "@emotion/styled";
import JustiFiPalette from "../../common/JustiFiPallete";
import { useNavigate } from "react-router";

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

const SubheaderText = styled(Typography)({
  color: JustiFiPalette.grey[700],
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "1.5",
});

const SelectSeller = ({ handleSubmit }: { handleSubmit?: Function }) => {
  const [url, setUrl] = useState<string>("");
  const [enabled, setEnabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [serverError, setServerError] = useState<
    IErrorObject | IServerError | undefined
  >();

  const navigate = useNavigate();
  useEffect(() => {
    if (url.length > 0) {
      navigate(url);
    }
  }, [navigate, url]);

  const [sellers, setSellers] = useState<ISellerList>();
  const [selectedSellerID, setSelectedSellerID] = useState<string>('');
  const [selectedSellerSafeName, setSelectedSellerSafeName] = useState<string>('');

  useEffect(() => {
    setEnabled(!!selectedSellerID);
  }, [selectedSellerID]);

  const fetchAndUpdateSellers = async () => {
    const { data, error }: IApiResponse<ISellerList> = await getSellers();
    if (error) {
      setServerError(error);
      return;
    }
    setSellers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAndUpdateSellers();
  }, [])

  return (
    <Grid container sx={{ justifyContent: "center" }}>
      {loading ? (
        <Skeleton variant="circular" width={40} height={40} />
      ) : (
        <Box sx={{
          width: '100%',
          maxWidth: '600px'
        }}>
          <Card
            variant="outlined"
            sx={{
              width: '100%',
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <form
              onSubmit={(e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                if (handleSubmit) {return handleSubmit(selectedSellerID, selectedSellerSafeName, e);}
                
                return (e: FormEvent<HTMLFormElement>) => {
                  setLoading(false);
                  setServerError(undefined);
                  const to = `/onboarding/${selectedSellerID}`;
                  setUrl(to);
                }}
              }
            >
              <CardContent sx={{ padding: "0" }}>
                <Typography
                  sx={{
                    fontSize: "34px",
                    color: "#004C4D",
                    fontWeight: "bold",
                    padding: "0",
                  }}
                >
                  Select a Seller
                </Typography>
                <SubheaderText variant="h5">
                  {
                    "Select a seller from this account to continue with the onboarding."
                  }
                </SubheaderText>
                <FormControl fullWidth>
                  <InputLabel variant="filled" id="seller-selector">Select a Seller</InputLabel>
                  <Select
                    variant="filled"
                    name="seller-selector"
                    value={selectedSellerID}
                    native={false}
                    onChange={(e, child: any) => {
                      setSelectedSellerID(e.target.value);
                      setSelectedSellerSafeName(child?.props['data-seller-name']);
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
                <CardActions sx={{ padding: "0", marginTop: "30px" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={!enabled}
                  >
                    Continue with selected seller
                  </Button>
                </CardActions>
              </CardContent>
            </form>
          </Card>
        </Box>
      )}
      {serverError && <SelectSellerError error={serverError} />}
    </Grid>
  );
};

export default SelectSeller;
