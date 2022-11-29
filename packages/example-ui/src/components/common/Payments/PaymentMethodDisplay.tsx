import { styled } from "@mui/material";

import { IPaymentMethod } from "../../../api/Payment";

interface PaymentMethodDisplayProps {
  paymentMethod: IPaymentMethod;
}

const StyledPaymentMethodDisplay = styled("span")({
  alignItems: "center",
  display: "inline-flex",
  whiteSpace: "pre",
});

// eslint-disable-next-line max-len
const PaymentMethodDisplay = (props: PaymentMethodDisplayProps) => {
  const { paymentMethod } = props;
  const card = paymentMethod.card;
  const bankAccount = paymentMethod.bankAccount;
  const last4 = card ? card.acctLastFour : bankAccount?.acctLastFour;

  return (
    <StyledPaymentMethodDisplay>
      <span data-testid="last4"> ···· {last4}</span>
    </StyledPaymentMethodDisplay>
  );
};

export default PaymentMethodDisplay;
