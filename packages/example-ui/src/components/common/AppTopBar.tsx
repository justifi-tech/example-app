import { Box, AppBar, Toolbar, Typography } from "@mui/material";

import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as Tree } from "../../assets/tree-logo-2-color.svg";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(
  (theme: any) => ({
    appBarLogo: {
      height: "36px",
      width: "auto",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }),
  { index: 1 }
);

interface AppTopBarProps {
  toggleDrawer: () => void;
}

const AppTopBar = (props: AppTopBarProps) => {
  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SvgIcon className={classes.appBarLogo}>
            <Tree />
          </SvgIcon>
          <Typography
            component="h1"
            sx={{
              marginLeft: "1em",
              fontSize: "20px",
              fontWeight: 700,
              lineHeight: "24px",
            }}
          >
            Landscaping Platform
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppTopBar;
