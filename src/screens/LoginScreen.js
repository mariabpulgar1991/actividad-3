import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserDataInfo } from '../context/UserDataInfo';

export default function LoginScreen() {
  const navigation = useNavigation();
  const { setUserData } = useContext(UserDataInfo);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://mock.apidog.com/m1/922983-905608-default/usuarios');
      const usuarios = await response.json();

      const usuarioEncontrado = usuarios.find(
        (u) => u.usuario_username === username && u.usuario_password === password
      );

      if (usuarioEncontrado) {
        setUserData(usuarioEncontrado);
        navigation.navigate('Perfil');
      } else {
        Alert.alert('Error', 'Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', 'Hubo un problema al conectarse con el servidor');
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Iniciar Sesión</Text>

          <TextInput
            placeholder="Usuario"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            placeholder="Contraseña"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <View style={styles.confirmButton}>
            <Button title="Entrar" onPress={handleLogin} color="#007bff" />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.buttonSecondaryText}>¿No tienes cuenta? Regístrate</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 24,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 15,
    marginBottom: 16,
    color: '#333',
  },
  confirmButton: {
    marginTop: 10,
    marginBottom: 20,
  },
  buttonSecondaryText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
