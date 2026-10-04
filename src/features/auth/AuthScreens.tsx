import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '@/components/Button';
import { colors, spacing } from '@/design-system';
import { mockAuthService } from '@/mocks/services';

export function OtpScreen({ navigation }: any) {
  const [otp, setOtp] = useState('');
  const verify = async () => {
    try {
      await mockAuthService.verifyOtp(otp);
      navigation.navigate('Mpin');
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <TextInput style={styles.input} placeholder="4-digit OTP" keyboardType="number-pad" maxLength={4} value={otp} onChangeText={setOtp} />
      <Button title="Verify" onPress={verify} />
    </View>
  );
}

export function MpinScreen({ navigation }: any) {
  const [mpin, setMpin] = useState('');
  const verify = async () => {
    try {
      await mockAuthService.verifyMpin(mpin);
      navigation.navigate('Biometric');
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter MPIN</Text>
      <TextInput style={styles.input} placeholder="4-digit MPIN" keyboardType="number-pad" secureTextEntry maxLength={4} value={mpin} onChangeText={setMpin} />
      <Button title="Continue" onPress={verify} />
    </View>
  );
}

export function BiometricScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Biometric</Text>
      <Text style={styles.sub}>Enable fingerprint / Face ID for faster login.</Text>
      <Button title="Enable Biometric" onPress={() => navigation.navigate('DeviceVerification')} />
      <Button title="Skip" variant="outline" onPress={() => navigation.navigate('DeviceVerification')} />
    </View>
  );
}

export function DeviceVerificationScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Device Verification</Text>
      <Text style={styles.sub}>Verifying this device…</Text>
      <Button title="Continue to Dashboard" onPress={() => navigation.replace('Main')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream, padding: spacing.lg, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '800', color: colors.charcoal, marginBottom: 16 },
  sub: { color: colors.gray, marginBottom: 24 },
  input: { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 16 },
});
