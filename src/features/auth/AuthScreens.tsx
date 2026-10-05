import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, radius, spacing } from '@/design-system';
import { Screen } from '@/components/Screen';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Icon } from '@/components/Icon';
import { mockAuthService } from '@/mocks/services';
import { secureStorage } from '@/services/storage/secureStorage';

// ----------------------------------------------------
// OTP SCREEN ("Enter Verification Code")
// ----------------------------------------------------
export function OtpScreen({ route, navigation }: any) {
  const [mobile, setMobile] = useState(route.params?.mobile || '9876543210');
  const [isEditingMobile, setIsEditingMobile] = useState(false);
  const [tempMobile, setTempMobile] = useState(mobile);
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = React.useRef<any>(null);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Focus input automatically
  useEffect(() => {
    const t = setTimeout(() => {
      inputRef.current?.focus();
    }, 400);
    return () => clearTimeout(t);
  }, []);

  const handleOtpChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 4);
    setOtp(cleaned);
    if (error) setError('');
    if (cleaned.length === 4) {
      verifyOtp(cleaned);
    }
  };

  const handleKeypadPress = (digit: string) => {
    if (otp.length < 4) {
      const nextOtp = otp + digit;
      setOtp(nextOtp);
      if (error) setError('');
      if (nextOtp.length === 4) {
        verifyOtp(nextOtp);
      }
    }
  };

  const handleKeypadDelete = () => {
    if (otp.length > 0) {
      setOtp(prev => prev.slice(0, -1));
      if (error) setError('');
    }
  };

  const verifyOtp = async (codeToVerify = otp) => {
    if (codeToVerify.length < 4) {
      setError('Please enter the 4-digit code sent to your phone');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await mockAuthService.verifyOtp(codeToVerify);
      setLoading(false);
      navigation.navigate('Mpin');
    } catch (e: any) {
      setLoading(false);
      setOtp('');
      setError(e.message || 'Invalid OTP code. Please try again.');
    }
  };

  const resendOtp = async () => {
    setTimer(30);
    setOtp('');
    setError('');
    try {
      await mockAuthService.requestOtp(mobile);
      Alert.alert('Verification Code Sent', `A new 4-digit code was sent to +91 ${mobile}`);
    } catch {
      Alert.alert('Error', 'Unable to resend OTP at this time.');
    }
  };

  const handleFillDemoCode = () => {
    handleOtpChange('1234');
  };

  const handleSaveMobile = () => {
    if (tempMobile.length < 10) {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number.');
      return;
    }
    setMobile(tempMobile);
    setIsEditingMobile(false);
    setTimer(30);
    setOtp('');
    Alert.alert('Number Updated', `Verification code sent to +91 ${tempMobile}`);
  };

  return (
    <Screen
      variant="cream"
      showBack={true}
      title="Verify Mobile"
      onBack={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Login')}>
      <View style={styles.contentWrap}>
        {/* Badge Icon */}
        <View style={styles.badgeIcon}>
          <Icon name="mail" size={28} color={colors.primary} />
        </View>

        <Text style={styles.heading}>Enter Verification Code</Text>
        <Text style={styles.subtitle}>
          We sent a 4-digit verification code to
        </Text>

        {/* Mobile Number Display & Change option */}
        {isEditingMobile ? (
          <View style={styles.editMobileRow}>
            <Input
              placeholder="10-digit mobile"
              keyboardType="phone-pad"
              maxLength={10}
              value={tempMobile}
              onChangeText={setTempMobile}
              prefixText="+91"
              containerStyle={{ width: 180, marginBottom: 0 }}
            />
            <TouchableOpacity onPress={handleSaveMobile} style={styles.saveMobileBtn}>
              <Text style={styles.saveMobileText}>Save</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.mobileChip}>
            <Text style={styles.mobileText}>+91 {mobile}</Text>
            <TouchableOpacity
              onPress={() => {
                setTempMobile(mobile);
                setIsEditingMobile(true);
              }}
              style={styles.changeLink}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={styles.changeLinkText}>Change</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Hidden System TextInput for soft keyboard */}
        <TextInput
          ref={inputRef}
          value={otp}
          onChangeText={handleOtpChange}
          keyboardType="number-pad"
          maxLength={4}
          style={styles.hiddenNativeInput}
          autoFocus={false}
        />

        {/* 4 Dedicated OTP Digit Boxes */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => inputRef.current?.focus()}
          style={styles.otpBoxesRow}>
          {[0, 1, 2, 3].map(index => {
            const digit = otp[index];
            const isCurrent = otp.length === index;
            const isFilled = Boolean(digit);

            return (
              <View
                key={index}
                style={[
                  styles.otpCell,
                  isCurrent && styles.otpCellActive,
                  isFilled && styles.otpCellFilled,
                  Boolean(error) && styles.otpCellError,
                ]}>
                <Text style={styles.otpCellText}>
                  {digit ? digit : isCurrent ? '|' : '•'}
                </Text>
              </View>
            );
          })}
        </TouchableOpacity>

        {/* Error message */}
        {Boolean(error) && <Text style={styles.errorBanner}>{error}</Text>}

        {/* Loading Indicator */}
        {loading && (
          <ActivityIndicator size="small" color={colors.primary} style={{ marginVertical: 8 }} />
        )}

        {/* Timer / Resend Row */}
        <View style={styles.timerRow}>
          {timer > 0 ? (
            <Text style={styles.timerText}>
              Resend code in <Text style={styles.boldTimer}>{timer < 10 ? `00:0${timer}` : `00:${timer}`}</Text>
            </Text>
          ) : (
            <TouchableOpacity onPress={resendOtp} style={styles.resendBtn}>
              <Icon name="refresh" size={15} color={colors.primary} />
              <Text style={styles.resendLink}>Resend Code</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Verify & Proceed Button */}
        <Button
          title="Verify & Proceed"
          onPress={() => verifyOtp(otp)}
          variant="primary"
          loading={loading}
          disabled={otp.length < 4}
          size="large"
          style={styles.actionButton}
        />

        {/* On-Screen Tactile Keypad */}
        <View style={styles.keypad}>
          {[
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9'],
            ['demo', '0', 'del'],
          ].map((row, rIdx) => (
            <View key={rIdx} style={styles.keypadRow}>
              {row.map(key => {
                if (key === 'del') {
                  return (
                    <TouchableOpacity
                      key={key}
                      onPress={handleKeypadDelete}
                      style={styles.keyButton}
                      activeOpacity={0.7}>
                      <Icon name="arrow-left" size={22} color={colors.charcoal} />
                    </TouchableOpacity>
                  );
                }
                if (key === 'demo') {
                  return (
                    <TouchableOpacity
                      key={key}
                      onPress={handleFillDemoCode}
                      style={[styles.keyButton, styles.demoKeyButton]}
                      activeOpacity={0.7}>
                      <Text style={styles.demoKeyText}>1234</Text>
                    </TouchableOpacity>
                  );
                }
                return (
                  <TouchableOpacity
                    key={key}
                    onPress={() => handleKeypadPress(key)}
                    style={styles.keyButton}
                    activeOpacity={0.7}>
                    <Text style={styles.keyDigit}>{key}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </View>
    </Screen>
  );
}

// ----------------------------------------------------
// MPIN SCREEN
// ----------------------------------------------------
export function MpinScreen({ navigation }: any) {
  const [mpin, setMpin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDigit = (digit: string) => {
    if (mpin.length < 4) {
      const next = mpin + digit;
      setMpin(next);
      setError('');
      if (next.length === 4) {
        verifyMpin(next);
      }
    }
  };

  const handleDelete = () => {
    setMpin(prev => prev.slice(0, -1));
    setError('');
  };

  const verifyMpin = async (pinToVerify = mpin) => {
    if (pinToVerify.length !== 4) return;
    setLoading(true);
    try {
      await mockAuthService.verifyMpin(pinToVerify);
      setLoading(false);
      navigation.navigate('Biometric');
    } catch (e: any) {
      setLoading(false);
      setMpin('');
      setError(e.message || 'Incorrect MPIN. Please try again.');
    }
  };

  return (
    <Screen variant="cream" showBack={true} title="Security PIN">
      <View style={styles.pinContainer}>
        <View style={styles.badgeIcon}>
          <Icon name="lock" size={28} color={colors.primary} />
        </View>

        <Text style={styles.heading}>Enter 4-Digit MPIN</Text>
        <Text style={styles.subtitle}>
          Enter your security PIN to authenticate this session
        </Text>

        {/* PIN Indicator Dots */}
        <View style={styles.dotsRow}>
          {[0, 1, 2, 3].map(index => {
            const isFilled = index < mpin.length;
            return (
              <View
                key={index}
                style={[
                  styles.dot,
                  isFilled && styles.dotFilled,
                  Boolean(error) && styles.dotError,
                ]}
              />
            );
          })}
        </View>

        {loading ? (
          <ActivityIndicator size="small" color={colors.primary} style={{ marginVertical: 8 }} />
        ) : error ? (
          <Text style={styles.errorBanner}>{error}</Text>
        ) : null}

        {/* Custom Numeric Keypad */}
        <View style={styles.keypad}>
          {[
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9'],
            ['bio', '0', 'del'],
          ].map((row, rIdx) => (
            <View key={rIdx} style={styles.keypadRow}>
              {row.map(key => {
                if (key === 'del') {
                  return (
                    <TouchableOpacity
                      key={key}
                      onPress={handleDelete}
                      style={styles.keyButton}>
                      <Icon name="arrow-left" size={24} color={colors.charcoal} />
                    </TouchableOpacity>
                  );
                }
                if (key === 'bio') {
                  return (
                    <TouchableOpacity
                      key={key}
                      onPress={() => navigation.navigate('Biometric')}
                      style={styles.keyButton}>
                      <Icon name="shield" size={24} color={colors.primary} />
                    </TouchableOpacity>
                  );
                }
                return (
                  <TouchableOpacity
                    key={key}
                    onPress={() => handleDigit(key)}
                    style={styles.keyButton}>
                    <Text style={styles.keyDigit}>{key}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotMpin')}
          style={styles.forgotLink}>
          <Text style={styles.forgotText}>Forgot MPIN?</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

// ----------------------------------------------------
// BIOMETRIC SCREEN
// ----------------------------------------------------
export function BiometricScreen({ navigation }: any) {
  const enableBiometric = () => {
    secureStorage.setBiometricsEnabled(true);
    navigation.navigate('DeviceVerification');
  };

  const skipBiometric = () => {
    secureStorage.setBiometricsEnabled(false);
    navigation.navigate('DeviceVerification');
  };

  return (
    <Screen variant="cream" showBack={true} title="Quick Login">
      <View style={styles.contentWrap}>
        <View style={[styles.badgeIcon, { width: 80, height: 80, borderRadius: 40 }]}>
          <Icon name="shield" size={44} color={colors.primary} />
        </View>

        <Text style={styles.heading}>Enable Biometrics</Text>
        <Text style={styles.subtitle}>
          Use Fingerprint or Face ID for fast and secure one-touch login to Paydiya Merchant.
        </Text>

        <View style={styles.securityBox}>
          <Icon name="lock" size={18} color={colors.success} />
          <Text style={styles.securityText}>
            Bank-grade biometric encryption stored safely on your device hardware.
          </Text>
        </View>

        <Button
          title="Enable Fingerprint / Face ID"
          onPress={enableBiometric}
          variant="primary"
          size="large"
          style={styles.actionButton}
        />

        <Button
          title="Skip for Now"
          onPress={skipBiometric}
          variant="ghost"
          size="medium"
        />
      </View>
    </Screen>
  );
}

// ----------------------------------------------------
// DEVICE VERIFICATION SCREEN
// ----------------------------------------------------
export function DeviceVerificationScreen({ navigation }: any) {
  const [status, setStatus] = useState('Checking device integrity…');
  const [progress, setProgress] = useState(0.2);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setStatus('Verifying merchant hardware binding…');
      setProgress(0.6);
    }, 600);

    const t2 = setTimeout(() => {
      setStatus('Device successfully verified!');
      setProgress(1);
    }, 1200);

    const t3 = setTimeout(() => {
      navigation.replace('Main');
    }, 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [navigation]);

  return (
    <Screen variant="cream" showBack={true} title="Device Verification">
      <View style={styles.contentWrap}>
        <View style={[styles.badgeIcon, { width: 80, height: 80, borderRadius: 40 }]}>
          <Icon name="check" size={40} color={colors.success} />
        </View>

        <Text style={styles.heading}>Device Verification</Text>
        <Text style={styles.subtitle}>
          Binding this terminal to your merchant business profile.
        </Text>

        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
        </View>

        <Text style={styles.progressStatus}>{status}</Text>
      </View>
    </Screen>
  );
}

// ----------------------------------------------------
// FORGOT MPIN SCREEN
// ----------------------------------------------------
export function ForgotMpinScreen({ navigation }: any) {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!mobile || mobile.length < 10) {
      Alert.alert('Error', 'Please enter your registered 10-digit mobile number');
      return;
    }
    setLoading(true);
    await mockAuthService.requestOtp(mobile);
    setLoading(false);
    Alert.alert('Code Sent', 'Enter the OTP to reset your MPIN.', [
      { text: 'OK', onPress: () => navigation.navigate('Otp', { mobile }) },
    ]);
  };

  return (
    <Screen variant="cream" showBack={true} title="Reset MPIN">
      <View style={styles.contentWrap}>
        <View style={styles.badgeIcon}>
          <Icon name="lock" size={28} color={colors.primary} />
        </View>

        <Text style={styles.heading}>Forgot Your MPIN?</Text>
        <Text style={styles.subtitle}>
          Enter your registered mobile number and we will send you a verification code to set a new MPIN.
        </Text>

        <Input
          label="Registered Mobile Number"
          placeholder="10-digit number"
          keyboardType="phone-pad"
          maxLength={10}
          value={mobile}
          onChangeText={setMobile}
          prefixText="+91"
        />

        <Button
          title="Send Reset Code"
          onPress={handleReset}
          variant="primary"
          loading={loading}
          size="large"
          style={styles.actionButton}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  contentWrap: {
    paddingVertical: spacing.xs,
    alignItems: 'center',
  },
  pinContainer: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  badgeIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: 'rgba(229, 153, 100, 0.3)',
  },
  heading: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.charcoal,
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: colors.charcoalMuted,
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: 300,
    marginBottom: spacing.xs,
  },
  boldText: {
    color: colors.charcoal,
    fontWeight: '700',
  },
  editMobileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  saveMobileBtn: {
    marginLeft: spacing.sm,
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radius.md,
  },
  saveMobileText: {
    color: colors.charcoalDark,
    fontWeight: '700',
    fontSize: 13,
  },
  mobileChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.divider,
    marginBottom: spacing.sm,
  },
  mobileText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.charcoal,
    marginRight: 8,
  },
  changeLink: {
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  changeLinkText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  hiddenInputContainer: {
    position: 'absolute',
    opacity: 0,
    height: 0,
    width: 0,
    margin: 0,
    padding: 0,
  },
  hiddenNativeInput: {
    height: 0,
    width: 0,
  },
  otpBoxesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
    gap: 12,
  },
  otpCell: {
    width: 56,
    height: 60,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    borderWidth: 1.8,
    borderColor: colors.divider,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  otpCellActive: {
    borderColor: colors.primary,
    backgroundColor: '#FFFDF9',
    transform: [{ scale: 1.05 }],
    shadowColor: colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  otpCellFilled: {
    borderColor: colors.primaryDark,
    backgroundColor: colors.white,
  },
  otpCellError: {
    borderColor: colors.error,
    backgroundColor: colors.errorLight,
  },
  otpCellText: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.charcoal,
  },
  actionButton: {
    marginTop: spacing.xs,
    width: '100%',
  },
  timerRow: {
    marginTop: 4,
    marginBottom: 4,
  },
  timerText: {
    fontSize: 13,
    color: colors.gray500,
  },
  boldTimer: {
    color: colors.charcoal,
    fontWeight: '700',
  },
  resendBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  resendLink: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    marginLeft: 6,
  },
  demoKeyButton: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: 'rgba(229, 153, 100, 0.4)',
  },
  demoKeyText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primaryDark,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.base,
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.gray200,
    marginHorizontal: 12,
    borderWidth: 1.5,
    borderColor: colors.divider,
  },
  dotFilled: {
    backgroundColor: colors.primary,
    borderColor: colors.primaryDark,
    transform: [{ scale: 1.15 }],
  },
  dotError: {
    borderColor: colors.error,
    backgroundColor: colors.errorLight,
  },
  errorBanner: {
    color: colors.error,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  keypad: {
    width: '100%',
    maxWidth: 320,
    marginTop: 8,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  keyButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  keyDigit: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.charcoal,
  },
  forgotLink: {
    marginTop: spacing.lg,
    padding: spacing.xs,
  },
  forgotText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  securityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.base,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.divider,
    marginBottom: spacing.xl,
    maxWidth: 320,
  },
  securityText: {
    flex: 1,
    fontSize: 12,
    color: colors.charcoalLight,
    marginLeft: spacing.sm,
    lineHeight: 18,
  },
  progressBarBg: {
    width: 240,
    height: 6,
    backgroundColor: colors.gray200,
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.success,
  },
  progressStatus: {
    fontSize: 13,
    color: colors.charcoalLight,
    fontWeight: '600',
  },
});
