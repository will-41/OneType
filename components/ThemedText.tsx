import React from 'react';
import { Text, TextProps } from 'react-native';
import { useColorScheme } from '../hooks/useColorScheme';
import { Colors } from '../constants/Colors';

interface ThemedTextProps extends TextProps {
  variant?: 'title' | 'subtitle' | 'body' | 'caption' | 'button';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

export function ThemedText({ 
  style, 
  variant = 'body', 
  weight = 'normal',
  ...props 
}: ThemedTextProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getVariantStyle = () => {
    switch (variant) {
      case 'title':
        return {
          fontSize: 32,
          fontWeight: 'bold' as const,
          color: colors.text,
        };
      case 'subtitle':
        return {
          fontSize: 18,
          fontWeight: 'semibold' as const,
          color: colors.text,
        };
      case 'body':
        return {
          fontSize: 16,
          fontWeight: weight,
          color: colors.text,
        };
      case 'caption':
        return {
          fontSize: 14,
          fontWeight: weight,
          color: colors.text,
          opacity: 0.7,
        };
      case 'button':
        return {
          fontSize: 16,
          fontWeight: 'semibold' as const,
          color: colors.primary,
        };
      default:
        return {
          fontSize: 16,
          fontWeight: weight,
          color: colors.text,
        };
    }
  };

  return (
    <Text
      style={[
        getVariantStyle(),
        style,
      ]}
      {...props}
    />
  );
}