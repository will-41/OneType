import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import { useColorScheme } from '../hooks/useColorScheme';
import { Colors } from '../constants/Colors';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const settingsSections = [
    {
      title: 'Appearance',
      items: [
        {
          label: 'Dark Mode',
          type: 'toggle',
          value: colorScheme === 'dark',
          onValueChange: () => {}, // Implement theme switching
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          label: 'Push Notifications',
          type: 'toggle',
          value: notificationsEnabled,
          onValueChange: setNotificationsEnabled,
        },
        {
          label: 'Sound Effects',
          type: 'toggle',
          value: soundEnabled,
          onValueChange: setSoundEnabled,
        },
        {
          label: 'Haptic Feedback',
          type: 'toggle',
          value: hapticEnabled,
          onValueChange: setHapticEnabled,
        },
      ],
    },
    {
      title: 'Data & Storage',
      items: [
        {
          label: 'Auto-save Progress',
          type: 'toggle',
          value: autoSaveEnabled,
          onValueChange: setAutoSaveEnabled,
        },
        {
          label: 'Export Data',
          type: 'button',
          onPress: () => {
            // Implement data export
            console.log('Export data');
          },
        },
        {
          label: 'Clear All Data',
          type: 'button',
          onPress: () => {
            // Implement data clearing
            console.log('Clear data');
          },
        },
      ],
    },
    {
      title: 'About',
      items: [
        {
          label: 'Version',
          type: 'info',
          value: '1.0.0',
        },
        {
          label: 'Terms of Service',
          type: 'button',
          onPress: () => {
            // Navigate to terms
            console.log('Terms of service');
          },
        },
        {
          label: 'Privacy Policy',
          type: 'button',
          onPress: () => {
            // Navigate to privacy policy
            console.log('Privacy policy');
          },
        },
      ],
    },
  ];

  const renderSettingItem = (item: any, index: number) => {
    return (
      <View key={index} style={[styles.settingItem, { borderBottomColor: colors.border }]}>
        <ThemedText style={styles.settingLabel}>{item.label}</ThemedText>
        
        {item.type === 'toggle' && (
          <Switch
            value={item.value}
            onValueChange={item.onValueChange}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.background}
          />
        )}
        
        {item.type === 'button' && (
          <TouchableOpacity onPress={item.onPress}>
            <ThemedText style={[styles.settingButton, { color: colors.primary }]}>
              {item.label}
            </ThemedText>
          </TouchableOpacity>
        )}
        
        {item.type === 'info' && (
          <ThemedText style={[styles.settingValue, { color: colors.text, opacity: 0.7 }]}>
            {item.value}
          </ThemedText>
        )}
      </View>
    );
  };

  const renderSection = (section: any, sectionIndex: number) => (
    <View key={sectionIndex} style={styles.section}>
      <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>
        {section.title}
      </ThemedText>
      <ThemedView style={[styles.sectionContent, { backgroundColor: colors.card }]}>
        {section.items.map((item: any, index: number) => renderSettingItem(item, index))}
      </ThemedView>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <ThemedText style={styles.title}>Settings</ThemedText>
          <ThemedText style={styles.subtitle}>Customize your experience</ThemedText>
        </View>

        {settingsSections.map((section, index) => renderSection(section, index))}

        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.logoutButton, { backgroundColor: colors.error }]}
            onPress={() => {
              // Implement logout
              console.log('Logout');
            }}
          >
            <ThemedText style={styles.logoutButtonText}>Sign Out</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  sectionContent: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  settingLabel: {
    fontSize: 16,
    flex: 1,
  },
  settingValue: {
    fontSize: 16,
  },
  settingButton: {
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    marginTop: 30,
    marginBottom: 50,
  },
  logoutButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});