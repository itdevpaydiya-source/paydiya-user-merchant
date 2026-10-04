import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Screen, Card } from '@/components/Screen';
import { Button } from '@/components/Button';
import { colors } from '@/design-system';
import { mockTransactionService } from '@/mocks/services';
import { Transaction } from '@/types';
import { formatINR } from '@/utils/format';

export default function TransactionDetailsScreen({ route }: any) {
  const [txn, setTxn] = useState<Transaction | null>(null);
  useEffect(() => {
    mockTransactionService.getById(route.params.id).then(setTxn);
  }, [route.params.id]);

  if (!txn) return <Screen><Text>Loading…</Text></Screen>;

  return (
    <Screen>
      <Text style={styles.amount}>{formatINR(txn.amount)}</Text>
      <Text style={styles.status}>{txn.status}</Text>
      <Card>
        <Row label="Transaction ID" value={txn.id} />
        <Row label="UTR" value={txn.utr} />
        <Row label="Customer" value={txn.customer} />
        <Row label="Method" value={txn.method} />
        <Row label="Date" value={`${txn.date}, ${txn.time}`} />
        <Row label="Settlement" value={txn.settlementStatus} />
        <Row label="Fees" value={formatINR(txn.fees)} />
        <Row label="Tax" value={formatINR(txn.tax)} />
        <Row label="Net Amount" value={formatINR(txn.netAmount)} />
      </Card>
      <Button title="Download Receipt" variant="outline" onPress={() => Alert.alert('Receipt', 'Receipt downloaded (mock)')} />
      <Button title="Share Receipt" variant="outline" onPress={() => Alert.alert('Share', 'Share sheet (mock)')} />
      {txn.refundable && (
        <Button title="Refund" onPress={() => Alert.alert('Refund', 'Refund flow requires MPIN (mock)')} />
      )}
      <Button title="Report Issue" variant="outline" onPress={() => Alert.alert('Support', 'Issue raised')} />
    </Screen>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  amount: { fontSize: 34, fontWeight: '800', color: colors.charcoal, textAlign: 'center', marginTop: 8 },
  status: { textAlign: 'center', color: colors.green, fontWeight: '700', marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  label: { color: colors.gray },
  value: { color: colors.charcoal, fontWeight: '600' },
});
