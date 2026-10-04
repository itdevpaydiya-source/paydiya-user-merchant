import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Screen, Card } from '@/components/Screen';
import { colors, spacing, typography } from '@/design-system';
import { mockMerchant, mockTransactions } from '@/mocks/data';
import { formatINR } from '@/utils/format';

export default function HomeScreen({ navigation }: any) {
  return (
    <Screen>
      <View style={styles.header}>
        <View>
          <Text style={styles.storeName}>{mockMerchant.name}</Text>
          <Text style={styles.mid}>MID: {mockMerchant.mid}</Text>
        </View>
        <Pressable onPress={() => navigation.navigate('Notifications')}>
          <Text style={styles.bell}>🔔</Text>
        </Pressable>
      </View>

      <View style={styles.periodRow}>
        {['Today', 'Yesterday', 'This Week', 'This Month'].map(p => (
          <Text key={p} style={[styles.period, p === 'This Month' && styles.periodActive]}>
            {p}
          </Text>
        ))}
      </View>

      <Card style={styles.metricCard}>
        <Text style={styles.label}>Total Received</Text>
        <Text style={styles.amount}>{formatINR(mockMerchant.totalReceived)}</Text>
        <Text style={styles.growth}>↑ {mockMerchant.growth}%</Text>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.stat}>{mockMerchant.transactions}</Text>
            <Text style={styles.label}>Transactions</Text>
          </View>
          <View>
            <Text style={styles.stat}>{formatINR(mockMerchant.averageTransaction)}</Text>
            <Text style={styles.label}>Avg. Transaction</Text>
          </View>
        </View>
      </Card>

      <Text style={typography.heading}>Quick Actions</Text>
      <View style={styles.grid}>
        {[
          ['QR Code', 'QR'],
          ['Payment Link', 'PaymentLinks'],
          ['Settlement', 'Settlements'],
          ['Reports', 'Reports'],
          ['Analytics', 'Analytics'],
          ['Store Settings', 'StoreSettings'],
        ].map(([label, route]) => (
          <Pressable key={label} style={styles.action} onPress={() => navigation.navigate(route)}>
            <Text style={styles.actionText}>{label}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={[typography.heading, { marginTop: spacing.md }]}>Recent Transactions</Text>
      {mockTransactions.slice(0, 5).map(t => (
        <Card key={t.id}>
          <View style={styles.rowBetween}>
            <Text style={styles.customer}>{t.customer}</Text>
            <Text style={t.amount < 0 ? styles.negative : styles.positive}>
              {t.amount < 0 ? '-' : '+'}{formatINR(Math.abs(t.amount))}
            </Text>
          </View>
          <Text style={styles.label}>{t.method} Payment • {t.date}, {t.time}</Text>
        </Card>
      ))}

      <Text style={[typography.heading, { marginTop: spacing.md }]}>Business Insights</Text>
      <Card>
        <Text style={styles.insight}>• Your UPI transactions increased 18% this week.</Text>
        <Text style={styles.insight}>• Your highest sales period is 6 PM - 9 PM.</Text>
        <Text style={styles.insight}>• ₹12,480 settlement is scheduled for tomorrow.</Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.md },
  storeName: { fontSize: 17, fontWeight: '700', color: colors.charcoal },
  mid: { color: colors.gray, fontSize: 12 },
  bell: { fontSize: 20 },
  periodRow: { flexDirection: 'row', gap: 16, marginBottom: spacing.md },
  period: { color: colors.gray },
  periodActive: { color: colors.orange, fontWeight: '700', borderBottomWidth: 2, borderColor: colors.orange },
  metricCard: {},
  label: { color: colors.gray, fontSize: 12 },
  amount: { fontSize: 32, fontWeight: '800', color: colors.charcoal, marginVertical: 4 },
  growth: { color: colors.green, fontWeight: '700', marginBottom: spacing.md },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  stat: { fontSize: 20, fontWeight: '800', color: colors.charcoal },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 8 },
  action: {
    backgroundColor: colors.peachLight,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 10,
    width: '31%',
    alignItems: 'center',
  },
  actionText: { fontWeight: '700', color: colors.charcoal, fontSize: 12, textAlign: 'center' },
  customer: { fontWeight: '600', color: colors.charcoal },
  positive: { color: colors.green, fontWeight: '700' },
  negative: { color: colors.red, fontWeight: '700' },
  insight: { color: colors.charcoalLight, marginBottom: 6 },
});
