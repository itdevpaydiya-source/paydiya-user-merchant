import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '@/design-system';
import { PaydiyaLogo } from '@/components/PaydiyaLogo';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Icon } from '@/components/Icon';

export default function LoginScreen({ navigation }: any) {
  const [mobile, setMobile] = useState('9876543210');
  const [isEditingMobile, setIsEditingMobile] = useState(false);

  const handleLoginPress = () => {
    navigation.navigate('Otp', { mobile: mobile || '9876543210' });
  };

  const handleQuickDemo = () => {
    navigation.replace('Main');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111620" />
      {navigation.canGoBack() && (
        <SafeAreaView edges={['top']} style={styles.topBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
            <Icon name="arrow-left" size={20} color={colors.white} />
          </TouchableOpacity>
        </SafeAreaView>
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardContainer}>
        {/* Centered Brand Area */}
        <View style={styles.heroSection}>
          <PaydiyaLogo
            variant="dark"
            size="hero"
            showTagline={true}
            alignCenter={true}
          />
        </View>

        {/* Action / Input Section */}
        <View style={styles.actionSection}>
          {/* Quick Mobile Indicator / Editor */}
          {isEditingMobile ? (
            <View style={styles.mobileEditCard}>
              <Text style={styles.mobileEditLabel}>Registered Mobile Number</Text>
              <View style={styles.mobileInputRow}>
                <Input
                  placeholder="10-digit mobile number"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={mobile}
                  onChangeText={setMobile}
                  prefixText="+91"
                  containerStyle={{ flex: 1, marginBottom: 0 }}
                />
                <TouchableOpacity
                  onPress={() => setIsEditingMobile(false)}
                  style={styles.savePhoneBtn}>
                  <Text style={styles.savePhoneText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => setIsEditingMobile(true)}
              style={styles.mobileBadge}
              activeOpacity={0.8}>
              <Icon name="phone" size={14} color={colors.primary} />
              <Text style={styles.mobileBadgeText}>+91 {mobile}</Text>
              <Text style={styles.mobileBadgeEdit}>Tap to edit</Text>
            </TouchableOpacity>
          )}

          <View style={styles.buttonStack}>
            {/* Primary Peach Button matching Reference Image Screen 1 */}
            <Button
              title="Login"
              onPress={handleLoginPress}
              variant="primary"
              size="large"
              style={styles.primaryButton}
              textStyle={styles.primaryButtonText}
            />

            {/* Secondary Outlined Button matching Reference Image Screen 1 */}
            <Button
              title="Create Merchant Account"
              onPress={() => navigation.navigate('CreateAccount')}
              variant="outline"
              size="large"
              style={styles.outlineButton}
              textStyle={styles.outlineButtonText}
            />

            {/* Fast Quick-Login Links for Merchant convenience */}
            <View style={styles.quickLinksRow}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Otp', { mobile })}
                style={styles.textLink}>
                <Icon name="mail" size={14} color={colors.primary} />
                <Text style={styles.textLinkLabel}>Verify Code</Text>
              </TouchableOpacity>

              <Text style={styles.dividerDot}>•</Text>

              <TouchableOpacity
                onPress={() => navigation.navigate('Mpin')}
                style={styles.textLink}>
                <Icon name="lock" size={14} color={colors.primary} />
                <Text style={styles.textLinkLabel}>MPIN</Text>
              </TouchableOpacity>

              <Text style={styles.dividerDot}>•</Text>

              <TouchableOpacity
                onPress={() => navigation.navigate('Biometric')}
                style={styles.textLink}>
                <Icon name="shield" size={14} color={colors.primary} />
                <Text style={styles.textLinkLabel}>Biometrics</Text>
              </TouchableOpacity>

              <Text style={styles.dividerDot}>•</Text>

              <TouchableOpacity onPress={handleQuickDemo} style={styles.textLink}>
                <Text style={styles.demoLink}>Demo</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer branding */}
          <View style={styles.footer}>
            <Text style={styles.poweredText}>Powered by Paydiya</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111620', // Official Dark Background
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing['3xl'],
    paddingBottom: spacing.lg,
  },
  heroSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionSection: {
    width: '100%',
    paddingBottom: spacing.base,
  },
  buttonStack: {
    width: '100%',
  },
  primaryButton: {
    backgroundColor: colors.primary, // Official Paydiya Peach/Copper #E59964
    borderRadius: radius.full,
    paddingVertical: 16,
    marginBottom: spacing.md,
  },
  primaryButtonText: {
    color: '#111620',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  outlineButton: {
    borderColor: colors.primary,
    borderWidth: 1.5,
    borderRadius: radius.full,
    paddingVertical: 16,
    backgroundColor: 'transparent',
    marginBottom: spacing.base,
  },
  outlineButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  mobileBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181F2A',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: '#2B374A',
    marginBottom: spacing.base,
    alignSelf: 'center',
  },
  mobileBadgeText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 6,
    marginRight: 10,
  },
  mobileBadgeEdit: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  mobileEditCard: {
    backgroundColor: '#181F2A',
    borderRadius: radius.lg,
    padding: spacing.base,
    borderWidth: 1,
    borderColor: '#2B374A',
    marginBottom: spacing.base,
  },
  mobileEditLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
    marginBottom: 8,
  },
  mobileInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  savePhoneBtn: {
    marginLeft: spacing.sm,
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: radius.md,
  },
  savePhoneText: {
    color: colors.charcoalDark,
    fontWeight: '700',
    fontSize: 14,
  },
  quickLinksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  textLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  textLinkLabel: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 4,
  },
  demoLink: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  dividerDot: {
    color: '#475569',
    marginHorizontal: 8,
  },
  footer: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  poweredText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
});
