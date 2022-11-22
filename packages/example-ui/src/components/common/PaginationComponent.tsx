import React, { Dispatch } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ChevronRight from "@mui/icons-material/ChevronRight";
import ChevronLeft from "@mui/icons-material/ChevronLeft";

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

export interface IPagination {
  has_previous: boolean;
  has_next: boolean;
  start_cursor: string;
  end_cursor: string;
}

export class Pagination implements IPagination {
  public has_previous: boolean;
  public has_next: boolean;
  public start_cursor: string;
  public end_cursor: string;

  constructor(pagination?: IPagination) {
    this.has_previous = pagination?.has_previous || false;
    this.has_next = pagination?.has_next || false;
    this.start_cursor = pagination?.start_cursor || "";
    this.end_cursor = pagination?.end_cursor || "";
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
            disabled={!pagination.has_previous}
            onClick={() => handleClickPrevious(pagination.start_cursor)}
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
            disabled={!pagination.has_next}
            onClick={() => handleClickNext(pagination.end_cursor)}
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
