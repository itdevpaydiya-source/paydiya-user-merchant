import React from 'react';
import {
  Alert,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, spacing } from '@/design-system';
import { Screen } from '@/components/Screen';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { Icon } from '@/components/Icon';
import { mockSettlements } from '@/mocks/data';
import { formatINR } from '@/utils/format';

export default function SettlementDetailsScreen({ route }: any) {
  const settlement =
    route.params?.settlement ||
    mockSettlements.find(x => x.id === route.params?.id) ||
    mockSettlements[0];

  const handleCopyUtr = () => {
    Alert.alert('Copied', 'Settlement UTR copied to clipboard.');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Paydiya Settlement: Net ${formatINR(settlement.net)} settled to ${settlement.bank}. UTR: ${settlement.utr}`,
      });
    } catch {
      // Ignored
    }
  };

  return (
    <Screen variant="cream" showBack={true} title="Settlement Details">
      {/* Top Net Settlement Card */}
      <Card style={styles.topCard}>
        <View style={styles.bankIconCircle}>
          <Icon name="bank" size={26} color={colors.primary} />
        </View>

        <Text style={styles.amountLabel}>Net Settled Amount</Text>
        <Text style={styles.netAmount}>{formatINR(settlement.net, true)}</Text>

        <Badge
          label={settlement.status}
          variant={settlement.status === 'Settled' ? 'success' : 'warning'}
          size="medium"
          style={styles.statusBadge}
        />
      </Card>

      {/* Settlement Breakdown Card */}
      <Card style={styles.detailsCard}>
        <Text style={styles.cardHeading}>Settlement Breakdown</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Gross Collections</Text>
          <Text style={styles.value}>{formatINR(settlement.gross)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Refunds Deducted</Text>
          <Text style={[styles.value, styles.deduction]}>
            -{formatINR(settlement.refunds)}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Processing Charges</Text>
          <Text style={[styles.value, styles.deduction]}>
            -{formatINR(settlement.charges)}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Taxes & GST (18%)</Text>
          <Text style={[styles.value, styles.deduction]}>
            -{formatINR(settlement.tax)}
          </Text>
        </View>

        {settlement.adjustments > 0 && (
          <View style={styles.row}>
            <Text style={styles.label}>Adjustments</Text>
            <Text style={[styles.value, styles.deduction]}>
              -{formatINR(settlement.adjustments)}
            </Text>
          </View>
        )}

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={[styles.label, styles.boldLabel]}>Net Transferred</Text>
          <Text style={[styles.value, styles.boldValue]}>
            {formatINR(settlement.net)}
          </Text>
        </View>
      </Card>

      {/* Bank & Reference Details Card */}
      <Card style={styles.detailsCard}>
        <Text style={styles.cardHeading}>Bank & Reference</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Settlement Date</Text>
          <Text style={styles.value}>{settlement.date}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Destination Account</Text>
          <Text style={styles.value}>{settlement.bank}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>UTR Number</Text>
          <TouchableOpacity onPress={handleCopyUtr} style={styles.copyRow}>
            <Text style={styles.value}>{settlement.utr}</Text>
            <Icon name="copy" size={14} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </Card>

      {/* Actions */}
      <View style={styles.actions}>
        <Button
          title="Download Settlement Advice (PDF)"
          onPress={() => Alert.alert('Download', 'Settlement Advice downloaded.')}
          variant="outline"
          leftIcon={<Icon name="download" size={16} color={colors.primary} />}
        />

        <Button
          title="Share Details"
          onPress={handleShare}
          variant="ghost"
          leftIcon={<Icon name="share" size={16} color={colors.charcoal} />}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topCard: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    marginBottom: spacing.base,
  },
  bankIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  amountLabel: {
    fontSize: 13,
    color: colors.charcoalMuted,
    fontWeight: '600',
  },
  netAmount: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.charcoal,
    marginTop: 2,
    marginBottom: spacing.xs,
    letterSpacing: -0.6,
  },
  statusBadge: {
    marginTop: 4,
  },
  detailsCard: {
    padding: spacing.base,
    marginBottom: spacing.base,
  },
  cardHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.charcoal,
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 13,
    color: colors.charcoalMuted,
  },
  value: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.charcoal,
  },
  deduction: {
    color: colors.error,
  },
  boldLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.charcoal,
  },
  boldValue: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.success,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: spacing.sm,
  },
  copyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actions: {
    gap: 8,
    marginBottom: spacing.xl,
  },
});
