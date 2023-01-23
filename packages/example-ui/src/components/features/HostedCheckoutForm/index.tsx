import { Box, Button, Card, CardContent, CircularProgress, Grid, Link, Typography } from "@mui/material";
import { useState } from "react";
import SelectSeller from "../SelectSeller";
import CreatePaymentForm from "../../common/Checkout/CreatePaymentForm";
import { createCheckoutSession, createPaymentIntent } from "../../../api/Payment";


const HostedCheckoutComponent = () => {
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
      const paymentIntent = await createPaymentIntent({
        amount: data.amount,
        currency: "usd",
        description: data.description
      }, { 'Seller-Account': seller.sellerID });
      if (!paymentIntent) {
        console.error("Error creating the payment intent");
        return;
      }
      const newCheckoutSession = await createCheckoutSession({
        payment_intent_id: paymentIntent.id,
        after_payment_url: 'http://localhost:3008/hosted-checkout/success',
        back_url: 'http://localhost:3008/hosted-checkout'
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
          <CircularProgress
            size={24}
            sx={{
              color: 'gray',
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
        <Grid item xs={6}>
          <SelectSeller maxWidth="auto" handleSubmit={(sellerID: string, sellerName: string) => {setSeller({ sellerID, sellerName })}} />
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent sx={{ overflow: 'auto', overflowWrap: 'anywhere' }}>
              {checkoutSession
                ?
                <>
                <Typography>You can now redirect to the hosted checkout using the following session ID:</Typography>
                <code style={{ display: 'block', margin: '15px 0', padding: '0 20px' }}>{checkoutSession}</code>
                <Link href={`https://hosted-checkout.justifi-staging.com/${checkoutSession}`}>
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
            title="Create a Payment Intent"
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