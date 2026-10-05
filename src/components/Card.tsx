import React, { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { colors, radius, shadows, spacing } from '@/design-system';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'dark' | 'tinted' | 'outlined';
  style?: ViewStyle;
  onPress?: () => void;
  padding?: number;
}

export function Card({
  children,
  variant = 'default',
  style,
  onPress,
  padding = spacing.base,
}: CardProps) {
  const getCardStyle = () => {
    switch (variant) {
      case 'dark':
        return styles.dark;
      case 'tinted':
        return styles.tinted;
      case 'outlined':
        return styles.outlined;
      default:
        return styles.default;
    }
  };

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={[styles.base, getCardStyle(), { padding }, style]}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.base, getCardStyle(), { padding }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.xl,
    marginBottom: spacing.base,
  },
  default: {
    backgroundColor: colors.white,
    ...shadows.card,
    borderWidth: 1,
    borderColor: 'rgba(235, 227, 214, 0.5)',
  },
  dark: {
    backgroundColor: colors.darkCard,
    ...shadows.dark,
    borderWidth: 1,
    borderColor: colors.darkCardBorder,
  },
  tinted: {
    backgroundColor: colors.peachLight,
    borderWidth: 1,
    borderColor: colors.peach,
    ...shadows.subtle,
  },
  outlined: {
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.divider,
  },
});
