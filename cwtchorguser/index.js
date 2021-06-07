/**
 * @format
 */

import { AppRegistry } from 'react-native';
import RootAapp from "./src/RootApp"
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => RootAapp);