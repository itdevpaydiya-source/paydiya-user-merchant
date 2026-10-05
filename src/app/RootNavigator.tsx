import React from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { SplashScreen } from '@/features/auth/SplashScreen';
import LoginScreen from '@/features/auth/LoginScreen';
import {
  OtpScreen,
  MpinScreen,
  BiometricScreen,
  DeviceVerificationScreen,
  ForgotMpinScreen,
} from '@/features/auth/AuthScreens';
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
import {
  StaffScreen,
  DevicesScreen,
  NotificationsScreen,
  ReportsScreen,
  SupportScreen,
  SecurityScreen,
} from '@/features/misc/MiscScreens';

import { Icon, IconName } from '@/components/Icon';
import { colors } from '@/design-system';

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackNav = createNativeStackNavigator();
function HomeStack() {
  return (
    <HomeStackNav.Navigator screenOptions={{ headerShown: false }}>
      <HomeStackNav.Screen name="HomeMain" component={HomeScreen} />
      <HomeStackNav.Screen name="QR" component={QrScreen} />
      <HomeStackNav.Screen name="PaymentLinks" component={PaymentLinksScreen} />
      <HomeStackNav.Screen name="PaymentLinkDetails" component={PaymentLinkDetailsScreen} />
      <HomeStackNav.Screen name="Analytics" component={AnalyticsScreen} />
      <HomeStackNav.Screen name="Reports" component={ReportsScreen} />
      <HomeStackNav.Screen name="StoreSettings" component={StoreSettingsScreen} />
      <HomeStackNav.Screen name="Staff" component={StaffScreen} />
      <HomeStackNav.Screen name="AddStaff" component={AddStaffScreen} />
      <HomeStackNav.Screen name="Devices" component={DevicesScreen} />
      <HomeStackNav.Screen name="Notifications" component={NotificationsScreen} />
      <HomeStackNav.Screen name="NotificationPreferences" component={NotificationPreferencesScreen} />
      <HomeStackNav.Screen name="Support" component={SupportScreen} />
      <HomeStackNav.Screen name="Security" component={SecurityScreen} />
      <HomeStackNav.Screen name="TransactionDetails" component={TransactionDetailsScreen} />
      <HomeStackNav.Screen name="Refund" component={RefundScreen} />
      <HomeStackNav.Screen name="SettlementDetails" component={SettlementDetailsScreen} />
    </HomeStackNav.Navigator>
  );
}

const TransactionsStackNav = createNativeStackNavigator();
function TransactionsStack() {
  return (
    <TransactionsStackNav.Navigator screenOptions={{ headerShown: false }}>
      <TransactionsStackNav.Screen name="TransactionsMain" component={TransactionsScreen} />
      <TransactionsStackNav.Screen name="TransactionDetails" component={TransactionDetailsScreen} />
      <TransactionsStackNav.Screen name="Refund" component={RefundScreen} />
    </TransactionsStackNav.Navigator>
  );
}

const SettlementsStackNav = createNativeStackNavigator();
function SettlementsStack() {
  return (
    <SettlementsStackNav.Navigator screenOptions={{ headerShown: false }}>
      <SettlementsStackNav.Screen name="SettlementsMain" component={SettlementsScreen} />
      <SettlementsStackNav.Screen name="SettlementDetails" component={SettlementDetailsScreen} />
      <SettlementsStackNav.Screen name="Reports" component={ReportsScreen} />
    </SettlementsStackNav.Navigator>
  );
}

const MoreStackNav = createNativeStackNavigator();
function MoreStack() {
  return (
    <MoreStackNav.Navigator screenOptions={{ headerShown: false }}>
      <MoreStackNav.Screen name="MoreMain" component={MoreScreen} />
      <MoreStackNav.Screen name="StoreSettings" component={StoreSettingsScreen} />
      <MoreStackNav.Screen name="Staff" component={StaffScreen} />
      <MoreStackNav.Screen name="AddStaff" component={AddStaffScreen} />
      <MoreStackNav.Screen name="Devices" component={DevicesScreen} />
      <MoreStackNav.Screen name="Notifications" component={NotificationsScreen} />
      <MoreStackNav.Screen name="NotificationPreferences" component={NotificationPreferencesScreen} />
      <MoreStackNav.Screen name="Support" component={SupportScreen} />
      <MoreStackNav.Screen name="Security" component={SecurityScreen} />
      <MoreStackNav.Screen name="Reports" component={ReportsScreen} />
      <MoreStackNav.Screen name="Analytics" component={AnalyticsScreen} />
      <MoreStackNav.Screen name="QR" component={QrScreen} />
      <MoreStackNav.Screen name="PaymentLinks" component={PaymentLinksScreen} />
      <MoreStackNav.Screen name="Otp" component={OtpScreen} />
    </MoreStackNav.Navigator>
  );
}

function MainTabs() {
  const insets = useSafeAreaInsets();
  const bottomInset = insets.bottom > 0 ? insets.bottom : (Platform.OS === 'android' ? 10 : 8);
  const tabHeight = 60 + bottomInset;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray500,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.divider,
          borderTopWidth: 1,
          height: tabHeight,
          paddingBottom: bottomInset,
          paddingTop: 8,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.08,
          shadowRadius: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarIcon: ({ color }) => {
          let iconName: IconName = 'home';
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Transactions') iconName = 'transactions';
          else if (route.name === 'Settlements') iconName = 'settlements';
          else if (route.name === 'More') iconName = 'more';

          return <Icon name={iconName} size={22} color={color} strokeWidth={2.2} />;
        },
      })}>
      <Tab.Screen name="Home" component={HomeStack} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Transactions" component={TransactionsStack} options={{ tabBarLabel: 'Transactions' }} />
      <Tab.Screen name="Settlements" component={SettlementsStack} options={{ tabBarLabel: 'Settlements' }} />
      <Tab.Screen name="More" component={MoreStack} options={{ tabBarLabel: 'More' }} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
        <RootStack.Screen name="Splash" component={SplashScreen} />
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen name="Otp" component={OtpScreen} />
        <RootStack.Screen name="Mpin" component={MpinScreen} />
        <RootStack.Screen name="ForgotMpin" component={ForgotMpinScreen} />
        <RootStack.Screen name="Biometric" component={BiometricScreen} />
        <RootStack.Screen name="DeviceVerification" component={DeviceVerificationScreen} />
        <RootStack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <RootStack.Screen name="Main" component={MainTabs} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
