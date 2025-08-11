import { Stack } from 'expo-router';
import { AppProvider } from '../contexts/AppContext';

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ title: 'Settings' }} />
        <Stack.Screen name="+not-found" options={{ title: 'Not Found' }} />
      </Stack>
    </AppProvider>
  );
}