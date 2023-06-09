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
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from "@mui/material";
import { JustifiBankAccountForm } from '@justifi/react-components';
import { yupResolver } from "@hookform/resolvers/yup";
import { bankCheckoutFormSchema } from '../makeSchemas';
import JustiFiPalette from "../JustiFiPallete";
import { getConfig } from "../../../config";
import { IPayment, PaymentsApi } from "../../../api/Payment";
import { buildEntityUrl, formatCentsToDollars } from "../utils";
import { SuccessPrompt, TitleText } from "../atoms";

const clientId = process.env.REACT_APP_JUSTIFI_CLIENT_ID || getConfig().clientId;

export interface CreatePaymentParams {
  amount: number;
  description: string;
  sellerAccountId: string;
  sellerSafeName: string;
}

function BankForm(props: { params: CreatePaymentParams }) {
  const Payments = PaymentsApi();
  const { params } = props;
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [enableSubmit, setEnableSubmit] = useState<boolean>(false);
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [createdPayment, setCreatedPayment] = useState<IPayment>();

  const [showPaymentMethodErrors, setShowPaymentMethodErrors] = useState<boolean>(false);


  const bankFormRef = useRef(null);
  
  const {
    register,
    handleSubmit,
    formState,
  } = useForm({
    resolver: yupResolver(bankCheckoutFormSchema())
  });

  const errors = formState.errors;

  useEffect(() => {
    if (formState.isDirty && !Object.entries(errors).length) {
      setEnableSubmit(true);
    }
  }, [errors, formState, showPaymentMethodErrors])

  async function onSubmit(formValues: any) {
    setShowPaymentMethodErrors(true);
    if (submitting || !!Object.entries(errors).length) return;

    setSubmitting(true);

    const bankForm = (bankFormRef as any).current;
    const paymentMethodMetadata = { ...formValues };
    const tokenizeResponse = await bankForm.tokenize(clientId, paymentMethodMetadata, params.sellerAccountId);

    if (tokenizeResponse.id) {
      const paymentRequest = await Payments.createPayment({
        amount: params.amount,
        description: params.description,
        currency: 'usd', // Ask if this should be flagged as optional in our backend
        capture_strategy: 'automatic', // Ask if this should be flagged as optional in our backend
        payment_method: { token: tokenizeResponse.id }
      }, {
        'Seller-Account': params.sellerAccountId
      });
      
      setCreatedPayment(paymentRequest.data);
      setOpenSuccess(true);
    } else if (tokenizeResponse?.errors) {
      alert('Tokenization error: \n' + tokenizeResponse?.errors[0]);
    } else {
      alert('An unkwown error has occurred. Please try again.')
    }

    setSubmitting(false);
  }

  return (
    <Grid container sx={{
      marginTop: {xs: '20px', md: '0'},
      justifyContent: "center",
      borderRadius: '5px',
    }}>
      <Grid item
        md={'auto'}
        sx={{
          width: '100%',
          maxWidth: '600px',
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
                <TitleText>
                  {formatCentsToDollars(params.amount || 0.0)}
                </TitleText>
                {/* TODO: convert to Subtitle component */}
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: "16px",
                    color: JustiFiPalette.grey[700],
                    fontWeight: 400,
                    padding: "0",
                    marginBottom: "12px"
                  }}
                >
                  {params.description}{" "}
                </Typography>
              </Box>
              <Box>
                <JustifiBankAccountForm 
                  iframeOrigin={`${process.env.REACT_APP_JUSTIFI_COMPS_URL || 'https://js.justifi.ai'}/v2`}
                  ref={bankFormRef}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  id="name"
                  label="Account Owner Name"
                  type="text"
                  variant="filled"
                  margin="normal"
                  {...register("name")}
                />
                {<FormHelperText error>{errors.name?.message as string}</FormHelperText>}
              </Box>
              <Box>
                <FormControl
                  variant="filled"
                  fullWidth
                  sx={{
                    margin: '10px 0'
                  }}
                >
                  <InputLabel htmlFor="account_owner_type">Select an account owner type</InputLabel>
                  <Select
                    {...register("account_owner_type")}
                    id="account_owner_type"
                    defaultValue=""
                  >
                    <MenuItem value="individual">Individual</MenuItem>
                    <MenuItem value="company">Company</MenuItem>
                  </Select>
                </FormControl>
                {<FormHelperText error>{errors.account_owner_type?.message as string}</FormHelperText>}
              </Box>
              <Box>
                <FormControl
                  variant="filled"
                  fullWidth
                  sx={{
                    margin: '10px 0'
                  }}
                >
                  <InputLabel htmlFor="account_type">Select an account type</InputLabel>
                  <Select
                    id="account_type"
                    defaultValue=""
                    {...register("account_type")}
                  >
                    <MenuItem value="checking">Checking</MenuItem>
                    <MenuItem value="savings">Savings</MenuItem>
                  </Select>
                </FormControl>
                {<FormHelperText error>{errors.account_type?.message as string}</FormHelperText>}
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
      </Grid>
      <SuccessPrompt
        close={() => setOpenSuccess(false)}
        open={openSuccess}
        createdPayment={createdPayment}
        entityLink={
          process.env.REACT_APP_JUSTIFI_DASHBOARD_URL
          ? buildEntityUrl(params.sellerAccountId || '', createdPayment?.id || '')
          : undefined
        }
      />
    </Grid>
  );
}

export default BankForm;
