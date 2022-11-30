import { Table, TableContainer } from "@mui/material";
import { makeStyles } from "@mui/styles";

import JustiFiPalette from "./JustiFiPallete";

const useStyles = makeStyles(
  () => ({
    table: {
      tableLayout: "fixed",
      "& .MuiTableCell-root": {
        "&:first-child": { paddingLeft: "24px" },
        "&:last-child": { paddingRight: "24px" },
      },
      "& .MuiTableCell-head": {
        backgroundColor: JustiFiPalette.grey[300],
        color: JustiFiPalette.grey[700],
      },
    },
  }),
  { index: 1 }
);

interface StylizedTableProps {
  ariaLabel: string;
  pagination?: JSX.Element;
  children: JSX.Element | JSX.Element[];
}

const StylizedTable = (props: StylizedTableProps) => {
  const { ariaLabel, pagination, children } = props;
  const classes = useStyles();

  return (
    <>
      <TableContainer>
        <Table stickyHeader aria-label={ariaLabel} className={classes.table}>
          {children}
        </Table>
      </TableContainer>
      {pagination ? pagination : ""}
    </>
  );
};

export default StylizedTable;
