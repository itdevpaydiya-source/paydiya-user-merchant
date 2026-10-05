import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, radius, spacing } from '@/design-system';
import { Screen } from '@/components/Screen';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { Badge } from '@/components/Badge';
import { Skeleton, EmptyState } from '@/components/StateViews';
import { mockTransactionService } from '@/mocks/services';
import { Transaction } from '@/types';
import { formatINR } from '@/utils/format';

const FILTERS = ['All', 'Received', 'Refunded', 'Pending'];

export default function TransactionsScreen({ navigation }: any) {
  const [txns, setTxns] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    mockTransactionService.list().then(t => {
      setTxns(t);
      setLoading(false);
    });
  }, []);

  const filteredTxns = txns.filter(t => {
    const matchQuery =
      t.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.utr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase());

    let matchFilter = true;
    if (activeFilter === 'Received') {
      matchFilter = t.status === 'SUCCESS' && t.amount > 0;
    } else if (activeFilter === 'Refunded') {
      matchFilter = t.status === 'REFUNDED' || t.amount < 0;
    } else if (activeFilter === 'Pending') {
      matchFilter = t.status === 'PENDING' || t.status === 'PROCESSING';
    }

    return matchQuery && matchFilter;
  });

  return (
    <Screen variant="cream" showBack={true} title="Transactions">
      {/* Search Input Bar with Icon matching Screen 4 */}
      <View style={styles.searchBar}>
        <Icon name="search" size={18} color={colors.gray500} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by UTR, customer or amount"
          placeholderTextColor={colors.gray500}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon name="close" size={16} color={colors.gray500} />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Chips matching Screen 4 */}
      <View style={styles.filterRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {FILTERS.map(f => {
            const isActive = activeFilter === f;
            return (
              <TouchableOpacity
                key={f}
                onPress={() => setActiveFilter(f)}
                style={[
                  styles.filterChip,
                  isActive && styles.filterChipActive,
                ]}>
                <Text
                  style={[
                    styles.filterChipText,
                    isActive && styles.filterChipTextActive,
                  ]}>
                  {f}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Transactions List */}
      {loading ? (
        <Skeleton count={5} />
      ) : filteredTxns.length === 0 ? (
        <EmptyState
          icon="search"
          title="No Transactions Found"
          message="Try adjusting your search terms or filters."
          actionTitle="Clear Search"
          onAction={() => {
            setSearchQuery('');
            setActiveFilter('All');
          }}
        />
      ) : (
        filteredTxns.map(t => {
          const isRefund = t.amount < 0 || t.status === 'REFUNDED';
          const initials = t.customer
            .split(' ')
            .map(w => w[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();

          const badgeVariant = isRefund
            ? 'error'
            : t.status === 'PENDING'
            ? 'warning'
            : 'success';

          return (
            <Card
              key={t.id}
              onPress={() => navigation.navigate('TransactionDetails', { id: t.id, transaction: t })}
              style={styles.txCard}>
              <View style={styles.txRow}>
                <View
                  style={[
                    styles.avatarCircle,
                    isRefund && styles.refundAvatar,
                  ]}>
                  <Text
                    style={[
                      styles.avatarText,
                      isRefund && styles.refundAvatarText,
                    ]}>
                    {initials}
                  </Text>
                </View>

                <View style={styles.txInfo}>
                  <Text style={styles.customerName}>{t.customer}</Text>
                  <Text style={styles.txMeta}>
                    {t.method} {isRefund ? 'Refund' : 'Payment'} • {t.date}, {t.time}
                  </Text>
                </View>

                <View style={styles.amountCol}>
                  <Text
                    style={[
                      styles.amountText,
                      isRefund ? styles.amountRefund : styles.amountSuccess,
                    ]}>
                    {isRefund ? '-' : '+'}{formatINR(Math.abs(t.amount))}
                  </Text>
                  <Badge
                    label={t.status === 'SUCCESS' ? 'Success' : t.status}
                    variant={badgeVariant}
                    size="small"
                  />
                </View>
              </View>
            </Card>
          );
        })
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    height: 48,
    borderWidth: 1,
    borderColor: colors.divider,
    marginBottom: spacing.md,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.charcoal,
    marginLeft: spacing.sm,
  },
  filterRow: {
    marginBottom: spacing.md,
  },
  filterChip: {
    paddingVertical: 7,
    paddingHorizontal: spacing.base,
    borderRadius: radius.full,
    backgroundColor: colors.white,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  filterChipActive: {
    backgroundColor: colors.charcoal,
    borderColor: colors.charcoal,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.charcoalMuted,
  },
  filterChipTextActive: {
    color: colors.white,
  },
  txCard: {
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  refundAvatar: {
    backgroundColor: colors.errorLight,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  refundAvatarText: {
    color: colors.error,
  },
  txInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.charcoal,
  },
  txMeta: {
    fontSize: 12,
    color: colors.charcoalMuted,
    marginTop: 2,
  },
  amountCol: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  amountSuccess: {
    color: colors.success,
  },
  amountRefund: {
    color: colors.error,
  },
});
