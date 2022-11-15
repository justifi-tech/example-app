import { createTheme } from "@mui/material/styles";

import JustiFiPalette from "./components/common/JustiFiPallete";

const fallbackFonts = "'Helvetica Neue', Arial, sans-serif";
export const fontFamily1 = `Roboto Slab, ${fallbackFonts}`;
export const fontFamily2 = `Josefin Sans, ${fallbackFonts}`;
export const monospaceFontFamily = "'Josefin Sans', monospace";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    fontFamily2: React.CSSProperties["fontFamily"];
    code1: {
      fontFamily: React.CSSProperties["fontFamily"];
      fontSize: React.CSSProperties["fontSize"];
      lineHeight: React.CSSProperties["lineHeight"];
    };
    code2: {
      fontFamily: React.CSSProperties["fontFamily"];
      fontSize: React.CSSProperties["fontSize"];
      lineHeight: React.CSSProperties["lineHeight"];
    };
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    fontFamily2?: React.CSSProperties["fontFamily"];
    code1: {
      fontFamily: React.CSSProperties["fontFamily"];
      fontSize: React.CSSProperties["fontSize"];
      lineHeight: React.CSSProperties["lineHeight"];
    };
    code2: {
      fontFamily: React.CSSProperties["fontFamily"];
      fontSize: React.CSSProperties["fontSize"];
      lineHeight: React.CSSProperties["lineHeight"];
    };
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    code1: true;
    code2: true;
  }
}

// A custom theme for this app
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: fontFamily1,
    fontFamily2: fontFamily2,
    h1: {
      fontFamily: fontFamily1,
      fontWeight: 700,
    },
    h2: {
      fontFamily: fontFamily2,
      fontWeight: 700,
    },
    h3: {
      fontFamily: fontFamily2,
      fontWeight: 700,
    },
    h4: {
      fontFamily: fontFamily1,
      fontWeight: 700,
    },
    h5: {
      fontFamily: fontFamily2,
      fontWeight: 700,
    },
    h6: {
      fontFamily: fontFamily2,
      fontWeight: 400,
    },
    caption: {
      color: JustiFiPalette.grey[700],
      lineHeight: 1.333,
    },
    code1: {
      fontFamily: monospaceFontFamily,
      fontSize: ".9375rem",
      lineHeight: 1.2,
    },
    code2: {
      fontFamily: monospaceFontFamily,
      fontSize: ".8125rem",
      lineHeight: 1.385,
    },
    overline: {
      letterSpacing: ".0625rem",
    },
    subtitle1: {
      fontFamily: fontFamily2,
      fontWeight: 600,
    },
  },
  palette: {
    mode: "light",
    background: {
      default: JustiFiPalette.grey[100],
    },
    primary: {
      main: JustiFiPalette.yellow[400],
    },
    secondary: {
      main: "#665E57",
    },
    grey: {
      500: JustiFiPalette.grey[500],
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          opacity: 1,
          backgroundColor: "#B3CCB3",
          boxShadow:
            "0px 2px 4px rgba(0,0,0, 0.02), 0px 4px 5px rgba(0,0,0, 0.14), 0px 1px 10px rgba(0,0,0, 0.12)",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: JustiFiPalette.grey[600],
          "&.Mui-checked": {
            color: JustiFiPalette.grey[900],
          },
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontFamily: fontFamily2,
          fontSize: "24px",
          fontWeight: 700,
          lineHeight: "32px",
          paddingBottom: "10px",
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: JustiFiPalette.grey[100],
          "&.MuiInputBase-formControl.Mui-focused": {
            backgroundColor: JustiFiPalette.grey[100],
          },
          "&.MuiInputBase-formControl:hover": {
            backgroundColor: JustiFiPalette.grey[200],
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: JustiFiPalette.grey[700],
          "&.Mui-focused": { color: JustiFiPalette.grey[900] },
          "&.Mui-error": { color: JustiFiPalette.red[800] },
          "&.Mui-error.Mui-focused": { color: JustiFiPalette.red[800] },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: JustiFiPalette.blue[800],
          textDecorationColor: JustiFiPalette.blue[800],
          textDecoration: "none",
          "&:hover": { textDecoration: "underline" },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "1px",
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          backgroundColor: JustiFiPalette.grey[800],
          borderRadius: "1px",
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          color: JustiFiPalette.yellow[400],
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: JustiFiPalette.grey[600],
          fontFamily: fontFamily2,
          fontWeight: 600,
          letterSpacing: 1.5,
          "&.Mui-selected": { color: JustiFiPalette.grey[800] },
          "&:hover": { backgroundColor: JustiFiPalette.yellow[50] },
          "& .MuiTouchRipple-child": {
            backgroundColor: `${JustiFiPalette.yellow[300]} !important`,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: "4px",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          height: "52px",
          padding: "8px 12px",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head": {
            fontFamily: fontFamily2,
            fontWeight: 600,
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: JustiFiPalette.grey[800],
          borderRadius: "1px",
          padding: "6px 8px",
          maxWidth: 350,
          "&.MuiTooltip-tooltipPlacementBottom": {
            margin: "8px 0",
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          "& .MuiSwitch-switchBase:not(.Mui-checked) .MuiSwitch-thumb": {
            background: JustiFiPalette.grey[200],
          },
          "& .MuiSwitch-switchBase:not(.Mui-checked) + .MuiSwitch-track": {
            background: JustiFiPalette.grey[900],
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root": { color: JustiFiPalette.grey[700] },
          "& .MuiInputLabel-root.Mui-focused": {
            color: JustiFiPalette.grey[900],
          },
          "& .MuiInputLabel-root.Mui-error": { color: JustiFiPalette.red[800] },
          "& .MuiInputLabel-root.Mui-error.Mui-focused": {
            color: JustiFiPalette.red[800],
          },
          "& .MuiFilledInput-root": {
            backgroundColor: JustiFiPalette.grey[100],
          },
          "& .MuiFilledInput-root:hover": {
            backgroundColor: JustiFiPalette.grey[200],
          },
          "& .MuiFilledInput-root.Mui-focused": {
            backgroundColor: JustiFiPalette.grey[100],
          },
          "& .MuiFilledInput-root.Mui-error:after": {
            borderBottomColor: JustiFiPalette.red[800],
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          "&.Mui-error": { color: JustiFiPalette.red[800] },
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          color: JustiFiPalette.grey[700],
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => {
          if (
            ownerState.variant === "contained" &&
            ownerState.color === "primary"
          ) {
            return {
              backgroundColor: "#004C4D",
              color: "#fff",
              fontFamily: fontFamily2,
              fontWeight: 600,
              fontSize: "14px",
              lineHeight: "20px",
              textTransform: "uppercase",
              letterSpacing: "1px",
              opacity: 1,
            };
          }
        },
      },
    },
  },
});

export default theme;
