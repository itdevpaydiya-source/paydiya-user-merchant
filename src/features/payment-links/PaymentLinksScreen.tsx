import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen, Card } from '@/components/Screen';
import { Button } from '@/components/Button';
import { colors } from '@/design-system';
import { mockPaymentLinkService, mockPaymentLinkService as pl } from '@/mocks/services';
import { PaymentLink } from '@/types';
import { formatINR } from '@/utils/format';

export default function PaymentLinksScreen({ navigation }: any) {
  const [tab, setTab] = useState<'create' | 'history'>('create');
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const [created, setCreated] = useState<PaymentLink | null>(null);
  const [links, setLinks] = useState<PaymentLink[]>([]);

  React.useEffect(() => {
    pl.list().then(setLinks);
  }, []);

  const create = async () => {
    const res = await mockPaymentLinkService.create(Number(amount), purpose);
    setCreated(res);
  };

  return (
    <Screen>
      <Text style={styles.title}>Payment Link</Text>
      <View style={styles.tabs}>
        <Text onPress={() => setTab('create')} style={[styles.tab, tab === 'create' && styles.tabActive]}>Create Link</Text>
        <Text onPress={() => setTab('history')} style={[styles.tab, tab === 'history' && styles.tabActive]}>Links History</Text>
      </View>

      {tab === 'create' ? (
        <Card>
          <TextInput style={styles.input} placeholder="Amount" keyboardType="numeric" value={amount} onChangeText={setAmount} />
          <TextInput style={styles.input} placeholder="Purpose (Optional)" value={purpose} onChangeText={setPurpose} />
          <TextInput style={styles.input} placeholder="Expiry (e.g. 7 Days)" />
          <Button title="Generate Payment Link" onPress={create} />
          {created && (
            <View style={{ marginTop: 12 }}>
              <Text style={styles.url}>{created.url}</Text>
              <Text style={styles.sub}>Share via WhatsApp / SMS / Copy</Text>
            </View>
          )}
        </Card>
      ) : (
        <View>
          {links.map(l => (
            <Card key={l.id}>
              <View style={styles.row}>
                <Text style={styles.amount} onPress={() => navigation.navigate('PaymentLinkDetails', { id: l.id })}>{formatINR(l.amount)}</Text>
                <Text style={styles.status}>{l.status}</Text>
              </View>
              <Text style={styles.sub}>{l.purpose} • {l.createdAt} • Expiry: {l.expiry}</Text>
            </Card>
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '800', color: colors.charcoal, marginBottom: 12 },
  tabs: { flexDirection: 'row', gap: 24, marginBottom: 16 },
  tab: { color: colors.gray, paddingBottom: 6 },
  tabActive: { color: colors.orange, fontWeight: '700', borderBottomWidth: 2, borderColor: colors.orange },
  input: { backgroundColor: colors.creamDark, borderRadius: 12, padding: 14, marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  amount: { fontWeight: '800', color: colors.charcoal },
  status: { color: colors.orange, fontWeight: '700' },
  sub: { color: colors.gray, fontSize: 12 },
  url: { color: colors.blue, fontWeight: '600' },
});
