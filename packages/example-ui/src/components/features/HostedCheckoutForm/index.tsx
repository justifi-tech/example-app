import { Box, Button, Card, CardContent, Grid, Link, Typography } from "@mui/material";
import { useState } from "react";
import SelectSeller from "../SelectSeller";
import CreatePaymentForm from "../../common/Checkout/CreatePaymentForm";
import { PaymentsApi } from "../../../api/Payment";
import { SpinningLoader } from "../../common/atoms";

const HostedCheckoutComponent = () => {
  const Payments = PaymentsApi();
  const [seller, setSeller] = useState<{
    sellerID: string,
    sellerName: string
  }>({
    sellerID: '',
    sellerName: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [checkoutSession, setCheckoutSession] = useState<string>();

  const handleCreatePayment = async (data: any, extras?: Object) => {
    setLoading(true);
    try {
      const paymentIntent = await Payments.createPaymentIntent({
        amount: data.amount,
        currency: "usd",
        description: data.description
      }, { 'Seller-Account': seller.sellerID });
      if (!paymentIntent) {
        console.error("Error creating the payment intent");
        return;
      }
      const newCheckoutSession = await Payments.createCheckoutSession({
        payment_intent_id: paymentIntent.id,
        after_payment_url: `${window.location.origin}'/hosted-checkout/success'`,
      });
      if (!newCheckoutSession) {
        console.error("Error creating the checkout session")
        return;
      }
      setCheckoutSession(newCheckoutSession.data.checkoutSessionId);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
    setLoading(false);
  }

  return (
    <Box>
      <Grid container spacing={1}>
        {loading && (
          <SpinningLoader />
        )}
        <Grid item xs={6}>
          <SelectSeller
            maxWidth="auto"
            handleSubmit={(sellerID: string, sellerName: string) => {setSeller({ sellerID, sellerName })}}
            submitOnChange
          />
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent sx={{ overflow: 'auto', overflowWrap: 'anywhere' }}>
              {checkoutSession
                ?
                <>
                <Typography>You can now redirect to the hosted checkout using the following session ID:</Typography>
                <code style={{ display: 'block', margin: '15px 0', padding: '0 20px' }}>{checkoutSession}</code>
                <Link href={`${process.env.REACT_APP_HOSTED_CHECKOUT_URL}/${checkoutSession}`}>
                  <Button variant="contained">Go to the Hosted Checkout</Button>
                </Link>
                </>
                :
                <Typography>Once you create the payment, we'll also create automatically a checkout session,
                  and you'll see the next step here</Typography>
              }
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <CreatePaymentForm
            title={`Create a Payment Intent${seller.sellerName ? ' for '+seller.sellerName : ''}`}
            width="auto"
            disabled={!seller.sellerID}
            seller={seller}
            submitHandler={handleCreatePayment}
          />
        </Grid>
      </Grid>
    </Box>
  )
};

export default HostedCheckoutComponent;