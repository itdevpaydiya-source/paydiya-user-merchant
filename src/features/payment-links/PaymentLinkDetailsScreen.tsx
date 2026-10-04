import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Screen, Card } from '@/components/Screen';
import { Button } from '@/components/Button';
import { colors } from '@/design-system';
import { mockPaymentLinks } from '@/mocks/data';
import { formatINR } from '@/utils/format';

export default function PaymentLinkDetailsScreen({ route }: any) {
  const link = mockPaymentLinks.find(l => l.id === route.params?.id) ?? mockPaymentLinks[0];
  return (
    <Screen>
      <Text style={styles.title}>Payment Link</Text>
      <Card>
        <Text style={styles.amount}>{formatINR(link.amount)}</Text>
        <Text style={styles.status}>{link.status}</Text>
        <Row label="Purpose" value={link.purpose} />
        <Row label="Customer" value={link.customer ?? '—'} />
        <Row label="Created" value={link.createdAt} />
        <Row label="Expiry" value={link.expiry} />
        <Row label="Paid At" value={link.paidAt ?? '—'} />
        <View style={{ marginTop: 10 }}>
          <Text style={styles.url}>{link.url}</Text>
        </View>
      </Card>
      <Button title="Copy Link" variant="outline" onPress={() => Alert.alert('Copied', 'Payment link copied')} />
      <Button title="Share via WhatsApp" onPress={() => Alert.alert('Share', 'WhatsApp share (mock)')} />
      <Button title="Share via SMS" variant="outline" onPress={() => Alert.alert('Share', 'SMS share (mock)')} />
      {link.status === 'Active' && (
        <Button title="Cancel Link" variant="outline" onPress={() => Alert.alert('Cancelled', 'Link cancelled')} />
      )}
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
  title: { fontSize: 22, fontWeight: '800', color: colors.charcoal, marginBottom: 12 },
  amount: { fontSize: 30, fontWeight: '800', color: colors.charcoal },
  status: { color: colors.orange, fontWeight: '700', marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  label: { color: colors.gray },
  value: { color: colors.charcoal, fontWeight: '600' },
  url: { color: colors.blue, fontWeight: '600', textAlign: 'center' },
});
