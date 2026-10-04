import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen, Card } from '@/components/Screen';
import { Button } from '@/components/Button';
import { colors } from '@/design-system';

const ROLES = ['Owner', 'Manager', 'Cashier', 'Accountant', 'Staff'] as const;
const ALL_PERMISSIONS = [
  'View Dashboard', 'View Transactions', 'Create Payment Link', 'View Settlements',
  'View Analytics', 'Process Refund', 'View Reports', 'Manage Store',
  'Manage Staff', 'Manage Devices', 'Access POS',
];

export default function AddStaffScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<typeof ROLES[number]>('Cashier');
  const [perms, setPerms] = useState<string[]>([]);

  const toggle = (p: string) =>
    setPerms(prev => (prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]));

  const submit = () => {
    if (!name.trim() || !mobile.trim()) return Alert.alert('Error', 'Name and mobile required');
    Alert.alert('Staff Added', `${name} (${role}) with ${perms.length} permissions`, [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <Screen>
      <Text style={styles.title}>Add Staff</Text>
      <Card>
        <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Mobile" keyboardType="phone-pad" value={mobile} onChangeText={setMobile} />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        <Text style={styles.section}>Role</Text>
        <View style={styles.chips}>
          {ROLES.map(r => (
            <Pressable key={r} onPress={() => setRole(r)} style={[styles.chip, role === r && styles.chipActive]}>
              <Text style={role === r ? styles.chipTextActive : styles.chipText}>{r}</Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.section}>Permissions</Text>
        {ALL_PERMISSIONS.map(p => (
          <Pressable key={p} onPress={() => toggle(p)} style={styles.permRow}>
            <Text style={styles.perm}>{perms.includes(p) ? '☑' : '☐'} {p}</Text>
          </Pressable>
        ))}
        <Button title="Add Staff" onPress={submit} />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '800', color: colors.charcoal, marginBottom: 12 },
  input: { backgroundColor: colors.creamDark, borderRadius: 12, padding: 14, marginBottom: 10 },
  section: { fontWeight: '700', color: colors.charcoal, marginVertical: 8 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: colors.grayLight, borderRadius: 20 },
  chipActive: { backgroundColor: colors.charcoal },
  chipText: { color: colors.charcoal },
  chipTextActive: { color: '#fff' },
  permRow: { paddingVertical: 6 },
  perm: { color: colors.charcoal },
});
