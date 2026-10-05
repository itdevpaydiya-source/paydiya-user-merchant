import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { colors } from '@/design-system';

interface PaydiyaLogoProps {
  variant?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large' | 'hero';
  showTagline?: boolean;
  alignCenter?: boolean;
  style?: ViewStyle;
}

export function PaydiyaLogo({
  variant = 'light',
  size = 'medium',
  showTagline = false,
  alignCenter = false,
  style,
}: PaydiyaLogoProps) {
  const isDark = variant === 'dark';

  const iconSizes = {
    small: { markSize: 28, titleSize: 18, subSize: 10, spacing: 8, lineHeight: 24 },
    medium: { markSize: 38, titleSize: 22, subSize: 12, spacing: 10, lineHeight: 28 },
    large: { markSize: 56, titleSize: 30, subSize: 14, spacing: 12, lineHeight: 38 },
    hero: { markSize: 84, titleSize: 36, subSize: 14, spacing: 14, lineHeight: 46 },
  }[size];

  // Official Mark vector path from https://paydiya.com/brand/paydiya-mark-dark.svg
  const officialMarkPath =
    'M63 147.422H255.422C255.422 147.422 303 147.422 303 104.91C303 63 255.422 63.0001 255.422 63.0001L231.331 63C231.331 63 183.151 63 183.151 104.91C183.151 166.138 183.151 200.466 183.151 261.693C183.151 303 135.106 303 135.106 303H110.88C110.88 303 63.3011 303 63.3011 261.693C63.3011 220.387 110.88 220.387 110.88 220.387H303';

  return (
    <View
      style={[
        styles.container,
        alignCenter && styles.centerAlign,
        style,
      ]}>
      <View
        style={[
          styles.brandRow,
          size === 'hero' && styles.heroColumn,
          alignCenter && styles.centerRow,
        ]}>
        <Svg
          width={iconSizes.markSize}
          height={iconSizes.markSize}
          viewBox="0 0 366 366"
          fill="none">
          <Defs>
            <LinearGradient
              id="paydiyaBrandGrad"
              x1="183"
              y1="63"
              x2="183"
              y2="303"
              gradientUnits="userSpaceOnUse">
              <Stop offset="0" stopColor="#E59964" />
              <Stop offset="1" stopColor={isDark ? '#F7B484' : '#222C38'} />
            </LinearGradient>
          </Defs>
          <Path
            d={officialMarkPath}
            stroke="url(#paydiyaBrandGrad)"
            strokeWidth="20"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>

        <View
          style={[
            styles.textColumn,
            { marginLeft: size === 'hero' ? 0 : iconSizes.spacing },
            size === 'hero' && { marginTop: 10, alignItems: 'center' },
            alignCenter && { alignItems: 'center' },
          ]}>
          <Text
            style={[
              styles.brandName,
              {
                fontSize: iconSizes.titleSize,
                lineHeight: iconSizes.lineHeight,
                color: isDark ? colors.white : colors.charcoal,
              },
            ]}>
            Paydiya
          </Text>
          <Text
            style={[
              styles.brandSubtitle,
              {
                fontSize: iconSizes.subSize,
                lineHeight: Math.round(iconSizes.subSize * 1.3),
                color: isDark ? colors.peach : colors.orange,
              },
            ]}>
            Merchant
          </Text>
        </View>
      </View>

      {showTagline && (
        <Text
          style={[
            styles.tagline,
            alignCenter && { textAlign: 'center' },
            { color: isDark ? '#A0AEC0' : colors.charcoalMuted },
          ]}>
          Business Growth in Every Payment
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  centerAlign: {
    alignItems: 'center',
    width: '100%',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerRow: {
    justifyContent: 'center',
  },
  textColumn: {
    justifyContent: 'center',
  },
  brandName: {
    fontWeight: '800',
    letterSpacing: -0.5,
    includeFontPadding: false,
  },
  brandSubtitle: {
    fontWeight: '700',
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    includeFontPadding: false,
    marginTop: 2,
  },
  tagline: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 10,
    letterSpacing: 0.2,
    includeFontPadding: false,
  },
});
