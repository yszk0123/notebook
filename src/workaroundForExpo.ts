/**
 * @see https://github.com/expo/expo/issues/4070
 */
import * as Font from 'expo-font';
import { Platform, StyleSheet } from 'react-native';

if (Platform.OS !== 'web') {
  StyleSheet.setStyleAttributePreprocessor('fontFamily', Font.processFontFamily);
}
