import React, { useRef, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, radius, spacing } from '@/design-system';
import { Screen } from '@/components/Screen';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Icon } from '@/components/Icon';
import { Badge } from '@/components/Badge';
import { mockTransactionService } from '@/mocks/services';
import { formatINR } from '@/utils/format';

const REASONS = [
  'Customer Request',
  'Duplicate Payment',
  'Order Cancelled',
  'Incorrect Amount',
  'Service Issue',
];

export default function RefundScreen({ route, navigation }: any) {
  const { id, amount, customer } = route.params || {};
  const [refundAmount, setRefundAmount] = useState(String(amount || '500'));
  const [selectedReason, setSelectedReason] = useState('Customer Request');
  const [loading, setLoading] = useState(false);
  const [refundResult, setRefundResult] = useState<any>(null);
  const idempotencyKey = useRef(`refund-${id}-${Date.now()}`);

  const handleRefund = async () => {
    const amt = Number(refundAmount);
    if (!amt || amt <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid refund amount.');
      return;
    }
    if (amt > Number(amount)) {
      Alert.alert('Amount Exceeded', `Maximum refundable amount is ${formatINR(Number(amount))}`);
      return;
    }

    Alert.alert(
      'Confirm Refund',
      `Are you sure you want to refund ${formatINR(amt)} to ${customer || 'the customer'}? This action is irreversible.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm & Refund',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              const res = await mockTransactionService.refund(
                id,
                amt,
                selectedReason,
                idempotencyKey.current,
              );
              setLoading(false);
              setRefundResult(res);
            } catch (e: any) {
              setLoading(false);
              Alert.alert('Refund Failed', e.message || 'Unable to process refund.');
            }
          },
        },
      ],
    );
  };

  return (
    <Screen variant="cream" showBack={true} title="Process Refund">
      {refundResult ? (
        <Card style={styles.successCard}>
          <View style={styles.successIconCircle}>
            <Icon name="check" size={32} color={colors.success} />
          </View>

          <Text style={styles.successTitle}>Refund Successful</Text>
          <Text style={styles.successSub}>
            {formatINR(Number(refundAmount))} has been returned to the customer's account.
          </Text>

          <View style={styles.resultBox}>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Refund Status</Text>
              <Badge label="COMPLETED" variant="success" size="small" />
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Transaction ID</Text>
              <Text style={styles.resultVal}>{id}</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Reason</Text>
              <Text style={styles.resultVal}>{selectedReason}</Text>
            </View>
          </View>

          <Button
            title="Back to Transactions"
            onPress={() => navigation.navigate('Transactions')}
            variant="primary"
            size="large"
            style={styles.doneBtn}
          />
        </Card>
      ) : (
        <View>
          {/* Transaction Summary Card */}
          <Card style={styles.summaryCard}>
            <Text style={styles.sectionHeading}>Original Transaction</Text>
            <View style={styles.txRow}>
              <View>
                <Text style={styles.customerName}>{customer || 'Customer'}</Text>
                <Text style={styles.txId}>ID: {id}</Text>
              </View>
              <Text style={styles.origAmount}>{formatINR(Number(amount || 0))}</Text>
            </View>
          </Card>

          {/* Refund Input Card */}
          <Card style={styles.formCard}>
            <Input
              label="Refund Amount (₹)"
              placeholder="0.00"
              keyboardType="numeric"
              value={refundAmount}
              onChangeText={setRefundAmount}
              prefixText="₹"
              helperText={`Maximum refundable: ${formatINR(Number(amount || 0))}`}
            />

            <Text style={styles.fieldLabel}>Reason for Refund</Text>
            <View style={styles.reasonsGrid}>
              {REASONS.map(r => {
                const isSelected = r === selectedReason;
                return (
                  <TouchableOpacity
                    key={r}
                    onPress={() => setSelectedReason(r)}
                    style={[
                      styles.reasonChip,
                      isSelected && styles.reasonChipSelected,
                    ]}>
                    <Text
                      style={[
                        styles.reasonText,
                        isSelected && styles.reasonTextSelected,
                      ]}>
                      {r}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.idempotentNote}>
              <Icon name="shield" size={16} color={colors.primary} />
              <Text style={styles.idempotentText}>
                Guaranteed Idempotent: duplicate taps will never trigger duplicate deductions.
              </Text>
            </View>

            <Button
              title={`Refund ${formatINR(Number(refundAmount || 0))}`}
              onPress={handleRefund}
              variant="danger"
              loading={loading}
              size="large"
              style={styles.refundBtn}
              leftIcon={<Icon name="refund" size={18} color={colors.white} />}
            />
          </Card>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    padding: spacing.base,
    marginBottom: spacing.base,
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.charcoalMuted,
    marginBottom: spacing.xs,
  },
  txRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customerName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.charcoal,
  },
  txId: {
    fontSize: 12,
    color: colors.gray500,
    marginTop: 2,
  },
  origAmount: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.charcoal,
  },
  formCard: {
    padding: spacing.base,
    marginBottom: spacing.xl,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.charcoalLight,
    marginBottom: spacing.xs,
    marginTop: spacing.xs,
  },
  reasonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: spacing.lg,
  },
  reasonChip: {
    paddingVertical: 8,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.gray100,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  reasonChipSelected: {
    backgroundColor: colors.peachLight,
    borderColor: colors.primary,
  },
  reasonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.charcoalLight,
  },
  reasonTextSelected: {
    color: colors.primaryDark,
    fontWeight: '700',
  },
  idempotentNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    padding: spacing.sm,
    borderRadius: radius.md,
    marginBottom: spacing.lg,
  },
  idempotentText: {
    flex: 1,
    fontSize: 11,
    color: colors.primaryDark,
    marginLeft: 8,
    lineHeight: 16,
    fontWeight: '500',
  },
  refundBtn: {
    marginTop: spacing.xs,
  },
  successCard: {
    alignItems: 'center',
    padding: spacing.xl,
    marginTop: spacing.md,
  },
  successIconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.successLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.charcoal,
    marginBottom: 4,
  },
  successSub: {
    fontSize: 14,
    color: colors.charcoalMuted,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
    marginBottom: spacing.lg,
  },
  resultBox: {
    width: '100%',
    backgroundColor: colors.gray100,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  resultLabel: {
    fontSize: 12,
    color: colors.charcoalMuted,
  },
  resultVal: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.charcoal,
  },
  doneBtn: {
    width: '100%',
  },
});
