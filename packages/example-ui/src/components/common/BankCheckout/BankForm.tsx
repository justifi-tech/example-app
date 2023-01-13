import { useEffect, useRef, useState } from "react";
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
import { JustifiBankAccountForm } from '@justifi/react-components';
import { makeStyles } from "@mui/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { BankErrorCode, CheckoutFormErrors } from "../FormFieldErrors";
import { bankCheckoutFormSchema } from '../makeSchemas';
import JustiFiPalette from "../JustiFiPallete";
import { getConfig } from "../../../config";
import { createPayment } from "../../../api/Payment";
import { formatCentsToDollars } from "../utils";

const { clientId } = getConfig();

const BankError = (errorKey: BankErrorCode, index: number) => (
  <FormHelperText error variant="filled" key={index} >
    {CheckoutFormErrors.validationErrors.bank[errorKey]}
  </FormHelperText>
);
export interface CreatePaymentParams {
  amount: number;
  description: string;
  sellerAccountId: string;
  sellerSafeName: string;
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

function BankForm(props: { params: CreatePaymentParams }) {
  const { params } = props;
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [enableSubmit, setEnableSubmit] = useState<boolean>(false);

  const [paymentMethodErrors, setPaymentMethodErrors] = useState<BankErrorCode[]>();
  const [showPaymentMethodErrors, setShowPaymentMethodErrors] = useState<boolean>(false);
  const [showInvalid, setShowInvalid] = useState<boolean>(true);


  const cardFormRef = useRef(null);
  
  const {
    register,
    handleSubmit,
    formState,
  } = useForm({
    resolver: yupResolver(bankCheckoutFormSchema())
  });

  const errors = formState.errors;

  useEffect(() => {
    setShowInvalid(!!(showPaymentMethodErrors && paymentMethodErrors?.length));
  }, [paymentMethodErrors, showPaymentMethodErrors])

  useEffect(() => {
    if (formState.isDirty && !Object.entries(errors).length) {
      setEnableSubmit(true);
    }
  }, [errors, formState, paymentMethodErrors, showPaymentMethodErrors])
  
  const classes = useStyles();

  async function onSubmit(formValues: any) {
    setShowPaymentMethodErrors(true);
    if (submitting || paymentMethodErrors?.length) return;

    setSubmitting(true);

    const cardForm = (cardFormRef as any).current;
    const paymentMethodMetadata = { ...formValues };
    const tokenizeResponse = await cardForm.tokenize(clientId, paymentMethodMetadata, params.sellerAccountId);

    if (tokenizeResponse.token) {

      const paymentRequest = await createPayment({
        amount: params.amount,
        description: params.description,
        // currency: 'usd', // Ask if this should be flagged as optional in our backend
        // capture_strategy: 'automatic', // Ask if this should be flagged as optional in our backend
        payment_method: { token: tokenizeResponse.token }
      }, {
        'Seller-Account': params.sellerAccountId
      });
      
      setSubmitting(false);
      alert('Payment created: \n' + JSON.stringify(paymentRequest.data));
    } else {
      setSubmitting(false);
      alert('Tokenization error: \n' + tokenizeResponse.errors[0]);
    }
  }

  function onPaymentMethodReady(data: any) {
    setPaymentMethodErrors(data.detail.detail.errors);
  };
  function onPaymentMethodChange(data: any) {
    setPaymentMethodErrors(data.detail.detail.errors);
  };
  function onPaymentMethodBlur(data: any) {
    setPaymentMethodErrors(data.detail.detail.errors);
  };

  return (
    <div className={classes.layout}>
      <div className={classes.layoutContent}>
        <Grid container sx={{
          justifyContent: "center",
          borderRadius: '5px',
        }}>
          <Box
            sx={{
              backgroundColor: "white",
              padding: 4,
              borderRadius: '5px',
              transition: '0.2s ease-in-out filter',
            }}
          >
            <Card>
              <form aria-label="refund form" onSubmit={handleSubmit(onSubmit, onSubmit)}>
                <CardContent>
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
                      {params.sellerSafeName}
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
                    <JustifiBankAccountForm 
                      ref={cardFormRef}
                      onBankAccountFormReady={onPaymentMethodReady}
                      onBankAccountFormChange={onPaymentMethodChange}
                      onBankAccountFormBlur={onPaymentMethodBlur}
                      className={(showInvalid) ? 'justifiCardForm invalid' : 'justifiCardForm'}
                    />
                    {showPaymentMethodErrors ? paymentMethodErrors?.map(
                      (errorKey, index) => BankError(errorKey, index)
                    ) : ''}
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
                      label="Street Address (optional)"
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
                      label="City (optional)"
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
                      width: '100%'
                    }}
                  >
                    <TextField
                      fullWidth
                      id="state"
                      label="State (optional)"
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
                        sx={{ flexShrink: 2, marginLeft: "16px", width: 'auto' }}
                      />
                      {<FormHelperText error>{errors.address_postal_code?.message as string}</FormHelperText>}
                    </FormControl>
                  </Box>
                </CardContent>
                <CardActions sx={{ padding: "0", marginTop: "30px" }}>
                  <Button
                    disabled={!enableSubmit || submitting}
                    type="submit"
                    variant="contained"
                    fullWidth
                  >
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

export default BankForm;
