export const colors = {
  // Official Paydiya Brand Palette (from paydiya.com/brand/paydiya-logo-dark.svg)
  primary: '#E59964', // Official Paydiya Peach / Terracotta Accent
  primaryLight: '#FFF2EB',
  primaryDark: '#C9753E',
  primaryGradientStart: '#E59964',
  primaryGradientEnd: '#F7B484',

  // Paydiya Deep Midnight & Charcoal
  charcoal: '#222C38', // Official Paydiya dark SVG fill
  charcoalDark: '#121820',
  charcoalLight: '#3D4A59',
  charcoalMuted: '#687787',
  midnight: '#071B35', // paydiya.com theme-color
  darkBackground: '#111620', // Splash & Login dark background

  // Dark Card & Surfaces
  darkCard: '#181F2A',
  darkCardSurface: '#1F2836',
  darkCardBorder: '#2B374A',
  darkCardText: '#F8FAFC',

  // Warm Cream & Light Surfaces (from reference merchant dashboard)
  cream: '#FBF7F0',
  creamDark: '#F4ECE0',
  creamLight: '#FDFAF5',
  white: '#FFFFFF',

  // Accents matching merchant reference
  peach: '#E59964',
  peachLight: '#FFEEDB',
  peachSubtle: '#FFF7EE',
  gold: '#E59B2E',
  goldLight: '#FDF1DE',
  goldMuted: '#C27E1E',
  orange: '#E87A24',
  orangeDark: '#C76113',

  // Fintech Feedback / Semantics
  success: '#1B9A55',
  successLight: '#E8F7EE',
  successDark: '#12733E',
  error: '#D94841',
  errorLight: '#FDEEEF',
  warning: '#E69500',
  warningLight: '#FFF7E6',
  info: '#2570D4',
  infoLight: '#EBF3FD',

  // Neutrals
  gray: '#7E7E8B',
  grayLight: '#EDEDF2',
  gray900: '#1A1A1E',
  gray700: '#46464F',
  gray500: '#7E7E8B',
  gray300: '#C7C7D0',
  gray200: '#E5E5EB',
  gray100: '#F2F2F5',
  green: '#1B9A55',
  red: '#D94841',
  blue: '#2570D4',
  divider: '#EBE3D6',
  border: '#E8DFD0',
  cardShadow: 'rgba(34, 44, 56, 0.08)',
};

export const spacing = {
  '3xs': 2,
  '2xs': 4,
  xs: 6,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
};

export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 26,
  full: 9999,
};

export const shadows = {
  none: {},
  subtle: {
    shadowColor: '#222C38',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  card: {
    shadowColor: '#222C38',
    shadowOpacity: 0.07,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  floating: {
    shadowColor: '#222C38',
    shadowOpacity: 0.15,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  dark: {
    shadowColor: '#000000',
    shadowOpacity: 0.45,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
};

export const typography = {
  display: {
    fontSize: 28,
    fontWeight: '800' as const,
    color: colors.charcoal,
    letterSpacing: -0.5,
  },
  titleLarge: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: colors.charcoal,
    letterSpacing: -0.3,
  },
  titleMedium: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: colors.charcoal,
  },
  heading: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.charcoal,
  },
  subhead: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: colors.charcoalLight,
  },
  body: {
    fontSize: 14,
    fontWeight: '400' as const,
    color: colors.charcoal,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500' as const,
    color: colors.gray500,
  },
  badge: {
    fontSize: 11,
    fontWeight: '700' as const,
    letterSpacing: 0.2,
  },
  amountLarge: {
    fontSize: 32,
    fontWeight: '800' as const,
    color: colors.charcoal,
    letterSpacing: -0.8,
  },
  amountMedium: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: colors.charcoal,
    letterSpacing: -0.4,
  },
};

export const theme = {
  colors,
  spacing,
  radius,
  shadows,
  typography,
};
