import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, radius, shadows, spacing } from '@/design-system';
import { Screen } from '@/components/Screen';
import { Card } from '@/components/Card';
import { Icon, IconName } from '@/components/Icon';
import { Badge } from '@/components/Badge';
import { PaydiyaLogo } from '@/components/PaydiyaLogo';
import { mockMerchant, mockTransactions } from '@/mocks/data';
import { formatINR } from '@/utils/format';

const QUICK_ACTIONS: Array<{
  id: string;
  label: string;
  route: string;
  icon: IconName;
}> = [
  { id: '1', label: 'QR Code', route: 'QR', icon: 'qr' },
  { id: '2', label: 'Payment Link', route: 'PaymentLinks', icon: 'payment-link' },
  { id: '3', label: 'POS', route: 'Devices', icon: 'pos' },
  { id: '4', label: 'Settlements', route: 'Settlements', icon: 'settlements' },
  { id: '5', label: 'Reports', route: 'Reports', icon: 'reports' },
  { id: '6', label: 'Store Settings', route: 'StoreSettings', icon: 'store' },
];

const PERIODS = ['Today', 'Yesterday', 'This Week', 'This Month'];

export default function HomeScreen({ navigation }: any) {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');

  return (
    <Screen variant="cream">
      {/* Top Header matching Reference Screen 2 */}
      <View style={styles.header}>
        <PaydiyaLogo variant="light" size="small" />
        <TouchableOpacity
          onPress={() => navigation.navigate('Notifications')}
          style={styles.notificationBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Icon name="bell" size={20} color={colors.charcoal} />
          <View style={styles.unreadDot} />
        </TouchableOpacity>
      </View>

      {/* Store Identity Card */}
      <Card style={styles.storeCard}>
        <View style={styles.storeRow}>
          <View style={styles.storeIconWrap}>
            <Icon name="store" size={20} color={colors.primary} />
          </View>
          <View style={styles.storeInfo}>
            <Text style={styles.storeName}>{mockMerchant.name}</Text>
            <Text style={styles.storeMid}>MID: {mockMerchant.mid}</Text>
          </View>
          <Icon name="chevron-right" size={18} color={colors.gray500} />
        </View>
      </Card>

      {/* Period Filter Selector */}
      <View style={styles.periodRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {PERIODS.map(period => {
            const isActive = period === selectedPeriod;
            return (
              <TouchableOpacity
                key={period}
                onPress={() => setSelectedPeriod(period)}
                style={[
                  styles.periodChip,
                  isActive && styles.periodChipActive,
                ]}>
                <Text
                  style={[
                    styles.periodText,
                    isActive && styles.periodTextActive,
                  ]}>
                  {period}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Main Business Summary Card matching Reference Image */}
      <Card style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total Received</Text>
        <View style={styles.amountRow}>
          <Text style={styles.amountValue}>
            {formatINR(mockMerchant.totalReceived, true)}
          </Text>
          <Badge
            label={`↑ ${mockMerchant.growth}%`}
            variant="success"
            size="small"
            style={styles.growthBadge}
          />
        </View>

        <View style={styles.statsDivider} />

        <View style={styles.statsGrid}>
          <View style={styles.statCol}>
            <Text style={styles.statValue}>{mockMerchant.transactions}</Text>
            <Text style={styles.statLabel}>Transactions</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.statCol}>
            <Text style={styles.statValue}>
              {formatINR(mockMerchant.averageTransaction)}
            </Text>
            <Text style={styles.statLabel}>Avg. Transaction</Text>
          </View>
        </View>
      </Card>

      {/* Quick Actions (2 x 3 Grid with Icons) */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActionsGrid}>
        {QUICK_ACTIONS.map(action => (
          <TouchableOpacity
            key={action.id}
            onPress={() => navigation.navigate(action.route)}
            style={styles.actionCard}
            activeOpacity={0.75}>
            <View style={styles.actionIconCircle}>
              <Icon name={action.icon} size={22} color={colors.primary} />
            </View>
            <Text style={styles.actionLabel} numberOfLines={2}>
              {action.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recent Transactions */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      {mockTransactions.slice(0, 4).map(item => {
        const isRefund = item.amount < 0;
        const initials = item.customer
          .split(' ')
          .map(w => w[0])
          .join('')
          .slice(0, 2)
          .toUpperCase();

        return (
          <Card
            key={item.id}
            onPress={() => navigation.navigate('TransactionDetails', { transaction: item })}
            style={styles.transactionCard}>
            <View style={styles.txRow}>
              <View style={[styles.avatarCircle, isRefund && styles.refundAvatar]}>
                <Text style={[styles.avatarText, isRefund && styles.refundAvatarText]}>
                  {initials}
                </Text>
              </View>

              <View style={styles.txDetails}>
                <Text style={styles.txCustomer}>{item.customer}</Text>
                <Text style={styles.txMeta}>
                  {item.method} Payment • {item.date}, {item.time}
                </Text>
              </View>

              <View style={styles.txAmountCol}>
                <Text style={[styles.txAmount, isRefund ? styles.txRefund : styles.txSuccess]}>
                  {isRefund ? '-' : '+'}{formatINR(Math.abs(item.amount))}
                </Text>
                <Badge
                  label={item.status}
                  variant={isRefund ? 'error' : 'success'}
                  size="small"
                />
              </View>
            </View>
          </Card>
        );
      })}

      {/* Business Insights matching Reference Screen 2 */}
      <Text style={styles.sectionTitle}>Business Insights</Text>
      <Card style={styles.insightsCard}>
        <View style={styles.insightItem}>
          <View style={styles.insightBullet} />
          <Text style={styles.insightText}>
            Sales increased <Text style={styles.boldInsight}>18%</Text> this week.
          </Text>
        </View>
        <View style={styles.insightItem}>
          <View style={styles.insightBullet} />
          <Text style={styles.insightText}>
            <Text style={styles.boldInsight}>₹12,480</Text> settlement is scheduled for tomorrow.
          </Text>
        </View>
        <View style={styles.insightItem}>
          <View style={styles.insightBullet} />
          <Text style={styles.insightText}>
            UPI represents <Text style={styles.boldInsight}>68%</Text> of all payments.
          </Text>
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.base,
    paddingTop: spacing.xs,
  },
  notificationBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.divider,
    ...shadows.subtle,
  },
  unreadDot: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.orange,
  },
  storeCard: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  storeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeIconWrap: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.charcoal,
  },
  storeMid: {
    fontSize: 12,
    color: colors.charcoalMuted,
    marginTop: 2,
    fontWeight: '500',
  },
  periodRow: {
    marginBottom: spacing.base,
  },
  periodChip: {
    paddingVertical: 7,
    paddingHorizontal: spacing.base,
    borderRadius: radius.full,
    backgroundColor: colors.white,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  periodChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  periodText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.charcoalMuted,
  },
  periodTextActive: {
    color: colors.white,
  },
  summaryCard: {
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  summaryLabel: {
    fontSize: 13,
    color: colors.charcoalMuted,
    fontWeight: '600',
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: spacing.xs,
  },
  amountValue: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.charcoal,
    letterSpacing: -0.6,
  },
  growthBadge: {
    marginLeft: spacing.sm,
  },
  statsDivider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
  },
  verticalDivider: {
    width: 1,
    height: 36,
    backgroundColor: colors.divider,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.charcoal,
  },
  statLabel: {
    fontSize: 12,
    color: colors.charcoalMuted,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.charcoal,
    marginBottom: spacing.md,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  actionCard: {
    width: '31%',
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(235, 227, 214, 0.6)',
    ...shadows.subtle,
  },
  actionIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.charcoal,
    textAlign: 'center',
    marginTop: 2,
  },
  transactionCard: {
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  refundAvatar: {
    backgroundColor: colors.errorLight,
  },
  avatarText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  refundAvatarText: {
    color: colors.error,
  },
  txDetails: {
    flex: 1,
  },
  txCustomer: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.charcoal,
  },
  txMeta: {
    fontSize: 12,
    color: colors.charcoalMuted,
    marginTop: 2,
  },
  txAmountCol: {
    alignItems: 'flex-end',
  },
  txAmount: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  txSuccess: {
    color: colors.success,
  },
  txRefund: {
    color: colors.error,
  },
  insightsCard: {
    padding: spacing.base,
    marginBottom: spacing.xl,
    backgroundColor: colors.white,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  insightBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: spacing.sm,
  },
  insightText: {
    fontSize: 13,
    color: colors.charcoalLight,
    lineHeight: 18,
    flex: 1,
  },
  boldInsight: {
    fontWeight: '700',
    color: colors.charcoal,
  },
});
