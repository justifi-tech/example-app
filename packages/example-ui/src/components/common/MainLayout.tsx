import React, { FunctionComponent } from "react";
import { CssBaseline } from "@mui/material";
import { makeStyles } from "@mui/styles";

import AppTopBar from "./AppTopBar";

const useStyles = makeStyles(
  () => ({
    root: {
      position: "fixed",
      width: "100vw",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      overflowX: "hidden",
      overflowY: "hidden",
    },
    content: {
      height: "100%",
    },
  }),
  { index: 1 }
);

interface MainLayoutProps {
  children: JSX.Element | JSX.Element[];
}

// eslint-disable-next-line max-len
const MainLayout: FunctionComponent<
  React.PropsWithChildren<MainLayoutProps>
> = (props) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppTopBar toggleDrawer={() => {}} />
      <main className={classes.content}>{children}</main>
    </div>
  );
};
export default MainLayout;
