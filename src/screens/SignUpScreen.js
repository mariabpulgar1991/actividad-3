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
import * as Haptics from 'expo-haptics';

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
    const isValidEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    if (
      !form.usuario_nombre ||
      !form.usuario_apellido ||
      !form.usuario_email ||
      !isValidEmail(form.usuario_email) ||
      !form.usuario_password
    ) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert(
        'Error en el formulario',
        'Por favor completa todos los campos requeridos y asegúrate de que el correo electrónico sea válido.'
      );
      return;
    }

    const dataToSend = {
      ...form,
      plan: plan || 'No especificado',
      sede: sede || 'No especificada',
    };

    try {
      const response = await fetch(
        'https://mock.apidog.com/m1/922983-905608-default/usuarios',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend),
        }
      );

      if (response.ok) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setUserData(dataToSend);
        navigation.navigate('Perfil');
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Alert.alert('Error', 'No se pudo completar el registro. Intenta de nuevo.');
      }
    } catch (error) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert('Error', 'Ha ocurrido un problema al conectar con el servidor.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.inner}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            value={form.usuario_nombre}
            onChangeText={(text) => handleChange('usuario_nombre', text)}
          />

          <Text style={styles.label}>Apellido</Text>
          <TextInput
            style={styles.input}
            value={form.usuario_apellido}
            onChangeText={(text) => handleChange('usuario_apellido', text)}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={form.usuario_email}
            onChangeText={(text) => handleChange('usuario_email', text)}
            keyboardType="email-address"
          />

          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={styles.input}
            value={form.usuario_telefono}
            onChangeText={(text) => handleChange('usuario_telefono', text)}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Fecha de nacimiento</Text>
          <TextInput
            style={styles.input}
            value={form.usuario_fecha_nacimiento}
            onChangeText={(text) => handleChange('usuario_fecha_nacimiento', text)}
            placeholder="YYYY-MM-DD"
          />

          <Text style={styles.label}>Cédula</Text>
          <TextInput
            style={styles.input}
            value={form.usuario_carnet_identidad}
            onChangeText={(text) => handleChange('usuario_carnet_identidad', text)}
          />

          <Text style={styles.label}>Nombre de usuario</Text>
          <TextInput
            style={styles.input}
            value={form.usuario_username}
            onChangeText={(text) => handleChange('usuario_username', text)}
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            value={form.usuario_password}
            onChangeText={(text) => handleChange('usuario_password', text)}
            secureTextEntry
          />

          <Text style={styles.label}>Avatar (URL)</Text>
          <TextInput
            style={styles.input}
            value={form.usuario_avatar_url}
            onChangeText={(text) => handleChange('usuario_avatar_url', text)}
          />

          <Button title="Registrarse" onPress={handleSubmit} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
  },
  label: {
    marginTop: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 4,
    marginTop: 4,
  },
});
