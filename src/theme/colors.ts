export const hslPalette = {
  black: "0, 0%, 9%",
  pink: "312, 80%, 73%",
  blue: "196, 80%, 68%",
  purple: "247, 60%, 77%",
  brightPurple: "284, 89%, 54%",
  white: "100, 100%, 100%",
} as const

const palette = {
  black: `hsla(${hslPalette.black}, 1)`,
  pink: `hsla(${hslPalette.pink}, 1)`,
  blue: `hsla(${hslPalette.blue}, 1)`,
  purple: `hsla(${hslPalette.purple}, 1)`,
  brightPurple: `hsla(${hslPalette.brightPurple}, 1)`,
  white: `hsla(${hslPalette.white}, 1)`,

  neutral100: "#FFFFFF",
  neutral200: "#F4F2F1",
  neutral300: "#D7CEC9",
  neutral400: "#B6ACA6",
  neutral500: "#978F8A",
  neutral600: "#564E4A",
  neutral700: "#3C3836",
  neutral800: "#191015",
  neutral900: "#000000",

  primary100: "#F4E0D9",
  primary200: "#E8C1B4",
  primary300: "#DDA28E",
  primary400: "#D28468",
  primary500: "#C76542",
  primary600: "#A54F31",

  secondary100: "#DCDDE9",
  secondary200: "#BCC0D6",
  secondary300: "#9196B9",
  secondary400: "#626894",
  secondary500: "#41476E",

  accent100: "#FFEED4",
  accent200: "#FFE1B2",
  accent300: "#FDD495",
  accent400: "#FBC878",
  accent500: "#FFBB50",

  angry100: "#F2D6CD",
  angry500: "#C03403",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
} as const

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  transparent: "rgba(0, 0, 0, 0)",
  text: palette.black,
  textDim: palette.neutral600,
  background: palette.neutral200,
  border: palette.neutral300,
  tint: palette.brightPurple,
  tintInactive: palette.purple,
  separator: palette.neutral300,
  error: palette.angry500,
  errorBackground: palette.angry100,

  sudokuPalette: {
    cellBackground: `hsla(${hslPalette.white}, 1)`,
    cellBackgroundAlt: `hsla(${hslPalette.purple}, 0.1)`,
    cellHighlightedBg: `hsla(${hslPalette.pink}, 0.2)`,
    cellHighlightedBgAlt: `hsla(${hslPalette.blue}, 0.3)`,
    cellSelectedBg: `hsla(${hslPalette.blue}, 0.4)`,

    cellText: `hsla(${hslPalette.purple}, 1)`,
    cellTextAlt: `hsla(${hslPalette.pink}, 1)`,
    cellHighlightedText: `hsla(${hslPalette.pink}, 1)`,
    cellHighlightedTextAlt: `hsla(${hslPalette.blue}, 1)`,
    cellSelectedText: `hsla(${hslPalette.blue}, 1)`,
  },
} as const
