import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importar las pantallas
import CitySelectorScreen from '../screens/CitySelectorScreen';
import SedesScreen from '../screens/SedesScreen';
import SedeDetalleScreen from '../screens/SedeDetalleScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import PerfilScreen from '../screens/PerfilScreen';
import TodasLasSedesScreen from '../screens/TodasLasSedesScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="CitySelector">
      <Stack.Screen name="CitySelector" component={CitySelectorScreen} />
      <Stack.Screen name="Sedes" component={SedesScreen} />
      <Stack.Screen name="SedeDetalle" component={SedeDetalleScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Perfil" component={PerfilScreen} />
      <Stack.Screen name="TodasLasSedes" component={TodasLasSedesScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
