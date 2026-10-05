import React, { useEffect, useState } from 'react';
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
import { Skeleton } from '@/components/StateViews';
import { mockTransactionService } from '@/mocks/services';
import { Transaction } from '@/types';
import { formatINR } from '@/utils/format';

export default function TransactionDetailsScreen({ route, navigation }: any) {
  const transactionId = route.params?.id || route.params?.transaction?.id;
  const initialData = route.params?.transaction;
  const [txn, setTxn] = useState<Transaction | null>(initialData || null);
  const [loading, setLoading] = useState(!initialData);

  useEffect(() => {
    if (transactionId) {
      mockTransactionService.getById(transactionId).then(data => {
        if (data) setTxn(data);
        setLoading(false);
      });
    }
  }, [transactionId]);

  if (loading || !txn) {
    return (
      <Screen variant="cream" showBack={true} title="Transaction Details">
        <Skeleton count={4} />
      </Screen>
    );
  }

  const isRefund = txn.amount < 0 || txn.status === 'REFUNDED';

  const handleCopy = (val: string, label: string) => {
    Alert.alert('Copied', `${label} copied to clipboard.`);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Paydiya Receipt: ${txn.customer} paid ${formatINR(txn.amount)} via ${txn.method}. UTR: ${txn.utr}. Transaction ID: ${txn.id}`,
      });
    } catch {
      // Ignored
    }
  };

  return (
    <Screen variant="cream" showBack={true} title="Transaction Details">
      {/* Top Status Card */}
      <Card style={styles.topCard}>
        <View
          style={[
            styles.statusIconWrap,
            isRefund ? styles.refundIconWrap : styles.successIconWrap,
          ]}>
          <Icon
            name={isRefund ? 'refund' : 'check'}
            size={28}
            color={isRefund ? colors.error : colors.success}
          />
        </View>

        <Text
          style={[
            styles.amount,
            isRefund ? styles.refundAmount : styles.successAmount,
          ]}>
          {isRefund ? '-' : '+'}{formatINR(Math.abs(txn.amount), true)}
        </Text>

        <Text style={styles.customerName}>{txn.customer}</Text>

        <Badge
          label={txn.status}
          variant={isRefund ? 'error' : txn.status === 'SUCCESS' ? 'success' : 'warning'}
          size="medium"
          style={styles.statusBadge}
        />
      </Card>

      {/* Breakdown Details */}
      <Card style={styles.detailsCard}>
        <Text style={styles.sectionHeading}>Payment Details</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Transaction ID</Text>
          <TouchableOpacity
            onPress={() => handleCopy(txn.id, 'Transaction ID')}
            style={styles.valueRow}>
            <Text style={styles.value}>{txn.id}</Text>
            <Icon name="copy" size={14} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Bank UTR</Text>
          <TouchableOpacity
            onPress={() => handleCopy(txn.utr, 'UTR')}
            style={styles.valueRow}>
            <Text style={styles.value}>{txn.utr}</Text>
            <Icon name="copy" size={14} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Payment Method</Text>
          <Text style={styles.value}>{txn.method}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Date & Time</Text>
          <Text style={styles.value}>
            {txn.date}, {txn.time}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Settlement Status</Text>
          <Badge
            label={txn.settlementStatus}
            variant={txn.settlementStatus === 'Settled' ? 'success' : 'warning'}
            size="small"
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Convenience Fee</Text>
          <Text style={styles.value}>{formatINR(txn.fees)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>GST / Tax (18%)</Text>
          <Text style={styles.value}>{formatINR(txn.tax)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.label, styles.netLabel]}>Net Settlement</Text>
          <Text style={[styles.value, styles.netValue]}>
            {formatINR(txn.netAmount)}
          </Text>
        </View>
      </Card>

      {/* Action Buttons */}
      <View style={styles.actionsStack}>
        <Button
          title="Share Receipt"
          onPress={handleShare}
          variant="outline"
          leftIcon={<Icon name="share" size={16} color={colors.primary} />}
        />

        <Button
          title="Download Receipt (PDF)"
          onPress={() => Alert.alert('Receipt', 'PDF receipt downloaded to device.')}
          variant="outline"
          leftIcon={<Icon name="download" size={16} color={colors.primary} />}
        />

        {txn.refundable && !isRefund && (
          <Button
            title="Initiate Refund"
            onPress={() =>
              navigation.navigate('Refund', {
                id: txn.id,
                amount: txn.amount,
                customer: txn.customer,
              })
            }
            variant="danger"
            leftIcon={<Icon name="refund" size={16} color={colors.white} />}
          />
        )}

        <Button
          title="Report an Issue"
          onPress={() => navigation.navigate('Support')}
          variant="ghost"
          leftIcon={<Icon name="help-circle" size={16} color={colors.charcoal} />}
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
  statusIconWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  successIconWrap: {
    backgroundColor: colors.successLight,
  },
  refundIconWrap: {
    backgroundColor: colors.errorLight,
  },
  amount: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  successAmount: {
    color: colors.charcoal,
  },
  refundAmount: {
    color: colors.error,
  },
  customerName: {
    fontSize: 15,
    color: colors.charcoalMuted,
    fontWeight: '600',
    marginTop: 2,
    marginBottom: spacing.sm,
  },
  statusBadge: {
    marginTop: 2,
  },
  detailsCard: {
    padding: spacing.lg,
    marginBottom: spacing.base,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.charcoal,
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 9,
  },
  label: {
    fontSize: 13,
    color: colors.charcoalMuted,
    fontWeight: '500',
  },
  value: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.charcoal,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: spacing.sm,
  },
  netLabel: {
    fontWeight: '700',
    color: colors.charcoal,
    fontSize: 14,
  },
  netValue: {
    color: colors.success,
    fontSize: 16,
    fontWeight: '800',
  },
  actionsStack: {
    gap: 8,
    marginBottom: spacing.xl,
  },
});
