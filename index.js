/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/AppContainer';
import {name as appName} from './app.json';
import { Image } from 'react-native-elements';

AppRegistry.registerComponent(appName, () => App);
