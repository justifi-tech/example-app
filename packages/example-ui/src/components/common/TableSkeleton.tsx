import { Skeleton, styled, TableCell, TableRow } from "@mui/material";
import { FunctionComponent } from "react";

const NoBorderTableCell = styled(TableCell)({
  borderBottom: 0,
  padding: "4px 12px",
});

interface TableSkeletonProps {
  numberOfColumns: number;
}

const TableSkeleton: FunctionComponent<
  React.PropsWithChildren<TableSkeletonProps>
> = (props) => {
  const { numberOfColumns, ...other } = props;
  const numberOfSkeletonRows = 8;

  return (
    <>
      {[...Array(numberOfSkeletonRows)].map((el, index) => (
        <TableRow key={index}>
          <NoBorderTableCell
            data-testid={`skeleton-${index}`}
            colSpan={numberOfColumns}
          >
            <Skeleton
              variant="rectangular"
              width="100%"
              height="56px"
              {...other}
            />
          </NoBorderTableCell>
        </TableRow>
      ))}
    </>
  );
};

export default TableSkeleton;
