import { basicTheme } from "./basicTheme"

export const advancedTheme = {
  basicBoxShadow: `0 0 0 ${basicTheme.normalBorderWidth} ${basicTheme.borderColor}`,
  darkBoxShadow: `0 0 0 ${basicTheme.normalBorderWidth} ${basicTheme.darkBorderColor}`,
  normalHighlightedBoxShadow: `0 0 0 ${basicTheme.normalBorderWidth} ${basicTheme.focusColor}`,
  mediumHighlightedBoxShadow: `0 0 0 ${basicTheme.mediumBorderWidth} ${basicTheme.focusColor}`,
  normalFontFamily: `${basicTheme.primaryGlobalFont}, ${basicTheme.secondaryGlobalFont}`,
}
