import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  ViewStyle, 
  TextStyle,
  ActivityIndicator
} from 'react-native';
import Colors from '@/constants/colors';
import { Feather } from '@expo/vector-icons';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'filled' | 'outlined' | 'text';
  color?: string;
  size?: 'small' | 'medium' | 'large';
  icon?: keyof typeof Feather.glyphMap;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  title,
  onPress,
  variant = 'filled',
  color = Colors.primary,
  size = 'medium',
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  style,
  textStyle,
}: ButtonProps) {
  const getButtonStyle = (): ViewStyle[] => {
    const baseStyle = [styles.button];
    
    // Add size style
    switch (size) {
      case 'small':
        baseStyle.push(styles.buttonSmall);
        break;
      case 'large':
        baseStyle.push(styles.buttonLarge);
        break;
      default:
        baseStyle.push(styles.buttonMedium);
    }
    
    // Add variant style
    switch (variant) {
      case 'outlined':
        baseStyle.push({
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: disabled ? Colors.textSecondary : color,
        });
        break;
      case 'text':
        baseStyle.push({
          backgroundColor: 'transparent',
          paddingHorizontal: 8,
        });
        break;
      default:
        baseStyle.push({
          backgroundColor: disabled ? Colors.textSecondary : color,
        });
    }
    
    // Add custom style
    if (style) {
      baseStyle.push(style);
    }
    
    return baseStyle;
  };
  
  const getTextStyle = (): TextStyle[] => {
    const baseStyle = [styles.buttonText];
    
    // Add size style
    switch (size) {
      case 'small':
        baseStyle.push({ fontSize: 14 });
        break;
      case 'large':
        baseStyle.push({ fontSize: 18 });
        break;
      default:
        baseStyle.push({ fontSize: 16 });
    }
    
    // Add variant style
    switch (variant) {
      case 'outlined':
      case 'text':
        baseStyle.push({
          color: disabled ? Colors.textSecondary : color,
        });
        break;
      default:
        baseStyle.push({
          color: 'white',
        });
    }
    
    // Add custom text style
    if (textStyle) {
      baseStyle.push(textStyle);
    }
    
    return baseStyle;
  };
  
  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'filled' ? 'white' : color} 
          size="small" 
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <Feather 
              name={icon} 
              size={size === 'small' ? 16 : size === 'large' ? 24 : 20} 
              color={variant === 'filled' ? 'white' : color}
              style={styles.iconLeft} 
            />
          )}
          <Text style={getTextStyle()}>{title}</Text>
          {icon && iconPosition === 'right' && (
            <Feather 
              name={icon} 
              size={size === 'small' ? 16 : size === 'large' ? 24 : 20} 
              color={variant === 'filled' ? 'white' : color}
              style={styles.iconRight} 
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  buttonSmall: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonMedium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonLarge: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  buttonText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});