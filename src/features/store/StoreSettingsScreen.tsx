import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Screen, Card } from '@/components/Screen';
import { colors } from '@/design-system';

const items: Array<[string, string]> = [
  ['Business Profile', 'Business details, logo, working hours'],
  ['Bank Account & KYC', 'Account ****4321 • Verified'],
  ['QR & Payment Settings', 'Static QR, payment methods'],
  ['Staff Management', 'Manage roles & permissions'],
  ['Devices', 'POS, Soundbox, Scanners'],
  ['POS / Soundbox', 'Hardware configuration'],
  ['Notifications', 'Alerts & preferences'],
  ['Support', 'Help & issues'],
];

export default function StoreSettingsScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Store Settings</Text>
      <Card>
        <Text style={styles.store}>Sri Venkateswara Stores</Text>
      </Card>
      {items.map(([title, sub]) => (
        <Card key={title}>
          <Text style={styles.itemTitle}>{title}</Text>
          <Text style={styles.itemSub}>{sub}</Text>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '800', color: colors.charcoal, marginBottom: 12 },
  store: { fontWeight: '700', fontSize: 16, color: colors.charcoal, textAlign: 'center' },
  itemTitle: { fontWeight: '700', color: colors.charcoal },
  itemSub: { color: colors.gray, fontSize: 12 },
});
