import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { Screen, Card } from '@/components/Screen';
import { colors } from '@/design-system';

const TYPES = [
  'Payment Received', 'Settlement', 'Refund', 'Payment Link', 'KYC',
  'Security', 'Device', 'Reports', 'System', 'Offers',
];

export default function NotificationPreferencesScreen() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(TYPES.map(t => [t, true])),
  );
  return (
    <Screen>
      <Text style={styles.title}>Notification Preferences</Text>
      {TYPES.map(t => (
        <Card key={t}>
          <View style={styles.row}>
            <Text style={styles.label}>{t}</Text>
            <Switch
              value={enabled[t]}
              onValueChange={v => setEnabled(prev => ({ ...prev, [t]: v }))}
              trackColor={{ true: colors.orange, false: colors.grayLight }}
            />
          </View>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '800', color: colors.charcoal, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { color: colors.charcoal, fontWeight: '600' },
});
