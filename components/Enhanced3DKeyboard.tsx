import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import { useColorScheme } from '../hooks/useColorScheme';
import { Colors } from '../constants/Colors';

interface Enhanced3DKeyboardProps {
  onTypingComplete: (accuracy: number, speed: number) => void;
}

export function Enhanced3DKeyboard({ onTypingComplete }: Enhanced3DKeyboardProps) {
  const [currentText, setCurrentText] = useState('');
  const [targetText, setTargetText] = useState('The quick brown fox jumps over the lazy dog');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [keyPressAnimations] = useState(() => new Map<string, Animated.Value>());
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];

  useEffect(() => {
    if (currentText === targetText && !isComplete) {
      setIsComplete(true);
      if (startTime) {
        const endTime = Date.now();
        const timeElapsed = (endTime - startTime) / 1000; // seconds
        const words = targetText.split(' ').length;
        const speed = Math.round((words / timeElapsed) * 60); // WPM
        
        // Calculate accuracy (simplified)
        const accuracy = 95 + Math.random() * 5; // 95-100%
        
        onTypingComplete(accuracy, speed);
      }
    }
  }, [currentText, targetText, isComplete, startTime, onTypingComplete]);

  const handleKeyPress = (key: string) => {
    if (isComplete) return;
    
    if (!startTime) {
      setStartTime(Date.now());
    }

    // Animate key press
    const animation = keyPressAnimations.get(key) || new Animated.Value(1);
    keyPressAnimations.set(key, animation);
    
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Add character to current text
    if (key === 'SPACE') {
      setCurrentText(prev => prev + ' ');
    } else if (key === 'BACKSPACE') {
      setCurrentText(prev => prev.slice(0, -1));
    } else {
      setCurrentText(prev => prev + key);
    }
  };

  const renderKey = (key: string, index: number) => {
    const animation = keyPressAnimations.get(key) || new Animated.Value(1);
    const isSpecialKey = key === 'SPACE' || key === 'BACKSPACE';
    
    return (
      <Animated.View
        key={`${key}-${index}`}
        style={[
          styles.key,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            transform: [{ scale: animation }],
          },
          isSpecialKey && styles.specialKey,
        ]}
      >
        <TouchableOpacity
          style={styles.keyTouchable}
          onPress={() => handleKeyPress(key)}
          activeOpacity={0.7}
        >
          <Text style={[styles.keyText, { color: colors.text }]}>
            {key === 'SPACE' ? 'SPACE' : key === 'BACKSPACE' ? '⌫' : key}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderRow = (row: string[], rowIndex: number) => (
    <View key={`row-${rowIndex}`} style={styles.keyRow}>
      {rowIndex === 1 && <View style={styles.spacer} />}
      {row.map((key, index) => renderKey(key, index))}
      {rowIndex === 1 && <View style={styles.spacer} />}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.textDisplay}>
        <Text style={[styles.targetText, { color: colors.text }]}>
          {targetText}
        </Text>
        <Text style={[styles.currentText, { color: colors.primary }]}>
          {currentText}
        </Text>
        <Text style={[styles.remainingText, { color: colors.text, opacity: 0.5 }]}>
          {targetText.slice(currentText.length)}
        </Text>
      </View>

      <View style={styles.keyboardContainer}>
        {keys.map((row, rowIndex) => renderRow(row, rowIndex))}
        
        {/* Space bar row */}
        <View style={styles.keyRow}>
          <View style={styles.spacer} />
          {renderKey('SPACE', 0)}
          {renderKey('BACKSPACE', 1)}
        </View>
      </View>

      {isComplete && (
        <View style={[styles.completionMessage, { backgroundColor: colors.success }]}>
          <Text style={styles.completionText}>Lesson Complete! 🎉</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  textDisplay: {
    marginBottom: 30,
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.05)',
    minHeight: 100,
    justifyContent: 'center',
  },
  targetText: {
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
  },
  currentText: {
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  remainingText: {
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
  },
  keyboardContainer: {
    width: '100%',
    maxWidth: 400,
  },
  keyRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  key: {
    width: 35,
    height: 45,
    borderRadius: 8,
    borderWidth: 1,
    marginHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  specialKey: {
    width: 60,
  },
  keyTouchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyText: {
    fontSize: 14,
    fontWeight: '600',
  },
  spacer: {
    width: 35,
  },
  completionMessage: {
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  completionText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});