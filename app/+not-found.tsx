import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import { useColorScheme } from '../hooks/useColorScheme';
import { Colors } from '../constants/Colors';

export default function NotFoundScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <View style={styles.content}>
          <ThemedText style={styles.title}>This screen doesn't exist.</ThemedText>
          <ThemedText style={styles.subtitle}>
            The page you're looking for could not be found.
          </ThemedText>
          
          <Link href="/" style={styles.link}>
            <ThemedText style={[styles.linkText, { color: colors.primary }]}>
              Go to home screen!
            </ThemedText>
          </Link>
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 22,
  },
  link: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  linkText: {
    fontSize: 16,
    fontWeight: '600',
  },
});