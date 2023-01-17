import { Box } from "@mui/material";
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

  const handleCreatePayment = async (data: any, extras?: Object) => {
    // console.log('submit', data, extras);
    const paymentIntent = await createPaymentIntent({
      amount: data.amount,
      currency: "usd",
      description: data.description
    }, { 'Seller-Account': seller.sellerID });
    console.log(paymentIntent);
    const checkoutSession = await createCheckoutSession({
      payment_intent_id: paymentIntent.id,
      after_payment_url: 'http://localhost:3008/hosted-checkout/success',
      back_url: ''
    });
    console.log(checkoutSession);
  }

  return (
    <Box>
      <SelectSeller handleSubmit={(sellerID: string, sellerName: string) => {setSeller({ sellerID, sellerName })}} />
      <CreatePaymentForm disabled={!seller.sellerID} seller={seller} submitHandler={handleCreatePayment} />
    </Box>
  )
};

export default HostedCheckoutComponent;