import React, { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, radius, spacing } from '@/design-system';
import { Icon } from './Icon';

export { Card } from './Card';

interface ScreenProps {
  children: ReactNode;
  variant?: 'cream' | 'dark' | 'white';
  scrollable?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: ReactNode;
  refreshing?: boolean;
  onRefresh?: () => void;
  edges?: ('top' | 'right' | 'bottom' | 'left')[];
}

export function Screen({
  children,
  variant = 'cream',
  scrollable = true,
  style,
  contentContainerStyle,
  title,
  subtitle,
  showBack,
  onBack,
  rightAction,
  refreshing = false,
  onRefresh,
  edges = ['top'],
}: ScreenProps) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const isDark = variant === 'dark';

  const backgroundColor = {
    cream: colors.cream,
    dark: colors.darkCard,
    white: colors.white,
  }[variant];

  // Auto-detect back button:
  // 1. If explicitly defined as boolean, respect it.
  // 2. Otherwise, if title is provided or navigation can go back, show it!
  const shouldShowBack =
    showBack !== undefined
      ? showBack
      : Boolean(title || navigation.canGoBack());

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      try {
        navigation.navigate('Home' as never);
      } catch {
        // Fallback
      }
    }
  };

  const hasHeader = Boolean(title || shouldShowBack || rightAction);

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor }, style]}
      edges={edges}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundColor}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoid}>
        {hasHeader && (
          <View
            style={[
              styles.header,
              {
                borderBottomColor: isDark
                  ? colors.darkCardBorder
                  : colors.divider,
              },
            ]}>
            <View style={styles.headerLeft}>
              {shouldShowBack && (
                <TouchableOpacity
                  onPress={handleBack}
                  style={[
                    styles.backButton,
                    {
                      backgroundColor: isDark
                        ? colors.darkCardSurface
                        : colors.white,
                    },
                  ]}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                  activeOpacity={0.7}
                  accessibilityLabel="Go back"
                  accessibilityRole="button">
                  <Icon
                    name="arrow-left"
                    size={20}
                    color={isDark ? colors.white : colors.charcoal}
                  />
                </TouchableOpacity>
              )}
              {title && (
                <View style={styles.titleContainer}>
                  <Text
                    style={[
                      styles.headerTitle,
                      { color: isDark ? colors.white : colors.charcoal },
                    ]}
                    numberOfLines={1}>
                    {title}
                  </Text>
                  {subtitle && (
                    <Text
                      style={[
                        styles.headerSubtitle,
                        { color: isDark ? colors.gray300 : colors.gray500 },
                      ]}
                      numberOfLines={1}>
                      {subtitle}
                    </Text>
                  )}
                </View>
              )}
            </View>
            {rightAction && <View style={styles.headerRight}>{rightAction}</View>}
          </View>
        )}

        {scrollable ? (
          <ScrollView
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: insets.bottom + 90 },
              contentContainerStyle,
            ]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            refreshControl={
              onRefresh ? (
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor={colors.gold}
                  colors={[colors.gold, colors.orange]}
                />
              ) : undefined
            }>
            {children}
          </ScrollView>
        ) : (
          <View
            style={[
              styles.fixedContent,
              { paddingBottom: insets.bottom + 70 },
              contentContainerStyle,
            ]}>
            {children}
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  titleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContent: {
    padding: spacing.base,
  },
  fixedContent: {
    flex: 1,
    padding: spacing.base,
  },
});
