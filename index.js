/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/AppContainer';
import {name as appName} from './app.json';
import {loadErrorMessages, loadDevMessages} from '@apollo/client/dev';

if (__DEV__) {
  require('./ReactotronConfig');
  loadDevMessages();
  loadErrorMessages();
}
AppRegistry.registerComponent(appName, () => App);
