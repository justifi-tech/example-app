import { TableRow, TableCell, Tooltip } from "@mui/material";

const EventsTableHeaderRow = () => {
  return (
    <TableRow>
      <TableCell style={{ width: 120 }}>
        <Tooltip title="Date & Time">
          <span>Date & Time</span>
        </Tooltip>
      </TableCell>
      <TableCell style={{ width: 150 }}>
        <Tooltip title="Account ID">
          <span>Account ID</span>
        </Tooltip>
      </TableCell>
      <TableCell style={{ width: 130 }}>
        <Tooltip title="Event Type">
          <span>Event Type</span>
        </Tooltip>
      </TableCell>
      <TableCell style={{ width: 120 }}>
        <Tooltip title="Event ID">
          <span>Event ID</span>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default EventsTableHeaderRow;
