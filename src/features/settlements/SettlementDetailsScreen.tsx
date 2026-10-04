import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Screen, Card } from '@/components/Screen';
import { colors } from '@/design-system';
import { mockSettlements } from '@/mocks/data';
import { formatINR } from '@/utils/format';

export default function SettlementDetailsScreen({ route }: any) {
  const s = mockSettlements.find(x => x.id === route.params?.id) ?? mockSettlements[0];
  return (
    <Screen>
      <Text style={styles.title}>Settlement Details</Text>
      <Card>
        <Row label="Gross Amount" value={formatINR(s.gross)} />
        <Row label="Refunds" value={`-${formatINR(s.refunds)}`} />
        <Row label="Charges" value={`-${formatINR(s.charges)}`} />
        <Row label="Taxes" value={`-${formatINR(s.tax)}`} />
        <Row label="Adjustments" value={`-${formatINR(s.adjustments)}`} />
        <Row label="Net Settlement" value={formatINR(s.net)} bold />
        <Row label="Bank Account" value={s.bank} />
        <Row label="Settlement Date" value={s.date} />
        <Row label="UTR" value={s.utr} />
        <Row label="Status" value={s.status} />
      </Card>
    </Screen>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, bold && { fontWeight: '800' }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '800', color: colors.charcoal, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  label: { color: colors.gray },
  value: { color: colors.charcoal, fontWeight: '600' },
});
