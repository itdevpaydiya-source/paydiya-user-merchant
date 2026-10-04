import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { Button } from '@/components/Button';
import { colors, spacing } from '@/design-system';

export default function CreateAccountScreen({ navigation }: any) {
  const [name, setName] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Merchant Account</Text>
      <TextInput style={styles.input} placeholder="Business Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Mobile Number" keyboardType="phone-pad" />
      <Button title="Continue" onPress={() => navigation.navigate('Login')} />
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream, padding: spacing.lg, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '800', color: colors.charcoal, marginBottom: 20 },
  input: { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 14 },
  link: { color: colors.orange, textAlign: 'center', marginTop: 14 },
});
