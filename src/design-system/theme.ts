export const colors = {
  cream: '#FBF7F0',
  creamDark: '#F5EDE1',
  white: '#FFFFFF',
  charcoal: '#2B2B2B',
  charcoalLight: '#4A4A4A',
  peach: '#FFD9B8',
  peachLight: '#FFE9D6',
  gold: '#E8A33D',
  orange: '#F08C2E',
  orangeDark: '#D97A1F',
  green: '#2E9E5B',
  greenLight: '#E3F4EA',
  red: '#D9534F',
  redLight: '#FBE7E6',
  blue: '#3A7BD5',
  darkCard: '#1E1E22',
  darkCardBorder: '#2E2E35',
  gray: '#9B9B9B',
  grayLight: '#EDEDED',
  divider: '#EFE6DA',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  full: 999,
};

export const typography = {
  title: { fontSize: 24, fontWeight: '700' as const, color: colors.charcoal },
  heading: { fontSize: 18, fontWeight: '700' as const, color: colors.charcoal },
  body: { fontSize: 15, color: colors.charcoal },
  caption: { fontSize: 12, color: colors.gray },
  amount: { fontSize: 30, fontWeight: '800' as const, color: colors.charcoal },
};

export const theme = { colors, spacing, radius, typography };
