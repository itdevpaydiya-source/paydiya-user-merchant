import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius } from '@/design-system';

export function Button({
  title,
  onPress,
  variant = 'primary',
}: {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' ? styles.primary : styles.outline,
        pressed && { opacity: 0.8 },
      ]}>
      <Text style={variant === 'primary' ? styles.primaryText : styles.outlineText}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.full,
    paddingVertical: 14,
    alignItems: 'center',
    marginVertical: 6,
  },
  primary: { backgroundColor: colors.peach },
  outline: { borderWidth: 1, borderColor: colors.gold, backgroundColor: 'transparent' },
  primaryText: { color: colors.charcoal, fontWeight: '700', fontSize: 16 },
  outlineText: { color: colors.gold, fontWeight: '700', fontSize: 16 },
});
