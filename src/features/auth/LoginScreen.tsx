import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, Alert } from 'react-native';
import { Button } from '@/components/Button';
import { colors, spacing } from '@/design-system';
import { mockAuthService } from '@/mocks/services';

export default function LoginScreen({ navigation }: any) {
  const [mobile, setMobile] = useState('');

  const continue_ = async () => {
    try {
      await mockAuthService.requestOtp(mobile);
      navigation.navigate('Otp', { mobile });
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Paydiya{'\n'}Merchant</Text>
      <Text style={styles.tagline}>Business Growth in Every Payment</Text>
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        keyboardType="phone-pad"
        maxLength={10}
        value={mobile}
        onChangeText={setMobile}
      />
      <Button title="Continue" onPress={continue_} />
      <Pressable onPress={() => Alert.alert('Support', 'Contact support@paydiya.com')}>
        <Text style={styles.link}>Forgot MPIN • Support</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('CreateAccount')}>
        <Text style={styles.link}>Create Merchant Account</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Biometric')}>
        <Text style={styles.link}>Use biometric</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#17161A', padding: spacing.lg, justifyContent: 'center' },
  logo: { color: colors.peach, fontSize: 34, fontWeight: '800', marginBottom: 8 },
  tagline: { color: colors.gold, marginBottom: 40 },
  input: { backgroundColor: '#26242B', color: '#fff', borderRadius: 14, padding: 16, marginBottom: 16 },
  link: { color: colors.peach, textAlign: 'center', marginTop: 14 },
});
