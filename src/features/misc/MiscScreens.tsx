import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Screen, Card } from '@/components/Screen';
import { Button } from '@/components/Button';
import { colors } from '@/design-system';
import { mockStaff, mockDevices, mockNotifications } from '@/mocks/data';
import { mockReportService } from '@/mocks/services';

export function StaffScreen({ navigation }: any) {
  return (
    <Screen>
      <Text style={styles.title}>Staff</Text>
      <Button title="+ Add Staff" onPress={() => navigation.navigate('AddStaff')} />
      {mockStaff.map(s => (
        <Card key={s.id}>
          <Text style={styles.name}>{s.name}</Text>
          <Text style={styles.sub}>{s.role} • {s.mobile}</Text>
          <Text style={styles.sub}>{s.permissions.length} permissions</Text>
        </Card>
      ))}
    </Screen>
  );
}

export function DevicesScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Devices</Text>
      {mockDevices.map(d => (
        <Card key={d.id}>
          <Text style={styles.name}>{d.name} • {d.type}</Text>
          <Text style={styles.sub}>{d.location} • Last active {d.lastActive}</Text>
          <View style={styles.row}>
            <Text style={[styles.status, d.status === 'Blocked' && { color: colors.red }]}>{d.status}</Text>
            <Text style={styles.action} onPress={() => Alert.alert('Device', d.status === 'Active' ? 'Blocked' : 'Unblocked')}>
              {d.status === 'Active' ? 'Block' : 'Unblock'}
            </Text>
          </View>
        </Card>
      ))}
    </Screen>
  );
}

export function NotificationsScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Notifications</Text>
      {mockNotifications.map(n => (
        <Card key={n.id}>
          <Text style={styles.name}>{n.title}</Text>
          <Text style={styles.sub}>{n.subtitle}</Text>
          <Text style={styles.sub}>{n.time}</Text>
        </Card>
      ))}
    </Screen>
  );
}

export function ReportsScreen() {
  const [last, setLast] = React.useState<string | null>(null);
  const exportReport = async (r: string, format: 'PDF' | 'CSV' | 'Excel') => {
    const res = await mockReportService.export(r, format);
    setLast(`${r} exported as ${format}: ${res.url}`);
  };
  const reports = ['Transaction Report', 'Settlement Report', 'Sales Report', 'Refund Report', 'Payment Method Report', 'GST Report', 'Daily Report', 'Monthly Report'];
  return (
    <Screen>
      <Text style={styles.title}>Reports</Text>
      {last && <Card><Text style={styles.sub}>{last}</Text></Card>}
      {reports.map(r => (
        <Card key={r}>
          <Text style={styles.name}>{r}</Text>
          <View style={styles.exportRow}>
            {(['PDF', 'CSV', 'Excel'] as const).map(f => (
              <Text key={f} style={styles.exportBtn} onPress={() => exportReport(r, f)}>{f}</Text>
            ))}
          </View>
        </Card>
      ))}
    </Screen>
  );
}

export function SupportScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Help & Support</Text>
      <Card><Text style={styles.name}>FAQ</Text></Card>
      <Card><Text style={styles.name}>Raise an Issue</Text></Card>
      <Card><Text style={styles.name}>Contact Support • 1800-PAYDIYA</Text></Card>
    </Screen>
  );
}

export function SecurityScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Security</Text>
      <Card><Text style={styles.name}>Change MPIN</Text></Card>
      <Card><Text style={styles.name}>Biometric Settings</Text></Card>
      <Card><Text style={styles.name}>Logout from all devices</Text></Card>
      <Card><Text style={styles.name}>Session Timeout: 5 minutes</Text></Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '800', color: colors.charcoal, marginBottom: 12 },
  name: { fontWeight: '700', color: colors.charcoal },
  sub: { color: colors.gray, fontSize: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  status: { color: colors.green, fontWeight: '700' },
  action: { color: colors.orange, fontWeight: '700' },
  exportRow: { flexDirection: 'row', gap: 12, marginTop: 8 },
  exportBtn: { color: colors.orange, fontWeight: '700', paddingHorizontal: 10, paddingVertical: 4, backgroundColor: colors.peachLight, borderRadius: 8 },
});
