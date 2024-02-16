export const spacing = {
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  24: 24,
  32: 32,
  40: 40,
  48: 48,
  56: 56,
  64: 64,
  72: 72,
  80: 80
} as const;

export const borderRadius = {
  xSmall: 2,
  small: 4,
  medium: 8,
  large: 16,
  extra: 32,
  pill: 9999
} as const;

export const borderWidth = {
  small: 1,
  medium: 2
} as const;

export const fonts = {
  PlusJakartaSans_Regular: "PlusJakartaSans_400Regular",
  PlusJakartaSans_Bold: "PlusJakartaSans_700Bold"
};

export const base = {
  brand: {
    10: "#fffcf5",
    20: "#fffaed",
    30: "#fff3d4",
    40: "#ff36a6",
    50: "#ffd97a",
    60: "#ffcf57",
    70: "#f7cb58",
    80: "#8f7022",
    90: "#614e1f",
    100: "#33280d"
  },
  green: {
    10: "#E8FAF0",
    20: "#D7F5E5",
    30: "#9BEBBF",
    40: "#51C285",
    50: "#23A15D",
    60: "#008557",
    70: "#006341",
    80: "#0D4F2B",
    90: "#05381D",
    100: "#021F10"
  },
  blue: {
    10: "#F2F7FF",
    20: "#E5F0FF",
    30: "#C2DCFF",
    40: "#75B1FF",
    50: "#308AFF",
    60: "#0A69FA",
    70: "#0050C7",
    80: "#003C94",
    90: "#042961",
    100: "#021026"
  },
  yellow: {
    10: "#FFF9E6",
    20: "#FFEFB3",
    30: "#FFD84D",
    40: "#ED9B16",
    50: "#D67507",
    60: "#B26205",
    70: "#824B0D",
    80: "#663C0C",
    90: "#4D2B05",
    100: "#331C03"
  },
  red: {
    10: "#FFF3F0",
    20: "#FFE9E3",
    30: "#FFCEC2",
    40: "#FF9175",
    50: "#FF5226",
    60: "#DB340B",
    70: "#AD1D00",
    80: "#8A1700",
    90: "#611000",
    100: "#290800"
  },
  grey: {
    10: "#F4F6F7",
    20: "#E8EBEB",
    30: "#DADDDE",
    40: "#C1C4C6",
    50: "#898D8F",
    60: "#6E7375",
    70: "#53575A",
    80: "#2F3133",
    90: "#1F2224",
    100: "#070808"
  },
  white: "#ffffff"
} as const;

export const accent = {
  "on-accent": base.white,
  subtle: base.brand[90],
  muted: base.brand[80],
  dim: base.brand[70],
  moderate: base.brand[60],
  bold: base.brand[40],
  strong: base.brand[30],
  intense: base.brand[20]
} as const;

export const dark = {
  fg: {
    base: base.white,
    muted: base.grey[50],
    subtle: base.grey[60],
    link: accent.moderate,
    disabled: base.grey[60],
    "on-contrast": base.grey[100],
    "static-dark": base.grey[100],
    "static-light": base.white,
    danger: base.red[40],
    success: base.green[40],
    warning: base.yellow[30],
    error: base.red[40],
    info: base.blue[40]
  },
  bg: {
    canvas: base.grey[100],
    subtle: base.grey[90],
    muted: base.grey[80],
    contrast: base.white,
    surface: base.grey[80],
    "interactive-primary": base.grey[80],
    "interactive-secondary": base.grey[70],
    "interactive-tertiary": base.grey[60],
    success: base.green[40],
    "success-contrast": base.green[50],
    error: base.red[40],
    "error-contrast": base.red[50],
    warning: base.yellow[80],
    "warning-contrast": base.yellow[30],
    info: base.blue[80],
    "info-contrast": base.blue[80],
    overlay: "#",
    notification: base.red[60],
    disabled: base.grey[80],
    "danger-primary": base.red[50],
    "danger-secondary": base.red[60],
    "danger-tertiary": base.red[70]
  },
  border: {
    subtle: base.grey[80],
    muted: base.grey[70],
    "interactive-primary": base.grey[70],
    contrast: base.white,
    disabled: base.grey[60],
    error: base.red[40]
  }
} as const;
