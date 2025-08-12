import Svg, { SvgProps, Path } from "react-native-svg"

import { useAppTheme } from "@/theme/context"

export function Logo({
  size = 48,
  variant = "default",
  fill,
  fillA,
  fillB,
  fillC,
  ...props
}: SvgProps & {
  size?: number
  variant?: "default" | "color" | "tinted"
  fill?: string
  fillA?: string
  fillB?: string
  fillC?: string
}) {
  const { theme } = useAppTheme()

  const variantFills = {
    default: ["currentColor", "currentColor", "currentColor"],
    color: ["#66C7F1", "#F184D5", "#ACA6E3"],
    tinted: theme.isDark
      ? ["rgba(255,255,255,0.7)", "rgba(255,255,255,0.9)", "rgba(255,255,255,0.5)"]
      : ["rgba(0,0,0,0.7)", "rgba(0,0,0,0.9)", "rgba(0,0,0,0.5)"],
  }

  // Prioritize:
  // 1 fillA/fillB/fillC        Provided color A, B, and/or C:
  // 2 color                    Provided fill
  // 3 variantFills[...][..]    use currentColor
  const fillColorA = fillA ? fillA : fill ? fill : variantFills[variant][0]
  const fillColorB = fillB ? fillB : fill ? fill : variantFills[variant][1]
  const fillColorC = fillC ? fillC : fill ? fill : variantFills[variant][2]

  return (
    <Svg width={size} height={size} viewBox="0 0 1024 1024" fill="none" {...props}>
      <Path fill={fillColorA} d="M512 632v120H392V632h120Z" />
      <Path fill={fillColorB} d="M392 512v120H272V512h120Z" />
      <Path fill={fillColorC} d="M392 632v120H272V632h120Z" />
      <Path fill={fillColorA} d="M272 632v120H152V632h120Z" />
      <Path fill={fillColorB} d="M392 752v120H272V752h120ZM512 272v120H392V272h120Z" />
      <Path fill={fillColorA} d="M872 272v120H752V272h120Z" />
      <Path fill={fillColorB} d="M872 632v120H752V632h120Z" />
      <Path fill={fillColorA} d="M392 152v120H272V152h120Z" />
      <Path fill={fillColorB} d="M752 152v120H632V152h120Z" />
      <Path fill={fillColorA} d="M752 512v120H632V512h120Z" />
      <Path
        fill={fillColorC}
        d="M392 272v120H272V272h120ZM752 272v120H632V272h120ZM752 632v120H632V632h120Z"
      />
      <Path fill={fillColorB} d="M272 272v120H152V272h120Z" />
      <Path fill={fillColorA} d="M632 272v120H512V272h120Z" />
      <Path fill={fillColorB} d="M632 632v120H512V632h120Z" />
      <Path fill={fillColorA} d="M392 392v120H272V392h120Z" />
      <Path fill={fillColorB} d="M752 392v120H632V392h120Z" />
      <Path fill={fillColorA} d="M752 752v120H632V752h120Z" />
    </Svg>
  )
}
