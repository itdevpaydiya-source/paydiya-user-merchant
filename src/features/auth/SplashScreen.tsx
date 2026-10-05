import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { spacing } from '@/design-system';
import { PaydiyaLogo } from '@/components/PaydiyaLogo';
import { secureStorage } from '@/services/storage/secureStorage';

export function SplashScreen({ navigation }: any) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    // Smooth entry animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Check session
    const timer = setTimeout(async () => {
      const token = await secureStorage.getAccessToken();
      if (token) {
        navigation.replace('Main');
      } else {
        navigation.replace('Login');
      }
    }, 1800);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111620" />
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}>
        <PaydiyaLogo
          variant="dark"
          size="hero"
          showTagline={true}
          alignCenter={true}
        />
      </Animated.View>

      <View style={styles.footer}>
        <View style={styles.tricolorLine}>
          <View style={[styles.colorBar, { backgroundColor: '#FF9933' }]} />
          <View style={[styles.colorBar, { backgroundColor: '#FFFFFF' }]} />
          <View style={[styles.colorBar, { backgroundColor: '#138808' }]} />
        </View>
        <Text style={styles.footerTagline}>Payments for a Brighter Bharat</Text>
        <Text style={styles.poweredBy}>Powered by Paydiya Technologies</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111620', // Paydiya Dark background
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing['3xl'],
    paddingHorizontal: spacing.xl,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  footer: {
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  tricolorLine: {
    flexDirection: 'row',
    width: 60,
    height: 3,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  colorBar: {
    flex: 1,
    height: '100%',
  },
  footerTagline: {
    fontSize: 13,
    fontWeight: '600',
    color: '#E2E8F0',
    letterSpacing: 0.3,
  },
  poweredBy: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 4,
    letterSpacing: 0.2,
  },
});
