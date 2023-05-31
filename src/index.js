/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import name from './app.json';

// const {appName} = name;
console.log(name);
AppRegistry.registerComponent(name, () => App);
AppRegistry.runApplication(name, {
  rootTag: document.getElementById('root'),
});
