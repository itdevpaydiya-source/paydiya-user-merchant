import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen, Card } from '@/components/Screen';
import { colors } from '@/design-system';

const items: Array<[string, string]> = [
  ['Payment Links', 'PaymentLinks'],
  ['Analytics', 'Analytics'],
  ['Reports', 'Reports'],
  ['Staff', 'Staff'],
  ['Devices', 'Devices'],
  ['Business Profile', 'StoreSettings'],
  ['Bank & KYC', 'StoreSettings'],
  ['POS', 'Devices'],
  ['Notifications', 'Notifications'],
  ['Notification Preferences', 'NotificationPreferences'],
  ['Help & Support', 'Support'],
  ['Security', 'Security'],
];

export default function MoreScreen({ navigation }: any) {
  return (
    <Screen>
      <Text style={styles.title}>More</Text>
      {items.map(([label, route]) => (
        <Pressable key={label} onPress={() => navigation.navigate(route)}>
          <Card>
            <Text style={styles.item}>{label}</Text>
          </Card>
        </Pressable>
      ))}
      <Pressable onPress={() => navigation.replace('Login')}>
        <Card>
          <Text style={[styles.item, { color: colors.red }]}>Logout</Text>
        </Card>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '800', color: colors.charcoal, marginBottom: 12 },
  item: { fontWeight: '600', color: colors.charcoal },
});
