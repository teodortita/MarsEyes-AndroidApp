/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator, createAppContainer} from "react-navigation";
import Header from './src/components/Header';
import RoverSelect from './src/components/RoverSelect';
import DateSelect from './src/components/DateSelect';
import PhotoGallery from './src/components/PhotoGallery';

const AppNavigator = createStackNavigator(
  {
    RoverSelect: RoverSelect,
    DateSelect: DateSelect,
    PhotoGallery: PhotoGallery
  }, 
  {
    initialRouteName: 'RoverSelect',
    defaultNavigationOptions: {
      headerStyle: {
          backgroundColor: '#ba5536',
          borderBottomWidth: 1.5,
          borderBottomColor: '#000'
      },
      headerTintColor: '#000'
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer/>;
  }
}

const styles = StyleSheet.create({
});
