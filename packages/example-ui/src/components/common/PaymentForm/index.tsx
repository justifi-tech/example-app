import { JustifiPaymentForm } from "@justifi/react-components";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import SelectSeller from "../../features/SelectSeller";

const PaymentFormComponent = () => {
  const [seller, setSeller] = useState<{sellerID: string, sellerName: string}>()
  const [token, setToken] = useState<string>();
  const onSellerSelected = (selectedSellerID: any, selectedSellerSafeName: any) => {
    setSeller({sellerID: selectedSellerID, sellerName: selectedSellerSafeName});
  }
  const onSubmitHandler = (e: any) => {
    setToken(e.detail.id);
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
            }}>Payment for {seller?.sellerName}</Typography>
          <JustifiPaymentForm
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
          The token produced is:
        </Typography>
        <Typography variant="code1" sx={{ display: 'flex', padding: '20px' }}>
          {token}
        </Typography>
        <Typography variant="body1">
          {token && 'With this tokenized payment method you can proceed to create payments.'}
        </Typography>
      </Box>
    </Box>
  );
}

export default PaymentFormComponent;