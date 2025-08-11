import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useColorScheme } from '../hooks/useColorScheme';
import { Colors } from '../constants/Colors';

interface GamificationSystemProps {
  score: number;
  level: number;
  currentLesson: string;
}

export function GamificationSystem({ score, level, currentLesson }: GamificationSystemProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getLevelProgress = () => {
    const baseScore = (level - 1) * 100;
    const currentLevelScore = score - baseScore;
    const progress = Math.min(currentLevelScore / 100, 1);
    return progress;
  };

  const getNextLevelScore = () => {
    return level * 100;
  };

  const getLevelTitle = (level: number) => {
    if (level <= 5) return 'Novice';
    if (level <= 10) return 'Apprentice';
    if (level <= 15) return 'Journeyman';
    if (level <= 20) return 'Expert';
    if (level <= 25) return 'Master';
    return 'Grandmaster';
  };

  const getLevelColor = (level: number) => {
    if (level <= 5) return '#34C759';
    if (level <= 10) return '#007AFF';
    if (level <= 15) return '#5856D6';
    if (level <= 20) return '#FF9500';
    if (level <= 25) return '#FF3B30';
    return '#FF2D92';
  };

  return (
    <View style={styles.container}>
      {/* Level Display */}
      <View style={[styles.levelCard, { backgroundColor: colors.card }]}>
        <View style={styles.levelHeader}>
          <View style={[styles.levelBadge, { backgroundColor: getLevelColor(level) }]}>
            <Text style={styles.levelNumber}>{level}</Text>
          </View>
          <View style={styles.levelInfo}>
            <Text style={[styles.levelTitle, { color: colors.text }]}>
              {getLevelTitle(level)}
            </Text>
            <Text style={[styles.levelSubtitle, { color: colors.text, opacity: 0.7 }]}>
              Level {level}
            </Text>
          </View>
        </View>
        
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={[styles.progressText, { color: colors.text }]}>
              Progress to Level {level + 1}
            </Text>
            <Text style={[styles.scoreText, { color: colors.primary }]}>
              {score} / {getNextLevelScore()}
            </Text>
          </View>
          <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  backgroundColor: getLevelColor(level + 1),
                  width: `${getLevelProgress() * 100}%`
                }
              ]} 
            />
          </View>
        </View>
      </View>

      {/* Current Lesson */}
      <View style={[styles.lessonCard, { backgroundColor: colors.card }]}>
        <Text style={[styles.lessonTitle, { color: colors.text }]}>Current Lesson</Text>
        <Text style={[styles.lessonName, { color: colors.primary }]}>{currentLesson}</Text>
        <View style={styles.lessonStats}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.text }]}>{score}</Text>
            <Text style={[styles.statLabel, { color: colors.text, opacity: 0.7 }]}>Total Score</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.text }]}>{level}</Text>
            <Text style={[styles.statLabel, { color: colors.text, opacity: 0.7 }]}>Current Level</Text>
          </View>
        </View>
      </View>

      {/* Achievements Preview */}
      <View style={[styles.achievementsCard, { backgroundColor: colors.card }]}>
        <Text style={[styles.achievementsTitle, { color: colors.text }]}>Recent Achievements</Text>
        <View style={styles.achievementsList}>
          {level >= 1 && (
            <View style={styles.achievementItem}>
              <Text style={[styles.achievementIcon, { color: '#34C759' }]}>🏆</Text>
              <Text style={[styles.achievementText, { color: colors.text }]}>First Steps</Text>
            </View>
          )}
          {level >= 5 && (
            <View style={styles.achievementItem}>
              <Text style={[styles.achievementIcon, { color: '#007AFF' }]}>⭐</Text>
              <Text style={[styles.achievementText, { color: colors.text }]}>Novice Typist</Text>
            </View>
          )}
          {score >= 500 && (
            <View style={styles.achievementItem}>
              <Text style={[styles.achievementIcon, { color: '#5856D6' }]}>💎</Text>
              <Text style={[styles.achievementText, { color: colors.text }]}>Score Hunter</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  levelCard: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  levelBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  levelNumber: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  levelInfo: {
    flex: 1,
  },
  levelTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  levelSubtitle: {
    fontSize: 14,
  },
  progressSection: {
    marginTop: 10,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '500',
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  lessonCard: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  lessonName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  lessonStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  achievementsCard: {
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  achievementsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  achievementsList: {
    gap: 10,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  achievementText: {
    fontSize: 14,
    fontWeight: '500',
  },
});