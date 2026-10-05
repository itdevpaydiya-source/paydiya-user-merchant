import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '@/design-system';
import { Icon, IconName } from './Icon';
import { Button } from './Button';

interface SkeletonProps {
  count?: number;
  height?: number;
}

export function Skeleton({ count = 3, height = 70 }: SkeletonProps) {
  return (
    <View style={styles.skeletonContainer}>
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} style={[styles.skeletonCard, { minHeight: height }]}>
          <View style={styles.skeletonRow}>
            <View style={styles.skeletonAvatar} />
            <View style={styles.skeletonCol}>
              <View style={styles.skeletonTitle} />
              <View style={styles.skeletonSubtitle} />
            </View>
            <View style={styles.skeletonAmount} />
          </View>
        </View>
      ))}
    </View>
  );
}

interface EmptyStateProps {
  title?: string;
  message: string;
  icon?: IconName;
  actionTitle?: string;
  onAction?: () => void;
}

export function EmptyState({
  title = 'No Data Found',
  message,
  icon = 'search',
  actionTitle,
  onAction,
}: EmptyStateProps) {
  return (
    <View style={styles.centerContainer}>
      <View style={styles.iconCircle}>
        <Icon name={icon} size={32} color={colors.goldMuted} />
      </View>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyMessage}>{message}</Text>
      {actionTitle && onAction && (
        <Button
          title={actionTitle}
          onPress={onAction}
          variant="outline"
          size="small"
          fullWidth={false}
          style={styles.emptyButton}
        />
      )}
    </View>
  );
}

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something Went Wrong',
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <View style={styles.centerContainer}>
      <View style={[styles.iconCircle, styles.errorIconCircle]}>
        <Icon name="close" size={30} color={colors.error} />
      </View>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyMessage}>{message}</Text>
      {onRetry && (
        <Button
          title="Try Again"
          onPress={onRetry}
          variant="primary"
          size="small"
          fullWidth={false}
          style={styles.retryButton}
        />
      )}
    </View>
  );
}

export function OfflineBanner() {
  return (
    <View style={styles.banner}>
      <Icon name="wifi-off" size={16} color={colors.orangeDark} />
      <Text style={styles.bannerText}>
        You're offline. Changes will sync once reconnected.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  skeletonContainer: {
    marginVertical: spacing.sm,
  },
  skeletonCard: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.base,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    justifyContent: 'center',
  },
  skeletonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skeletonAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.gray200,
    marginRight: spacing.md,
  },
  skeletonCol: {
    flex: 1,
  },
  skeletonTitle: {
    height: 14,
    borderRadius: 4,
    backgroundColor: colors.gray200,
    width: '70%',
    marginBottom: 6,
  },
  skeletonSubtitle: {
    height: 10,
    borderRadius: 4,
    backgroundColor: colors.gray100,
    width: '45%',
  },
  skeletonAmount: {
    width: 50,
    height: 16,
    borderRadius: 4,
    backgroundColor: colors.gray200,
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing['2xl'],
    marginVertical: spacing.lg,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.peachLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.base,
  },
  errorIconCircle: {
    backgroundColor: colors.errorLight,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.charcoal,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 14,
    color: colors.gray500,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },
  emptyButton: {
    marginTop: spacing.base,
  },
  retryButton: {
    marginTop: spacing.base,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.peachLight,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.base,
    borderRadius: radius.md,
    marginBottom: spacing.base,
    borderWidth: 1,
    borderColor: colors.peach,
  },
  bannerText: {
    color: colors.orangeDark,
    fontSize: 13,
    fontWeight: '600',
    marginLeft: spacing.sm,
    flex: 1,
  },
});
