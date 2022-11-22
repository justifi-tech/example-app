import React from "react";
import { Paper, styled, TableBody, TableHead } from "@mui/material";

import TableSkeleton from "./TableSkeleton";
import StylizedTable from "./StylizedTable";

const contentOffset = "30px";

export const TableWrapper = styled(Paper)({
  marginTop: `${contentOffset}`,
  display: "flex",
  flexDirection: "column",
  maxWidth: "100%",
});

interface PageTableProps {
  collectionName: string;
  collection: any[];
  isLoading: boolean;
  numberOfColumns: number;
  pagination?: JSX.Element;
  tableHeadRow: JSX.Element;
  tableRowFunction: (data: any) => JSX.Element;
}

export const PageTable = (props: PageTableProps) => {
  const {
    collectionName,
    collection,
    isLoading,
    numberOfColumns,
    pagination,
    tableHeadRow,
    tableRowFunction,
  } = props;
  const tableRows = collection.map((data: any) => tableRowFunction(data));
  const testIdKey = collectionName.split(" ").join("-");
  const tableHeadTestId = `${testIdKey}TableHead`;
  const tableBodyTestId = `${testIdKey}TableBody`;
  const tableSkeletonRows = (
    <TableSkeleton
      numberOfColumns={numberOfColumns}
      aria-label={`${collectionName} loading`}
    />
  );

  return (
    <TableWrapper>
      <StylizedTable
        ariaLabel={`${collectionName} table`}
        pagination={pagination}
      >
        <>
          <TableHead data-testid={tableHeadTestId}>{tableHeadRow}</TableHead>
          <TableBody data-testid={tableBodyTestId}>
            {isLoading ? tableSkeletonRows : tableRows}
          </TableBody>
        </>
      </StylizedTable>
    </TableWrapper>
  );
};
