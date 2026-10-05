import React, { useEffect, useState } from 'react';
import {
  Alert,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, radius, spacing } from '@/design-system';
import { Screen } from '@/components/Screen';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Icon } from '@/components/Icon';
import { Badge } from '@/components/Badge';
import { mockPaymentLinkService } from '@/mocks/services';
import { PaymentLink } from '@/types';
import { formatINR } from '@/utils/format';

export default function PaymentLinksScreen({ navigation }: any) {
  const [tab, setTab] = useState<'create' | 'history'>('create');
  const [amount, setAmount] = useState('500');
  const [purpose, setPurpose] = useState('Order #1234');
  const [expiry, setExpiry] = useState('7 Days');
  const [created, setCreated] = useState<PaymentLink | null>(null);
  const [links, setLinks] = useState<PaymentLink[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    mockPaymentLinkService.list().then(setLinks);
  }, []);

  const handleCreate = async () => {
    if (!amount || Number(amount) <= 0) {
      Alert.alert('Amount Required', 'Please enter an amount.');
      return;
    }
    setLoading(true);
    const res = await mockPaymentLinkService.create(Number(amount), purpose);
    setCreated(res);
    setLoading(false);
  };

  const handleCopy = () => {
    Alert.alert('Copied', 'Payment link copied to clipboard.');
  };

  const handleShare = async (url: string) => {
    try {
      await Share.share({
        message: `Pay here: ${url}`,
      });
    } catch {
      // Ignored
    }
  };

  return (
    <Screen variant="cream" showBack={true} title="Payment Link">
      {/* Segmented Tab Bar matching Screen 8 */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setTab('create')}
          style={[styles.tabButton, tab === 'create' && styles.tabButtonActive]}>
          <Text style={[styles.tabText, tab === 'create' && styles.tabTextActive]}>
            Create Link
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab('history')}
          style={[styles.tabButton, tab === 'history' && styles.tabButtonActive]}>
          <Text style={[styles.tabText, tab === 'history' && styles.tabTextActive]}>
            Links History
          </Text>
        </TouchableOpacity>
      </View>

      {tab === 'create' ? (
        <Card style={styles.formCard}>
          <Input
            label="Amount"
            placeholder="0.00"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            prefixText="₹"
          />

          <Input
            label="Purpose (Optional)"
            placeholder="e.g. Order #1234"
            value={purpose}
            onChangeText={setPurpose}
            prefixIcon={<Icon name="file-text" size={18} color={colors.primary} />}
          />

          <Input
            label="Expiry"
            placeholder="7 Days"
            value={expiry}
            onChangeText={setExpiry}
            prefixIcon={<Icon name="calendar" size={18} color={colors.primary} />}
            suffixIcon={<Icon name="chevron-down" size={16} color={colors.gray500} />}
          />

          <Button
            title="Generate Payment Link"
            onPress={handleCreate}
            variant="primary"
            loading={loading}
            size="large"
            style={styles.generateButton}
          />

          {created && (
            <View style={styles.createdBox}>
              <View style={styles.urlRow}>
                <Text style={styles.urlText} numberOfLines={1}>
                  {created.url}
                </Text>
                <TouchableOpacity onPress={handleCopy} style={styles.copyBtn}>
                  <Icon name="copy" size={16} color={colors.charcoal} />
                  <Text style={styles.copyLabel}>Copy</Text>
                </TouchableOpacity>
              </View>

              <Button
                title="Share Link"
                onPress={() => handleShare(created.url)}
                variant="outline"
                size="medium"
                leftIcon={<Icon name="share" size={16} color={colors.primary} />}
                style={styles.shareBtn}
              />
            </View>
          )}
        </Card>
      ) : (
        <View>
          {links.map(l => (
            <Card
              key={l.id}
              onPress={() => navigation.navigate('PaymentLinkDetails', { id: l.id })}
              style={styles.linkCard}>
              <View style={styles.linkRow}>
                <View style={styles.linkIconWrap}>
                  <Icon name="payment-link" size={20} color={colors.primary} />
                </View>
                <View style={styles.linkInfo}>
                  <Text style={styles.linkAmount}>{formatINR(l.amount)}</Text>
                  <Text style={styles.linkMeta}>
                    {l.purpose} • Created {l.createdAt}
                  </Text>
                  <Text style={styles.linkExpiry}>Expiry: {l.expiry}</Text>
                </View>
                <Badge
                  label={l.status}
                  variant={l.status === 'Paid' ? 'success' : l.status === 'Active' ? 'info' : 'warning'}
                  size="small"
                />
              </View>
            </Card>
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: radius.full,
    padding: 4,
    marginBottom: spacing.base,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: radius.full,
  },
  tabButtonActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.charcoalMuted,
  },
  tabTextActive: {
    color: colors.white,
    fontWeight: '700',
  },
  formCard: {
    padding: spacing.lg,
  },
  generateButton: {
    marginTop: spacing.sm,
  },
  createdBox: {
    marginTop: spacing.lg,
    paddingTop: spacing.base,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  urlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.creamDark,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    marginBottom: spacing.md,
  },
  urlText: {
    flex: 1,
    fontSize: 13,
    color: colors.charcoal,
    fontWeight: '600',
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: radius.sm,
    marginLeft: spacing.sm,
  },
  copyLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.charcoal,
    marginLeft: 4,
  },
  shareBtn: {
    marginTop: 2,
  },
  linkCard: {
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  linkInfo: {
    flex: 1,
  },
  linkAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.charcoal,
  },
  linkMeta: {
    fontSize: 12,
    color: colors.charcoalMuted,
    marginTop: 2,
  },
  linkExpiry: {
    fontSize: 11,
    color: colors.gray500,
    marginTop: 2,
  },
});
