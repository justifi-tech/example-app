import { TableCell, TableRow, Typography } from "@mui/material";

import {
  formatDate,
  formatTime,
} from "../../common/FormattingUtilities";
import { Event } from "../../../api/Events";

interface EventsTableRowProps {
  data: Event;
}

const EventsTableRow: React.FC<EventsTableRowProps> = ({ data }) => {
  return (
    <TableRow key={data.id}>
      <TableCell>
        <Typography variant="body2">{formatDate(data.data.updated_at)}</Typography>
        <Typography variant="caption">{formatTime(data.data.updated_at)}</Typography>
      </TableCell>
      <TableCell>
        {data.account_id}
      </TableCell>
      <TableCell>
        {data.event_name}
      </TableCell>
      <TableCell>
        {data.id}
      </TableCell>
    </TableRow>
  );
};

export default EventsTableRow;
