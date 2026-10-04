import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen, Card } from '@/components/Screen';
import { Button } from '@/components/Button';
import { colors } from '@/design-system';
import { mockQRService } from '@/mocks/services';
import { mockMerchant } from '@/mocks/data';

export default function QrScreen() {
  const [tab, setTab] = useState<'static' | 'dynamic'>('static');
  const [amount, setAmount] = useState('');
  const [qr, setQr] = useState<any>(null);

  const generate = async () => {
    const res = await mockQRService.generateDynamicQR(Number(amount));
    setQr(res);
  };

  return (
    <Screen>
      <Text style={styles.title}>My QR Code</Text>
      <Text style={styles.sub}>{mockMerchant.name} • {mockMerchant.mid}</Text>
      <View style={styles.tabs}>
        <Text style={[styles.tab, tab === 'static' && styles.tabActive]} onPress={() => setTab('static')}>Static QR</Text>
        <Text style={[styles.tab, tab === 'dynamic' && styles.tabActive]} onPress={() => setTab('dynamic')}>Dynamic QR</Text>
      </View>

      {tab === 'static' ? (
        <Card style={{ alignItems: 'center' }}>
          <View style={styles.qrBox}>
            <Text style={styles.qrText}>QR</Text>
          </View>
          <Text style={styles.business}>{mockMerchant.name}</Text>
          <Text style={styles.sub}>{mockMerchant.upiId}</Text>
          <Text style={styles.sub}>Scan and pay with any UPI App</Text>
        </Card>
      ) : (
        <Card>
          <TextInput style={styles.input} placeholder="Enter Amount" keyboardType="numeric" value={amount} onChangeText={setAmount} />
          <TextInput style={styles.input} placeholder="Optional Note" />
          <Button title="Generate QR" onPress={generate} />
          {qr && (
            <View style={{ alignItems: 'center', marginTop: 12 }}>
              <View style={styles.qrBox}><Text style={styles.qrText}>QR</Text></View>
              <Text style={styles.business}>₹{qr.amount}</Text>
              <Text style={styles.sub}>Status: {qr.status} • Expires in 5 min</Text>
            </View>
          )}
        </Card>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '800', color: colors.charcoal },
  sub: { color: colors.gray, marginBottom: 12 },
  tabs: { flexDirection: 'row', gap: 24, marginBottom: 16 },
  tab: { color: colors.gray, paddingBottom: 6 },
  tabActive: { color: colors.orange, fontWeight: '700', borderBottomWidth: 2, borderColor: colors.orange },
  qrBox: { width: 180, height: 180, backgroundColor: '#fff', borderRadius: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.grayLight, marginVertical: 12 },
  qrText: { fontSize: 40, fontWeight: '800', color: colors.charcoal },
  business: { fontSize: 17, fontWeight: '700', color: colors.charcoal },
  input: { backgroundColor: colors.creamDark, borderRadius: 12, padding: 14, marginBottom: 10 },
});
