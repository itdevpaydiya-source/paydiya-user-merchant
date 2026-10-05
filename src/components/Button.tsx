import React, { ReactNode } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { colors, radius, shadows, spacing } from '@/design-system';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'dark' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  fullWidth = true,
}: ButtonProps) {
  const getContainerStyle = () => {
    switch (variant) {
      case 'dark':
        return styles.dark;
      case 'outline':
        return styles.outline;
      case 'ghost':
        return styles.ghost;
      case 'danger':
        return styles.danger;
      default:
        return styles.primary;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'dark':
        return styles.darkText;
      case 'outline':
        return styles.outlineText;
      case 'ghost':
        return styles.ghostText;
      case 'danger':
        return styles.dangerText;
      default:
        return styles.primaryText;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.sizeSmall;
      case 'large':
        return styles.sizeLarge;
      default:
        return styles.sizeMedium;
    }
  };

  const getTextSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.textSizeSmall;
      case 'large':
        return styles.textSizeLarge;
      default:
        return styles.textSizeMedium;
    }
  };

  const spinnerColor = {
    primary: colors.charcoal,
    dark: colors.white,
    outline: colors.gold,
    ghost: colors.charcoal,
    danger: colors.white,
  }[variant];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.base,
        getContainerStyle(),
        getSizeStyle(),
        fullWidth && styles.fullWidth,
        (disabled || loading) && styles.disabled,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator size="small" color={spinnerColor} />
      ) : (
        <View style={styles.contentRow}>
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
          <Text
            style={[styles.baseText, getTextStyle(), getTextSizeStyle(), textStyle]}>
            {title}
          </Text>
          {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing['2xs'],
  },
  fullWidth: {
    width: '100%',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: spacing.sm,
  },
  iconRight: {
    marginLeft: spacing.sm,
  },
  sizeSmall: {
    paddingVertical: 8,
    paddingHorizontal: spacing.base,
  },
  sizeMedium: {
    paddingVertical: 14,
    paddingHorizontal: spacing.xl,
  },
  sizeLarge: {
    paddingVertical: 18,
    paddingHorizontal: spacing['2xl'],
  },
  primary: {
    backgroundColor: colors.peach,
    ...shadows.subtle,
  },
  dark: {
    backgroundColor: colors.charcoal,
    ...shadows.dark,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.gold,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: colors.error,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  baseText: {
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  primaryText: {
    color: colors.charcoal,
  },
  darkText: {
    color: colors.white,
  },
  outlineText: {
    color: colors.gold,
  },
  ghostText: {
    color: colors.charcoal,
  },
  dangerText: {
    color: colors.white,
  },
  textSizeSmall: {
    fontSize: 13,
  },
  textSizeMedium: {
    fontSize: 15,
  },
  textSizeLarge: {
    fontSize: 17,
  },
});
