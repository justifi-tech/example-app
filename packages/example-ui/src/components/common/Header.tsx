import { FunctionComponent } from "react";
import { Grid, Divider, Typography, styled } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import JustiFiPalette from "./JustiFiPallete";

interface HeaderProps {
  header: string | JSX.Element | JSX.Element[];
  subheader?: string | JSX.Element | JSX.Element[];
  topRight?: JSX.Element | JSX.Element[];
  variant?: "primary" | "secondary";
  divider?: boolean;
}

const FullWidthHeader = styled("header")({ width: "100%" });

const StyledDivider = styled(Divider)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const HeaderText = styled("span")({
  display: "flex",
  alignItems: "center",
  "> span": { marginRight: "8px" },
});

const SubheaderText = styled(Typography)({
  alignItems: "center",
  color: JustiFiPalette.grey[700],
  display: "flex",
  flexWrap: "wrap",
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "1.5",
});

const Header: FunctionComponent<React.PropsWithChildren<HeaderProps>> = (
  props
) => {
  const { header, subheader, topRight, divider, variant = "primary" } = props;
  const fontVariants: {
    primary: { header: Variant; subheader: Variant };
    secondary: { header: Variant; subheader: Variant };
  } = {
    primary: { header: "h4", subheader: "h5" },
    secondary: { header: "h5", subheader: "body2" },
  };

  const topRightElement = (
    <Grid item xs="auto">
      {topRight}
    </Grid>
  );

  return (
    <FullWidthHeader>
      <Grid container spacing={2} wrap="nowrap">
        <Grid item xs>
          <Typography
            variant={fontVariants[variant].header}
            sx={{ fontSize: "34px", color: "#004C4D" }}
          >
            <HeaderText>{header}</HeaderText>
          </Typography>

          {subheader && (
            <SubheaderText variant={fontVariants[variant].subheader}>
              {subheader}
            </SubheaderText>
          )}
        </Grid>
        {topRight && topRightElement}
      </Grid>
      {divider && <StyledDivider />}
    </FullWidthHeader>
  );
};

export default Header;
