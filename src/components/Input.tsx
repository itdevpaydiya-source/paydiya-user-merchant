import React, { ReactNode, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { colors, radius, spacing } from '@/design-system';
import { Icon } from './Icon';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  prefixText?: string;
  containerStyle?: ViewStyle;
  isPassword?: boolean;
}

export function Input({
  label,
  error,
  helperText,
  prefixIcon,
  suffixIcon,
  prefixText,
  containerStyle,
  isPassword = false,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(isPassword);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.focused,
          Boolean(error) && styles.errorBorder,
        ]}>
        {prefixIcon && <View style={styles.prefixIcon}>{prefixIcon}</View>}
        {prefixText && <Text style={styles.prefixText}>{prefixText}</Text>}
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.gray500}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isPassword ? hidePassword : props.secureTextEntry}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setHidePassword(!hidePassword)}
            style={styles.eyeButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Icon
              name={hidePassword ? 'eye-off' : 'eye'}
              size={18}
              color={colors.gray500}
            />
          </TouchableOpacity>
        )}
        {suffixIcon && !isPassword && (
          <View style={styles.suffixIcon}>{suffixIcon}</View>
        )}
      </View>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.base,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.charcoalLight,
    marginBottom: spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.divider,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    minHeight: 50,
  },
  focused: {
    borderColor: colors.gold,
    backgroundColor: colors.white,
  },
  errorBorder: {
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.charcoal,
    paddingVertical: spacing.sm,
  },
  prefixIcon: {
    marginRight: spacing.sm,
  },
  suffixIcon: {
    marginLeft: spacing.sm,
  },
  prefixText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.charcoal,
    marginRight: spacing.xs,
  },
  eyeButton: {
    padding: spacing.xs,
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
    marginTop: spacing['2xs'],
    fontWeight: '500',
  },
  helperText: {
    fontSize: 12,
    color: colors.gray500,
    marginTop: spacing['2xs'],
  },
});
