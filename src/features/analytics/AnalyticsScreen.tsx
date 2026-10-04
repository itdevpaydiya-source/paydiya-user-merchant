import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';
import { Screen, Card } from '@/components/Screen';
import { colors } from '@/design-system';
import { mockAnalytics } from '@/mocks/data';
import { formatINR } from '@/utils/format';

export default function AnalyticsScreen() {
  const max = Math.max(...mockAnalytics.revenue);
  return (
    <Screen>
      <Text style={styles.title}>Analytics</Text>
      <Card>
        <Text style={styles.label}>Total Received</Text>
        <Text style={styles.amount}>{formatINR(mockAnalytics.totalReceived)}</Text>
        <Text style={styles.growth}>↑ {mockAnalytics.growth}%</Text>
        <Svg height={120} width="100%">
          {mockAnalytics.revenue.map((v, i) => (
            <Rect
              key={i}
              x={i * 44 + 10}
              y={110 - (v / max) * 90}
              width={24}
              height={(v / max) * 90}
              rx={6}
              fill={i === mockAnalytics.revenue.length - 1 ? colors.orange : colors.peach}
            />
          ))}
        </Svg>
      </Card>

      <Card>
        <Text style={styles.section}>By Payment Mode</Text>
        <Svg height={160} width={160}>
          <Circle cx={80} cy={80} r={55} stroke={colors.green} strokeWidth={22} fill="none" strokeDasharray={[235, 345]} />
          <Circle cx={80} cy={80} r={55} stroke={colors.orange} strokeWidth={22} fill="none" strokeDasharray={[62, 345]} strokeDashoffset={-235} />
        </Svg>
        {mockAnalytics.paymentMethods.map(m => (
          <View key={m.label} style={styles.legendRow}>
            <Text style={styles.legendLabel}>{m.label}</Text>
            <Text style={styles.legendValue}>{m.value}%</Text>
          </View>
        ))}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '800', color: colors.charcoal, marginBottom: 12 },
  label: { color: colors.gray, fontSize: 12 },
  amount: { fontSize: 30, fontWeight: '800', color: colors.charcoal },
  growth: { color: colors.green, fontWeight: '700', marginBottom: 10 },
  section: { fontSize: 16, fontWeight: '700', color: colors.charcoal, marginBottom: 10 },
  legendRow: { flexDirection: 'row', justifyContent: 'space-between' },
  legendLabel: { color: colors.charcoal },
  legendValue: { fontWeight: '700', color: colors.charcoal },
});
