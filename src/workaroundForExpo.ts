/**
 * @see https://github.com/expo/expo/issues/4070
 */
import * as Font from 'expo-font';
import { StyleSheet } from 'react-native';

StyleSheet.setStyleAttributePreprocessor('fontFamily', Font.processFontFamily);
