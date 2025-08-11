import React from 'react';
import { View, ViewProps } from 'react-native';
import { useColorScheme } from '../hooks/useColorScheme';
import { Colors } from '../constants/Colors';

interface ThemedViewProps extends ViewProps {
  variant?: 'default' | 'card' | 'elevated';
}

export function ThemedView({ 
  style, 
  variant = 'default', 
  ...props 
}: ThemedViewProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getVariantStyle = () => {
    switch (variant) {
      case 'card':
        return {
          backgroundColor: colors.card,
          borderRadius: 12,
          padding: 16,
        };
      case 'elevated':
        return {
          backgroundColor: colors.card,
          borderRadius: 12,
          padding: 16,
          shadowColor: colors.shadow,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
          elevation: 5,
        };
      default:
        return {};
    }
  };

  return (
    <View
      style={[
        {
          backgroundColor: colors.background,
        },
        getVariantStyle(),
        style,
      ]}
      {...props}
    />
  );
}