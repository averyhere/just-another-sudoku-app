// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here

import { Platform } from "react-native"
import {
  LexendDeca_100Thin as lexendDecaThin,
  LexendDeca_200ExtraLight as lexendDecaExtraLight,
  LexendDeca_300Light as lexendDecaLight,
  LexendDeca_400Regular as lexendDecaRegular,
  LexendDeca_500Medium as lexendDecaMedium,
  LexendDeca_600SemiBold as lexendDecaSemiBold,
  LexendDeca_700Bold as lexendDecaBold,
  LexendDeca_800ExtraBold as lexendDecaExtraBold,
  LexendDeca_900Black as lexendDecaBlack,
} from "@expo-google-fonts/lexend-deca"

export const customFontsToLoad = {
  lexendDecaThin,
  lexendDecaExtraLight,
  lexendDecaLight,
  lexendDecaRegular,
  lexendDecaMedium,
  lexendDecaSemiBold,
  lexendDecaBold,
  lexendDecaExtraBold,
  lexendDecaBlack,
}

const fonts = {
  lexendDeca: {
    thin: "lexendDecaThin",
    extraLight: "lexendDecaExtraLight",
    light: "lexendDecaLight",
    regular: "lexendDecaRegular",
    medium: "lexendDecaMedium",
    semiBold: "lexendDecaSemiBold",
    bold: "lexendDecaBold",
    extraBold: "lexendDecaExtraBold",
    black: "lexendDecaBlack",
  },
  helveticaNeue: {
    // iOS only font.
    thin: "HelveticaNeue-Thin",
    light: "HelveticaNeue-Light",
    normal: "Helvetica Neue",
    medium: "HelveticaNeue-Medium",
  },
  courier: {
    // iOS only font.
    normal: "Courier",
  },
  sansSerif: {
    // Android only font.
    thin: "sans-serif-thin",
    light: "sans-serif-light",
    normal: "sans-serif",
    medium: "sans-serif-medium",
  },
  monospace: {
    // Android only font.
    normal: "monospace",
  },
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.lexendDeca,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: Platform.select({ ios: fonts.helveticaNeue, android: fonts.sansSerif }),
  /**
   * Lets get fancy with a monospace font!
   */
  code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
}
