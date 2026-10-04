import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Screen, Card } from '@/components/Screen';
import { colors } from '@/design-system';
import { mockSettlementService } from '@/mocks/services';
import { Settlement } from '@/types';
import { formatINR } from '@/utils/format';

export default function SettlementsScreen({ navigation }: any) {
  const [upcoming, setUpcoming] = useState<any>(null);
  const [history, setHistory] = useState<Settlement[]>([]);

  useEffect(() => {
    mockSettlementService.upcoming().then(setUpcoming);
    mockSettlementService.list().then(setHistory);
  }, []);

  return (
    <Screen>
      <Text style={styles.title}>Settlements</Text>
      {upcoming && (
        <Card style={styles.upcoming}>
          <Text style={styles.upcomingLabel}>Upcoming Settlement</Text>
          <Text style={styles.upcomingAmount}>{formatINR(upcoming.amount)}</Text>
          <Text style={styles.upcomingSub}>{upcoming.date}</Text>
          <Text style={styles.upcomingSub}>Bank Account: {upcoming.bank}</Text>
        </Card>
      )}
      <Text style={styles.section}>Settlement History</Text>
      {history.map(s => (
        <Card key={s.id}>
          <View style={styles.row}>
            <Text style={styles.amount} onPress={() => navigation.navigate('SettlementDetails', { id: s.id })}>{formatINR(s.amount)}</Text>
            <Text style={styles.status}>{s.status}</Text>
          </View>
          <Text style={styles.sub}>{s.date} • {s.utr}</Text>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '800', color: colors.charcoal, marginBottom: 12 },
  upcoming: { backgroundColor: colors.darkCard },
  upcomingLabel: { color: '#B8B8C0' },
  upcomingAmount: { color: '#fff', fontSize: 32, fontWeight: '800', marginVertical: 6 },
  upcomingSub: { color: '#B8B8C0' },
  section: { fontSize: 17, fontWeight: '700', color: colors.charcoal, marginVertical: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  amount: { fontWeight: '800', color: colors.charcoal },
  status: { color: colors.green, fontWeight: '700' },
  sub: { color: colors.gray, fontSize: 12 },
});
