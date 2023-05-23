import { JustifiPaymentForm } from "@justifi/react-components";
import { Box, Typography } from "@mui/material";
import { useRef, useState } from "react";
import SelectSeller from "../../features/SelectSeller";

const PaymentFormComponent = () => {
  const paymentFormRef = useRef(null);
  const [seller, setSeller] = useState<{sellerID: string, sellerName: string}>()
  const [token, setToken] = useState<string>();
  const [reqError, setReqError] = useState<string>();
  const onSellerSelected = (selectedSellerID: any, selectedSellerSafeName: any) => {
    setSeller({sellerID: selectedSellerID, sellerName: selectedSellerSafeName});
  }
  const onSubmitHandler = (e: any) => {
    setToken('');
    setReqError('');
    if (e.detail.id) {
      setToken(e.detail.id);
    } else if (e.detail.error) {
      setReqError(e.detail.error.message);
    }
    // Re-enable submit button regardless of outcome
    (paymentFormRef as any).current.enableSubmitButton();
  }

  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: '50% 50%'
    }}>
      <Box>
        <Box>
          <SelectSeller handleSubmit={onSellerSelected} />
        </Box>
        <Box sx={{
          padding: '20px',
          border: '1px solid gray',
          borderRadius: '3px',
          marginTop: '20px',
          backgroundColor: "#fafafa"
        }}>
          <Typography
            sx={{
              fontSize: "20px",
              color: "#004C4D",
              fontWeight: "bold",
              padding: "0",
              marginBottom: "20px"
            }}>Payment method for {seller?.sellerName}</Typography>
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
      <Box sx={{ padding: '0 20px' }}>
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
      </Box>
    </Box>
  );
}

export default PaymentFormComponent;