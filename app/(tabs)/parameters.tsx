import { Ionicons } from '@expo/vector-icons';

import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';


import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function SettingsScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#f1f1f1', dark: '#1c1c1e' }}
      headerImage={<Image
                source={require('@/assets/images/partial-react-logo.png')}
                style={styles.reactLogo}
              />}
    >
      <ThemedView style={styles.section}>
        <ThemedText type="title">Settings</ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Account</ThemedText>
        <ThemedView style={styles.settingRow}>
          <Ionicons name="person-outline" size={20} />
          <ThemedText style={styles.settingLabel}>Profile</ThemedText>
        </ThemedView>
        <ThemedView style={styles.settingRow}>
          <Ionicons name="mail-outline" size={20} />
          <ThemedText style={styles.settingLabel}>Email</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Preferences</ThemedText>
        <ThemedView style={styles.settingRow}>
          <Ionicons name="moon-outline" size={20} />
          <ThemedText style={styles.settingLabel}>Appearance</ThemedText>
        </ThemedView>
        <ThemedView style={styles.settingRow}>
          <Ionicons name="notifications-outline" size={20} />
          <ThemedText style={styles.settingLabel}>Notifications</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Security</ThemedText>
        <ThemedView style={styles.settingRow}>
          <Ionicons name="lock-closed-outline" size={20} />
          <ThemedText style={styles.settingLabel}>Change Password</ThemedText>
        </ThemedView>
        <ThemedView style={styles.settingRow}>
          <Ionicons name="finger-print-outline" size={20} />
          <ThemedText style={styles.settingLabel}>Biometric Login</ThemedText>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 16,
    gap: 12,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  settingLabel: {
    fontSize: 16,
  },
    reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
