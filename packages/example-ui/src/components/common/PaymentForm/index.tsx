import { JustifiPaymentForm } from "@justifi/react-components";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { PaymentsApi } from "../../../api/Payment";
import SelectSeller from "../../features/SelectSeller";
import { SpinningLoader, SuccessPrompt } from "../atoms";
import { buildEntityUrl, formatCentsToDollars } from "../utils";

const PaymentFormComponent = () => {
  const paymentFormRef = useRef(null);
  const payments = PaymentsApi();
  const [seller, setSeller] = useState<{sellerID: string, sellerName: string}>()
  const [paymentRes, setPaymentRes] = useState<any>();
  const [token, setToken] = useState<string>();
  const [reqError, setReqError] = useState<string>();
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onSellerSelected = (selectedSellerID: any, selectedSellerSafeName: any) => {
    setSeller({sellerID: selectedSellerID, sellerName: selectedSellerSafeName});
  }

  const PayAmount = 1000;
  const onSubmitHandler = async (e: any) => {
    setLoading(true);
    setToken('');
    setReqError('');
    if (e.detail.id) {
      setToken(e.detail.id);
    } else if (e.detail.error) {
      setReqError(e.detail.error.message);
    }

    if (e.detail.id) {
      try {
        const payment = await payments.createPayment({
          amount: PayAmount,
          description: 'test payment from PaymentForm flow',
          currency: 'usd', // Ask if this should be flagged as optional in our backend
          capture_strategy: 'automatic', // Ask if this should be flagged as optional in our backend
          payment_method: { token: e.detail.id }
        }, {
          'Seller-Account': seller?.sellerID
        });
        setPaymentRes(payment);
        setOpenSuccess(true);
      } catch (e) {
        setPaymentRes(e);
      }
    }

    setLoading(false);
    // Re-enable submit button regardless of outcome
    (paymentFormRef as any).current.enableSubmitButton();
  }

  return (
    <Box sx={{
      display: 'flex'
    }}>
      {loading &&
        <SpinningLoader />
      }
      <Box sx={{ width: '50%' }}>
        <Box>
          <Box>
            <SelectSeller submitOnChange handleSubmit={onSellerSelected} />
          </Box>
          <Box sx={{
            opacity: !seller?.sellerName ? 0.5 : 1,
            pointerEvents: !seller?.sellerName ? 'none' : 'unset',
            padding: '20px',
            border: '1px solid gray',
            borderRadius: '3px',
            marginTop: '20px',
            backgroundColor: "#fafafa"
          }}>
            <Typography sx={{
                fontSize: "14px",
                color: "#004C4D",
                fontWeight: "bold",
                padding: "0",
              }}>
              Payment amount: {formatCentsToDollars(PayAmount)}
            </Typography>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#004C4D",
                fontWeight: "bold",
                padding: "0",
                marginBottom: "20px"
              }}>Payment method for: {seller?.sellerName || "<no account selected>"}</Typography>
            <JustifiPaymentForm
              ref={paymentFormRef}
              accountId={seller?.sellerID}
              clientId={process.env.REACT_APP_JUSTIFI_CLIENT_ID}
              iframeOrigin={`${process.env.REACT_APP_JUSTIFI_COMPS_URL || 'https://js.justifi.ai'}/v2`}
              card={true}
              bankAccount={true}
              onSubmitted={onSubmitHandler}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: '50%' }}>
        <Box sx={{ padding: '0 20px' }}>
          <Card>
            <CardContent sx={{ overflow: 'auto', overflowWrap: 'anywhere' }}>
              {token || reqError ?
                <>
                  <Typography variant="h4">
                  {token && 'The token produced is:'}
                  {reqError && 'There was an error with the request:'}
                  </Typography>
                  <Typography variant="code1" sx={{ display: 'flex', padding: '20px' }}>
                    {token}
                    {reqError}
                  </Typography>
                  <Typography variant="body1">
                    {token && 'With this tokenized payment method you can proceed to create payments.'}
                  </Typography>
                </>
              : <Typography>Once you create the payment method, the token will be displayed here.</Typography>
              }
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ padding: '20px' }}>
          <Card>
            <CardContent sx={{ overflow: 'auto', overflowWrap: 'anywhere' }}>
            {!paymentRes ?
              <Typography>After the token has been created, a payment will be created with that token representing a payment method</Typography>
              :
              paymentRes.id ?
                <Box>
                  <Typography variant="h4">Successfully created Payment with id: </Typography>
                  <Typography variant="code1" sx={{ display: 'block', padding: '20px' }}>{paymentRes.id}</Typography>
                </Box>
                :
                <Box>
                  <Typography variant="h4">Failed to create a payment: </Typography>
                  <Typography variant="code1" sx={{ display: 'block', padding: '20px' }}>{paymentRes?.message}</Typography>
                </Box>
            }
            </CardContent>
          </Card>
        </Box>
      </Box>
      {paymentRes &&
        <SuccessPrompt
          open={openSuccess}
          close={() => {setOpenSuccess(false)}}
          createdPayment={paymentRes.data}
          entityLink={
            process.env.REACT_APP_JUSTIFI_DASHBOARD_URL
            ? buildEntityUrl(seller?.sellerID || '', paymentRes?.id)
            : undefined
          }
        />
      }
    </Box>
  );
}

export default PaymentFormComponent;