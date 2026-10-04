import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import LoginScreen from '@/features/auth/LoginScreen';
import { OtpScreen, MpinScreen, BiometricScreen, DeviceVerificationScreen } from '@/features/auth/AuthScreens';
import CreateAccountScreen from '@/features/onboarding/CreateAccountScreen';
import HomeScreen from '@/features/dashboard/HomeScreen';
import TransactionsScreen from '@/features/transactions/TransactionsScreen';
import TransactionDetailsScreen from '@/features/transactions/TransactionDetailsScreen';
import NotificationPreferencesScreen from '@/features/notifications/NotificationPreferencesScreen';
import PaymentLinkDetailsScreen from '@/features/payment-links/PaymentLinkDetailsScreen';
import RefundScreen from '@/features/transactions/RefundScreen';
import AddStaffScreen from '@/features/staff/AddStaffScreen';
import SettlementDetailsScreen from '@/features/settlements/SettlementDetailsScreen';
import SettlementsScreen from '@/features/settlements/SettlementsScreen';
import AnalyticsScreen from '@/features/analytics/AnalyticsScreen';
import QrScreen from '@/features/qr/QrScreen';
import PaymentLinksScreen from '@/features/payment-links/PaymentLinksScreen';
import StoreSettingsScreen from '@/features/store/StoreSettingsScreen';
import MoreScreen from '@/features/MoreScreen';
import { StaffScreen, DevicesScreen, NotificationsScreen, ReportsScreen, SupportScreen, SecurityScreen } from '@/features/misc/MiscScreens';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} />
      <Tab.Screen name="Settlements" component={SettlementsScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
}

const MainStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Tabs" component={MainTabs} />
    <Stack.Screen name="QR" component={QrScreen} />
    <Stack.Screen name="PaymentLinks" component={PaymentLinksScreen} />
    <Stack.Screen name="PaymentLinkDetails" component={PaymentLinkDetailsScreen} />
    <Stack.Screen name="Analytics" component={AnalyticsScreen} />
    <Stack.Screen name="Reports" component={ReportsScreen} />
    <Stack.Screen name="StoreSettings" component={StoreSettingsScreen} />
    <Stack.Screen name="Staff" component={StaffScreen} />
    <Stack.Screen name="AddStaff" component={AddStaffScreen} />
    <Stack.Screen name="Devices" component={DevicesScreen} />
    <Stack.Screen name="Notifications" component={NotificationsScreen} />
    <Stack.Screen name="NotificationPreferences" component={NotificationPreferencesScreen} />
    <Stack.Screen name="Support" component={SupportScreen} />
    <Stack.Screen name="Security" component={SecurityScreen} />
    <Stack.Screen name="TransactionDetails" component={TransactionDetailsScreen} />
    <Stack.Screen name="Refund" component={RefundScreen} />
    <Stack.Screen name="SettlementDetails" component={SettlementDetailsScreen} />
  </Stack.Navigator>
);

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="Mpin" component={MpinScreen} />
        <Stack.Screen name="Biometric" component={BiometricScreen} />
        <Stack.Screen name="DeviceVerification" component={DeviceVerificationScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="Main" component={MainStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
