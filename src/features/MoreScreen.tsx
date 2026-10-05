import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, radius, spacing } from '@/design-system';
import { Screen } from '@/components/Screen';
import { Icon, IconName } from '@/components/Icon';
import { secureStorage } from '@/services/storage/secureStorage';

interface MoreMenuItem {
  title: string;
  route: string;
  icon: IconName;
  color?: string;
}

const ITEMS: MoreMenuItem[] = [
  { title: 'Payment Links', route: 'PaymentLinks', icon: 'payment-link' },
  { title: 'Analytics', route: 'Analytics', icon: 'trending-up' },
  { title: 'Reports', route: 'Reports', icon: 'reports' },
  { title: 'Staff Management', route: 'Staff', icon: 'users' },
  { title: 'Devices (POS & Soundbox)', route: 'Devices', icon: 'pos' },
  { title: 'Store Settings', route: 'StoreSettings', icon: 'store' },
  { title: 'Notifications', route: 'Notifications', icon: 'bell' },
  { title: 'Notification Preferences', route: 'NotificationPreferences', icon: 'speaker' },
  { title: 'Help & Support', route: 'Support', icon: 'help-circle' },
  { title: 'Security & PIN', route: 'Security', icon: 'shield' },
  { title: 'Enter Verification Code (Auth)', route: 'Otp', icon: 'mail' },
];

export default function MoreScreen({ navigation }: any) {
  const handleLogout = async () => {
    await secureStorage.clearAuthTokens();
    const parent = navigation.getParent();
    if (parent) {
      parent.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <Screen variant="cream" title="More" showBack={true}>
      <View style={styles.menuContainer}>
        {ITEMS.map(item => (
          <TouchableOpacity
            key={item.title}
            onPress={() => navigation.navigate(item.route)}
            style={styles.menuItem}
            activeOpacity={0.7}>
            <View style={styles.iconCircle}>
              <Icon name={item.icon} size={20} color={colors.primary} />
            </View>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Icon name="chevron-right" size={18} color={colors.gray500} />
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          onPress={handleLogout}
          style={[styles.menuItem, styles.logoutItem]}
          activeOpacity={0.7}>
          <View style={[styles.iconCircle, styles.logoutIconCircle]}>
            <Icon name="arrow-right" size={20} color={colors.error} />
          </View>
          <Text style={styles.logoutTitle}>Logout</Text>
          <Icon name="chevron-right" size={18} color={colors.error} />
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(235, 227, 214, 0.6)',
    marginTop: spacing.xs,
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
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  itemTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: colors.charcoal,
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutIconCircle: {
    backgroundColor: colors.errorLight,
  },
  logoutTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: colors.error,
  },
});
