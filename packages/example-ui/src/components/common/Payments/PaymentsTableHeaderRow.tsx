import { TableRow, TableCell, Tooltip } from "@mui/material";

// eslint-disable-next-line max-len
const PaymentsTableHeaderRow = () => {
  return (
    <TableRow>
      <TableCell style={{ width: 120 }}>
        <Tooltip title="Date & Time">
          <span>Date & Time</span>
        </Tooltip>
      </TableCell>
      <TableCell style={{ width: 100 }} align="right">
        <Tooltip title="Amount">
          <span>Amount</span>
        </Tooltip>
      </TableCell>
      <TableCell style={{ width: 200 }}>
        <Tooltip title="Account ID">
          <span>Account ID</span>
        </Tooltip>
      </TableCell>
      <TableCell style={{ width: 200 }}>
        <Tooltip title="Description">
          <span>Description</span>
        </Tooltip>
      </TableCell>
      <TableCell style={{ width: 240 }}>
        <Tooltip title="Payment ID">
          <span>Payment ID</span>
        </Tooltip>
      </TableCell>
      <TableCell style={{ width: 150 }}>
        <Tooltip title="Account Holder">
          <span>Account Holder</span>
        </Tooltip>
      </TableCell>
      <TableCell style={{ width: 130 }} align="right">
        <Tooltip title="Payment Method">
          <span>Payment Method</span>
        </Tooltip>
      </TableCell>
      <TableCell style={{ width: 120 }}>
        <Tooltip title="Status">
          <span>Status</span>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default PaymentsTableHeaderRow;
