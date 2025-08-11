import { useColorScheme } from './useColorScheme';
import { Colors } from '../constants/Colors';

export function useAppTheme() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  
  return {
    colors,
    colorScheme,
    isDark: colorScheme === 'dark',
    isLight: colorScheme === 'light',
  };
}