/**
 * FIXME: Remove
 * babel-preset-expo@5.1.1 cannot handle native-base correctly.
 * `require('react-native-web').default`
 */
import * as rn from 'react-native';

Object.defineProperty(rn, 'default', { value: rn });
