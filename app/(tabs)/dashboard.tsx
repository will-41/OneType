import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { useColorScheme } from '../../hooks/useColorScheme';
import { Colors } from '../../constants/Colors';

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const stats = {
    totalLessons: 24,
    completedLessons: 8,
    currentStreak: 5,
    totalScore: 1250,
    averageAccuracy: 87,
    averageSpeed: 45,
  };

  const recentAchievements = [
    { name: 'First Steps', description: 'Complete your first lesson', earned: true },
    { name: 'Speed Demon', description: 'Achieve 50+ WPM', earned: false },
    { name: 'Accuracy Master', description: 'Maintain 95%+ accuracy for 5 lessons', earned: false },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedView style={styles.header}>
          <ThemedText style={styles.title}>Dashboard</ThemedText>
          <ThemedText style={styles.subtitle}>Track Your Progress</ThemedText>
        </ThemedView>

        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: colors.card }]}>
            <ThemedText style={styles.statNumber}>{stats.completedLessons}</ThemedText>
            <ThemedText style={styles.statLabel}>Lessons Completed</ThemedText>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: colors.card }]}>
            <ThemedText style={styles.statNumber}>{stats.currentStreak}</ThemedText>
            <ThemedText style={styles.statLabel}>Day Streak</ThemedText>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: colors.card }]}>
            <ThemedText style={styles.statNumber}>{stats.totalScore}</ThemedText>
            <ThemedText style={styles.statLabel}>Total Score</ThemedText>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: colors.card }]}>
            <ThemedText style={styles.statNumber}>{stats.averageAccuracy}%</ThemedText>
            <ThemedText style={styles.statLabel}>Avg Accuracy</ThemedText>
          </View>
        </View>

        <View style={styles.progressSection}>
          <ThemedText style={styles.sectionTitle}>Progress Overview</ThemedText>
          <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  backgroundColor: colors.primary,
                  width: `${(stats.completedLessons / stats.totalLessons) * 100}%`
                }
              ]} 
            />
          </View>
          <ThemedText style={styles.progressText}>
            {stats.completedLessons} of {stats.totalLessons} lessons completed
          </ThemedText>
        </View>

        <View style={styles.achievementsSection}>
          <ThemedText style={styles.sectionTitle}>Recent Achievements</ThemedText>
          {recentAchievements.map((achievement, index) => (
            <View 
              key={index} 
              style={[
                styles.achievementCard, 
                { 
                  backgroundColor: colors.card,
                  opacity: achievement.earned ? 1 : 0.6
                }
              ]}
            >
              <ThemedText style={styles.achievementName}>{achievement.name}</ThemedText>
              <ThemedText style={styles.achievementDescription}>{achievement.description}</ThemedText>
              <ThemedText style={styles.achievementStatus}>
                {achievement.earned ? '✓ Earned' : 'Locked'}
              </ThemedText>
            </View>
          ))}
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    width: '48%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.8,
  },
  progressSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    opacity: 0.8,
  },
  achievementsSection: {
    marginBottom: 30,
  },
  achievementCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  achievementName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  achievementDescription: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 10,
  },
  achievementStatus: {
    fontSize: 12,
    fontWeight: '500',
  },
});