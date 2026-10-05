import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, radius, spacing } from '@/design-system';
import { Screen } from '@/components/Screen';
import { Card } from '@/components/Card';
import { Icon, IconName } from '@/components/Icon';
import { mockMerchant } from '@/mocks/data';

interface StoreMenuItem {
  id: string;
  title: string;
  subtitle: string;
  icon: IconName;
  route: string;
}

const MENU_ITEMS: StoreMenuItem[] = [
  {
    id: '1',
    title: 'Business Profile',
    subtitle: 'Business details, logo, working hours',
    icon: 'file-text',
    route: 'BusinessProfile',
  },
  {
    id: '2',
    title: 'Bank Account & KYC',
    subtitle: 'Account •••• 4321 • Verified',
    icon: 'bank',
    route: 'BankKyc',
  },
  {
    id: '3',
    title: 'QR & Payment Settings',
    subtitle: 'Static & dynamic QR, payment limits',
    icon: 'qr',
    route: 'QR',
  },
  {
    id: '4',
    title: 'Staff Management',
    subtitle: 'Roles, cashier & manager permissions',
    icon: 'users',
    route: 'Staff',
  },
  {
    id: '5',
    title: 'Devices (POS/Soundbox)',
    subtitle: 'POS terminals, bluetooth printers, soundbox',
    icon: 'pos',
    route: 'Devices',
  },
  {
    id: '6',
    title: 'Notifications',
    subtitle: 'Payment sound alerts & preferences',
    icon: 'bell',
    route: 'Notifications',
  },
  {
    id: '7',
    title: 'Support & Help',
    subtitle: '24x7 merchant dispute & settlement support',
    icon: 'help-circle',
    route: 'Support',
  },
];

export default function StoreSettingsScreen({ navigation }: any) {
  return (
    <Screen variant="cream" showBack={true} title="Store Settings">
      {/* Store Identity Banner matching Screen 7 */}
      <Card style={styles.storeCard}>
        <View style={styles.storeIconCircle}>
          <Icon name="store" size={28} color={colors.primary} />
        </View>
        <Text style={styles.storeName}>{mockMerchant.name}</Text>
        <Text style={styles.storeMid}>MID: {mockMerchant.mid}</Text>
      </Card>

      {/* Settings Navigation List matching Screen 7 */}
      <View style={styles.menuContainer}>
        {MENU_ITEMS.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              if (item.route === 'QR') navigation.navigate('QR');
              else if (item.route === 'Staff') navigation.navigate('Staff');
              else if (item.route === 'Devices') navigation.navigate('Devices');
              else if (item.route === 'Notifications') navigation.navigate('Notifications');
              else if (item.route === 'Support') navigation.navigate('Support');
              else navigation.navigate('More');
            }}
            style={styles.menuItem}
            activeOpacity={0.7}>
            <View style={styles.iconCircle}>
              <Icon name={item.icon} size={20} color={colors.primary} />
            </View>
            <View style={styles.textWrap}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
            </View>
            <Icon name="chevron-right" size={18} color={colors.gray500} />
          </TouchableOpacity>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  storeCard: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.base,
    marginBottom: spacing.lg,
  },
  storeIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  storeName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.charcoal,
    textAlign: 'center',
  },
  storeMid: {
    fontSize: 13,
    color: colors.charcoalMuted,
    marginTop: 4,
    fontWeight: '600',
  },
  menuContainer: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(235, 227, 214, 0.6)',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: spacing.base,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  textWrap: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.charcoal,
  },
  itemSubtitle: {
    fontSize: 12,
    color: colors.charcoalMuted,
    marginTop: 2,
  },
});
