import React, { useState } from 'react';
import {
  Alert,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, radius, spacing } from '@/design-system';
import { Screen } from '@/components/Screen';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { Icon } from '@/components/Icon';
import { mockStaff, mockDevices, mockNotifications } from '@/mocks/data';
import { mockReportService } from '@/mocks/services';
import { secureStorage } from '@/services/storage/secureStorage';

// ----------------------------------------------------
// STAFF MANAGEMENT SCREEN
// ----------------------------------------------------
export function StaffScreen({ navigation }: any) {
  return (
    <Screen
      variant="cream"
      showBack={true}
      title="Staff Management"
      rightAction={
        <TouchableOpacity
          onPress={() => navigation.navigate('AddStaff')}
          style={styles.addIconBtn}>
          <Text style={styles.addBtnText}>+ Add</Text>
        </TouchableOpacity>
      }>
      <Text style={styles.screenSub}>
        Assign cashier and manager roles with granular access permissions.
      </Text>

      {mockStaff.map(member => (
        <Card key={member.id} style={styles.staffCard}>
          <View style={styles.staffRow}>
            <View style={styles.staffAvatar}>
              <Text style={styles.staffAvatarText}>
                {member.name.slice(0, 2).toUpperCase()}
              </Text>
            </View>

            <View style={styles.staffInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.staffName}>{member.name}</Text>
                <Badge
                  label={member.role}
                  variant={member.role === 'Owner' ? 'gold' : member.role === 'Manager' ? 'peach' : 'neutral'}
                  size="small"
                />
              </View>
              <Text style={styles.staffMobile}>{member.mobile}</Text>
              <Text style={styles.staffEmail}>{member.email}</Text>
            </View>
          </View>

          <View style={styles.permissionsRow}>
            {member.permissions.slice(0, 3).map((perm, idx) => (
              <View key={idx} style={styles.permChip}>
                <Text style={styles.permText}>{perm}</Text>
              </View>
            ))}
            {member.permissions.length > 3 && (
              <View style={styles.permChip}>
                <Text style={styles.permText}>
                  +{member.permissions.length - 3} more
                </Text>
              </View>
            )}
          </View>
        </Card>
      ))}
    </Screen>
  );
}

// ----------------------------------------------------
// DEVICE & POS MANAGEMENT SCREEN
// ----------------------------------------------------
export function DevicesScreen() {
  const [deviceList, setDeviceList] = useState(mockDevices);

  const toggleBlock = (id: string) => {
    setDeviceList(prev =>
      prev.map(d =>
        d.id === id
          ? { ...d, status: d.status === 'Active' ? 'Blocked' : 'Active' }
          : d,
      ),
    );
  };

  return (
    <Screen variant="cream" showBack={true} title="Connected Devices">
      <Text style={styles.screenSub}>
        Manage POS card machines, soundboxes, and bluetooth receipt printers.
      </Text>

      {deviceList.map(d => {
        const isBlocked = d.status === 'Blocked';
        return (
          <Card key={d.id} style={styles.deviceCard}>
            <View style={styles.deviceRow}>
              <View style={[styles.deviceIconCircle, isBlocked && styles.deviceBlocked]}>
                <Icon
                  name={d.type === 'POS' ? 'pos' : d.type === 'Soundbox' ? 'speaker' : 'pos'}
                  size={22}
                  color={isBlocked ? colors.error : colors.primary}
                />
              </View>

              <View style={styles.deviceInfo}>
                <Text style={styles.deviceName}>{d.name}</Text>
                <Text style={styles.deviceMeta}>
                  {d.type} • {d.location}
                </Text>
                <Text style={styles.deviceLastActive}>
                  Last active: {d.lastActive}
                </Text>
              </View>

              <View style={styles.deviceActionCol}>
                <Badge
                  label={d.status}
                  variant={isBlocked ? 'error' : 'success'}
                  size="small"
                />
                <TouchableOpacity
                  onPress={() => toggleBlock(d.id)}
                  style={styles.blockBtn}>
                  <Text
                    style={[
                      styles.blockBtnText,
                      isBlocked ? styles.unblockText : styles.blockText,
                    ]}>
                    {isBlocked ? 'Unblock' : 'Block'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        );
      })}
    </Screen>
  );
}

// ----------------------------------------------------
// NOTIFICATIONS SCREEN
// ----------------------------------------------------
export function NotificationsScreen() {
  return (
    <Screen variant="cream" showBack={true} title="Notifications">
      {mockNotifications.map(n => (
        <Card key={n.id} style={styles.notificationCard}>
          <View style={styles.notificationRow}>
            <View style={styles.notificationIconWrap}>
              <Icon name="bell" size={18} color={colors.primary} />
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{n.title}</Text>
              <Text style={styles.notificationSub}>{n.subtitle}</Text>
              <Text style={styles.notificationTime}>{n.time}</Text>
            </View>
          </View>
        </Card>
      ))}
    </Screen>
  );
}

// ----------------------------------------------------
// REPORTS MODULE SCREEN
// ----------------------------------------------------
export function ReportsScreen() {
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);

  const reports = [
    { title: 'Transaction Report', desc: 'Daily settlement details and customer UTRs' },
    { title: 'Settlement Report', desc: 'Gross, fee deductions and net bank credits' },
    { title: 'Sales Report', desc: 'Revenue breakdown by payment mode and hours' },
    { title: 'GST & Tax Report', desc: 'Monthly merchant GST invoices & tax filing summary' },
    { title: 'Refund Report', desc: 'Customer refunds and reversal logs' },
  ];

  const handleExport = async (name: string, format: 'PDF' | 'CSV' | 'Excel') => {
    const res = await mockReportService.export(name, format);
    setDownloadMsg(`${name} (${format}) generated: ${res.url}`);
    Alert.alert('Report Ready', `${name} in ${format} format downloaded successfully.`);
  };

  return (
    <Screen variant="cream" showBack={true} title="Reports & Statements">
      <Text style={styles.screenSub}>
        Download audited statements for accounting and tax compliance.
      </Text>

      {downloadMsg && (
        <View style={styles.downloadBanner}>
          <Icon name="check" size={16} color={colors.success} />
          <Text style={styles.downloadBannerText}>{downloadMsg}</Text>
        </View>
      )}

      {reports.map(r => (
        <Card key={r.title} style={styles.reportCard}>
          <Text style={styles.reportTitle}>{r.title}</Text>
          <Text style={styles.reportDesc}>{r.desc}</Text>

          <View style={styles.exportRow}>
            {(['PDF', 'CSV', 'Excel'] as const).map(fmt => (
              <TouchableOpacity
                key={fmt}
                onPress={() => handleExport(r.title, fmt)}
                style={styles.exportChip}>
                <Icon name="download" size={12} color={colors.primary} />
                <Text style={styles.exportChipText}>{fmt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>
      ))}
    </Screen>
  );
}

// ----------------------------------------------------
// HELP & SUPPORT SCREEN
// ----------------------------------------------------
export function SupportScreen() {
  const openDialer = () => {
    Linking.openURL('tel:18007293492');
  };

  const openWhatsApp = () => {
    Linking.openURL('https://wa.me/919876543210?text=Hi%20Paydiya%20Merchant%20Support');
  };

  return (
    <Screen variant="cream" showBack={true} title="Help & Support">
      <Card style={styles.supportHeroCard}>
        <View style={styles.supportIconWrap}>
          <Icon name="help-circle" size={32} color={colors.primary} />
        </View>
        <Text style={styles.supportHeroTitle}>24x7 Priority Merchant Desk</Text>
        <Text style={styles.supportHeroSub}>
          Direct resolution for UPI payment failures, bank settlements, and hardware.
        </Text>

        <View style={styles.contactButtonsRow}>
          <TouchableOpacity onPress={openDialer} style={styles.contactBtn}>
            <Icon name="phone" size={16} color={colors.primary} />
            <Text style={styles.contactBtnText}>Call Helpline</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={openWhatsApp} style={[styles.contactBtn, styles.waBtn]}>
            <Icon name="shield" size={16} color={colors.success} />
            <Text style={[styles.contactBtnText, { color: colors.success }]}>
              WhatsApp
            </Text>
          </TouchableOpacity>
        </View>
      </Card>

      <Text style={styles.faqHeading}>Frequently Asked Questions</Text>

      {[
        { q: 'When do UPI payments settle into my bank account?', a: 'All successful payments are batched and settled automatically the next morning by 08:00 AM.' },
        { q: 'How do I issue a customer refund?', a: 'Navigate to Transactions, select the specific payment, and tap Initiate Refund.' },
        { q: 'Can my cashier see store settlement amounts?', a: 'No, Cashier role permissions restrict access only to generating QR codes and verifying payment receipts.' },
      ].map((item, i) => (
        <Card key={i} style={styles.faqCard}>
          <Text style={styles.faqQuestion}>{item.q}</Text>
          <Text style={styles.faqAnswer}>{item.a}</Text>
        </Card>
      ))}
    </Screen>
  );
}

// ----------------------------------------------------
// SECURITY & PRIVACY SCREEN
// ----------------------------------------------------
export function SecurityScreen({ navigation }: any) {
  const handleLogoutAll = async () => {
    Alert.alert(
      'Logout All Devices',
      'This will terminate active merchant sessions across all terminals.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm Logout',
          style: 'destructive',
          onPress: async () => {
            await secureStorage.clearAuthTokens();
            navigation.replace('Login');
          },
        },
      ],
    );
  };

  return (
    <Screen variant="cream" showBack={true} title="Security & Authentication">
      <Card style={styles.secCard}>
        <View style={styles.secRow}>
          <View style={styles.secIcon}>
            <Icon name="lock" size={20} color={colors.primary} />
          </View>
          <View style={styles.secInfo}>
            <Text style={styles.secTitle}>Change 4-Digit MPIN</Text>
            <Text style={styles.secSub}>Update your security transaction pin</Text>
          </View>
          <Icon name="chevron-right" size={18} color={colors.gray500} />
        </View>
      </Card>

      <Card style={styles.secCard}>
        <View style={styles.secRow}>
          <View style={styles.secIcon}>
            <Icon name="shield" size={20} color={colors.primary} />
          </View>
          <View style={styles.secInfo}>
            <Text style={styles.secTitle}>Biometric Authorization</Text>
            <Text style={styles.secSub}>Require fingerprint / Face ID for refunds</Text>
          </View>
          <Badge label="Enabled" variant="success" size="small" />
        </View>
      </Card>

      <Card style={styles.secCard}>
        <View style={styles.secRow}>
          <View style={styles.secIcon}>
            <Icon name="calendar" size={20} color={colors.primary} />
          </View>
          <View style={styles.secInfo}>
            <Text style={styles.secTitle}>Session Auto-Lock</Text>
            <Text style={styles.secSub}>Automatically lock terminal after 5 minutes</Text>
          </View>
          <Text style={styles.secValue}>5 min</Text>
        </View>
      </Card>

      <View style={styles.logoutSection}>
        <Button
          title="Terminate All Other Sessions"
          onPress={handleLogoutAll}
          variant="outline"
          size="medium"
          leftIcon={<Icon name="arrow-right" size={16} color={colors.primary} />}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenSub: {
    fontSize: 13,
    color: colors.charcoalMuted,
    marginBottom: spacing.base,
    lineHeight: 18,
  },
  addIconBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.primary,
    borderRadius: radius.full,
  },
  addBtnText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 12,
  },
  staffCard: {
    padding: spacing.base,
    marginBottom: spacing.md,
  },
  staffRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  staffAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  staffAvatarText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primaryDark,
  },
  staffInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  staffName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.charcoal,
  },
  staffMobile: {
    fontSize: 12,
    color: colors.charcoalMuted,
  },
  staffEmail: {
    fontSize: 11,
    color: colors.gray500,
  },
  permissionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.divider,
  },
  permChip: {
    backgroundColor: colors.gray100,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: radius.sm,
  },
  permText: {
    fontSize: 11,
    color: colors.charcoalLight,
    fontWeight: '500',
  },
  deviceCard: {
    padding: spacing.base,
    marginBottom: spacing.md,
  },
  deviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  deviceBlocked: {
    backgroundColor: colors.errorLight,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.charcoal,
  },
  deviceMeta: {
    fontSize: 12,
    color: colors.charcoalMuted,
    marginTop: 2,
  },
  deviceLastActive: {
    fontSize: 11,
    color: colors.gray500,
    marginTop: 2,
  },
  deviceActionCol: {
    alignItems: 'flex-end',
  },
  blockBtn: {
    marginTop: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  blockBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  blockText: {
    color: colors.error,
  },
  unblockText: {
    color: colors.success,
  },
  notificationCard: {
    padding: spacing.base,
    marginBottom: spacing.sm,
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notificationIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.charcoal,
  },
  notificationSub: {
    fontSize: 12,
    color: colors.charcoalMuted,
    marginTop: 2,
  },
  notificationTime: {
    fontSize: 11,
    color: colors.gray500,
    marginTop: 4,
  },
  reportCard: {
    padding: spacing.base,
    marginBottom: spacing.md,
  },
  reportTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.charcoal,
  },
  reportDesc: {
    fontSize: 12,
    color: colors.charcoalMuted,
    marginTop: 2,
    marginBottom: spacing.md,
  },
  exportRow: {
    flexDirection: 'row',
    gap: 8,
  },
  exportChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radius.md,
    gap: 4,
  },
  exportChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  downloadBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successLight,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.md,
  },
  downloadBannerText: {
    fontSize: 12,
    color: colors.successDark,
    marginLeft: 8,
    flex: 1,
    fontWeight: '600',
  },
  supportHeroCard: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.base,
    marginBottom: spacing.lg,
  },
  supportIconWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  supportHeroTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.charcoal,
    textAlign: 'center',
  },
  supportHeroSub: {
    fontSize: 13,
    color: colors.charcoalMuted,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: spacing.lg,
    lineHeight: 18,
  },
  contactButtonsRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  contactBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 12,
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderColor: colors.primary,
    gap: 6,
  },
  waBtn: {
    borderColor: colors.success,
  },
  contactBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  faqHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.charcoal,
    marginBottom: spacing.md,
  },
  faqCard: {
    padding: spacing.base,
    marginBottom: spacing.sm,
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.charcoal,
    marginBottom: 4,
  },
  faqAnswer: {
    fontSize: 12,
    color: colors.charcoalMuted,
    lineHeight: 18,
  },
  secCard: {
    padding: spacing.base,
    marginBottom: spacing.sm,
  },
  secRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  secIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  secInfo: {
    flex: 1,
  },
  secTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.charcoal,
  },
  secSub: {
    fontSize: 12,
    color: colors.charcoalMuted,
    marginTop: 2,
  },
  secValue: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  logoutSection: {
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
});
