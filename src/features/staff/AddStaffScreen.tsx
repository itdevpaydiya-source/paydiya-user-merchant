import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, spacing } from '@/design-system';
import { Screen } from '@/components/Screen';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Icon } from '@/components/Icon';

const ROLES = ['Manager', 'Cashier', 'Accountant', 'Staff'] as const;
const ALL_PERMISSIONS = [
  'Dashboard',
  'Transactions',
  'Payment Links',
  'Settlements',
  'Analytics',
  'Refund',
  'Reports',
  'Store',
  'Staff',
  'Devices',
  'POS',
];

export default function AddStaffScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<typeof ROLES[number]>('Cashier');
  const [perms, setPerms] = useState<string[]>([
    'Dashboard',
    'Transactions',
    'POS',
  ]);

  const toggle = (p: string) =>
    setPerms(prev =>
      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p],
    );

  const submit = () => {
    if (!name.trim() || !mobile.trim()) {
      return Alert.alert('Required', 'Staff name and mobile number are required.');
    }
    Alert.alert(
      'Staff Member Added',
      `${name} has been invited as a ${role} with ${perms.length} permissions.`,
      [{ text: 'OK', onPress: () => navigation.goBack() }],
    );
  };

  return (
    <Screen variant="cream" showBack={true} title="Add Staff Member">
      <Card style={styles.formCard}>
        <Input
          label="Full Name"
          placeholder="e.g. Ramesh Babu"
          value={name}
          onChangeText={setName}
          prefixIcon={<Icon name="user" size={18} color={colors.primary} />}
        />

        <Input
          label="Mobile Number"
          placeholder="10-digit number"
          keyboardType="phone-pad"
          maxLength={10}
          value={mobile}
          onChangeText={setMobile}
          prefixText="+91"
        />

        <Input
          label="Email Address (Optional)"
          placeholder="staff@store.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          prefixIcon={<Icon name="mail" size={18} color={colors.primary} />}
        />

        <Text style={styles.sectionHeading}>Assign Role</Text>
        <View style={styles.roleGrid}>
          {ROLES.map(r => {
            const isSelected = role === r;
            return (
              <TouchableOpacity
                key={r}
                onPress={() => setRole(r)}
                style={[styles.roleChip, isSelected && styles.roleChipActive]}>
                <Text
                  style={[
                    styles.roleChipText,
                    isSelected && styles.roleChipTextActive,
                  ]}>
                  {r}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionHeading}>Access Permissions</Text>
        <View style={styles.permissionsContainer}>
          {ALL_PERMISSIONS.map(p => {
            const isChecked = perms.includes(p);
            return (
              <TouchableOpacity
                key={p}
                onPress={() => toggle(p)}
                style={styles.permRow}>
                <View
                  style={[
                    styles.checkbox,
                    isChecked && styles.checkboxChecked,
                  ]}>
                  {isChecked && (
                    <Icon name="check" size={12} color={colors.white} />
                  )}
                </View>
                <Text style={styles.permLabel}>{p}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Button
          title="Save Staff Member"
          onPress={submit}
          variant="primary"
          size="large"
          style={styles.submitBtn}
        />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  formCard: {
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.charcoal,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  roleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: spacing.md,
  },
  roleChip: {
    paddingVertical: 8,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.gray100,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  roleChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  roleChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.charcoalLight,
  },
  roleChipTextActive: {
    color: colors.white,
    fontWeight: '700',
  },
  permissionsContainer: {
    marginBottom: spacing.lg,
  },
  permRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: colors.divider,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  permLabel: {
    fontSize: 14,
    color: colors.charcoal,
    fontWeight: '500',
  },
  submitBtn: {
    marginTop: spacing.sm,
  },
});
