import { Typography } from "@mui/material";
import { ReactElement } from "react";

const TitleText = ({ children }: { children: ReactElement | string }) => <Typography
  sx={{
    fontSize: "34px",
    color: "#004C4D",
    fontWeight: "bold",
    padding: "0",
  }}
>{children}</Typography>

export {
  TitleText
};