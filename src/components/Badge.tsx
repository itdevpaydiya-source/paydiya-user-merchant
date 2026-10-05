import React, { ReactNode } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, radius, spacing } from '@/design-system';

export type BadgeVariant =
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral'
  | 'peach'
  | 'gold';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'small' | 'medium';
  icon?: ReactNode;
  style?: ViewStyle;
}

export function Badge({
  label,
  variant = 'neutral',
  size = 'small',
  icon,
  style,
}: BadgeProps) {
  const getBadgeColors = () => {
    switch (variant) {
      case 'success':
        return { bg: colors.successLight, text: colors.success };
      case 'warning':
        return { bg: colors.warningLight, text: colors.warning };
      case 'error':
        return { bg: colors.errorLight, text: colors.error };
      case 'info':
        return { bg: colors.infoLight, text: colors.info };
      case 'peach':
        return { bg: colors.peachLight, text: colors.orangeDark };
      case 'gold':
        return { bg: colors.goldLight, text: colors.goldMuted };
      default:
        return { bg: colors.gray100, text: colors.charcoalLight };
    }
  };

  const badgeColors = getBadgeColors();
  const isSmall = size === 'small';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: badgeColors.bg },
        isSmall ? styles.smallContainer : styles.mediumContainer,
        style,
      ]}>
      {icon && <View style={styles.iconWrapper}>{icon}</View>}
      <Text
        style={[
          styles.text,
          { color: badgeColors.text },
          isSmall ? styles.smallText : styles.mediumText,
        ]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.full,
    alignSelf: 'flex-start',
  },
  smallContainer: {
    paddingVertical: 3,
    paddingHorizontal: spacing.sm,
  },
  mediumContainer: {
    paddingVertical: 5,
    paddingHorizontal: spacing.md,
  },
  iconWrapper: {
    marginRight: 4,
  },
  text: {
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  smallText: {
    fontSize: 11,
  },
  mediumText: {
    fontSize: 13,
  },
});
