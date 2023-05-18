import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
  FormHelperText,
  FormControl
} from "@mui/material";
// import { JustifiCardForm } from '@justifi/react-components';
import { makeStyles } from "@mui/styles";
import { yupResolver } from "@hookform/resolvers/yup";
// import { CardErrorCode, CheckoutFormErrors } from "./FormFieldError";
import { checkoutFormSchema } from '../makeSchemas';
// import FormFieldError, { FormFieldErrorTypes } from "../";
import JustiFiPalette from "../JustiFiPallete";
import { getConfig } from "../../../config";
// import { Payment } from "../../../api/Payment";
// import { createPayment } from "../../../api/Payment";

let { clientId, sellerAccountId } = getConfig();

clientId = 'test_SZ08j7tq500ktvzKOlOtfr5m8mc5F66M';
sellerAccountId = 'acc_2ELCdFp1sPkOVo4h4DD0o7';

export interface JustiFiPaymentsJSArgs {
  clientKey: string;
  theme?: string;
  account?: string;
  iframeOrigin?: string;
}

const JustiFiPaymentsJSConfig: JustiFiPaymentsJSArgs = {
  clientKey: 'test_SZ08j7tq500ktvzKOlOtfr5m8mc5F66M', 
  theme: "white",
  account: 'acc_2ELCdFp1sPkOVo4h4DD0o7',
  iframeOrigin: 'https://js.justifi-staging.com'
};

console.log(clientId, sellerAccountId);

// const CardError = (errorKey: CardErrorCode, index: number) => (
//   <FormHelperText error variant="filled" key={index} >
//     {CheckoutFormErrors.validationErrors.card[errorKey]}
//   </FormHelperText>
// );
export interface CreatePaymentParams {
  amount: number;
  description: string;
  sellerAccountId: string;
}

const contentOffset = "24px";
const useStyles = makeStyles(
  (theme: any) => ({
    layout: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      maxHeight: "100%",
      overflowY: "scroll",
    },
    layoutContent: {
      flex: 1,
      marginTop: `${contentOffset}`,
      minHeight: 0,
      maxHeight: `calc(100% + ${contentOffset})`,
      [theme.breakpoints.up("2048")]: {
        maxWidth: `calc(100vw - '30vm' - '256px')`,
      },
    },
  }),
  { index: 1 }
);

const formatCentsToDollars = (amount: number | undefined) => {
  if (!amount) amount = 0;
  const dollars = amount / 100;
  return `$${dollars.toFixed(2)}`;
};

const JustifiJS = (window as any).JustiFiPaymentsJS(JustiFiPaymentsJSConfig);

function CardFormComponent(props: { params: CreatePaymentParams }) {
  const { params } = props;
  const [enabled, setEnabled] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>();
  const [showCardFormErrors, setShowCardFormErrors] = useState<boolean>(false);
  const [cardFormErrors, setCardFormErrors] = useState<string[]>();

  useEffect(() => {
    setEnabled(!!params.sellerAccountId);
  }, [params])

  // const [paymentMethodErrors, setPaymentMethodErrors] = useState<CardErrorCode[]>();
  // const [showPaymentMethodErrors, setShowPaymentMethodErrors] = useState<boolean>(false);
  // const showInvalid = showPaymentMethodErrors && paymentMethodErrors?.length;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(checkoutFormSchema())
  });
  
  const classes = useStyles();

  useEffect(() => {
    JustifiJS.appendTo("#card-form");
    JustifiJS.on("ready", (data: any) => {
      // You can use the 'ready' event to set your app's loading state
      // so that the card field does not 'pop in'
      console.log("ready!");

      // You can also use the 'ready' event to retrieve initial errors,
      // which can then be shown if the form is submitted prematurely
      setCardFormErrors(data.errors);
    });
    JustifiJS.on("change", (data: any) => {
      setCardFormErrors(data.errors);
    });
  }, []);

  async function onSubmit(formValues: any) {
    setShowCardFormErrors(true);
    if (submitting || cardFormErrors?.length) return;

    setSubmitting(true);

    const tokenizeResponse = await JustifiJS.tokenize({
      ...formValues,
      email: "some@email.test"
    });

    if (tokenizeResponse.token) {
      console.log(tokenizeResponse);
      //  const payment = new Payment({ 
      //    amount: params.amount, 
      //    description: params.description, 
      //    paymentMethod: { token: tokenizeResponse.token }, 
      //  }); 

      //  const paymentRequest = await api.submitPayment(payment); 
      setSubmitting(false);
      /* alert("Payment created: \n" + JSON.stringify(paymentRequest.data)); */
    } else {
      setSubmitting(false);
      alert("Tokenization error: \n" + tokenizeResponse.errors[0]);
    }
  }

  return (
    <div className={classes.layout}>
      <div className={classes.layoutContent}>
        <Grid container sx={{
          justifyContent: "center",
          cursor: !enabled ? 'not-allowed' : '',
          borderRadius: '5px',
        }}>
          <Box
            sx={{
              width: "464px",
              backgroundColor: "white",
              padding: 4,
              borderRadius: '5px',
              filter: !enabled ? 'brightness(0.8)' : '',
              pointerEvents: !enabled ? 'none' : '',
              transition: '0.2s ease-in-out filter',
            }}
          >
            <Card>
              <form aria-label="refund form" onSubmit={handleSubmit(onSubmit)}>
                <CardContent sx={{
                  padding: "0",
                }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "20px",
                        color: "#004C4D",
                        fontWeight: "bold",
                        padding: "0",
                      }}
                    >
                      {params.sellerAccountId}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "34px",
                        color: "#004C4D",
                        fontWeight: "bold",
                        padding: "0",
                      }}
                    >
                      {formatCentsToDollars(params.amount || 0.0)}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: "16px",
                        color: JustiFiPalette.grey[700],
                        fontWeight: 400,
                        padding: "0",
                      }}
                    >
                      {params.description}{" "}
                    </Typography>
                  </Box>
                  <Box sx={{ marginTop: "32px" }}>
                    <TextField
                      fullWidth
                      id="customer-rewards-number"
                      label="Customer Rewards Number (optional)"
                      type="text"
                      variant="filled"
                      margin="normal"
                      {...register("customerRewardsNumber")}
                    />
                  </Box>
                  <Box sx={{ marginTop: "32px" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: "16px",
                        color: JustiFiPalette.grey[700],
                        fontWeight: 400,
                      }}
                    >
                      Payment Method
                    </Typography>
                  </Box>
                  <Box>
                  <FormControl variant="filled" fullWidth>
                      <TextField
                        fullWidth
                        id="name-on-card"
                        label="Name on Card"
                        type="text"
                        variant="filled"
                        margin="normal"
                        {...register("name")}
                        error={!!errors.name}
                      />
                      <FormHelperText error>{errors.name?.message as string}</FormHelperText>
                    </FormControl>
                  </Box>
                  <Box>
                  <div id="card-form"></div>
                    {showCardFormErrors && cardFormErrors?.length ? (
                      'error'
                      // <FormFieldError
                      //   label={"Credit Card"}
                      //   errorType={FormFieldErrorTypes.invalid}
                      // />
                    ) : (
                      ""
                    )}
                  </Box>
                  <Box sx={{ marginTop: "32px" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: "16px",
                        color: JustiFiPalette.grey[700],
                        fontWeight: 400,
                      }}
                    >
                      Billing Address
                    </Typography>
                  </Box>

                  <Box>
                    <TextField
                      fullWidth
                      id="address"
                      label="Street Address"
                      type="text"
                      variant="filled"
                      margin="normal"
                      {...register("streetAddress")}
                    />
                  </Box>
                  <Box>
                    <TextField
                      fullWidth
                      id="apartment"
                      label="Apartment, Suite, etc. (optional)"
                      type="text"
                      variant="filled"
                      margin="normal"
                      {...register("apartment")}
                    />
                  </Box>
                  <Box>
                    <TextField
                      fullWidth
                      id="city"
                      label="City"
                      type="text"
                      variant="filled"
                      margin="normal"
                      {...register("city")}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <TextField
                      fullWidth
                      id="state"
                      label="State"
                      type="text"
                      variant="filled"
                      margin="normal"
                      {...register("state")}
                      sx={{ flexShrink: 1 }}
                    />
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        id="zip"
                        label="Zip"
                        type="text"
                        variant="filled"
                        margin="normal"
                        {...register("address_postal_code")}
                        sx={{ flexShrink: 2, marginLeft: "16px" }}
                      />
                      {<FormHelperText error>{errors.address_postal_code?.message as string}</FormHelperText>}
                    </FormControl>
                  </Box>
                </CardContent>
                <CardActions sx={{ padding: "0", marginTop: "30px" }}>
                  <Button type="submit" variant="contained" fullWidth={true}>
                    Authorize & Capture Payment
                  </Button>
                </CardActions>
              </form>
            </Card>
          </Box>
        </Grid>
      </div>
    </div>
  );
}

export default CardFormComponent;