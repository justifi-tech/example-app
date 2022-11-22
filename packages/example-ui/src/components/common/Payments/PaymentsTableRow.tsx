import { TableCell, TableRow, Tooltip, Typography } from "@mui/material";

import { Payment } from "../../../api/Payment";
import Tag from "../../common/Tag";
import {
  formatDate,
  formatTime,
  formatCurrency,
} from "../../common/FormattingUtilities";
import PaymentMethodDisplay from "../../common/Payments/PaymentMethodDisplay";

interface PaymentsTableRowProps {
  data: Payment;
}

// eslint-disable-next-line max-len
const PaymentsTableRow = (props: PaymentsTableRowProps) => {
  const { data } = props;
  const card = data.payment_method?.card;
  const bankAccount = data.payment_method?.bank_account;
  const accountHolderName = card ? card.name : bankAccount?.name;

  return (
    <TableRow key={data.id}>
      <TableCell>
        <Typography variant="body2">{formatDate(data.created_at)}</Typography>
        <Typography variant="caption">{formatTime(data.created_at)}</Typography>
      </TableCell>
      <TableCell align="right">
        <Typography variant="body2" fontWeight={700}>
          {formatCurrency(data.amount)}
        </Typography>
      </TableCell>
      <TableCell>{data.account_id}</TableCell>
      <TableCell>
        <Typography component="div" variant="body2" noWrap>
          {data.description}
        </Typography>
      </TableCell>
      <TableCell>{data.id}</TableCell>
      <TableCell>{accountHolderName}</TableCell>
      <TableCell align="right">
        <PaymentMethodDisplay paymentMethod={data.payment_method} />
      </TableCell>
      <TableCell>
        <Tooltip title="">
          <Tag type={data.statusTagType}>{`${data.status}`}</Tag>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default PaymentsTableRow;
