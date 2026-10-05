import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, radius, shadows, spacing } from '@/design-system';
import { Screen } from '@/components/Screen';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Badge } from '@/components/Badge';
import { Skeleton } from '@/components/StateViews';
import { mockSettlementService } from '@/mocks/services';
import { Settlement } from '@/types';
import { formatINR } from '@/utils/format';

export default function SettlementsScreen({ navigation }: any) {
  const [upcoming, setUpcoming] = useState<any>(null);
  const [history, setHistory] = useState<Settlement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([mockSettlementService.upcoming(), mockSettlementService.list()]).then(
      ([u, l]) => {
        setUpcoming(u);
        setHistory(l);
        setLoading(false);
      },
    );
  }, []);

  return (
    <Screen variant="cream" showBack={true} title="Settlements">
      {/* Upcoming Settlement Dark Card matching Reference Screen 5 */}
      {upcoming && (
        <Card variant="dark" style={styles.upcomingCard}>
          <Text style={styles.upcomingLabel}>Upcoming Settlement</Text>
          <Text style={styles.upcomingAmount}>
            {formatINR(upcoming.amount, true)}
          </Text>
          <View style={styles.upcomingDateRow}>
            <Icon name="calendar" size={14} color="#94A3B8" />
            <Text style={styles.upcomingDateText}>
              {upcoming.date || 'Tomorrow, 20 Sep 2026'}
            </Text>
          </View>
        </Card>
      )}

      {/* History Header Row */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Settlement History</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Reports')}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* Settlement History List */}
      {loading ? (
        <Skeleton count={4} />
      ) : (
        history.map(s => (
          <Card
            key={s.id}
            onPress={() => navigation.navigate('SettlementDetails', { id: s.id, settlement: s })}
            style={styles.settlementCard}>
            <View style={styles.settlementRow}>
              <View style={styles.bankIconCircle}>
                <Icon name="bank" size={20} color={colors.primary} />
              </View>

              <View style={styles.settlementInfo}>
                <Text style={styles.settlementAmount}>{formatINR(s.amount)}</Text>
                <Text style={styles.settlementDate}>
                  Settled on {s.date}
                </Text>
              </View>

              <Badge
                label={s.status}
                variant={s.status === 'Settled' ? 'success' : 'warning'}
                size="small"
              />
            </View>
          </Card>
        ))
      )}

      {/* Bottom Button matching Reference Screen 5 */}
      <View style={styles.bottomAction}>
        <Button
          title="View Settlement Reports"
          onPress={() => navigation.navigate('Reports')}
          variant="primary"
          size="large"
          leftIcon={<Icon name="reports" size={18} color={colors.charcoal} />}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  upcomingCard: {
    padding: spacing.xl,
    borderRadius: radius.xl,
    marginBottom: spacing.lg,
    backgroundColor: '#181F2A',
    borderColor: '#2B374A',
    ...shadows.dark,
  },
  upcomingLabel: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  upcomingAmount: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.white,
    marginVertical: spacing.sm,
    letterSpacing: -0.6,
  },
  upcomingDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  upcomingDateText: {
    fontSize: 13,
    color: '#94A3B8',
    marginLeft: 6,
    fontWeight: '500',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.charcoal,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  settlementCard: {
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  settlementRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bankIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  settlementInfo: {
    flex: 1,
  },
  settlementAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.charcoal,
  },
  settlementDate: {
    fontSize: 12,
    color: colors.charcoalMuted,
    marginTop: 2,
  },
  bottomAction: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
});
