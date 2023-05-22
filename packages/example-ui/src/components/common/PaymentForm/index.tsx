import { JustifiPaymentForm } from "@justifi/react-components";
import { Box } from "@mui/material";
import SelectSeller from "../../features/SelectSeller";

const PaymentFormComponent = () => {
  
  const onSubmitHandler = (e: any) => {
    console.log(e);
  }

  return (
    <>
    <SelectSeller />
    <Box sx={{
      padding: '20px',
      width: '50%',
      border: '1px solid gray',
      borderRadius: '3px',
      marginTop: '20px'
    }}>
      <JustifiPaymentForm
        clientId={process.env.REACT_APP_JUSTIFI_CLIENT_ID}
        iframeOrigin={`${process.env.REACT_APP_JUSTIFI_COMPS_URL || 'https://js.justifi.ai'}/v2`}
        card={true}
        bankAccount={true}
        onSubmitted={onSubmitHandler}
      />
    </Box>
    </>
  );
}

export default PaymentFormComponent;