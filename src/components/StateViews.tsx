import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '@/design-system';

export function Skeleton({ count = 3 }: { count?: number }) {
  return (
    <View>
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} style={styles.skeletonCard}>
          <View style={styles.skeletonLine} />
          <View style={[styles.skeletonLine, { width: '60%' }]} />
        </View>
      ))}
    </View>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <View style={styles.center}>
      <Text style={styles.errorTitle}>Something went wrong</Text>
      <Text style={styles.errorMsg}>{message}</Text>
      {onRetry && <Text style={styles.retry} onPress={onRetry}>Retry</Text>}
    </View>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <View style={styles.center}>
      <Text style={styles.sub}>{message}</Text>
    </View>
  );
}

export function OfflineBanner() {
  return (
    <View style={styles.banner}>
      <Text style={styles.bannerText}>You're offline. Your latest data may not be available.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  skeletonCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  skeletonLine: {
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.grayLight,
    marginBottom: 8,
    width: '80%',
  },
  center: { alignItems: 'center', padding: spacing.xl },
  errorTitle: { fontWeight: '700', color: colors.charcoal, marginBottom: 4 },
  errorMsg: { color: colors.gray },
  retry: { marginTop: 10, color: colors.orange, fontWeight: '700' },
  sub: { color: colors.gray },
  banner: { backgroundColor: colors.peachLight, padding: 10, borderRadius: 10, marginBottom: 12 },
  bannerText: { color: colors.charcoalLight, fontSize: 13 },
});
