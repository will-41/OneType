import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { useColorScheme } from '../../hooks/useColorScheme';
import { Colors } from '../../constants/Colors';

export default function ExploreScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const categories = [
    { id: 'all', name: 'All Lessons', count: 24 },
    { id: 'beginner', name: 'Beginner', count: 8 },
    { id: 'intermediate', name: 'Intermediate', count: 10 },
    { id: 'advanced', name: 'Advanced', count: 6 },
  ];

  const lessons = [
    {
      id: 1,
      title: 'Home Row Basics',
      description: 'Learn the fundamental home row keys',
      difficulty: 'beginner',
      duration: '15 min',
      progress: 0,
      category: 'beginner',
    },
    {
      id: 2,
      title: 'Speed Building',
      description: 'Increase your typing speed gradually',
      difficulty: 'intermediate',
      duration: '20 min',
      progress: 0,
      category: 'intermediate',
    },
    {
      id: 3,
      title: 'Advanced Punctuation',
      description: 'Master complex punctuation and symbols',
      difficulty: 'advanced',
      duration: '25 min',
      progress: 0,
      category: 'advanced',
    },
    {
      id: 4,
      title: 'Number Row Practice',
      description: 'Practice typing numbers and symbols',
      difficulty: 'beginner',
      duration: '15 min',
      progress: 0,
      category: 'beginner',
    },
    {
      id: 5,
      title: 'Speed Endurance',
      description: 'Build stamina for long typing sessions',
      difficulty: 'advanced',
      duration: '30 min',
      progress: 0,
      category: 'advanced',
    },
  ];

  const filteredLessons = selectedCategory === 'all' 
    ? lessons 
    : lessons.filter(lesson => lesson.category === selectedCategory);

  const renderLesson = ({ item }: { item: typeof lessons[0] }) => (
    <TouchableOpacity 
      style={[styles.lessonCard, { backgroundColor: colors.card }]}
      onPress={() => {/* Navigate to lesson */}}
    >
      <View style={styles.lessonHeader}>
        <ThemedText style={styles.lessonTitle}>{item.title}</ThemedText>
        <View style={[
          styles.difficultyBadge, 
          { backgroundColor: getDifficultyColor(item.difficulty) }
        ]}>
          <ThemedText style={styles.difficultyText}>
            {item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}
          </ThemedText>
        </View>
      </View>
      
      <ThemedText style={styles.lessonDescription}>{item.description}</ThemedText>
      
      <View style={styles.lessonFooter}>
        <ThemedText style={styles.lessonDuration}>{item.duration}</ThemedText>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  backgroundColor: colors.primary,
                  width: `${item.progress}%`
                }
              ]} 
            />
          </View>
          <ThemedText style={styles.progressText}>{item.progress}%</ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#34C759';
      case 'intermediate': return '#FF9500';
      case 'advanced': return '#FF3B30';
      default: return colors.primary;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedView style={styles.header}>
          <ThemedText style={styles.title}>Explore Lessons</ThemedText>
          <ThemedText style={styles.subtitle}>Discover new challenges</ThemedText>
        </ThemedView>

        <View style={styles.categoriesSection}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  { 
                    backgroundColor: selectedCategory === category.id 
                      ? colors.primary 
                      : colors.card 
                  }
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <ThemedText style={[
                  styles.categoryText,
                  { 
                    color: selectedCategory === category.id 
                      ? '#ffffff' 
                      : colors.text 
                  }
                ]}>
                  {category.name}
                </ThemedText>
                <ThemedText style={[
                  styles.categoryCount,
                  { 
                    color: selectedCategory === category.id 
                      ? '#ffffff' 
                      : colors.text 
                  }
                ]}>
                  {category.count}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.lessonsSection}>
          <ThemedText style={styles.sectionTitle}>
            {selectedCategory === 'all' ? 'All Lessons' : `${categories.find(c => c.id === selectedCategory)?.name} Lessons`}
          </ThemedText>
          <FlatList
            data={filteredLessons}
            renderItem={renderLesson}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
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
  categoriesSection: {
    marginBottom: 30,
  },
  categoriesContainer: {
    paddingHorizontal: 5,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginHorizontal: 5,
    alignItems: 'center',
    minWidth: 100,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  categoryCount: {
    fontSize: 12,
    opacity: 0.8,
  },
  lessonsSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  lessonCard: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginRight: 10,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  difficultyText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  lessonDescription: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 15,
    lineHeight: 20,
  },
  lessonFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lessonDuration: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    width: 60,
    height: 4,
    borderRadius: 2,
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
  },
});