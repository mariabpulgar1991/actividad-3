import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UserDataInfo } from '../context/UserDataInfo';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { setUserData } = useContext(UserDataInfo);

  const { plan, sede } = route.params || {};

  const [form, setForm] = useState({
    usuario_nombre: '',
    usuario_apellido: '',
    usuario_email: '',
    usuario_telefono: '',
    usuario_fecha_nacimiento: '',
    usuario_carnet_identidad: '',
    usuario_username: '',
    usuario_password: '',
    usuario_avatar_url: '',
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    const dataToSend = {
      ...form,
      plan: plan || 'No especificado',
      sede: sede || 'No especificada',
    };

    try {
      const response = await fetch('https://mock.apidog.com/m1/922983-905608-default/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setUserData(dataToSend); // Usamos directamente los datos ingresados
        navigation.navigate('Perfil');
      } else {
        Alert.alert('Error', 'No se pudo registrar el usuario');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      Alert.alert('Error', 'Ocurrió un problema al registrar');
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>Crear Cuenta</Text>

            <TextInput placeholder="Nombre" style={styles.input} onChangeText={(text) => handleChange('usuario_nombre', text)} />
            <TextInput placeholder="Apellido" style={styles.input} onChangeText={(text) => handleChange('usuario_apellido', text)} />
            <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" onChangeText={(text) => handleChange('usuario_email', text)} />
            <TextInput placeholder="Teléfono" style={styles.input} keyboardType="phone-pad" onChangeText={(text) => handleChange('usuario_telefono', text)} />
            <TextInput placeholder="Fecha de nacimiento (YYYY-MM-DD)" style={styles.input} onChangeText={(text) => handleChange('usuario_fecha_nacimiento', text)} />
            <TextInput placeholder="Número de identidad" style={styles.input} onChangeText={(text) => handleChange('usuario_carnet_identidad', text)} />
            <TextInput placeholder="Nombre de usuario" style={styles.input} onChangeText={(text) => handleChange('usuario_username', text)} />
            <TextInput placeholder="Contraseña" style={styles.input} secureTextEntry onChangeText={(text) => handleChange('usuario_password', text)} />
            <TextInput placeholder="URL de Avatar (opcional)" style={styles.input} onChangeText={(text) => handleChange('usuario_avatar_url', text)} />
          </ScrollView>

          <View style={styles.confirmButton}>
            <Button title="Registrarse" onPress={handleSubmit} color="#007bff" />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 40,
    paddingHorizontal: 24,
    paddingBottom: 80,
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
    marginBottom: 10,
    color: '#333',
  },
  confirmButton: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
});
