import React, { Dispatch } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ChevronRight from "@mui/icons-material/ChevronRight";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import { IPagination } from "../../api/Api";

const useStyles = makeStyles(
  {
    footer: {
      alignItems: "center",
      borderTop: "1px solid rgba(224, 224, 224, 1)",
      display: "flex",
      flexShrink: 1,
      justifyContent: "flex-end",
      minHeight: "64px",
      padding: "0 16px",
      "& button:not(:last-child)": {
        marginRight: "6px",
      },
    },
  },
  { index: 1 }
);

export class Pagination implements IPagination {
  public hasPrevious: boolean;
  public hasNext: boolean;
  public startCursor: string;
  public endCursor: string;

  constructor(pagination?: IPagination) {
    this.hasPrevious = pagination?.hasPrevious || false;
    this.hasNext = pagination?.hasNext || false;
    this.startCursor = pagination?.startCursor || "";
    this.endCursor = pagination?.endCursor || "";
  }
}

interface PaginationProps {
  pagination: IPagination;
  setParams: Dispatch<any>;
  params?: any;
}

// eslint-disable-next-line max-len
const PaginationComponent = (props: PaginationProps) => {
  const { pagination, setParams, params } = props;
  const classes = useStyles();

  const handleClickPrevious = (beforeCursor: string) => {
    const newParams: any = { ...params };
    delete newParams.after_cursor;
    setParams({ ...newParams, before_cursor: beforeCursor });
  };

  const handleClickNext = (afterCursor: string) => {
    const newParams: any = { ...params };
    delete newParams.before_cursor;
    setParams({ ...newParams, after_cursor: afterCursor });
  };

  return (
    <div className={classes.footer}>
      <Tooltip title="Previous page">
        <span>
          <IconButton
            disabled={!pagination.hasPrevious}
            onClick={() => handleClickPrevious(pagination.startCursor)}
            aria-label="Previous page"
            data-testid="pagination-previous"
          >
            <ChevronLeft />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Next page">
        <span>
          <IconButton
            disabled={!pagination.hasNext}
            onClick={() => handleClickNext(pagination.endCursor)}
            aria-label="Next page"
            data-testid="pagination-next"
          >
            <ChevronRight />
          </IconButton>
        </span>
      </Tooltip>
    </div>
  );
};

export default PaginationComponent;
