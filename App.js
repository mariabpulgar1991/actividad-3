import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { StyleSheet } from 'react-native';
import { UserDataInfoProvider } from './src/context/UserDataInfo';


export default function App() {
  return (
    <UserDataInfoProvider>
      <NavigationContainer>
      <AppNavigator />
      </NavigationContainer>
    </UserDataInfoProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
