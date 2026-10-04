import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen, Card } from '@/components/Screen';
import { colors } from '@/design-system';
import { mockTransactionService } from '@/mocks/services';
import { Transaction } from '@/types';
import { formatINR } from '@/utils/format';
import { Skeleton } from '@/components/StateViews';

export default function TransactionsScreen({ navigation }: any) {
  const [txns, setTxns] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    mockTransactionService.list().then(t => {
      setTxns(t);
      setLoading(false);
    });
  }, []);

  const shown = txns.filter(t => {
    const matchQ = t.customer.toLowerCase().includes(q.toLowerCase()) || t.utr.includes(q) || t.id.includes(q);
    const matchF = filter === 'All' || t.status === filter.toUpperCase();
    return matchQ && matchF;
  });

  return (
    <Screen>
      <Text style={styles.title}>Transactions</Text>
      <TextInput
        style={styles.search}
        placeholder="Search by UTR, transaction ID, customer or amount"
        value={q}
        onChangeText={setQ}
      />
      <View style={styles.filters}>
        {['All', 'Received', 'Pending', 'Refunded', 'Failed'].map(f => (
          <Text key={f} onPress={() => setFilter(f)} style={[styles.chip, filter === f && styles.chipActive]}>
            {f}
          </Text>
        ))}
      </View>
      {loading ? <Skeleton count={4} /> : (
      <>
      {shown.map(t => (
        <Card key={t.id}>
          <Text
            style={styles.customer}
            onPress={() => navigation.navigate('TransactionDetails', { id: t.id })}>
            {t.customer}
          </Text>
          <Text style={styles.sub}>{t.method} Payment • {t.date}, {t.time}</Text>
          <View style={styles.row}>
            <Text style={styles.amount}>{formatINR(t.amount)}</Text>
            <Text style={styles.status}>{t.status}</Text>
          </View>
        </Card>
      ))}
      {shown.length === 0 && <Text style={styles.empty}>No transactions found.</Text>}
      </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '800', color: colors.charcoal, marginBottom: 12 },
  search: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 10 },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  chip: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: colors.grayLight, borderRadius: 20, color: colors.charcoal },
  chipActive: { backgroundColor: colors.charcoal, color: '#fff' },
  customer: { fontWeight: '700', color: colors.charcoal },
  sub: { color: colors.gray, fontSize: 12, marginVertical: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  amount: { fontWeight: '800', color: colors.charcoal },
  status: { color: colors.orange, fontWeight: '700', fontSize: 12 },
  empty: { textAlign: 'center', color: colors.gray, marginTop: 40 },
});
