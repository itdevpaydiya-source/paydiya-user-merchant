import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { colors, radius, spacing } from '@/design-system';
import { Screen } from '@/components/Screen';
import { Card } from '@/components/Card';
import { Icon, IconName } from '@/components/Icon';

interface AlertItem {
  id: string;
  title: string;
  subtitle: string;
  icon: IconName;
}

const PREFERENCES: AlertItem[] = [
  {
    id: 'voice',
    title: 'Soundbox Voice Alerts',
    subtitle: 'Loud payment audio confirmation on receipt',
    icon: 'speaker',
  },
  {
    id: 'payment',
    title: 'Payment Received Push',
    subtitle: 'Instant push notification on customer payment',
    icon: 'bell',
  },
  {
    id: 'settlement',
    title: 'Settlement Updates',
    subtitle: 'Alerts when funds are credited to your bank',
    icon: 'bank',
  },
  {
    id: 'refund',
    title: 'Refund Confirmations',
    subtitle: 'Updates on processed reversals and disputes',
    icon: 'refund',
  },
  {
    id: 'security',
    title: 'Security & Device Alerts',
    subtitle: 'New terminal logins and session lock alerts',
    icon: 'shield',
  },
  {
    id: 'reports',
    title: 'Daily Business Summary',
    subtitle: 'Daily 09:00 PM closing statement summary',
    icon: 'reports',
  },
];

export default function NotificationPreferencesScreen() {
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    voice: true,
    payment: true,
    settlement: true,
    refund: true,
    security: true,
    reports: false,
  });

  const toggle = (id: string) => {
    setPrefs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Screen variant="cream" showBack={true} title="Notification Settings">
      <Text style={styles.screenSub}>
        Configure soundbox speech alerts and merchant mobile notifications.
      </Text>

      <Card style={styles.card}>
        {PREFERENCES.map((item, index) => {
          const isEnabled = prefs[item.id];
          const isLast = index === PREFERENCES.length - 1;

          return (
            <View
              key={item.id}
              style={[styles.prefRow, isLast && styles.lastRow]}>
              <View style={styles.iconCircle}>
                <Icon name={item.icon} size={20} color={colors.primary} />
              </View>

              <View style={styles.textWrap}>
                <Text style={styles.prefTitle}>{item.title}</Text>
                <Text style={styles.prefSubtitle}>{item.subtitle}</Text>
              </View>

              <Switch
                value={isEnabled}
                onValueChange={() => toggle(item.id)}
                trackColor={{ true: colors.primary, false: colors.gray200 }}
                thumbColor={colors.white}
              />
            </View>
          );
        })}
      </Card>
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
  card: {
    padding: spacing.md,
    borderRadius: radius.xl,
  },
  prefRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  lastRow: {
    borderBottomWidth: 0,
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
  textWrap: {
    flex: 1,
    marginRight: spacing.sm,
  },
  prefTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.charcoal,
  },
  prefSubtitle: {
    fontSize: 12,
    color: colors.charcoalMuted,
    marginTop: 2,
  },
});
