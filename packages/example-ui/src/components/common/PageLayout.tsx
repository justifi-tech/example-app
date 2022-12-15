import { FunctionComponent } from "react";
import { makeStyles } from "@mui/styles";

import Header from "./Header";

const contentOffset = "24px";
const useStyles = makeStyles(
  (theme: any) => ({
    appBarOffset: {
      ...theme.mixins.toolbar,
    },
    layout: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      maxHeight: "100%",
      overflowY: "scroll",
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
    },
    layoutHeader: {
      flexShrink: 1,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(6),
      [theme.breakpoints.up("sm")]: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(6),
      },
    },
    layoutContent: {
      flex: 1,
      marginTop: `${contentOffset}`,
      minHeight: 0,
      maxHeight: `calc(100% + ${contentOffset})`,
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        paddingBottom: theme.spacing(4),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
      },
      [theme.breakpoints.up("2048")]: {
        // eslint-disable-next-line
        maxWidth: `calc(100vw - '30vm' - '256px')`,
      },
    },
    tableWrapper: {
      display: "flex",
      flexDirection: "column",
      maxHeight: "100%",
      maxWidth: "100%",
    },
  }),
  { index: 1 }
);

interface PageLayoutProps {
  header: string | JSX.Element | JSX.Element[];
  subheader?: string | JSX.Element | JSX.Element[];
  children: JSX.Element | JSX.Element[];
}

const PageLayout: FunctionComponent<
  React.PropsWithChildren<PageLayoutProps>
> = (props) => {
  const { header, subheader, children } = props;
  const classes = useStyles();

  return (
    <div className={classes.layout}>
      <div className={classes.layoutHeader}>
        <div className={classes.appBarOffset} />
        <Header header={header} subheader={subheader} />
      </div>
      <div className={classes.layoutContent}>{children}</div>
    </div>
  );
};

export default PageLayout;
