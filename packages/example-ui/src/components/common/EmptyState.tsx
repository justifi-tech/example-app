import { FunctionComponent } from "react";
import { styled, Typography } from "@mui/material";
import Search from "@mui/icons-material/SearchTwoTone";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import JustiFiPalette from "./JustiFiPallete";

export type CustomIcon = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
  muiName: string;
};

const EmptyStateWrapper = styled("div")({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  margin: "10% auto 0 auto",
  maxWidth: "540px",
  textAlign: "center",
});

interface EmptyStateIconProps {
  iconComponent?: CustomIcon;
}

const EmptyStateIcon: FunctionComponent<
  React.PropsWithChildren<EmptyStateIconProps>
> = (props) => {
  const { iconComponent } = props;
  const IconComponent = iconComponent ? iconComponent : Search;

  return (
    <IconComponent
      sx={{
        color: JustiFiPalette.grey[500],
        height: "160px",
        width: "160px",
        marginBottom: "4px",
      }}
      aria-hidden="true"
    />
  );
};

interface EmptyStateDescriptionProps {
  children: string;
}

// eslint-disable-next-line max-len
export const EmptyStateDescription: FunctionComponent<
  React.PropsWithChildren<EmptyStateDescriptionProps>
> = (props) => {
  const { children } = props;

  return (
    <Typography
      variant="body1"
      component="p"
      color={JustiFiPalette.grey[700]}
      sx={{ marginBottom: "1em" }}
    >
      {children}
    </Typography>
  );
};

interface EmptyStateProps {
  title: string;
  iconComponent?: CustomIcon;
  children?: React.ReactNode;
}

export const EmptyState: FunctionComponent<
  React.PropsWithChildren<EmptyStateProps>
> = (props) => {
  const { title, iconComponent, children } = props;

  return (
    <EmptyStateWrapper>
      <EmptyStateIcon iconComponent={iconComponent} />
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        color={JustiFiPalette.grey[500]}
      >
        {title}
      </Typography>
      {children}
    </EmptyStateWrapper>
  );
};

export default EmptyState;
