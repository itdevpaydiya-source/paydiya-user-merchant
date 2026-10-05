import React, { useState } from 'react';
import {
  Alert,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { colors, radius, spacing } from '@/design-system';
import { Screen } from '@/components/Screen';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Icon } from '@/components/Icon';
import { PaydiyaLogo } from '@/components/PaydiyaLogo';
import { mockQRService } from '@/mocks/services';
import { mockMerchant } from '@/mocks/data';
import { formatINR } from '@/utils/format';

export default function QrScreen() {
  const [tab, setTab] = useState<'static' | 'dynamic'>('static');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [dynamicQr, setDynamicQr] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!amount || Number(amount) <= 0) {
      Alert.alert('Amount Required', 'Please enter a valid amount.');
      return;
    }
    setLoading(true);
    const res = await mockQRService.generateDynamicQR(Number(amount));
    setDynamicQr(res);
    setLoading(false);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Pay ${mockMerchant.name} on Paydiya UPI ID: ${mockMerchant.upiId}`,
      });
    } catch {
      // Ignored
    }
  };

  const handleDownload = () => {
    Alert.alert('Downloaded', 'QR Code saved to gallery in high-resolution.');
  };

  return (
    <Screen
      variant="cream"
      showBack={true}
      title="My QR Code"
      rightAction={
        <TouchableOpacity onPress={handleShare} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Icon name="share" size={20} color={colors.charcoal} />
        </TouchableOpacity>
      }>
      {/* Store Identity Banner */}
      <Card style={styles.storeCard}>
        <View style={styles.storeRow}>
          <View style={styles.storeIconWrap}>
            <Icon name="store" size={18} color={colors.primary} />
          </View>
          <View>
            <Text style={styles.storeName}>{mockMerchant.name}</Text>
            <Text style={styles.storeMid}>MID: {mockMerchant.mid}</Text>
          </View>
        </View>
      </Card>

      {/* Segmented Tab Controls matching Screen 3 */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setTab('static')}
          style={[styles.tabButton, tab === 'static' && styles.tabButtonActive]}>
          <Text style={[styles.tabText, tab === 'static' && styles.tabTextActive]}>
            Static QR
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab('dynamic')}
          style={[styles.tabButton, tab === 'dynamic' && styles.tabButtonActive]}>
          <Text style={[styles.tabText, tab === 'dynamic' && styles.tabTextActive]}>
            Dynamic QR
          </Text>
        </TouchableOpacity>
      </View>

      {tab === 'static' ? (
        <Card style={styles.qrCard}>
          {/* Realistic SVG UPI QR Pattern with Paydiya Logo Emblem */}
          <View style={styles.qrWrapper}>
            <Svg width={200} height={200} viewBox="0 0 200 200">
              <Rect x="0" y="0" width="200" height="200" fill="#FFFFFF" rx="12" />
              {/* Corner position markers */}
              <Rect x="16" y="16" width="46" height="46" fill="#1E293B" rx="6" />
              <Rect x="24" y="24" width="30" height="30" fill="#FFFFFF" rx="3" />
              <Rect x="30" y="30" width="18" height="18" fill="#E59964" rx="2" />

              <Rect x="138" y="16" width="46" height="46" fill="#1E293B" rx="6" />
              <Rect x="146" y="24" width="30" height="30" fill="#FFFFFF" rx="3" />
              <Rect x="152" y="30" width="18" height="18" fill="#E59964" rx="2" />

              <Rect x="16" y="138" width="46" height="46" fill="#1E293B" rx="6" />
              <Rect x="24" y="146" width="30" height="30" fill="#FFFFFF" rx="3" />
              <Rect x="30" y="152" width="18" height="18" fill="#E59964" rx="2" />

              {/* Data pixel simulation */}
              <Rect x="76" y="20" width="12" height="12" fill="#1E293B" />
              <Rect x="96" y="20" width="12" height="12" fill="#1E293B" />
              <Rect x="114" y="20" width="12" height="12" fill="#1E293B" />
              <Rect x="76" y="38" width="12" height="12" fill="#E59964" />
              <Rect x="114" y="38" width="12" height="12" fill="#1E293B" />
              <Rect x="76" y="56" width="12" height="12" fill="#1E293B" />
              <Rect x="96" y="56" width="12" height="12" fill="#1E293B" />
              <Rect x="114" y="56" width="12" height="12" fill="#E59964" />

              <Rect x="20" y="76" width="12" height="12" fill="#1E293B" />
              <Rect x="38" y="76" width="12" height="12" fill="#1E293B" />
              <Rect x="56" y="76" width="12" height="12" fill="#1E293B" />
              <Rect x="138" y="76" width="12" height="12" fill="#E59964" />
              <Rect x="156" y="76" width="12" height="12" fill="#1E293B" />
              <Rect x="174" y="76" width="12" height="12" fill="#1E293B" />

              <Rect x="20" y="96" width="12" height="12" fill="#E59964" />
              <Rect x="56" y="96" width="12" height="12" fill="#1E293B" />
              <Rect x="138" y="96" width="12" height="12" fill="#1E293B" />
              <Rect x="174" y="96" width="12" height="12" fill="#1E293B" />

              <Rect x="20" y="114" width="12" height="12" fill="#1E293B" />
              <Rect x="38" y="114" width="12" height="12" fill="#1E293B" />
              <Rect x="56" y="114" width="12" height="12" fill="#E59964" />
              <Rect x="138" y="114" width="12" height="12" fill="#1E293B" />
              <Rect x="156" y="114" width="12" height="12" fill="#1E293B" />

              <Rect x="76" y="138" width="12" height="12" fill="#1E293B" />
              <Rect x="96" y="138" width="12" height="12" fill="#E59964" />
              <Rect x="114" y="138" width="12" height="12" fill="#1E293B" />
              <Rect x="76" y="156" width="12" height="12" fill="#1E293B" />
              <Rect x="114" y="156" width="12" height="12" fill="#1E293B" />
              <Rect x="76" y="174" width="12" height="12" fill="#E59964" />
              <Rect x="96" y="174" width="12" height="12" fill="#1E293B" />
              <Rect x="114" y="174" width="12" height="12" fill="#1E293B" />
            </Svg>
            {/* Center Official Paydiya Emblem */}
            <View style={styles.centerBadge}>
              <PaydiyaLogo variant="dark" size="small" />
            </View>
          </View>

          <Text style={styles.scanText}>Scan and pay with any UPI App</Text>
          <Text style={styles.upiIdText}>UPI ID: {mockMerchant.upiId}</Text>

          {/* Action Buttons Row matching Screen 3 */}
          <View style={styles.buttonRow}>
            <View style={styles.buttonHalf}>
              <Button
                title="Share QR"
                onPress={handleShare}
                variant="dark"
                size="medium"
                leftIcon={<Icon name="share" size={16} color={colors.white} />}
              />
            </View>
            <View style={styles.buttonHalf}>
              <Button
                title="Download"
                onPress={handleDownload}
                variant="primary"
                size="medium"
                leftIcon={<Icon name="download" size={16} color={colors.charcoal} />}
              />
            </View>
          </View>
        </Card>
      ) : (
        <Card style={styles.dynamicCard}>
          <Text style={styles.formHeading}>Generate Dynamic QR</Text>
          <Text style={styles.formSub}>Create a single-use QR for a specific amount</Text>

          <Input
            label="Amount (₹)"
            placeholder="0.00"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            prefixText="₹"
          />

          <Input
            label="Optional Note"
            placeholder="e.g. Table 4 / Invoice #902"
            value={note}
            onChangeText={setNote}
          />

          <Button
            title="Generate QR"
            onPress={handleGenerate}
            variant="primary"
            loading={loading}
            size="large"
          />

          {dynamicQr && (
            <View style={styles.dynamicResult}>
              <View style={styles.dynamicAmountBadge}>
                <Text style={styles.dynamicAmountText}>{formatINR(dynamicQr.amount, true)}</Text>
              </View>
              <Text style={styles.dynamicStatus}>Status: {dynamicQr.status} • Expires in 5 min</Text>
            </View>
          )}
        </Card>
      )}

      {/* Accept Payments From UPI Row matching Screen 3 */}
      <View style={styles.upiPartnersSection}>
        <Text style={styles.upiHeading}>Accept payments from</Text>
        <View style={styles.upiBadgesRow}>
          {['GPay', 'PhonePe', 'Paytm', 'BHIM', 'UPI'].map(badge => (
            <View key={badge} style={styles.upiChip}>
              <Text style={styles.upiChipText}>{badge}</Text>
            </View>
          ))}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  storeCard: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  storeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeIconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  storeName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.charcoal,
  },
  storeMid: {
    fontSize: 12,
    color: colors.charcoalMuted,
    marginTop: 2,
  },
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
  qrCard: {
    alignItems: 'center',
    padding: spacing.xl,
    marginBottom: spacing.base,
  },
  qrWrapper: {
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    borderWidth: 1.5,
    borderColor: colors.divider,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.base,
  },
  centerBadge: {
    position: 'absolute',
    backgroundColor: '#111620',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  scanText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.charcoal,
    marginTop: spacing.xs,
  },
  upiIdText: {
    fontSize: 12,
    color: colors.charcoalMuted,
    marginTop: 2,
    marginBottom: spacing.lg,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  buttonHalf: {
    flex: 1,
  },
  dynamicCard: {
    padding: spacing.lg,
    marginBottom: spacing.base,
  },
  formHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.charcoal,
    marginBottom: 4,
  },
  formSub: {
    fontSize: 13,
    color: colors.charcoalMuted,
    marginBottom: spacing.base,
  },
  dynamicResult: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  dynamicAmountBadge: {
    backgroundColor: colors.primaryLight,
    paddingVertical: 10,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  dynamicAmountText: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primaryDark,
  },
  dynamicStatus: {
    fontSize: 12,
    color: colors.charcoalMuted,
    marginTop: spacing.sm,
  },
  upiPartnersSection: {
    alignItems: 'center',
    marginTop: spacing.base,
    marginBottom: spacing.xl,
  },
  upiHeading: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.charcoalMuted,
    marginBottom: spacing.sm,
  },
  upiBadgesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  upiChip: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  upiChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.charcoalLight,
  },
});
