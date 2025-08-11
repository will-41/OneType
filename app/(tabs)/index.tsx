import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { Enhanced3DKeyboard } from '../../components/Enhanced3DKeyboard';
import { GamificationSystem } from '../../components/GamificationSystem';
import { AuthModal } from '../../components/AuthModal';
import { useColorScheme } from '../../hooks/useColorScheme';
import { Colors } from '../../constants/Colors';

export default function HomeScreen() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentLesson, setCurrentLesson] = useState('Beginner Typing');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleTypingComplete = (accuracy: number, speed: number) => {
    const newScore = score + Math.floor(accuracy * speed);
    setScore(newScore);
    
    if (newScore >= level * 100) {
      setLevel(level + 1);
    }
  };

  const handleStartLesson = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      // Start lesson logic
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedView style={styles.header}>
          <ThemedText style={styles.title}>OneType</ThemedText>
          <ThemedText style={styles.subtitle}>Master Typing with Style</ThemedText>
        </ThemedView>

        <GamificationSystem 
          score={score}
          level={level}
          currentLesson={currentLesson}
        />

        <View style={styles.lessonSection}>
          <ThemedText style={styles.sectionTitle}>Current Lesson</ThemedText>
          <TouchableOpacity 
            style={[styles.lessonButton, { backgroundColor: colors.primary }]}
            onPress={handleStartLesson}
          >
            <ThemedText style={styles.lessonButtonText}>{currentLesson}</ThemedText>
          </TouchableOpacity>
        </View>

        <Enhanced3DKeyboard onTypingComplete={handleTypingComplete} />

        {showAuthModal && (
          <AuthModal
            visible={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            onAuthenticated={() => {
              setIsAuthenticated(true);
              setShowAuthModal(false);
            }}
          />
        )}
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
  lessonSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  lessonButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  lessonButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});