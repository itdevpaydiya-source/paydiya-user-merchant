import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';
import { colors, radius, shadows, spacing } from '@/design-system';
import { Screen } from '@/components/Screen';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { Badge } from '@/components/Badge';
import { formatINR } from '@/utils/format';

const SCREEN_WIDTH = Dimensions.get('window').width;

const DAILY_STATS = [
  { day: '13', label: '13 Sep', amount: 14200 },
  { day: '14', label: '14 Sep', amount: 18450 },
  { day: '15', label: '15 Sep', amount: 16100 },
  { day: '16', label: '16 Sep', amount: 24980, active: true },
  { day: '17', label: '17 Sep', amount: 19800 },
  { day: '18', label: '18 Sep', amount: 15400 },
  { day: '19', label: '19 Sep', amount: 15960 },
];

const PAYMENT_MODES = [
  { label: 'UPI', percentage: 68, color: '#16A34A' },
  { label: 'Cards', percentage: 18, color: '#E59964' },
  { label: 'Wallets', percentage: 8, color: '#3B82F6' },
  { label: 'Net Banking', percentage: 6, color: '#8B5CF6' },
];

const CHANNELS = [
  { label: 'QR Payments', percentage: 72, color: '#E59964' },
  { label: 'Payment Links', percentage: 18, color: '#16A34A' },
  { label: 'POS Terminal', percentage: 10, color: '#3B82F6' },
];

export default function AnalyticsScreen() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(3); // 16 Sep
  const [activeTab, setActiveTab] = useState<'mode' | 'channel'>('mode');
  const [period] = useState('Last 7 Days');

  const selectedStat = DAILY_STATS[selectedDayIndex];
  const maxAmount = Math.max(...DAILY_STATS.map(d => d.amount));
  const chartHeight = 120;
  const barWidth = 26;
  const availableWidth = SCREEN_WIDTH - 64;
  const barSpacing = availableWidth / DAILY_STATS.length;

  // Donut chart calculations
  const radiusVal = 44;
  const circumference = 2 * Math.PI * radiusVal;
  const breakdownList = activeTab === 'mode' ? PAYMENT_MODES : CHANNELS;

  return (
    <Screen
      variant="cream"
      showBack={true}
      title="Analytics"
      rightAction={
        <TouchableOpacity style={styles.calendarIconBtn}>
          <Icon name="calendar" size={18} color={colors.charcoal} />
        </TouchableOpacity>
      }>
      {/* Period Dropdown Button matching Screen 6 */}
      <TouchableOpacity style={styles.periodDropdown}>
        <Text style={styles.periodDropdownText}>{period}</Text>
        <Icon name="chevron-down" size={16} color={colors.charcoal} />
      </TouchableOpacity>

      {/* Revenue Overview Card */}
      <Card style={styles.revenueCard}>
        <Text style={styles.cardSubtitle}>Total Received</Text>
        <View style={styles.totalRow}>
          <Text style={styles.totalAmount}>₹ 1,24,890</Text>
          <Badge label="↑ 18%" variant="success" size="small" />
        </View>

        {/* Selected Day Tooltip matching Screen 6 */}
        <View style={styles.tooltipContainer}>
          <View
            style={[
              styles.tooltipPill,
              { left: selectedDayIndex * barSpacing + 4 },
            ]}>
            <Text style={styles.tooltipAmount}>
              {formatINR(selectedStat.amount)}
            </Text>
            <Text style={styles.tooltipDate}>{selectedStat.label}</Text>
          </View>
        </View>

        {/* Bar Chart with Touch Selection */}
        <View style={styles.chartContainer}>
          <Svg width={availableWidth} height={chartHeight}>
            {DAILY_STATS.map((item, index) => {
              const barHeight = (item.amount / maxAmount) * (chartHeight - 15);
              const xPos = index * barSpacing + (barSpacing - barWidth) / 2;
              const yPos = chartHeight - barHeight;
              const isSelected = index === selectedDayIndex;

              return (
                <Rect
                  key={item.day}
                  x={xPos}
                  y={yPos}
                  width={barWidth}
                  height={barHeight}
                  rx={6}
                  fill={isSelected ? colors.charcoal : colors.peach}
                  onPress={() => setSelectedDayIndex(index)}
                />
              );
            })}
          </Svg>

          {/* X-Axis Day Labels */}
          <View style={styles.xAxisRow}>
            {DAILY_STATS.map((item, index) => {
              const isSelected = index === selectedDayIndex;
              return (
                <TouchableOpacity
                  key={item.day}
                  onPress={() => setSelectedDayIndex(index)}
                  style={{ width: barSpacing, alignItems: 'center' }}>
                  <Text
                    style={[
                      styles.xAxisLabel,
                      isSelected && styles.xAxisLabelSelected,
                    ]}>
                    {item.day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Card>

      {/* Segmented Controls: By Payment Mode vs By Channel matching Screen 6 */}
      <View style={styles.segmentedContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab('mode')}
          style={[styles.segmentBtn, activeTab === 'mode' && styles.segmentBtnActive]}>
          <Text
            style={[
              styles.segmentText,
              activeTab === 'mode' && styles.segmentTextActive,
            ]}>
            By Payment Mode
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('channel')}
          style={[styles.segmentBtn, activeTab === 'channel' && styles.segmentBtnActive]}>
          <Text
            style={[
              styles.segmentText,
              activeTab === 'channel' && styles.segmentTextActive,
            ]}>
            By Channel
          </Text>
        </TouchableOpacity>
      </View>

      {/* Donut Chart & Breakdown Card matching Screen 6 */}
      <Card style={styles.breakdownCard}>
        <View style={styles.breakdownRow}>
          {/* SVG Donut Chart */}
          <View style={styles.donutWrapper}>
            <Svg width={110} height={110} viewBox="0 0 110 110">
              {breakdownList.reduce(
                (acc: { offset: number; elements: React.ReactNode[] }, cur, idx) => {
                  const strokeDash = (cur.percentage / 100) * circumference;
                  const el = (
                    <Circle
                      key={idx}
                      cx={55}
                      cy={55}
                      r={radiusVal}
                      stroke={cur.color}
                      strokeWidth={16}
                      fill="none"
                      strokeDasharray={`${strokeDash} ${circumference}`}
                      strokeDashoffset={-acc.offset}
                      strokeLinecap="round"
                    />
                  );
                  return {
                    offset: acc.offset + strokeDash,
                    elements: [...acc.elements, el],
                  };
                },
                { offset: 0, elements: [] },
              ).elements}
            </Svg>
            <View style={styles.donutHole}>
              <Text style={styles.donutCenterValue}>
                {activeTab === 'mode' ? '68%' : '72%'}
              </Text>
              <Text style={styles.donutCenterLabel}>
                {activeTab === 'mode' ? 'UPI' : 'QR'}
              </Text>
            </View>
          </View>

          {/* Legend Items */}
          <View style={styles.legendContainer}>
            {breakdownList.map(item => (
              <View key={item.label} style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                <Text style={styles.legendLabel}>{item.label}</Text>
                <Text style={styles.legendPercent}>{item.percentage}%</Text>
              </View>
            ))}
          </View>
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  calendarIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.divider,
  },
  periodDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    paddingVertical: 8,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.divider,
    marginBottom: spacing.base,
  },
  periodDropdownText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.charcoal,
    marginRight: 6,
  },
  revenueCard: {
    padding: spacing.base,
    marginBottom: spacing.base,
  },
  cardSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.charcoalMuted,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  totalAmount: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.charcoal,
    letterSpacing: -0.5,
  },
  tooltipContainer: {
    height: 38,
    marginBottom: 4,
  },
  tooltipPill: {
    position: 'absolute',
    backgroundColor: '#1E293B',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: radius.md,
    alignItems: 'center',
    ...shadows.dark,
  },
  tooltipAmount: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.white,
  },
  tooltipDate: {
    fontSize: 9,
    color: '#94A3B8',
    fontWeight: '600',
  },
  chartContainer: {
    alignItems: 'center',
  },
  xAxisRow: {
    flexDirection: 'row',
    marginTop: spacing.xs,
  },
  xAxisLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.gray500,
  },
  xAxisLabelSelected: {
    color: colors.charcoal,
    fontWeight: '800',
  },
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: radius.full,
    padding: 4,
    marginBottom: spacing.base,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    borderRadius: radius.full,
  },
  segmentBtnActive: {
    backgroundColor: colors.primary,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.charcoalMuted,
  },
  segmentTextActive: {
    color: colors.white,
    fontWeight: '700',
  },
  breakdownCard: {
    padding: spacing.base,
    marginBottom: spacing.xl,
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  donutWrapper: {
    width: 110,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  donutHole: {
    position: 'absolute',
    alignItems: 'center',
  },
  donutCenterValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.charcoal,
  },
  donutCenterLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.charcoalMuted,
  },
  legendContainer: {
    flex: 1,
    marginLeft: spacing.lg,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: spacing.sm,
  },
  legendLabel: {
    flex: 1,
    fontSize: 13,
    color: colors.charcoal,
    fontWeight: '600',
  },
  legendPercent: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.charcoal,
  },
});
