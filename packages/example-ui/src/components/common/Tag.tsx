import React, { forwardRef, LegacyRef } from "react";
import { styled } from "@mui/material";

import JustiFiPalette from "./JustiFiPallete";
import { convertHexToRgba } from "./ColorHelpers";

export enum TagTypes {
  neutral = "neutral",
  info = "info",
  success = "success",
  warning = "warning",
  error = "error",
}

interface TagProps {
  type: TagTypes;
  children: string;
}

const backgroundColorOpacity = "0.15";
const PREFIX = "Tag";
const classes = {
  root: `${PREFIX}-root`,
  neutral: `${PREFIX}-${TagTypes.neutral}`,
  info: `${PREFIX}-${TagTypes.info}`,
  success: `${PREFIX}-${TagTypes.success}`,
  warning: `${PREFIX}-${TagTypes.warning}`,
  error: `${PREFIX}-${TagTypes.error}`,
};
const StyledTag = styled("span")(({ theme }) => ({
  [`&.${classes.root}`]: {
    borderRadius: "2px",
    fontFamily: theme.typography.fontFamily,
    fontSize: ".625rem",
    fontWeight: 600,
    letterSpacing: "1.25px",
    lineHeight: ".75rem",
    padding: "4px",
    textTransform: "uppercase",
  },
  [`&.${classes.neutral}`]: {
    color: JustiFiPalette.grey[700],
    backgroundColor: convertHexToRgba(
      JustiFiPalette.grey[700],
      backgroundColorOpacity
    ),
  },
  [`&.${classes.info}`]: {
    color: JustiFiPalette.blue[800],
    backgroundColor: convertHexToRgba(
      JustiFiPalette.blue[800],
      backgroundColorOpacity
    ),
  },
  [`&.${classes.success}`]: {
    color: JustiFiPalette.green[600],
    backgroundColor: convertHexToRgba(
      JustiFiPalette.green[600],
      backgroundColorOpacity
    ),
  },
  [`&.${classes.warning}`]: {
    color: JustiFiPalette.orange[800],
    backgroundColor: convertHexToRgba(
      JustiFiPalette.orange[800],
      backgroundColorOpacity
    ),
  },
  [`&.${classes.error}`]: {
    color: JustiFiPalette.red[800],
    backgroundColor: convertHexToRgba(
      JustiFiPalette.red[800],
      backgroundColorOpacity
    ),
  },
}));

const Tag = forwardRef((props: TagProps, ref: LegacyRef<HTMLSpanElement>) => {
  const { type, children } = props;
  const cssClasses = `${classes.root} ${classes[type]}`;
  return (
    <StyledTag {...props} className={cssClasses} ref={ref}>
      {children}
    </StyledTag>
  );
});

export default Tag;
