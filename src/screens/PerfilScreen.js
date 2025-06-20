import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { UserDataInfo } from '../context/UserDataInfo';

export default function PerfilScreen() {
  const { userData } = useContext(UserDataInfo);

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>No hay información del usuario.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: userData.usuario_avatar_url || 'https://via.placeholder.com/150',
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>
          {userData.usuario_nombre} {userData.usuario_apellido}
        </Text>
        <Text style={styles.username}>@{userData.usuario_username}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Datos de contacto</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{userData.usuario_email}</Text>

          <Text style={styles.label}>Teléfono:</Text>
          <Text style={styles.value}>{userData.usuario_telefono}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Identificación</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Fecha de nacimiento:</Text>
          <Text style={styles.value}>{userData.usuario_fecha_nacimiento}</Text>

          <Text style={styles.label}>Número de identidad:</Text>
          <Text style={styles.value}>{userData.usuario_carnet_identidad}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Plan y sede</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Sede:</Text>
          <Text style={styles.value}>{userData.sede || 'No asignada'}</Text>

          <Text style={styles.label}>Plan:</Text>
          <Text style={styles.value}>{userData.plan || 'No asignado'}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 24,
    backgroundColor: '#f9f9f9',
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#ddd',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
  },
  username: {
    fontSize: 16,
    color: '#777',
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
});
