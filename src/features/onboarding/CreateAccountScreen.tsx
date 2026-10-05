import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, radius, spacing } from '@/design-system';
import { Screen } from '@/components/Screen';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Icon } from '@/components/Icon';
import { Badge } from '@/components/Badge';

const STEPS = [
  { id: 1, title: 'Business' },
  { id: 2, title: 'Owner' },
  { id: 3, title: 'Bank' },
  { id: 4, title: 'Documents' },
  { id: 5, title: 'Review' },
];

export default function CreateAccountScreen({ navigation }: any) {
  const [currentStep, setCurrentStep] = useState(1);

  // Business Details
  const [businessName, setBusinessName] = useState('Sri Venkateswara Stores');
  const [category, setCategory] = useState('Retail & Grocery');
  const [gstin, setGstin] = useState('36AAAAA0000A1Z5');
  const [address, setAddress] = useState('12-4/A, MG Road, Hyderabad');

  // Owner Details
  const [ownerName, setOwnerName] = useState('Venkat Rao');
  const [ownerMobile, setOwnerMobile] = useState('9876543210');
  const [ownerEmail, setOwnerEmail] = useState('venkat@store.com');
  const [pan, setPan] = useState('ABCDE1234F');

  // Bank Details
  const [bankName, setBankName] = useState('State Bank of India');
  const [accountNumber, setAccountNumber] = useState('389421098421');
  const [ifsc, setIfsc] = useState('SBIN0001234');

  // Document states
  const [panUploaded, setPanUploaded] = useState(true);
  const [gstUploaded, setGstUploaded] = useState(true);
  const [storePhotoUploaded, setStorePhotoUploaded] = useState(false);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const nextStep = () => {
    if (currentStep === 1 && !businessName.trim()) {
      Alert.alert('Required', 'Please enter your business name.');
      return;
    }
    if (currentStep === 2 && (!ownerName.trim() || !ownerMobile.trim())) {
      Alert.alert('Required', 'Please enter owner name and mobile.');
      return;
    }
    if (currentStep === 3 && (!bankName.trim() || !accountNumber.trim())) {
      Alert.alert('Required', 'Please enter complete bank account details.');
      return;
    }
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  if (submitted) {
    return (
      <Screen
        variant="cream"
        showBack={true}
        title="Application Status"
        onBack={() => navigation.navigate('Login')}>
        <Card style={styles.successCard}>
          <View style={styles.successIconCircle}>
            <Icon name="check" size={36} color={colors.success} />
          </View>

          <Text style={styles.successTitle}>Application Submitted</Text>
          <Text style={styles.successSubtitle}>
            Your merchant account request is currently under review by the Paydiya compliance team.
          </Text>

          <View style={styles.statusBox}>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Verification Status</Text>
              <Badge label="Under Review" variant="warning" size="small" />
            </View>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Business</Text>
              <Text style={styles.statusValue}>{businessName}</Text>
            </View>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Estimated Time</Text>
              <Text style={styles.statusValue}>Within 2 hours</Text>
            </View>
          </View>

          <Button
            title="Explore Demo Dashboard"
            onPress={() => navigation.replace('Main')}
            variant="primary"
            size="large"
            style={styles.doneBtn}
          />
        </Card>
      </Screen>
    );
  }

  return (
    <Screen
      variant="cream"
      showBack={true}
      onBack={prevStep}
      title="Create Merchant Account">
      {/* Progress Steps Header */}
      <View style={styles.stepHeader}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {STEPS.map((step, idx) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;

            return (
              <View key={step.id} style={styles.stepItem}>
                <View
                  style={[
                    styles.stepNumberCircle,
                    isCompleted && styles.stepNumberCompleted,
                    isCurrent && styles.stepNumberCurrent,
                  ]}>
                  {isCompleted ? (
                    <Icon name="check" size={12} color={colors.white} />
                  ) : (
                    <Text
                      style={[
                        styles.stepNumberText,
                        isCurrent && styles.stepNumberTextCurrent,
                      ]}>
                      {step.id}
                    </Text>
                  )}
                </View>
                <Text
                  style={[
                    styles.stepLabel,
                    isCurrent && styles.stepLabelCurrent,
                  ]}>
                  {step.title}
                </Text>
                {idx < STEPS.length - 1 && <View style={styles.stepConnector} />}
              </View>
            );
          })}
        </ScrollView>
      </View>

      {/* Step 1: Business Details */}
      {currentStep === 1 && (
        <Card style={styles.cardPad}>
          <Text style={styles.formTitle}>Business Details</Text>
          <Text style={styles.formSub}>Tell us about your store or enterprise</Text>

          <Input
            label="Business / Store Name"
            placeholder="e.g. Sri Venkateswara Stores"
            value={businessName}
            onChangeText={setBusinessName}
            prefixIcon={<Icon name="store" size={18} color={colors.primary} />}
          />

          <Input
            label="Business Category"
            placeholder="e.g. Retail, Grocery, Electronics"
            value={category}
            onChangeText={setCategory}
            prefixIcon={<Icon name="file-text" size={18} color={colors.primary} />}
          />

          <Input
            label="GSTIN (Optional)"
            placeholder="15-digit GST number"
            value={gstin}
            onChangeText={setGstin}
            autoCapitalize="characters"
          />

          <Input
            label="Store Address"
            placeholder="Shop address and locality"
            value={address}
            onChangeText={setAddress}
          />
        </Card>
      )}

      {/* Step 2: Owner Details */}
      {currentStep === 2 && (
        <Card style={styles.cardPad}>
          <Text style={styles.formTitle}>Owner Information</Text>
          <Text style={styles.formSub}>Primary account holder details</Text>

          <Input
            label="Owner Full Name"
            placeholder="As per PAN card"
            value={ownerName}
            onChangeText={setOwnerName}
            prefixIcon={<Icon name="user" size={18} color={colors.primary} />}
          />

          <Input
            label="Mobile Number"
            placeholder="10-digit number"
            keyboardType="phone-pad"
            maxLength={10}
            value={ownerMobile}
            onChangeText={setOwnerMobile}
            prefixText="+91"
          />

          <Input
            label="Email Address"
            placeholder="business@example.com"
            keyboardType="email-address"
            value={ownerEmail}
            onChangeText={setOwnerEmail}
            prefixIcon={<Icon name="mail" size={18} color={colors.primary} />}
          />

          <Input
            label="Owner PAN"
            placeholder="10-digit PAN"
            autoCapitalize="characters"
            maxLength={10}
            value={pan}
            onChangeText={setPan}
            prefixIcon={<Icon name="shield" size={18} color={colors.primary} />}
          />
        </Card>
      )}

      {/* Step 3: Bank Account */}
      {currentStep === 3 && (
        <Card style={styles.cardPad}>
          <Text style={styles.formTitle}>Bank Account for Settlements</Text>
          <Text style={styles.formSub}>Daily payments will be settled directly to this account</Text>

          <Input
            label="Bank Name"
            placeholder="e.g. State Bank of India"
            value={bankName}
            onChangeText={setBankName}
            prefixIcon={<Icon name="bank" size={18} color={colors.primary} />}
          />

          <Input
            label="Account Number"
            placeholder="Enter bank account number"
            keyboardType="number-pad"
            value={accountNumber}
            onChangeText={setAccountNumber}
          />

          <Input
            label="IFSC Code"
            placeholder="e.g. SBIN0001234"
            autoCapitalize="characters"
            value={ifsc}
            onChangeText={setIfsc}
          />

          <View style={styles.bankVerifyNote}>
            <Icon name="check" size={16} color={colors.success} />
            <Text style={styles.bankVerifyText}>
              Penny drop verification will be executed during instant onboarding.
            </Text>
          </View>
        </Card>
      )}

      {/* Step 4: Documents Upload */}
      {currentStep === 4 && (
        <Card style={styles.cardPad}>
          <Text style={styles.formTitle}>KYC Documents</Text>
          <Text style={styles.formSub}>Upload official business proofs for verification</Text>

          <View style={styles.docRow}>
            <View style={styles.docInfo}>
              <Text style={styles.docName}>PAN Card</Text>
              <Text style={styles.docStatus}>
                {panUploaded ? 'Uploaded (pan_card.jpg)' : 'Pending upload'}
              </Text>
            </View>
            <Button
              title={panUploaded ? 'Replace' : 'Upload'}
              onPress={() => setPanUploaded(true)}
              variant={panUploaded ? 'outline' : 'primary'}
              size="small"
              fullWidth={false}
            />
          </View>

          <View style={styles.docRow}>
            <View style={styles.docInfo}>
              <Text style={styles.docName}>GST Certificate</Text>
              <Text style={styles.docStatus}>
                {gstUploaded ? 'Uploaded (gst_cert.pdf)' : 'Pending upload'}
              </Text>
            </View>
            <Button
              title={gstUploaded ? 'Replace' : 'Upload'}
              onPress={() => setGstUploaded(true)}
              variant={gstUploaded ? 'outline' : 'primary'}
              size="small"
              fullWidth={false}
            />
          </View>

          <View style={styles.docRow}>
            <View style={styles.docInfo}>
              <Text style={styles.docName}>Store Front Photo</Text>
              <Text style={styles.docStatus}>
                {storePhotoUploaded ? 'Uploaded' : 'Take a photo of your storefront'}
              </Text>
            </View>
            <Button
              title={storePhotoUploaded ? 'Replace' : 'Upload'}
              onPress={() => setStorePhotoUploaded(true)}
              variant={storePhotoUploaded ? 'outline' : 'primary'}
              size="small"
              fullWidth={false}
            />
          </View>
        </Card>
      )}

      {/* Step 5: Review & Submit */}
      {currentStep === 5 && (
        <Card style={styles.cardPad}>
          <Text style={styles.formTitle}>Review Application</Text>
          <Text style={styles.formSub}>Please confirm your merchant onboarding details</Text>

          <View style={styles.reviewSection}>
            <Text style={styles.reviewHeader}>Business</Text>
            <Text style={styles.reviewItem}>Name: {businessName}</Text>
            <Text style={styles.reviewItem}>Category: {category}</Text>
            <Text style={styles.reviewItem}>GSTIN: {gstin || 'Not provided'}</Text>
          </View>

          <View style={styles.reviewSection}>
            <Text style={styles.reviewHeader}>Owner</Text>
            <Text style={styles.reviewItem}>Name: {ownerName}</Text>
            <Text style={styles.reviewItem}>Phone: +91 {ownerMobile}</Text>
            <Text style={styles.reviewItem}>PAN: {pan}</Text>
          </View>

          <View style={styles.reviewSection}>
            <Text style={styles.reviewHeader}>Settlement Account</Text>
            <Text style={styles.reviewItem}>Bank: {bankName}</Text>
            <Text style={styles.reviewItem}>A/C: •••• {accountNumber.slice(-4)}</Text>
            <Text style={styles.reviewItem}>IFSC: {ifsc}</Text>
          </View>

          <View style={styles.agreementBox}>
            <Icon name="shield" size={16} color={colors.primary} />
            <Text style={styles.agreementText}>
              By submitting, you agree to the Paydiya Merchant Master Services Agreement and NPCI UPI Merchant guidelines.
            </Text>
          </View>
        </Card>
      )}

      {/* Navigation Buttons Row */}
      <View style={styles.navRow}>
        <View style={styles.btnHalf}>
          <Button
            title={currentStep === 1 ? 'Cancel' : 'Previous'}
            onPress={prevStep}
            variant="outline"
            size="large"
          />
        </View>
        <View style={styles.btnHalf}>
          <Button
            title={currentStep === 5 ? 'Submit Application' : 'Next Step'}
            onPress={currentStep === 5 ? handleSubmit : nextStep}
            variant="primary"
            loading={loading}
            size="large"
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stepHeader: {
    marginBottom: spacing.base,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  stepNumberCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.gray200,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  stepNumberCompleted: {
    backgroundColor: colors.success,
  },
  stepNumberCurrent: {
    backgroundColor: colors.primary,
  },
  stepNumberText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.charcoalLight,
  },
  stepNumberTextCurrent: {
    color: colors.white,
  },
  stepLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.gray500,
  },
  stepLabelCurrent: {
    color: colors.charcoal,
    fontWeight: '700',
  },
  stepConnector: {
    width: 16,
    height: 1,
    backgroundColor: colors.divider,
    marginHorizontal: 8,
  },
  cardPad: {
    padding: spacing.lg,
    marginBottom: spacing.base,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.charcoal,
    marginBottom: 4,
  },
  formSub: {
    fontSize: 13,
    color: colors.charcoalMuted,
    marginBottom: spacing.lg,
  },
  bankVerifyNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successLight,
    padding: spacing.sm,
    borderRadius: radius.md,
    marginTop: spacing.xs,
  },
  bankVerifyText: {
    fontSize: 11,
    color: colors.successDark,
    marginLeft: 6,
    flex: 1,
    fontWeight: '500',
  },
  docRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  docInfo: {
    flex: 1,
  },
  docName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.charcoal,
  },
  docStatus: {
    fontSize: 12,
    color: colors.charcoalMuted,
    marginTop: 2,
  },
  reviewSection: {
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.divider,
  },
  reviewHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  reviewItem: {
    fontSize: 13,
    color: colors.charcoal,
    marginBottom: 2,
  },
  agreementBox: {
    flexDirection: 'row',
    backgroundColor: colors.primaryLight,
    padding: spacing.sm,
    borderRadius: radius.md,
    marginTop: spacing.md,
  },
  agreementText: {
    fontSize: 11,
    color: colors.primaryDark,
    marginLeft: 8,
    flex: 1,
    lineHeight: 16,
  },
  navRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: spacing.xl,
  },
  btnHalf: {
    flex: 1,
  },
  successCard: {
    alignItems: 'center',
    padding: spacing.xl,
    marginTop: spacing.xl,
  },
  successIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.successLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.charcoal,
    marginBottom: 6,
  },
  successSubtitle: {
    fontSize: 14,
    color: colors.charcoalMuted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.xl,
    maxWidth: 280,
  },
  statusBox: {
    width: '100%',
    backgroundColor: colors.gray100,
    borderRadius: radius.lg,
    padding: spacing.base,
    marginBottom: spacing.xl,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  statusLabel: {
    fontSize: 13,
    color: colors.charcoalMuted,
    fontWeight: '500',
  },
  statusValue: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.charcoal,
  },
  doneBtn: {
    width: '100%',
  },
});
