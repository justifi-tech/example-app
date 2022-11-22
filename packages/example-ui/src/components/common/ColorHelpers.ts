import { hexToRgb, decomposeColor } from "@mui/material/styles";

export function convertHexToRgba(hex: string, opacity: string): string {
  const rgb = hexToRgb(hex);
  const rgbValues = decomposeColor(rgb).values;
  return `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, ${opacity})`;
}
