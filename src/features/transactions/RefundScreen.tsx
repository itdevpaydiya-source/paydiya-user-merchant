import React, { useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput } from 'react-native';
import { Screen, Card } from '@/components/Screen';
import { Button } from '@/components/Button';
import { colors } from '@/design-system';
import { mockTransactionService } from '@/mocks/services';

export default function RefundScreen({ route }: any) {
  const { id, amount } = route.params;
  const [refundAmount, setRefundAmount] = useState(String(amount ?? ''));
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const keyRef = useRef(`refund-${id}-${Date.now()}`);

  const submit = async () => {
    const amt = Number(refundAmount);
    if (!amt || amt <= 0) return Alert.alert('Error', 'Enter a valid refund amount');
    if (!reason.trim()) return Alert.alert('Error', 'Enter a reason');
    // MPIN/biometric confirmation step happens before this in production
    const res = await mockTransactionService.refund(id, amt, reason, keyRef.current);
    setStatus(res.status);
  };

  return (
    <Screen>
      <Text style={styles.title}>Refund</Text>
      <Card>
        <TextInput
          style={styles.input}
          placeholder="Refund Amount"
          keyboardType="numeric"
          value={refundAmount}
          onChangeText={setRefundAmount}
        />
        <TextInput
          style={styles.input}
          placeholder="Reason"
          value={reason}
          onChangeText={setReason}
        />
        <Button title="Confirm Refund" onPress={submit} />
        {status && <Text style={styles.status}>Status: {status}</Text>}
        <Text style={styles.note}>
          Refunds are idempotent — the same request will never trigger a duplicate refund.
        </Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '800', color: colors.charcoal, marginBottom: 12 },
  input: { backgroundColor: colors.creamDark, borderRadius: 12, padding: 14, marginBottom: 10 },
  status: { marginTop: 12, fontWeight: '700', color: colors.orange, textAlign: 'center' },
  note: { marginTop: 10, color: colors.gray, fontSize: 12 },
});
