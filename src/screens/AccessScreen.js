import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AccessScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Estás a un paso de tu nuevo plan!</Text>
      <Text style={styles.subtitle}>Regístrate para completar tu inscripción.</Text>

      <View style={styles.confirmButton}>
        <Button
          title="Registrarse"
          onPress={() => navigation.navigate('SignUp')}
          color="#007bff"
        />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonSecondaryText}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 36,
  },
  confirmButton: {
    marginTop: 20,
    width: '100%',
    marginBottom: 20,
  },
  buttonSecondaryText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
